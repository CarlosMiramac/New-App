import { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import LoginScreen from "./LoginScreen";

export default function SplashScreen() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogin(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showLogin) {
    return <LoginScreen />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../src/assets/images/logo.png")}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
