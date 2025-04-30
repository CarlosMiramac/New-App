import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../src/supabaseClient";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");  // regresa al login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la App 🏍️!</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#f7f7f7" },
  title: { fontSize:24, fontWeight:"bold", marginBottom:30 },
  button: { backgroundColor:"#ff5c5c", padding:12, borderRadius:8, width:"80%", alignItems:"center" },
  buttonText: { color:"white", fontWeight:"bold" }
});
