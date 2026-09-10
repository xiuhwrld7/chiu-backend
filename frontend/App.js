import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";

export default function App() {
  // Navegación
  const [pantallaActual, setPantallaActual] = useState("inicio"); 
  const [categoriaPrincipal, setCategoriaPrincipal] = useState(""); 
  
  // Nuevo: Sub-menú para saber qué comida del día es
  const [subCategoriaComida, setSubCategoriaComida] = useState("comida"); 

  // Ingredientes
  const [ingrediente, setIngrediente] = useState("");
  const [listaIngredientes, setListaIngredientes] = useState([]);
  
  // Porciones (Ahora con opción personalizada)
  const [porciones, setPorciones] = useState(2);
  const [esPorcionPersonalizada, setEsPorcionPersonalizada] = useState(false);
  const [porcionTexto, setPorcionTexto] = useState("");

  const [recetas, setRecetas] = useState([]);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [errorTexto, setErrorTexto] = useState("");
  const [accionesCompletadas, setAccionesCompletadas] = useState({});
  const [intento, setIntento] = useState(1);

  const irAIngredientes = (categoria) => {
    setCategoriaPrincipal(categoria);
    setListaIngredientes([]);
    setPantallaActual("preparacion");
  };

  const volverAlInicio = () => {
    setPantallaActual("inicio");
    setRecetas([]);
    setListaIngredientes([]);
  };

  const agregarIngrediente = () => {
    if (ingrediente.trim() !== "") {
      setListaIngredientes([...listaIngredientes, ingrediente.trim().toLowerCase()]);
      setIngrediente("");
      setErrorTexto("");
    }
  };

  const eliminarIngrediente = (index) => {
    setListaIngredientes(listaIngredientes.filter((_, i) => i !== index));
  };

  const toggleAccion = (clave) => {
    setAccionesCompletadas((prev) => ({ ...prev, [clave]: !prev[clave] }));
  };

  const cargarRecetasBase = async (intentoActual) => {
    if (listaIngredientes.length === 0) {
      setErrorTexto("Agrega al menos un ingrediente para comenzar.");
      return;
    }

    // Calculamos el número final de porciones
    let porcionesFinales = porciones;
    if (esPorcionPersonalizada) {
      const numParsed = parseInt(porcionTexto);
      porcionesFinales = isNaN(numParsed) || numParsed < 1 ? 1 : numParsed;
    }

    // Calculamos si enviaremos "comida", "desayuno", "postre", etc.
    const momentoFinal = categoriaPrincipal === "comida" ? subCategoriaComida : categoriaPrincipal;

    setCargando(true);
    setErrorTexto("");
    setRecetas([]);
    setRecetaSeleccionada(0);
    setAccionesCompletadas({});
    setPantallaActual("resultados");

try {
      const response = await fetch("https://chiu-backend-1400.onrender.com/api/recetas", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ingredientes: listaIngredientes,
          porciones: porcionesFinales,
          momento: momentoFinal,
          intento: intentoActual
        }),
      });
      
      const data = await response.json();

      if (response.ok && data.recetas && data.recetas.length > 0) {
        setRecetas(data.recetas);
      } else {
        setErrorTexto(data.error || "No se pudieron obtener recetas.");
        setPantallaActual("preparacion");
      }
    } catch (err) {
      setErrorTexto("No se pudo conectar con el servidor backend.");
      setPantallaActual("preparacion");
    } finally {
      setCargando(false);
    }
  };

  const obtenerRecetasNuevas = () => {
    setIntento(1);
    cargarRecetasBase(1);
  };

  const generarMasOpciones = () => {
    const siguienteIntento = intento + 1;
    setIntento(siguienteIntento);
    cargarRecetasBase(siguienteIntento);
  };

  const recetaActual = recetas[recetaSeleccionada];

  // ================= PANTALLAS =================

  // 1. PANTALLA DE INICIO
  if (pantallaActual === "inicio") {
    return (
      <View style={styles.scrollWrapper}>
        <View style={styles.cardContainerInicio}>
          <Text style={styles.iconoGigante}>👨‍🍳</Text>
          <Text style={styles.tituloBienvenida}>Aprende a cocinar con Chiu</Text>
          <Text style={styles.subtituloBienvenida}>
            Selecciona qué te gustaría preparar hoy y yo me encargo de darte las mejores recetas con lo que tengas en casa.
          </Text>

          <View style={styles.cajaCategoriasNuevas}>
            <TouchableOpacity style={styles.btnCategoriaGigante} onPress={() => irAIngredientes("comida")}>
              <Text style={styles.emojiCategoria}>🍲</Text>
              <Text style={styles.txtCategoriaGigante}>Platillos y Comidas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnCategoriaGigante} onPress={() => irAIngredientes("postre")}>
              <Text style={styles.emojiCategoria}>🍰</Text>
              <Text style={styles.txtCategoriaGigante}>Postres Deliciosos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnCategoriaGigante} onPress={() => irAIngredientes("bebidas")}>
              <Text style={styles.emojiCategoria}>🍹</Text>
              <Text style={styles.txtCategoriaGigante}>Bebidas y Batidos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // 2. PANTALLA DE PREPARACIÓN
  if (pantallaActual === "preparacion") {
    return (
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <View style={styles.cardContainer}>
          
          <TouchableOpacity style={styles.btnVolver} onPress={volverAlInicio}>
            <Text style={styles.txtBtnVolver}>← Volver al inicio</Text>
          </TouchableOpacity>

          <View style={styles.headerNavegacion}>
            <Text style={styles.tituloAppNavegacion}>
              Preparando {categoriaPrincipal === "comida" ? "Comida 🍲" : categoriaPrincipal === "postre" ? "Postres 🍰" : "Bebidas 🍹"}
            </Text>
            {/* Se eliminó el subtítulo raro que no cuadraba */}
          </View>

          {/* NUEVO: Submenú de momentos del día (solo aparece si eligió "Comida") */}
          {categoriaPrincipal === "comida" && (
            <View style={styles.seccionCard}>
              <Text style={styles.etiquetaSeccion}>¿Para qué momento del día es?</Text>
              <View style={styles.selectorGrid}>
                {[
                  { id: "desayuno", label: "Desayuno" },
                  { id: "almuerzo", label: "Almuerzo" },
                  { id: "comida", label: "Comida" },
                  { id: "merienda", label: "Merienda" },
                  { id: "cena", label: "Cena" },
                ].map((m) => (
                  <TouchableOpacity
                    key={m.id}
                    style={[styles.btnGrid, subCategoriaComida === m.id && styles.btnGridActivo]}
                    onPress={() => setSubCategoriaComida(m.id)}
                  >
                    <Text style={[styles.txtGrid, subCategoriaComida === m.id && styles.txtGridActivo]}>{m.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* MEJORADO: Porciones con opción personalizada */}
          <View style={styles.seccionCard}>
            <Text style={styles.etiquetaSeccion}>¿Para cuántas personas vas a cocinar?</Text>
            <View style={styles.selectorGrid}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[styles.btnGrid, !esPorcionPersonalizada && porciones === num && styles.btnGridActivo]}
                  onPress={() => {
                    setPorciones(num);
                    setEsPorcionPersonalizada(false);
                  }}
                >
                  <Text style={[styles.txtGrid, !esPorcionPersonalizada && porciones === num && styles.txtGridActivo]}>{num}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.btnGrid, esPorcionPersonalizada && styles.btnGridActivo]}
                onPress={() => setEsPorcionPersonalizada(true)}
              >
                <Text style={[styles.txtGrid, esPorcionPersonalizada && styles.txtGridActivo]}>Más...</Text>
              </TouchableOpacity>
            </View>
            
            {esPorcionPersonalizada && (
              <TextInput
                style={styles.inputPersonalizado}
                placeholder="Escribe para cuántas personas deseas preparar..."
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={porcionTexto}
                onChangeText={setPorcionTexto}
              />
            )}
          </View>

          {/* MEJORADO: Instrucción reubicada */}
          <View style={styles.seccionCard}>
            <Text style={styles.etiquetaSeccion}>Ingredientes Disponibles</Text>
            <Text style={styles.instruccionIngredientes}>Anota aquí todo lo que tengas en tu cocina:</Text>
            <View style={styles.cajaInput}>
              <TextInput
                style={styles.inputIngrediente}
                placeholder="Ejemplo: Manzana, leche, canela..."
                placeholderTextColor="#94A3B8"
                value={ingrediente}
                onChangeText={setIngrediente}
                onSubmitEditing={agregarIngrediente}
              />
              <TouchableOpacity style={styles.btnMas} onPress={agregarIngrediente}>
                <Text style={styles.txtBtnMas}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contenedorChips}>
              {listaIngredientes.map((item, idx) => (
                <TouchableOpacity key={idx} style={styles.chip} onPress={() => eliminarIngrediente(idx)}>
                  <Text style={styles.chipTexto}>{item}</Text>
                  <View style={styles.chipCruzCirculo}><Text style={styles.chipCruz}>✕</Text></View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

{/* NUEVO: Aviso si hay más de 3 ingredientes */}
          {listaIngredientes.length > 3 && !cargando && (
            <View style={styles.cajaAvisoDemora}>
              <Text style={styles.txtAvisoDemora}>
                ⏳ Al usar varios ingredientes, el Chef Chiu necesita pensar un poco más para crear la receta perfecta. ¡Puede demorar unos segundos extra!
              </Text>
            </View>
          )}

          {/* Tu botón existente */}
          <TouchableOpacity
            style={[styles.btnCocinar, cargando && styles.btnCocinarDeshabilitado]}
            onPress={obtenerRecetasNuevas}
            disabled={cargando}
          >
            {cargando ? (
              <View style={styles.filaCarga}>
                <ActivityIndicator color="#FFFFFF" />
                <Text style={styles.txtCarga}>Creando magia en la cocina...</Text>
              </View>
            ) : (
              <Text style={styles.txtBtnCocinar}>✨ Generar mis recetas</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // 3. PANTALLA DE RESULTADOS
  return (
    <ScrollView contentContainerStyle={styles.scrollWrapper}>
      <View style={styles.cardContainer}>
        
        <TouchableOpacity style={styles.btnVolver} onPress={() => setPantallaActual("preparacion")}>
          <Text style={styles.txtBtnVolver}>← Modificar ingredientes</Text>
        </TouchableOpacity>

        {cargando && (
          <View style={styles.pantallaCargaAbsoluta}>
             <ActivityIndicator size="large" color="#3B82F6" />
             <Text style={styles.textoCargandoFuerte}>Generando opciones frescas...</Text>
          </View>
        )}

        {!cargando && recetas.length > 0 && (
          <View style={styles.contenedorPestanas}>
            <Text style={styles.tituloOpciones}>
              Opciones de {categoriaPrincipal.toUpperCase()}:
            </Text>
            
            <View style={styles.filaPestanas}>
              {recetas.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.btnPestana, recetaSeleccionada === index && styles.btnPestanaActiva]}
                  onPress={() => {
                    setRecetaSeleccionada(index);
                    setAccionesCompletadas({});
                  }}
                >
                  <Text style={[styles.txtPestana, recetaSeleccionada === index && styles.txtPestanaActiva]}>
                    Opción {index + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.btnGenerarMas} onPress={generarMasOpciones} disabled={cargando}>
               <Text style={styles.txtBtnGenerarMas}>🔄 Mostrar otras 4 opciones distintas</Text>
            </TouchableOpacity>
          </View>
        )}

        {!cargando && recetaActual && (
          <View style={styles.recetaCard}>
            {recetaActual.imagenUrl && (
              <View>
                <Image source={{ uri: recetaActual.imagenUrl }} style={styles.imagenReceta} resizeMode="cover" />
                <View style={styles.cajaAvisoIA}>
                  <Text style={styles.txtAvisoIA}>
                    📸 Aviso conceptual: Esta imagen es generada por IA para ilustrar la idea. Busca "{recetaActual.titulo}" en tu navegador para ver referencias reales.
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.recetaCuerpo}>
              <View style={styles.badgeCategoria}>
                <Text style={styles.txtBadgeCategoria}>{recetaActual.categoria}</Text>
              </View>
              <Text style={styles.recetaTitulo}>{recetaActual.titulo}</Text>
              <Text style={styles.recetaDescripcion}>{recetaActual.descripcion}</Text>

              <View style={styles.filaMetadatos}>
                <View style={styles.itemMeta}><Text style={styles.labelMeta}>TIEMPO</Text><Text style={styles.valorMeta}>⏱️ {recetaActual.tiempo}</Text></View>
                <View style={styles.itemMeta}>
                  <Text style={styles.labelMeta}>TIPO</Text>
                  <Text style={styles.valorMeta}>🍽️ {esPorcionPersonalizada ? porcionTexto : porciones} pax</Text>
                </View>
                <View style={styles.itemMeta}><Text style={styles.labelMeta}>DIFICULTAD</Text><Text style={styles.valorMeta}>👍 {recetaActual.dificultad}</Text></View>
              </View>

              {recetaActual.tipCasero && (
                <View style={styles.cajaTip}>
                  <Text style={styles.tituloTip}>💡 Tip de Chiu</Text>
                  <Text style={styles.textoTip}>{recetaActual.tipCasero}</Text>
                </View>
              )}

              <View style={styles.bloqueReceta}>
                <Text style={styles.subtituloReceta}>🛒 Ingredientes Exactos:</Text>
                <View style={styles.cajaIngredientesLista}>
                  {recetaActual.ingredientesDetalle?.map((det, i) => (
                    <Text key={i} style={styles.renglonIngrediente}>• {det}</Text>
                  ))}
                </View>
              </View>

              <View style={styles.bloqueReceta}>
                <Text style={styles.subtituloReceta}>📋 Procedimiento Detallado</Text>
                {recetaActual.pasos?.map((faseItem, faseIdx) => (
                  <View key={faseIdx} style={styles.faseBloque}>
                    <View style={styles.faseCabecera}>
                      <View style={styles.puntoFase} />
                      <Text style={styles.faseTitulo}>{faseItem.fase}</Text>
                    </View>
                    <View style={styles.listaAcciones}>
                      {faseItem.acciones?.map((accionTexto, accionIdx) => {
                        const clave = `${faseIdx}-${accionIdx}`;
                        const hecha = accionesCompletadas[clave];
                        return (
                          <TouchableOpacity key={accionIdx} style={[styles.itemAccionVineta, hecha && styles.itemAccionVinetaHecha]} onPress={() => toggleAccion(clave)} activeOpacity={0.7}>
                            <View style={[styles.checkboxCircular, hecha && styles.checkboxCircularHecho]}>
                              {hecha && <Text style={styles.checkIcono}>✓</Text>}
                            </View>
                            <Text style={[styles.textoAccion, hecha && styles.textoAccionTachada]}>{accionTexto}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cajaAvisoDemora: { backgroundColor: "#FFFBEB", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#FDE68A", marginBottom: 16 },
  txtAvisoDemora: { color: "#D97706", fontSize: 13, fontWeight: "600", textAlign: "center", lineHeight: 18 },
  scrollWrapper: { backgroundColor: "#F8FAFC", minHeight: "100%", paddingVertical: 32, paddingHorizontal: 16, alignItems: "center" },
  cardContainer: { maxWidth: 600, width: "100%" },
  
  cardContainerInicio: { maxWidth: 600, width: "100%", alignItems: "center", paddingTop: 40 },
  iconoGigante: { fontSize: 72, marginBottom: 16 },
  tituloBienvenida: { fontSize: 32, fontWeight: "900", color: "#0F172A", textAlign: "center", marginBottom: 12 },
  subtituloBienvenida: { fontSize: 16, color: "#475569", textAlign: "center", lineHeight: 24, paddingHorizontal: 20, marginBottom: 40 },
  cajaCategoriasNuevas: { width: "100%", gap: 16 },
  btnCategoriaGigante: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", padding: 20, borderRadius: 20, borderWidth: 2, borderColor: "#E2E8F0", shadowColor: "#0F172A", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 },
  emojiCategoria: { fontSize: 36, marginRight: 20 },
  txtCategoriaGigante: { fontSize: 20, fontWeight: "800", color: "#1E293B" },

  btnVolver: { alignSelf: "flex-start", marginBottom: 20, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#E2E8F0", borderRadius: 8 },
  txtBtnVolver: { color: "#475569", fontWeight: "700", fontSize: 14 },
  headerNavegacion: { marginBottom: 24 },
  tituloAppNavegacion: { fontSize: 26, fontWeight: "800", color: "#0F172A" },

  seccionCard: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: "#E2E8F0" },
  etiquetaSeccion: { fontSize: 13, fontWeight: "700", color: "#334155", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 },
  
  // Nuevo estilo para la instrucción natural de los ingredientes
  instruccionIngredientes: { fontSize: 13, color: "#64748B", marginBottom: 12 },

  selectorGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  btnGrid: { flex: 1, minWidth: "13%", paddingVertical: 10, paddingHorizontal: 8, borderRadius: 10, backgroundColor: "#F8FAFC", borderWidth: 1.5, borderColor: "#E2E8F0", alignItems: "center" },
  btnGridActivo: { backgroundColor: "#EFF6FF", borderColor: "#3B82F6" },
  txtGrid: { fontSize: 13, fontWeight: "600", color: "#64748B" },
  txtGridActivo: { color: "#2563EB", fontWeight: "800" },
  
  // Nuevo estilo para el cuadro de texto de "Más personas"
  inputPersonalizado: { marginTop: 12, backgroundColor: "#F8FAFC", borderRadius: 10, borderWidth: 1, borderColor: "#CBD5E1", paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: "#0F172A" },

  cajaInput: { flexDirection: "row", backgroundColor: "#F8FAFC", borderRadius: 12, borderWidth: 1, borderColor: "#CBD5E1", padding: 4 },
  inputIngrediente: { flex: 1, paddingHorizontal: 12, fontSize: 13.5, color: "#0F172A" },
  btnMas: { backgroundColor: "#3B82F6", width: 40, height: 40, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  txtBtnMas: { color: "#FFFFFF", fontSize: 22, fontWeight: "bold", lineHeight: 24 },
  contenedorChips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  chip: { flexDirection: "row", alignItems: "center", backgroundColor: "#F1F5F9", borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1, borderColor: "#E2E8F0" },
  chipTexto: { fontSize: 13, fontWeight: "600", color: "#334155", marginRight: 6, textTransform: "capitalize" },
  chipCruzCirculo: { width: 16, height: 16, borderRadius: 8, backgroundColor: "#CBD5E1", justifyContent: "center", alignItems: "center" },
  chipCruz: { fontSize: 10, fontWeight: "800", color: "#475569" },
  
  cajaAlerta: { backgroundColor: "#FEF2F2", borderRadius: 12, padding: 12, marginBottom: 14, borderLeftWidth: 4, borderLeftColor: "#EF4444" },
  txtAlerta: { color: "#B91C1C", fontSize: 13, fontWeight: "600", lineHeight: 18 },
  
  btnCocinar: { backgroundColor: "#10B981", paddingVertical: 14, borderRadius: 14, alignItems: "center", marginBottom: 20 },
  btnCocinarDeshabilitado: { opacity: 0.65 },
  txtBtnCocinar: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  filaCarga: { flexDirection: "row", alignItems: "center", gap: 10 },
  txtCarga: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  
  pantallaCargaAbsoluta: { padding: 40, alignItems: "center" },
  textoCargandoFuerte: { marginTop: 16, fontSize: 16, fontWeight: "700", color: "#3B82F6" },

  contenedorPestanas: { marginBottom: 16 },
  tituloOpciones: { fontSize: 13, fontWeight: "700", color: "#475569", marginBottom: 8, textAlign: "center", textTransform: "uppercase" },
  filaPestanas: { flexDirection: "row", gap: 6 },
  btnPestana: { flex: 1, paddingVertical: 10, backgroundColor: "#E2E8F0", borderRadius: 10, alignItems: "center" },
  btnPestanaActiva: { backgroundColor: "#3B82F6" },
  txtPestana: { fontSize: 12, fontWeight: "700", color: "#475569" },
  txtPestanaActiva: { color: "#FFFFFF" },
  
  btnGenerarMas: { backgroundColor: "#F8FAFC", borderWidth: 2, borderColor: "#CBD5E1", paddingVertical: 12, borderRadius: 10, alignItems: "center", marginTop: 14 },
  txtBtnGenerarMas: { color: "#475569", fontSize: 13.5, fontWeight: "800" },

  recetaCard: { backgroundColor: "#FFFFFF", borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "#E2E8F0", marginBottom: 40, shadowColor: "#0F172A", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  imagenReceta: { width: "100%", height: 240, backgroundColor: "#E2E8F0" },
  cajaAvisoIA: { backgroundColor: "#F8FAFC", paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#E2E8F0" },
  txtAvisoIA: { fontSize: 11, color: "#64748B", fontStyle: "italic", textAlign: "justify", lineHeight: 16 },
  recetaCuerpo: { padding: 20 },
  badgeCategoria: { alignSelf: "flex-start", backgroundColor: "#FEF3C7", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 8 },
  txtBadgeCategoria: { fontSize: 10, fontWeight: "800", color: "#B45309", letterSpacing: 0.5 },
  recetaTitulo: { fontSize: 22, fontWeight: "800", color: "#0F172A", marginBottom: 4 },
  recetaDescripcion: { fontSize: 14, lineHeight: 21, color: "#64748B", marginBottom: 16 },
  filaMetadatos: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#F8FAFC", borderRadius: 12, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: "#E2E8F0" },
  itemMeta: { alignItems: "center", flex: 1 },
  labelMeta: { fontSize: 10, fontWeight: "800", color: "#94A3B8", letterSpacing: 0.5 },
  valorMeta: { fontSize: 13, fontWeight: "700", color: "#1E293B", marginTop: 2 },
  cajaTip: { backgroundColor: "#EFF6FF", borderRadius: 12, padding: 14, marginBottom: 18, borderLeftWidth: 4, borderLeftColor: "#3B82F6" },
  tituloTip: { fontSize: 13, fontWeight: "800", color: "#1E3A8A", marginBottom: 3 },
  textoTip: { fontSize: 13, lineHeight: 19, color: "#1E40AF" },
  bloqueReceta: { marginBottom: 20 },
  subtituloReceta: { fontSize: 16, fontWeight: "800", color: "#0F172A", marginBottom: 10 },
  cajaIngredientesLista: { backgroundColor: "#F8FAFC", borderRadius: 12, padding: 12, borderWidth: 1, borderColor: "#E2E8F0" },
  renglonIngrediente: { fontSize: 13.5, color: "#334155", lineHeight: 24 },
  faseBloque: { marginBottom: 18 },
  faseCabecera: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  puntoFase: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6", marginRight: 8 },
  faseTitulo: { fontSize: 14.5, fontWeight: "800", color: "#1E293B" },
  listaAcciones: { paddingLeft: 4, gap: 8 },
  itemAccionVineta: { flexDirection: "row", alignItems: "flex-start", backgroundColor: "#F8FAFC", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 10, padding: 10 },
  itemAccionVinetaHecha: { backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" },
  checkboxCircular: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: "#CBD5E1", justifyContent: "center", alignItems: "center", marginRight: 10, marginTop: 2 },
  checkboxCircularHecho: { backgroundColor: "#10B981", borderColor: "#10B981" },
  checkIcono: { color: "#FFFFFF", fontSize: 10, fontWeight: "bold" },
  textoAccion: { flex: 1, fontSize: 13, lineHeight: 19, color: "#334155" },
  textoAccionTachada: { textDecorationLine: "line-through", color: "#94A3B8" }
});