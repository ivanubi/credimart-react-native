import React, { Component } from "react";
import { StatusBar } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as SplashScreen from "expo-splash-screen";

import { AppNavigator } from "./AppNavigator";
import { default as theme } from "./theme.json";

export default class App extends Component {
    async componentDidMount() {
        try {
            await SplashScreen.preventAutoHideAsync();
        } catch (e) {
            console.warn(e);
        }
    }

    render() {
        return (
            <>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                    <StatusBar
                        animated={false}
                        backgroundColor="#085E18"
                        barStyle="light-content"
                    />
                    <AppNavigator />
                </ApplicationProvider>
            </>
        );
    }
}
