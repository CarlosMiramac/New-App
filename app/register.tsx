import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { supabase } from "../src/supabaseClient";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !fullName || !phone) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } }
    });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Registro exitoso", "Ahora puedes iniciar sesión");
      router.replace("/");  // vuelve al login
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Nombre completo" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="Teléfono" value={phone} onChangeText={setPhone} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Volver al login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#F0F0F0" },
  title: { fontSize:24, fontWeight:"bold", marginBottom:20 },
  input: { width:"80%", padding:10, marginVertical:10, backgroundColor:"white", borderRadius:5, borderWidth:1, borderColor:"#ccc" },
  button: { marginTop:20, backgroundColor:"#007bff", padding:10, borderRadius:5, width:"80%", alignItems:"center" },
  buttonText: { color:"white", fontSize:14, fontWeight:"bold" },
  link: { marginTop:10, color:"blue", textDecorationLine:"underline" }
});
