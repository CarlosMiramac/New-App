import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../src/supabaseClient"; // Ajusta la ruta según tu estructura
import { Alert } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      Alert.alert("Error de inicio de sesión", error.message);
      return;
    }
  
    if (data.user) {
      router.replace("/Home");
    } else {
      Alert.alert("Error", "No se pudo iniciar sesión");
    }
  };

  const handleRegisterNavigation = () => {
    router.push("/register"); // Sin extensión, en minúsculas
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 12, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 12, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />

      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "blue", padding: 12, borderRadius: 5 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegisterNavigation} style={{ marginTop: 20 }}>
        <Text style={{ color: "blue", textAlign: "center" }}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

