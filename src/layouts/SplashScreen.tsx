import { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import LoginScreen from "./LoginScreen";

export default function SplashScreen(){
    const [ showLogin, setShowLogin]= useState(false);

    useEffect(()=> {
        const timer = setTimeout(()=> {
            setShowLogin(true);
        }, 3000); //3seconds
        return ()=>clearTimeout(timer);
    }, []);
    if(showLogin){
        return <LoginScreen/>;
    }
    return(
        <View>
            <Image source={require("../assets/images/logo.png")} />
        </View>
    );
}