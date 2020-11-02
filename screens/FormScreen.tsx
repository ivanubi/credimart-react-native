import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
    ClientFormScreen,
    ConditionsFormScreen,
    GuarantorFormScreen,
    WorkFormScreen,
    GuaranteeFormScreen,
    DEFAULT_FORM_DATA,
} from "./form";

const TopNavigator = () => {
    const { Navigator, Screen } = createMaterialTopTabNavigator();
    const [data, setData] = useState(DEFAULT_FORM_DATA);
    const [photoData, setPhotoData] = useState({});

    useEffect(() => {
        setData(DEFAULT_FORM_DATA);
        setPhotoData({});
    }, []);

    return (
        <Navigator
            tabBarOptions={{
                labelStyle: styles.navigatorLabel,
                tabStyle: styles.navigatorTab,
                scrollEnabled: true,
                indicatorStyle: { backgroundColor: "green" },
            }}
            initialRouteName="Cliente"
            backBehavior="order"
            initialLayout={{ width: Dimensions.get("window").width }}
            lazy={true}
            lazyPreloadDistance={1}
        >
            <Screen
                initialParams={{
                    stateData: [data, setData],
                    statePhotoData: [photoData, setPhotoData],
                }}
                name="Cliente"
                component={ClientFormScreen}
            />
            <Screen
                initialParams={{
                    stateData: [data, setData],
                    statePhotoData: [photoData, setPhotoData],
                }}
                name="Condiciones"
                component={ConditionsFormScreen}
            />
            <Screen
                initialParams={{
                    stateData: [data, setData],
                    statePhotoData: [photoData, setPhotoData],
                }}
                name="Garante"
                component={GuarantorFormScreen}
            />
            <Screen
                initialParams={{
                    stateData: [data, setData],
                    statePhotoData: [photoData, setPhotoData],
                }}
                name="Empresa"
                component={WorkFormScreen}
            />
            <Screen
                initialParams={{
                    stateData: [data, setData],
                    statePhotoData: [photoData, setPhotoData],
                }}
                name="Garantía"
                component={GuaranteeFormScreen}
            />
        </Navigator>
    );
};

export const FormScreen = ({ route, navigation }) => {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <TopNavigator></TopNavigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
    },
    navigatorLabel: {
        fontSize: 10.5,
        margin: 0,
        padding: 0,
    },
    navigatorTab: {
        width: "auto",
    },
    safeAreaView: {
        flex: 1,
    },
    view: {
        overflow: "hidden",
        paddingBottom: 3,
        backgroundColor: "#fff",
    },
    topNavigation: {
        backgroundColor: "#26A81F",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});
