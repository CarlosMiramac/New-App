import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { supabase } from "../supabaseClient"; 
import { Subscription } from "@supabase/supabase-js"; // 👈 Importamos tipos correctos

const HomeScreen = ({ navigation }: any) => {
  useEffect(() => {
    let authListener: Subscription | null = null;

    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;

      if (!user) {
        navigation.replace("Login");
      }

      authListener = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (!session) {
            navigation.replace("Login");
          }
        }
      ).data.subscription;
    };

    checkUser();

    return () => {
      authListener?.unsubscribe();
    };
  }, [navigation]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la Home Screen</Text>
      <Text style={styles.welcomeMessage}>
        ¡Estás autenticado y listo para continuar!
      </Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  welcomeMessage: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default HomeScreen;

