import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Image, ActivityIndicator } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import { Text, Button, Card } from "@ui-kitten/components";

const Header = (props: any) => (
    <View {...props} style={{ alignItems: "center" }}>
        <Image
            style={{ height: 100, width: 200, marginBottom: 20, marginTop: 20 }}
            source={require("../assets/credimart.png")}
        />
    </View>
);

export const HomeScreen = ({ route, navigation }) => {
    const currentUser = route.params.userData;
    const [isLoadingLogOut, setIsLoadingLogOut] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    function logOut() {
        setIsLoadingLogOut(true);
        AsyncStorage.removeItem("@current_user").then(() => {
            setIsLoadingLogOut(false);
            if (route.params.setIsSignedIn) {
                route.params.setIsSignedIn(false);
            }
        });
    }

    useEffect(() => {
        if (isLoadingForm == true) {
            navigation.navigate("Form");
            setIsLoadingForm(false);
        }
    }, [isLoadingForm]);

    const Footer = (props: any) => {
        return (
            <View {...props} style={[props.style, styles.footerContainer]}>
                {isLoadingForm && (
                    <>
                        <ActivityIndicator size="large" color="green" />
                        <Text style={{ textAlign: "center" }} status="success" category="label">
                            Preparando nuevo formulario...
                        </Text>
                    </>
                )}
                {!isLoadingForm && (
                    <Button
                        status="success"
                        style={styles.footerControl}
                        appearance="outline"
                        onPress={() => {
                            setIsLoadingForm(true);
                        }}
                        size="small"
                    >
                        NUEVA SOLICITUD DE PRÉSTAMO
                    </Button>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Card
                appearance="filled"
                disabled={true}
                style={styles.card}
                header={Header}
                footer={Footer}
            >
                <Text category="h6" style={{ marginBottom: 10, textAlign: "center" }}>
                    Bienvenido al Sistema.{"\n"}
                    {currentUser && currentUser.realname && (
                        <Text category="s1">
                            Estás logueado como{" "}
                            <Text category="s1" style={{ fontWeight: "bold" }}>
                                {currentUser.realname}
                            </Text>
                            .
                        </Text>
                    )}
                </Text>
                {isLoadingLogOut && <ActivityIndicator size="large" color="#FAA8B6" />}
                <Text style={{ alignSelf: "center" }}>
                    {currentUser && currentUser.realname && !isLoadingLogOut && (
                        <Button
                            onPress={() => {
                                logOut();
                            }}
                            status="danger"
                            appearance="ghost"
                        >
                            SALIR DE LA CUENTA
                        </Button>
                    )}
                </Text>
            </Card>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "white",
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
    card: {},
    footerContainer: {
        justifyContent: "flex-end",
    },
    footerControl: {
        marginHorizontal: 2,
    },
});
