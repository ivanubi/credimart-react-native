import React from "react";
import { ScrollView, ActivityIndicator, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import axios from "axios";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import {
    Layout,
    Input,
    Text,
    Button,
    Select,
    SelectItem,
    IndexPath,
    Modal,
    Card,
} from "@ui-kitten/components";

import { doesInputPassValidations } from "../../utils";
import { API_URL } from "../../settings";
import { DEFAULT_FORM_DATA } from ".";

const Label = (props: any) => {
    return <Text category="label">{props.text}</Text>;
};

const SolicitudInput = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "montosolicitado";
    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        const formattedValue = nextValue.replace(/\,|\.|\-|\s/g, "");
        setValue(formattedValue);
        data[keyName] = formattedValue;
        setData(formattedValue);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            keyboardType="number-pad"
            label={Label({ text: "Solicitado (RD$)" })}
            placeholder="Monto a solicitar"
            accessoryLeft={() => {
                return <Text category="s1">RD$</Text>;
            }}
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const ViviendaTypeInput = (props: any) => {
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const options = [
        ["Propia", "propia"],
        ["Alquilada", "alquilada"],
    ];
    const displayValue = options[selectedIndex.row][0];
    const keyName = "vivienda";

    const [data, setData] = props.stateData;

    const handleSelectChange = (index: IndexPath) => {
        setSelectedIndex(index);
        data[keyName] = options[index.row][1];
        setData(data);
    };

    React.useEffect(() => {
        data[keyName] = options[selectedIndex.row][1];
        setData(data);
    }, []);

    const renderOption = (title: string) => <SelectItem key={title[0]} title={title[0]} />;

    return (
        <Layout {...props}>
            <Text category="label">Tipo de Vivienda:</Text>
            <Select
                ref={props.reference}
                value={displayValue}
                placeholder="Selecciona el tipo de vivienda"
                selectedIndex={selectedIndex}
                onSelect={(index) => handleSelectChange(index)}
            >
                {options.map(renderOption)}
            </Select>
        </Layout>
    );
};

const EstadoViviendaInput = (props: any) => {
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const options = [
        ["Bueno", "bueno"],
        ["Regular", "regular"],
        ["Malo", "malo"],
    ];
    const displayValue = options[selectedIndex.row][0];

    const keyName = "estadoVivienda";

    const [data, setData] = props.stateData;

    const handleSelectChange = (index: IndexPath) => {
        setSelectedIndex(index);
        data[keyName] = options[index.row][1];
        setData(data);
    };

    React.useEffect(() => {
        data[keyName] = options[selectedIndex.row][1];
        setData(data);
    }, []);

    const renderOption = (title: string) => <SelectItem key={title[0]} title={title[0]} />;
    return (
        <Layout {...props}>
            <Text category="label">Estado de la vivienda:</Text>
            <Select
                ref={props.reference}
                placeholder="Seleccione el estado de la vivienda"
                selectedIndex={selectedIndex}
                value={displayValue}
                onSelect={(index) => handleSelectChange(index)}
            >
                {options.map(renderOption)}
            </Select>
        </Layout>
    );
};

const EstadoMobiliariosInput = (props: any) => {
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const options = [
        ["Bueno", "bueno"],
        ["Regular", "regular"],
        ["Malo", "malo"],
    ];
    const displayValue = options[selectedIndex.row][0];

    const keyName = "estadoMobiliario";

    const [data, setData] = props.stateData;

    const handleSelectChange = (index: IndexPath) => {
        setSelectedIndex(index);
        data[keyName] = options[index.row][1];
        setData(data);
    };

    React.useEffect(() => {
        data[keyName] = options[selectedIndex.row][1];
        setData(data);
    }, []);

    const renderOption = (option: string) => <SelectItem key={option[0]} title={option[0]} />;
    return (
        <Layout {...props}>
            <Text category="label">Estado de los mobiliarios:</Text>
            <Select
                ref={props.reference}
                placeholder="Seleccione el estado de los mobiliarios"
                value={displayValue}
                selectedIndex={selectedIndex}
                onSelect={(index) => handleSelectChange(index)}
            >
                {options.map(renderOption)}
            </Select>
        </Layout>
    );
};

const TimeLivingInViviendaInput = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "tiempovivienda";

    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        const formattedValue = nextValue.replace(/\,|\.|\-|\s/g, "");
        setValue(formattedValue);
        data[keyName] = formattedValue;
        setData(formattedValue);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            label={Label({ text: "Tiempo residiendo en la vivienda (en años):" })}
            placeholder="Tiempo en la vivienda"
            value={value}
            keyboardType="number-pad"
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const RentInput = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "pagoalquiler";

    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        const formattedValue = nextValue.replace(/\,|\.|\-|\s/g, "");
        setValue(formattedValue);
        data[keyName] = formattedValue;
        setData(formattedValue);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            label={Label({ text: "Pago Alquiler (RD$):" })}
            placeholder="Alquiler mensual"
            keyboardType="number-pad"
            accessoryLeft={() => {
                return <Text category="s1">RD$</Text>;
            }}
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

export const ConditionsFormScreen = ({ route, navigation }) => {
    const [data, setData] = route.params.stateData;
    const [photoData, setPhotoData] = route.params.statePhotoData;
    const [visible, setModalVisibility] = React.useState(false);
    const [keysMissing, setKeysMissing] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = React.useState(false);
    const [isErrorModalVisible, setErrorModalVisible] = React.useState(false);
    const [_loanRequestId, setLoanRequestId] = React.useState(0);
    const [isSendingImages, setIsSendingImages] = React.useState(false);
    const [areInputsBeenCleaned, setAreInputsBeenCleaned] = useStateWithCallbackLazy(false);

    function cleanForm() {
        setData(DEFAULT_FORM_DATA);
        setPhotoData({});
        navigation.navigate("Home");
    }

    function handleSubmitPhotos(loanRequestId: number) {
        let count = 0;
        const photosKeyNames = [
            "fotoidentificacion",
            "fotoidentificaciondetras",
            "fotocliente",
            "matricula",
            "fotoidentificacionGarante",
            "fotoidentificaciondetrasGarante",
            "fotoGarante",
        ];

        for (const keyName of photosKeyNames) {
            if (photoData[keyName]) {
                count++;
                let photoType = "";
                if (
                    keyName in
                    [
                        "fotoidentificacion",
                        "fotoidentificaciondetras",
                        "fotoidentificacionGarante",
                        "fotoidentificaciondetrasGarante",
                    ]
                ) {
                    photoType = "cedula";
                } else if (keyName in ["fotocliente", "fotoGarante"]) {
                    photoType = "persona";
                } else if (keyName == "matricula") {
                    photoType = "matricula";
                } else {
                    photoType = "otros";
                }
                const config = {
                    headers: {
                        Accept: "*/*",
                        Pragma: "no-cache",
                        "Cache-Control": "no-cache",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
                        Connection: "keep-alive",
                        NombreArchivo: `${loanRequestId}-${photoType}-${count}.jpg`,
                        "Content-Type": "save/jpg",
                        Host: API_URL.replace("http://", ""),
                        Origin: API_URL,
                        Referer: API_URL + "/Modulos/Pymes/Procesos/AgregarSolicitud.htm",
                        "User-Agent":
                            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
                    },
                    timeout: 5000,
                };
                setIsSendingImages(true);
                axios
                    .post(API_URL, photoData[keyName], config)
                    .then((response) => {
                        setIsSendingImages(false);
                    })
                    .catch((error) => {
                        setIsSendingImages(false);
                    });
            }
        }
    }

    function handleSubmit() {
        setIsLoading(true);
        if (!doesInputPassValidations(data, setModalVisibility, setKeysMissing)) {
            setIsLoading(false);
            return;
        }

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
                Referer: API_URL + "/Modulos/Pymes/Procesos/AgregarSolicitud.htm",
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
            },
            timeout: 5000,
        };
        data["Cmd"] = 5;
        data["Id"] = 3;
        data["suc"] = 1;
        data["Proc"] = "Solicitud";
        AsyncStorage.getItem("@current_user").then((JSONCurrentUser) => {
            if (JSONCurrentUser) {
                const currentUser = JSON.parse(JSONCurrentUser);
                data["IdUsuario"] = currentUser.user_id;
                data["Usuario"] = currentUser.username;
                axios
                    .post(API_URL, JSON.stringify(data).replace("\\", ""), config)
                    .then((response) => {
                        if (response.data && response.data.length != 0) {
                            console.log(response);
                            console.log(response.data[0]["currval"]);
                            setLoanRequestId(response.data[0]["currval"]);
                            handleSubmitPhotos(response.data[0]["currval"]);
                            setSuccessModalVisible(true);
                            setIsLoading(false);
                        } else {
                            setErrorModalVisible(true);
                            setIsLoading(false);
                        }
                    })
                    .catch((err) => {
                        setErrorModalVisible(true);
                        setIsLoading(false);
                    });
            }
        });
    }

    const references = [...Array(6)].map((_, i) => React.useRef(null));

    return (
        <Layout>
            <ScrollView decelerationRate={0.97}>
                <Layout style={{ marginRight: 20, marginLeft: 20 }}>
                    <Text
                        category="h5"
                        style={{ textAlign: "center", marginTop: 15, marginBottom: 5 }}
                    >
                        Condiciones del Préstamo
                    </Text>
                    <SolicitudInput
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => references[0].current.focus()}
                        returnKeyType="next"
                    />
                    <ViviendaTypeInput
                        reference={references[0]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                    />
                    <EstadoViviendaInput
                        reference={references[1]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                    />
                    <EstadoMobiliariosInput
                        reference={references[2]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                    />
                    <TimeLivingInViviendaInput
                        reference={references[3]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        returnKeyType="next"
                        onSubmitEditing={() => references[4].current.focus()}
                    />
                    <RentInput
                        reference={references[4]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        returnKeyType="next"
                        onSubmitEditing={() => navigation.navigate("Garante")}
                    />
                    <Button
                        status="success"
                        appearance="outline"
                        onPress={() => navigation.navigate("Garante")}
                        style={{ marginTop: 15 }}
                    >
                        SIGUIENTE (GARANTE)
                    </Button>
                    {isLoading && (
                        <ActivityIndicator
                            color="green"
                            size="large"
                            style={{ width: "100%", marginTop: 15, marginBottom: 20 }}
                        />
                    )}
                    {!isLoading && (
                        <Button
                            status="success"
                            onPress={handleSubmit}
                            style={styles.completeButton}
                        >
                            COMPLETAR FORMULARIO
                        </Button>
                    )}
                </Layout>
            </ScrollView>

            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setModalVisibility(false)}
            >
                <Card style={{ marginLeft: 5, marginRight: 5 }} disabled={true}>
                    <Layout>
                        <Text category="h5" style={{ textAlign: "center", margin: 5 }}>
                            Faltan las siguientes informaciones requeridas:
                        </Text>
                    </Layout>
                    {keysMissing.map((key, index) => (
                        <Text key={index}>- {key}</Text>
                    ))}
                    <Button
                        style={{ marginTop: 8 }}
                        appearance="ghost"
                        status="danger"
                        onPress={() => setModalVisibility(false)}
                    >
                        CERRAR
                    </Button>
                </Card>
            </Modal>

            <Modal
                visible={isSuccessModalVisible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setSuccessModalVisible(false)}
            >
                <Card style={{ marginLeft: 5, marginRight: 5 }} disabled={true}>
                    <Layout>
                        <Text
                            category="h6"
                            status="success"
                            style={{ textAlign: "center", margin: 5 }}
                        >
                            Solicitud registrada éxitosamente en el sistema
                        </Text>
                        <Text category="label" style={{ textAlign: "center", margin: 5 }}>
                            Número de Solicitud: {_loanRequestId}
                        </Text>
                        {isSendingImages && (
                            <View>
                                <Text style={{ textAlign: "center" }} category="label">
                                    Enviando fotos...
                                </Text>
                                <ActivityIndicator color="green" size="large" />
                            </View>
                        )}
                    </Layout>

                    {areInputsBeenCleaned && (
                        <View>
                            <Text status="danger" style={{ textAlign: "center" }} category="label">
                                Limpiando formulario...
                            </Text>
                            <ActivityIndicator
                                style={{ alignSelf: "center" }}
                                size="large"
                                color="green"
                            />
                        </View>
                    )}
                    {!areInputsBeenCleaned && (
                        <Button
                            style={{ marginTop: 8 }}
                            appearance="ghost"
                            status="danger"
                            onPress={() =>
                                setAreInputsBeenCleaned(true, () => {
                                    cleanForm();
                                })
                            }
                        >
                            CERRAR
                        </Button>
                    )}
                </Card>
            </Modal>

            <Modal
                visible={isErrorModalVisible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setErrorModalVisible(false)}
            >
                <Card style={{ marginLeft: 5, marginRight: 5 }} disabled={true}>
                    <Layout>
                        <Text
                            category="h6"
                            status="danger"
                            style={{ textAlign: "center", margin: 5 }}
                        >
                            Hubo un error al tratar de enviar la solicitud.
                        </Text>
                        <Text category="label">
                            Comprueba la conexión a internet del dispositivo.
                        </Text>
                    </Layout>
                    <Button
                        style={{ marginTop: 8 }}
                        appearance="ghost"
                        status="danger"
                        onPress={() => setErrorModalVisible(false)}
                    >
                        CERRAR
                    </Button>
                </Card>
            </Modal>
        </Layout>
    );
};

const styles = StyleSheet.create({
    innerLayout: {
        marginRight: 20,
        marginLeft: 20,
    },
    textTitle: {
        textAlign: "center",
        marginTop: 15,
        marginBottom: 8,
    },
    marginBottom: {
        marginBottom: 8,
    },
    nextButton: {
        marginTop: 15,
    },
    completeButton: {
        marginTop: 15,
        marginBottom: 20,
    },
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});
