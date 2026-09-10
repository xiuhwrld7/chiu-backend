import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const cacheRecetas = {};

const REGLAS_MOMENTO = {
  desayuno: "Desayunos caseros, energéticos y prácticos.",
  almuerzo: "Colaciones sustanciosas o comidas de media mañana.",
  comida: "Plato fuerte principal: guisados tradicionales, caldos, arroces, pastas.",
  merienda: "Meriendas ligeras, snacks, bocadillos de media tarde o antojos.",
  cena: "Cenas ligeras de digestión rápida y bajas en grasa pesada.",
  postre: "Postres caseros, antojitos dulces de sartén, horno o taza.",
  bebidas: "Bebidas preparadas, smoothies, infusiones, coctelería casera sin alcohol o batidos nutritivos."
};

function resolverImagenGastronomica(titulo, categoria) {
  const tituloLimpio = titulo.trim().replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, "");
  const promptFotografico = `Delicious ${tituloLimpio}, appetizing food photography, restaurant plating, highly detailed, 4k resolution`;
  const promptUrl = encodeURIComponent(promptFotografico);
  return `https://image.pollinations.ai/prompt/${promptUrl}?width=800&height=600&nologo=true`;
}

app.post("/api/recetas", async (req, res) => {
  try {
    const { ingredientes = [], porciones = 1, momento = "postre", intento = 1 } = req.body;

    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
      return res.status(400).json({ error: "Ingresa al menos un ingrediente." });
    }

    const cacheKey = `${ingredientes.map(i => i.trim().toLowerCase()).sort().join("-")}_${porciones}_${momento}_${intento}`;
    if (cacheRecetas[cacheKey]) {
      console.log(`⚡ Entregando desde caché (Intento ${intento})`);
      return res.json(cacheRecetas[cacheKey]);
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Falta configurar GEMINI_API_KEY en el servidor." });
    }

    const regla = REGLAS_MOMENTO[momento.toLowerCase()] || REGLAS_MOMENTO.desayuno;

    const variacionPrompt = intento > 1 
      ? `IMPORTANTE: Esta es la iteración número ${intento}. EXCLUYE las opciones más obvias o comunes y genera 4 platillos mucho más originales, regionales o creativos.` 
      : `Genera 4 platillos excelentes y accesibles.`;

    const systemPrompt = `Eres el chef "Chiu", un instructor de cocina sumamente paciente, pedagógico y ultra-detallista.
REGLAS OBLIGATORIAS:
1. Genera EXACTAMENTE 4 RECETAS COMPLETAS Y TOTALMENTE DIFERENTES.
2. USO DE INGREDIENTES: Integra los ingredientes listados. Si el usuario proporcionó muchos, úsalos con lógica culinaria (puedes usar algunos para la base y otros para guarniciones).
3. EXPLICACIÓN A PRUEBA DE PRINCIPIANTES (CERO SUPOSICIONES): Prohibido resumir pasos. NO asumas que el usuario sabe freír un huevo, hacer arroz, o picar cebolla. Explica CÓMO se hace cada componente.
4. PROCEDIMIENTO PROFUNDO: Si el plato lleva varios componentes, dedica instrucciones minuciosas para la elaboración de CADA UNO de forma independiente (nivel de fuego, minutos exactos y señales visuales).
5. Calcula las porciones exactas numéricamente para ${porciones} persona(s).
6. ${variacionPrompt}
7. Responde ÚNICAMENTE con el formato JSON solicitado.`;

    const userPrompt = `Ingredientes base: ${ingredientes.join(", ")}.
Porciones: ${porciones} comensal(es).
Momento del día: ${momento.toUpperCase()} (${regla}).

Estructura JSON exacta obligatoria:
{
  "recetas": [
    {
      "id": 1,
      "titulo": "Nombre del platillo",
      "descripcion": "Descripción detallada del platillo.",
      "tiempo": "20 min",
      "dificultad": "Media",
      "tipCasero": "Consejo técnico culinario de Chiu.",
      "ingredientesDetalle": [
        "Cantidad numérica exacta para ${porciones} persona(s)"
      ],
      "pasos": [
        {
          "fase": "Fase 1: Preparación inicial (Cortes y organización)",
          "acciones": ["Explica paso a paso cómo lavar, pelar y el tipo de corte exacto para cada ingrediente."]
        },
        {
          "fase": "Fase 2: Cocción del componente principal",
          "acciones": ["Instrucciones detalladas de temperatura, tiempos y técnicas."]
        },
        {
          "fase": "Fase 3: Elaboración de acompañamientos extras",
          "acciones": ["Explica minuciosamente cómo cocinar los ingredientes extra desde cero, sin omitir técnicas."]
        },
        {
          "fase": "Fase 4: Emplatado final",
          "acciones": ["Cómo armar el plato para que se vea apetitoso."]
        }
      ]
    }
  ]
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.8
      }
    };

    // SISTEMA DE AUTO-REINTENTO (Retry Logic)
    let apiResponse;
    let data;
    let maxReintentos = 3;
    let exito = false;

    for (let i = 0; i < maxReintentos; i++) {
      apiResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      data = await apiResponse.json();

      if (apiResponse.ok) {
        exito = true;
        break; // Todo salió bien, salimos del bucle
      } else if (apiResponse.status === 503 || apiResponse.status === 429) {
        console.log(`⚠️ Servidor de Google saturado (Intento ${i + 1} de ${maxReintentos}). Esperando 2 segundos para reintentar...`);
        // Esperamos 2 segundos antes de volver a intentar
        await new Promise(resolve => setTimeout(resolve, 2000)); 
      } else {
        break; // Ocurrió un error distinto (ej. clave inválida), salimos para mostrarlo
      }
    }

    if (!exito) {
      return res.status(apiResponse.status || 500).json({ 
        error: "Los servidores de la IA están demasiado ocupados en este momento. Por favor, intenta de nuevo en unos segundos." 
      });
    }

    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const firstBrace = rawText.indexOf("{");
    const lastBrace = rawText.lastIndexOf("}");
    
    const respuestaJSON = JSON.parse(rawText.substring(firstBrace, lastBrace + 1));

    respuestaJSON.recetas = respuestaJSON.recetas.map((r, index) => {
      r.id = index + 1;
      r.categoria = momento.toUpperCase();
      r.imagenUrl = resolverImagenGastronomica(r.titulo, momento);
      return r;
    });

    cacheRecetas[cacheKey] = respuestaJSON;
    res.json(respuestaJSON);

  } catch (error) {
    console.error("Error en backend:", error);
    res.status(500).json({ error: "Error al generar recetas: " + error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend (Gemini 3.6 Flash) activo en http://localhost:${PORT}`);
});