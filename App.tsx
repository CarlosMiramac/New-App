import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

import LoginScreen from "./app/LoginScreen";
import RegisterScreen from "./app/register";
import Home from "./app/Home";            // ← apuntamos a Home.tsx

import { supabase } from "./src/supabaseClient";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user || null);
      }
    );
    return () => sub?.subscription.unsubscribe();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="home" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
