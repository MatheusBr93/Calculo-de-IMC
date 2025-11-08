import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
} from "react-native";
import { db, serverTime } from "./firebase";

// Regras da calculadora (classificação IMC)
function classificarIMC(imc) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 24.9) return "Peso normal";
  if (imc < 29.9) return "Sobrepeso";
  if (imc < 34.9) return "Obesidade grau I";
  if (imc < 39.9) return "Obesidade grau II";
  return "Obesidade grau III";
}

function formatarData(ts) {
  if (!ts) return "";
  const d = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
  return d.toLocaleString("pt-BR");
}

export default function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState(""); // cm
  const [mensagem, setMensagem] = useState("");
  const [imcMessage, setImcMessage] = useState("");
  const [historico, setHistorico] = useState([]);
  const [salvando, setSalvando] = useState(false);

  // Cálculo do IMC
  const imcCalculado = useMemo(() => {
    const p = parseFloat(String(peso).replace(",", "."));
    const aCm = parseFloat(String(altura).replace(",", "."));
    if (!p || !aCm) return null;
    const a = aCm / 100;
    if (!a || a <= 0) return null;
    const imc = p / (a * a);
    return isFinite(imc) ? imc : null;
  }, [peso, altura]);

  async function calcularIMC() {
    if (!peso || !altura) {
      Alert.alert("Atenção", "Preencha peso e altura.");
      return;
    }
    if (!imcCalculado) {
      Alert.alert("Atenção", "Valores inválidos.");
      return;
    }

    const imc = Number(imcCalculado.toFixed(2));
    const classificacao = classificarIMC(imc);

    setMensagem(classificacao);
    setImcMessage(`Seu IMC é: ${imc.toFixed(2)}`);

    try {
      setSalvando(true);
      await db.collection("imc").add({
        peso: Number(String(peso).replace(",", ".")),
        alturaCm: Number(String(altura).replace(",", ".")),
        imc,
        classificacao,
        createdAt: serverTime(),
      });
      Keyboard.dismiss();
    } catch (e) {
      console.log(e);
      Alert.alert("Erro ao salvar", "Não foi possível registrar no Firebase.");
    } finally {
      setSalvando(false);
    }
  }

  // Histórico em tempo real
  useEffect(() => {
    const unsub = db
      .collection("imc")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snap) => {
          const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setHistorico(rows);
        },
        (err) => {
          console.log(err);
          Alert.alert("Erro", "Falha ao carregar histórico.");
        }
      );
    return () => unsub && unsub();
  }, []);

  async function apagarRegistro(id) {
    try {
      await db.collection("imc").doc(id).delete();
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Não foi possível apagar o registro.");
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/12130/12130864.png" }}
      />
      <Text style={styles.title}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg) — ex.: 72.5"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (cm) — ex.: 175"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <Button title={salvando ? "Salvando..." : "Calcular"} onPress={calcularIMC} disabled={salvando} />

      {!!mensagem && <Text style={styles.result}>{mensagem}</Text>}
      {!!imcMessage && <Text style={styles.result}>{imcMessage}</Text>}

      <Text style={styles.subtitle}>Histórico</Text>

      <FlatList
        data={historico}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.item}>
                IMC: {item?.imc} — {item?.classificacao}
              </Text>
              <Text style={styles.data}>
                {formatarData(item?.createdAt)} | Peso: {item?.peso} kg | Altura: {item?.alturaCm} cm
              </Text>
            </View>
            <TouchableOpacity style={styles.btnDelete} onPress={() => apagarRegistro(item.id)}>
              <Text style={styles.btnText}>Apagar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#444", marginTop: 10 }}>Nenhum cálculo salvo ainda.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#caddfc" },
  image: { width: 96, height: 96, alignSelf: "center", marginBottom: 12 },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 12 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  result: { textAlign: "center", fontSize: 16, fontWeight: "700", marginTop: 8 },
  subtitle: { fontSize: 18, fontWeight: "700", marginTop: 20, marginBottom: 8 },
  sep: { height: 1, backgroundColor: "#e5e5e5", marginVertical: 8 },
  row: { flexDirection: "row", alignItems: "center" },
  item: { fontSize: 16, fontWeight: "600" },
  data: { fontSize: 12, color: "#444" },
  btnDelete: { backgroundColor: "#ffdddd", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  btnText: { color: "#900", fontWeight: "700" },
});
