import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";
import { HomeScreen, FormScreen, LoginScreen } from "./screens";
import * as SplashScreen from "expo-splash-screen";

const HomeNavigator = () => {
    const { Navigator, Screen } = createStackNavigator();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [appIsReady, setAppIsReady] = useState(false);

    function loginUser() {
        AsyncStorage.getItem("@current_user")
            .then((JSONCurrentUser: string | null) => {
                if (JSONCurrentUser) {
                    setCurrentUser(JSON.parse(JSONCurrentUser));
                    setIsSignedIn(true);
                }
                setAppIsReady(true);
            })
            .catch(() => {
                setIsSignedIn(false);
                setAppIsReady(true);
            });
    }

    useEffect(() => {
        SplashScreen.hideAsync();
    }, [appIsReady]);

    useEffect(() => {
        if (isSignedIn == false) {
            loginUser();
        }
    }, []);

    return (
        <Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#26A81F",
                },
                headerTitleStyle: {
                    fontSize: 17,
                },
                headerTintColor: "#fff",
                headerTitleAlign: "center",
            }}
        >
            {isSignedIn ? (
                <>
                    <Screen
                        name="Home"
                        initialParams={{
                            userData: currentUser,
                            setIsSignedIn: setIsSignedIn,
                            setCurrentUser: setCurrentUser,
                        }}
                        component={HomeScreen}
                        options={{
                            title: "Credimart",
                        }}
                    />
                    <Screen
                        name="Form"
                        component={FormScreen}
                        options={{
                            title: "Solicitud de Préstamo",
                        }}
                    />
                </>
            ) : (
                <>
                    <Screen
                        name="Login"
                        initialParams={{
                            setIsSignedIn: setIsSignedIn,
                            setCurrentUser: setCurrentUser,
                        }}
                        component={LoginScreen}
                        options={{
                            title: "Autenticarse",
                        }}
                    />
                </>
            )}
        </Navigator>
    );
};

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <HomeNavigator />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        opacity: 0,
        height: 0,
    },
});
