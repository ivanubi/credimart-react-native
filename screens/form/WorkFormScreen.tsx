import React from "react";
import { ScrollView, StyleSheet, ActivityIndicator, View } from "react-native";
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

const InputEnterpriseActivity = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "empresa";
    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        setValue(nextValue);
        data[keyName] = nextValue.toUpperCase();
        setData(data);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            label={Label({ text: "Actividad de la Empresa:" })}
            placeholder="Qué hace la empresa"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputEnterpriseName = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "nombreempresa";
    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        setValue(nextValue);
        data[keyName] = nextValue.toUpperCase();
        setData(data);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            label={Label({ text: "Nombre de la Empresa:" })}
            placeholder="Nombre de la empresa"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputJobInsideTheEnterprise = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "puestolab";
    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        setValue(nextValue);
        data[keyName] = nextValue.toUpperCase();
        setData(data);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            label={Label({ text: "Puesto u Ocupación:" })}
            placeholder="Puesto u Ocupación"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputEnterpriseAddress = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "direccionempresa";
    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        setValue(nextValue);
        data[keyName] = nextValue.toUpperCase();
        setData(data);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            label={Label({ text: "Dirección de la Empresa:" })}
            placeholder="Dirección de la empresa"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputEnterpriseCity = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "ciudadlab";
    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        setValue(nextValue);
        data[keyName] = nextValue.toUpperCase();
        setData(data);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            label={Label({ text: "Ciudad de la Empresa:" })}
            placeholder="Ciudad de la empresa"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputEnterprisePhoneNumber = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "telefonolab";
    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        const formattedValue = nextValue.replace(/\,|\.|\s/g, "");
        setValue(formattedValue);
        data[keyName] = formattedValue;
        setData(formattedValue);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            label={Label({ text: "Teléfono de la Empresa:" })}
            placeholder="Teléfono de la Empresa"
            keyboardType="phone-pad"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputHowOldEnterprise = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "antiguedadempresa";
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
            label={Label({ text: "Antiguedad en la actividad (en años):" })}
            placeholder="Antiguedad en la actividad"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputHowOldEnterpriseInAddress = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "antiguedadlocalidad";
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
            label={Label({ text: "Antiguedad en la localidad (en años):" })}
            placeholder="Antiguedad en la localidad"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputEnterpriseExpenses = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "egresolab";
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
            label={Label({ text: "Egreso o Gasto/mes:" })}
            placeholder="Gastos mensuales de la empresa"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputEnterpriseRevenue = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "ingresolab";
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
            label={Label({ text: "Ingreso Bruto/mes:" })}
            placeholder="Ingresos brutos de la empresa"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputEnterpriseNetRevenue = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "ingresonetolab";
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
            label={Label({ text: "Ingreso neto/mes:" })}
            placeholder="Ingreso neto de la empresa"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputEmployeesNumber = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "numeroempleados";
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
            label={Label({ text: "Número de Empleados:" })}
            placeholder="Número de Empleados"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputTypeEnterprise = (props: any) => {
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const options = [
        ["Pública", "Publico"],
        ["Privada", "Privado"],
    ];
    const displayValue = options[selectedIndex.row][0];
    const keyName = "tipoempresa";
    const [data, setData] = props.stateData;

    const handleSelectChange = (index: IndexPath) => {
        setSelectedIndex(index);
        data[keyName] = options[selectedIndex.row][1];
        setData(data);
    };

    const renderOption = (title: string) => <SelectItem key={title[0]} title={title[0]} />;
    return (
        <Layout {...props}>
            <Text category="label">Tipo de Empresa (pública/privada):</Text>
            <Select
                ref={props.reference}
                value={displayValue}
                placeholder="Seleccione el tipo de empresa"
                selectedIndex={selectedIndex}
                onSelect={(index) => handleSelectChange(index)}
            >
                {options.map(renderOption)}
            </Select>
        </Layout>
    );
};

export const WorkFormScreen = ({ route, navigation }) => {
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

    const references = [...Array(12)].map((_, i) => React.useRef(null));

    return (
        <Layout>
            <ScrollView decelerationRate={0.97}>
                <Layout style={{ marginRight: 20, marginLeft: 20 }}>
                    <Text
                        category="h5"
                        style={{ textAlign: "center", marginTop: 15, marginBottom: 5 }}
                    >
                        Datos de la empresa en la que elabora el solicitante
                    </Text>
                    <InputEnterpriseActivity
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[0].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputJobInsideTheEnterprise
                        reference={references[0]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[1].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputEnterpriseName
                        reference={references[1]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[2].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputEnterpriseAddress
                        reference={references[2]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[3].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputEnterpriseCity
                        reference={references[3]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[4].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputHowOldEnterpriseInAddress
                        reference={references[4]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[5].current.focus();
                        }}
                        returnKeyType="next"
                        keyboardType="number-pad"
                    />
                    <InputEnterprisePhoneNumber
                        reference={references[5]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[6].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputTypeEnterprise
                        reference={references[6]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                    />
                    <InputHowOldEnterprise
                        reference={references[7]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[8].current.focus();
                        }}
                        returnKeyType="next"
                        keyboardType="number-pad"
                    />
                    <InputEnterpriseRevenue
                        reference={references[8]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[9].current.focus();
                        }}
                        returnKeyType="next"
                        keyboardType="number-pad"
                    />
                    <InputEnterpriseExpenses
                        reference={references[9]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[10].current.focus();
                        }}
                        returnKeyType="next"
                        keyboardType="number-pad"
                    />
                    <InputEnterpriseNetRevenue
                        reference={references[10]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[11].current.focus();
                        }}
                        returnKeyType="next"
                        keyboardType="number-pad"
                    />
                    <InputEmployeesNumber
                        reference={references[11]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            navigation.navigate("Garantía");
                        }}
                        returnKeyType="next"
                        keyboardType="number-pad"
                    />
                    <Button
                        status="success"
                        appearance="outline"
                        onPress={() => navigation.navigate("Garantía")}
                        style={{ marginTop: 15 }}
                    >
                        SIGUIENTE (GARANTÍA)
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
