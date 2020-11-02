import React, { useState, useRef } from "react";
import { SafeAreaView, View, StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";
import { Divider, Text, Input, Button } from "@ui-kitten/components";
import AsyncStorage from "@react-native-community/async-storage";
import { API_URL } from "../settings";

const config = {
    headers: {
        Accept: "*/*",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
        Connection: "keep-alive",
        "Content-Type": "json",
        Host: API_URL.replace("http://", ""),
        Origin: API_URL,
        Referer: API_URL,
        "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
    },
};

export const LoginScreen = ({ route, navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [connectionError, setConnectionError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    function _handleTransactionEnd(userData: {}) {
        route.params.setCurrentUser(userData);
        route.params.setIsSignedIn(true);
        setLoading(false);
    }

    function _handleLoginSubmit() {
        setLoading(true);
        _cleanErrors();
        const data = `{"Id":2,"Cmd":5,"SProc":"spLogin","U":"${username}","P":"${password}"}`;
        axios
            .post(API_URL, data, config)
            .then((response) => {
                if (response.data && response.data.length != 0) {
                    let currentUser = response.data[0];
                    const newData = {
                        user_id: currentUser.id,
                        username: currentUser.usuario,
                        password: currentUser.password,
                        realname: currentUser.nombreusuario,
                        state: currentUser.estado,
                        active: currentUser.activo,
                    };
                    AsyncStorage.setItem("@current_user", JSON.stringify(newData)).then(() => {
                        _handleTransactionEnd(newData);
                    });
                } else {
                    setLoading(false);
                    setLoginError(true);
                }
            })
            .catch((error) => {
                setLoading(false);
                setConnectionError(true);
            })
            .then(() => {
                setPassword("");
            });
    }

    function _cleanErrors() {
        setLoginError(false);
        setConnectionError(false);
    }

    const LoadingButton = (props: any) => <ActivityIndicator {...props}></ActivityIndicator>;

    const refPasswordInput = useRef(null);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Divider></Divider>
            <ScrollView style={styles.scrollView}>
                <View style={styles.mainView}>
                    <View style={styles.logoView}>
                        <Image style={styles.logo} source={require("../assets/credimart.png")} />
                    </View>
                    <Input
                        label="Usuario"
                        textContentType={"username"}
                        autoCorrect={false}
                        autoCapitalize={"none"}
                        autoCompleteType={"username"}
                        style={styles.input}
                        value={username}
                        placeholder="USUARIO"
                        onChangeText={(newValue: string) => {
                            setUsername(newValue);
                        }}
                        onFocus={() => {
                            _cleanErrors();
                        }}
                        onSubmitEditing={() => {
                            refPasswordInput.current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <Input
                        label="Contraseña"
                        ref={refPasswordInput}
                        textContentType={"password"}
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize={"none"}
                        autoCompleteType={"password"}
                        style={styles.input}
                        value={password}
                        placeholder="CONTRASEÑA"
                        onChangeText={(newValue: string) => {
                            setPassword(newValue);
                        }}
                        onFocus={() => {
                            _cleanErrors();
                        }}
                        returnKeyType="done"
                        onSubmitEditing={_handleLoginSubmit}
                    />

                    <View>
                        {isLoading && (
                            <LoadingButton size="large" color="green" style={styles.loginButton} />
                        )}

                        {!isLoading && (
                            <Button
                                status="primary"
                                style={styles.loginButton}
                                appearance="outline"
                                onPress={() => {
                                    _handleLoginSubmit();
                                }}
                            >
                                ENTRAR AL SISTEMA
                            </Button>
                        )}
                        {loginError && (
                            <Text style={{ textAlign: "center" }} status="danger" category="s1">
                                Contraseña o usuario incorrecto
                            </Text>
                        )}
                        {connectionError && (
                            <Text style={{ textAlign: "center" }} status="danger" category="s1">
                                No se pudo conectar al sistema
                            </Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    mainView: {
        margin: 15,
    },
    logoView: {
        alignItems: "center",
    },
    logo: {
        height: 100,
        width: 200,
        marginTop: 20,
    },
    view: {
        overflow: "hidden",
        backgroundColor: "#fff",
        elevation: 2,
    },
    scrollView: {
        backgroundColor: "white",
    },
    topNavigationTitle: {
        color: "white",
    },
    card: {
        margin: 0,
        height: "100%",
    },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    loginButton: {
        marginTop: 15,
        width: "100%",
    },
    loadingButton: {
        marginRight: 20,
    },
    input: {
        marginTop: 10,
    },
});
