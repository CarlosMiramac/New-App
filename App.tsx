import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native"; // Asegúrate de importar Text desde react-native
import LoginScreen from "./src/layouts/LoginScreen"; 
import RegisterScreen from "./src/layouts/RegisterScreen";
import HomeScreen from "./src/layouts/HomeScreen";
import { supabase } from "./src/supabaseClient"; 
import { AuthChangeEvent, Session, Subscription } from "@supabase/supabase-js";

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = React.useState<Session["user"] | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data?.session;
      setUser(session?.user || null);
      setLoading(false);
    };

    fetchSession();

    // Escuchar los cambios de estado de la autenticación
    const authListener = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user || null);
      }
    );

    // Limpiar la suscripción cuando el componente se desmonte
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  // Mostrar un indicador de carga mientras se verifica el estado de la sesión
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        {/* Pantallas de Login y Registro, si el usuario no está autenticado */}
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Pantalla de Home, si el usuario está autenticado
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


