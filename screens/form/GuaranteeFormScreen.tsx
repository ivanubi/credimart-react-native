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
    Modal,
    Card,
    IndexPath,
    SelectItem,
    Select,
} from "@ui-kitten/components";

import { ImageInput, MultipleImageInput } from "../../components";
import { doesInputPassValidations } from "../../utils";
import { API_URL } from "../../settings";
import { DEFAULT_FORM_DATA } from ".";

const Label = (props: any) => {
    return <Text category="label">{props.text}</Text>;
};

const InputType = (props: any) => {
    const options = ["Vehículo", "Inmueble", "Otros"];
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const displayValue = options[selectedIndex.row];
    const keyName = "tipogarantia";
    const [data, setData] = props.stateData;

    const handleSelectChange = (index: IndexPath) => {
        setSelectedIndex(index);
        data[keyName] = options[index.row].toUpperCase();
        setData(data);
    };

    const renderOption = (title: string) => <SelectItem key={title} title={title} />;

    return (
        <Layout {...props}>
            <Text category="label">Tipo de Garantía:</Text>
            <Select
                value={displayValue}
                ref={props.reference}
                placeholder="Tipo de Garantía"
                selectedIndex={selectedIndex}
                onSelect={(index) => handleSelectChange(index)}
            >
                {options.map(renderOption)}
            </Select>
        </Layout>
    );
};

const InputOwnerId = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "cedulapropietariogarantia";
    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        setValue(nextValue);
        data[keyName] = nextValue;
        setData(data);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            keyboardType="number-pad"
            label={Label({ text: "Cédula/Pasaporte del dueño:" })}
            placeholder="Cédula/Pasaporte del dueño"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputOwnerName = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "nombrepropietariogarantia";
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
            label={Label({ text: "Nombre del Propietario:" })}
            placeholder="Nombre del Propietario"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputStatus = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "statusgarantia";
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
            label={Label({ text: "Estatus:" })}
            placeholder="Estatus de la garantía"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputVehicleRegistrationId = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "matriculagarantia";
    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        setValue(nextValue);
        data[keyName] = nextValue;
        setData(data);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            label={Label({ text: "Matrícula (de ser vehículo):" })}
            placeholder="Matrícula"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputRegistrationNumber = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "noregistrogarantia";
    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        setValue(nextValue);
        data[keyName] = nextValue;
        setData(data);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            label={Label({ text: "Código de Registro:" })}
            placeholder="Código de registro"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputItemSerial = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "serialgarantia";
    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        setValue(nextValue);
        data[keyName] = nextValue;
        setData(data);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            label={Label({ text: "Serial/chásis:" })}
            placeholder="Serial/chásis de la garantía"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputItemType = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "tipoactivogarantia";
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
            label={Label({ text: "Tipo del Activo:" })}
            placeholder="Tipo del Activo"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputSerial = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "noseriegarantia";
    const [data, setData] = props.stateData;

    const handleTextChange = (nextValue: string) => {
        setValue(nextValue);
        data[keyName] = nextValue;
        setData(data);
    };

    return (
        <Input
            {...props}
            ref={props.reference}
            label={Label({ text: "Número de Serie:" })}
            placeholder="Número de Serie"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputColor = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "colorgarantia";
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
            label={Label({ text: "Color:" })}
            placeholder="Color"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputComment = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "otrosdatosgarantia";
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
            label={Label({ text: "Otro datos de interés:" })}
            placeholder="Datos de interés"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputYear = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "anogarantia";
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
            label={Label({ text: "Año modelo:" })}
            placeholder="Año"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputBrand = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "marcagarantia";
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
            label={Label({ text: "Marca:" })}
            placeholder="Marca"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputModel = (props: any) => {
    const [value, setValue] = React.useState("");
    const keyName = "modelogarantia";
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
            label={Label({ text: "Modelo:" })}
            placeholder="Modelo"
            value={value}
            onChangeText={(nextValue) => handleTextChange(nextValue)}
        />
    );
};

const InputPhotoCarRegistrationNumber = (props: any) => {
    const [photoData, setPhotoData] = props.statePhotoData;

    return (
        <ImageInput
            {...props}
            keyName="matricula"
            statePhotoData={[photoData, setPhotoData]}
            label={Label({ text: "Foto de la matrícula/número de serie:" })}
            buttonLabel="SUBIR FOTO DE LA MATRÍCULA/NÚMERO DE SERIE"
        />
    );
};

const InputGaranteePhotos = (props: any) => {
    const [photoData, setPhotoData] = props.statePhotoData;

    return (
        <MultipleImageInput
            {...props}
            keyName="fotosgarantia"
            statePhotoData={[photoData, setPhotoData]}
            label={Label({ text: "Fotos en General de la Garantía:" })}
            buttonLabel="SUBIR FOTOS DEL OBJETO EN GARANTÍA"
        />
    );
};

export const GuaranteeFormScreen = ({ route, navigation }) => {
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

    const references = [...Array(15)].map((_, i) => React.useRef(null));

    return (
        <Layout>
            <ScrollView decelerationRate={0.97}>
                <Layout style={{ marginRight: 20, marginLeft: 20 }}>
                    <Text
                        category="h5"
                        style={{ textAlign: "center", marginTop: 15, marginBottom: 5 }}
                    >
                        Datos de la Garantía
                    </Text>
                    <InputType stateData={[data, setData]} style={{ marginBottom: 8 }} />
                    <InputOwnerId
                        reference={references[0]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[1].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputOwnerName
                        reference={references[1]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[2].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputStatus
                        reference={references[2]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[3].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputItemType
                        reference={references[3]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[4].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputVehicleRegistrationId
                        reference={references[4]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[5].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputRegistrationNumber
                        reference={references[5]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[7].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputPhotoCarRegistrationNumber
                        statePhotoData={[photoData, setPhotoData]}
                        style={{ marginBottom: 8 }}
                        returnKeyType="next"
                    />
                    <InputItemSerial
                        reference={references[7]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[8].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputSerial
                        reference={references[8]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[10].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputGaranteePhotos
                        statePhotoData={[photoData, setPhotoData]}
                        style={{ marginBottom: 8 }}
                    />
                    <InputBrand
                        reference={references[10]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[11].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputModel
                        reference={references[11]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[12].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputColor
                        reference={references[12]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[13].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputYear
                        reference={references[13]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                        onSubmitEditing={() => {
                            references[14].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputComment
                        reference={references[14]}
                        stateData={[data, setData]}
                        style={{ marginBottom: 8 }}
                    />

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
                                <>
                                    <Text style={{ textAlign: "center" }} category="label">
                                        Enviando fotos...
                                    </Text>
                                    <ActivityIndicator color="green" size="large" />
                                </>
                            )}
                        </Layout>

                        {areInputsBeenCleaned && (
                            <View>
                                <Text
                                    status="danger"
                                    style={{ textAlign: "center" }}
                                    category="label"
                                >
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
            </ScrollView>
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
