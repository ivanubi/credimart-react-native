import React, { Component, useEffect } from "react";
import { ScrollView, StyleSheet, ActivityIndicator, View, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-community/async-storage";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import {
    Layout,
    Input,
    Text,
    Select,
    IndexPath,
    SelectItem,
    CheckBox,
    Modal,
    Card,
    Button,
} from "@ui-kitten/components";

import { ImageInput } from "../../components";
import { doesInputPassValidations } from "../../utils";
import { API_URL } from "../../settings";
import { DEFAULT_FORM_DATA } from ".";

const Label = (props: any) => {
    return <Text category="label">{props.text}</Text>;
};

class StandardInput extends Component {
    state = { value: "" };
    data = this.props.stateData[0];
    setData = this.props.stateData[1];

    handleTextChange(nextValue: string) {
        if (this.props.inputType) {
            if (this.props.inputType == "identification") {
                nextValue = nextValue.replace(/\.|\,|\s/g, "");
            } else if (this.props.inputType == "multipleNumbers") {
                nextValue = nextValue.replace(/\.|\-|\s/g, "");
            } else if (this.props.inputType == "number") {
                nextValue = nextValue.replace(/\,|\.|\-|\s/g, "");
            }
        }
        this.setState({ value: nextValue });
        this.data[this.props.keyName] = nextValue.toUpperCase();
        this.setData(this.data);
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        if (this.state.value != nextState.value) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <Input
                {...this.props}
                ref={this.props.reference}
                autoCompleteType={"off"}
                autoCorrect={false}
                hitSlop={{ top: 20, bottom: 20, left: 10, right: 10 }}
                style={{ ...this.props.style }}
                label={Label({ text: this.props.label })}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChangeText={(nextValue) => this.handleTextChange(nextValue)}
            />
        );
    }
}

const InputSex = (props: any) => {
    const [masculineChecked, setMasculineChecked] = React.useState(true);
    const [femenineChecked, setFemenineChecked] = React.useState(false);

    const keyName = "sexo";
    const [data, setData] = props.stateData;

    const handleMasculineChecked = (nextChecked: boolean) => {
        if (nextChecked) {
            setMasculineChecked(true);
            setFemenineChecked(false);
            data[keyName] = 2;
            setData(data);
        } else {
            setMasculineChecked(false);
            setFemenineChecked(true);
            data[keyName] = 1;
            setData(data);
        }
    };

    const handleFemenineChecked = (nextChecked: boolean) => {
        if (nextChecked) {
            setFemenineChecked(true);
            setMasculineChecked(false);
        } else {
            setFemenineChecked(false);
            setMasculineChecked(true);
        }
    };

    return (
        <Layout {...props}>
            <Text category="label" style={{ marginBottom: 5 }}>
                Sexo:
            </Text>

            <Layout
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
                level="1"
            >
                <CheckBox
                    style={{ margin: 2 }}
                    checked={masculineChecked}
                    onChange={(nextChecked) => handleMasculineChecked(nextChecked)}
                >
                    {`Masculino`}
                </CheckBox>
                <CheckBox
                    style={{ margin: 2 }}
                    checked={femenineChecked}
                    onChange={(nextChecked) => handleFemenineChecked(nextChecked)}
                >
                    {`Femenino`}
                </CheckBox>
            </Layout>
        </Layout>
    );
};

const InputPhotoId = (props: any) => {
    const [photoData, setPhotoData] = props.statePhotoData;

    return (
        <ImageInput
            {...props}
            keyName="fotoidentificacion"
            statePhotoData={[photoData, setPhotoData]}
            label={Label({ text: "Foto de la parte frontal de la cédula/pasaporte:" })}
            buttonLabel="SUBIR FOTO PARTE FRONTAL CÉDULA"
        />
    );
};

const InputBackPhotoId = (props: any) => {
    const [photoData, setPhotoData] = props.statePhotoData;

    return (
        <ImageInput
            {...props}
            keyName="fotoidentificaciondetras"
            statePhotoData={[photoData, setPhotoData]}
            label={Label({ text: "Foto de la parte trasera de la cédula:" })}
            buttonLabel="SUBIR FOTO PARTE TRASERA CÉDULA"
        />
    );
};

const InputProvince = (props: any) => {
    const options = [
        "Santiago",
        "La Vega",
        "Distrito Nacional",
        "San Pedro de Macorís",
        "La Romana",
        "La Altagracia",
        "El Seibo",
        "Hato Mayor",
        "Duarte",
        "Samaná",
        "Maria Trinidad Sánchez",
        "Salcedo",
        "Monseñor Nouel",
        "Sánchez Ramirez",
        "Espaillat",
        "Puerto Plata",
        "Valverde",
        "Monte Cristi",
        "Dajabón",
        "Santiago Rodríguez",
        "Azua",
        "San Juan de la Maguana",
        "Elías Piña",
        "Barahona",
        "Bahoruco",
        "Independencia",
        "Perdenales",
        "San Cristóbal",
        "Monte Plata",
        "San José de Ocoa",
        "Peravia",
    ];
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const displayValue = options[selectedIndex.row];
    const keyName = "provincia";
    const [data, setData] = props.stateData;
    const handleSelectChange = (index: IndexPath) => {
        setSelectedIndex(index);
        data[keyName] = options[selectedIndex.row].toUpperCase();
        setData(data);
    };

    const renderOption = (title: string) => <SelectItem key={title} title={title} />;

    return (
        <Layout {...props}>
            <Text category="label">Provincia:</Text>
            <Select
                ref={props.reference}
                placeholder="Seleccione la provincia"
                value={displayValue}
                onSelect={(index) => handleSelectChange(index)}
            >
                {options.map(renderOption)}
            </Select>
        </Layout>
    );
};

const InputBirthDate = (props: any) => {
    const [date, setDate] = React.useState(new Date(1598051730000));
    const [show, setShow] = React.useState(false);
    const keyName = "fechanacimientosolicitante";
    const [data, setData] = props.stateData;

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
        data[keyName] =
            currentDate.getDate() +
            "/" +
            (currentDate.getMonth() + 1) +
            "/" +
            currentDate.getFullYear();
        setData(data);
    };

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <Layout {...props}>
            <Text category="label">Fecha de Nacimiento:</Text>
            <Text style={{ textAlign: "center" }}>
                {date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}
            </Text>
            <View>
                <Button
                    size="small"
                    appearance="outline"
                    onPress={showDatePicker}
                    hitSlop={{ top: 20, bottom: 20, left: 10, right: 10 }}
                >
                    ELEGIR FECHA DE NACIMIENTO
                </Button>
            </View>
            {show && (
                <DateTimePicker
                    locale="es-US"
                    value={date}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={onChange}
                />
            )}
        </Layout>
    );
};

const InputStudyLevel = (props: any) => {
    const options = ["Ninguno", "Bachillerato", "Graduado Universitario", "Postgrado"];
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const displayValue = options[selectedIndex.row];
    const keyName = "nivelestudio";
    const [data, setData] = props.stateData;

    const handleSelectChange = (index: IndexPath) => {
        setSelectedIndex(index);
        data[keyName] = options[selectedIndex.row].toUpperCase();
        setData(data);
    };

    const renderOption = (title: string) => <SelectItem key={title} title={title} />;

    return (
        <Layout {...props}>
            <Text category="label">Nivel de Estudio del cliente:</Text>
            <Select
                ref={props.reference}
                value={displayValue}
                placeholder="Nivel de estudio"
                selectedIndex={selectedIndex}
                onSelect={(index) => handleSelectChange(index)}
            >
                {options.map(renderOption)}
            </Select>
        </Layout>
    );
};

const InputCivilState = (props: any) => {
    const options = [
        ["Soltero/a", 2],
        ["Casado/a", 3],
        ["Viudo/a", 5],
        ["Unión Libre", 7],
    ];
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const displayValue = options[selectedIndex.row][0];
    const keyName = "estado_civil";
    const [data, setData] = props.stateData;

    const handleSelectChange = (index: IndexPath) => {
        setSelectedIndex(index);
        data[keyName] = options[selectedIndex.row][1];
        setData(data);
    };

    const renderOption = (title: string) => <SelectItem key={title[0]} title={title[0]} />;

    useEffect(() => {
        data[keyName] = options[selectedIndex.row][1];
        setData(data);
    }, []);

    return (
        <Layout {...props}>
            <Text category="label">Estado Civil:</Text>
            <Select
                ref={props.reference}
                value={displayValue}
                placeholder="Estado Civil"
                selectedIndex={selectedIndex}
                onSelect={(index) => handleSelectChange(index)}
            >
                {options.map(renderOption)}
            </Select>
        </Layout>
    );
};

const InputPhotoClient = (props: any) => {
    const [photoData, setPhotoData] = props.statePhotoData;

    return (
        <ImageInput
            {...props}
            keyName="fotocliente"
            statePhotoData={[photoData, setPhotoData]}
            label={Label({ text: "Foto del Cliente:" })}
            buttonLabel="SUBIR FOTO DEL CLIENTE"
        />
    );
};

const InputGPSLocation = (props: any) => {
    const [data, setData] = props.stateData;
    const [location, setLocation] = React.useState({ latitude: null, longitude: null });
    const [errorMsg, setErrorMsg] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isReady, setIsReady] = React.useState(false);
    const [showMap, setShowMap] = React.useState(false);
    React.useEffect(getGPSLocation, []);

    function getGPSLocation() {
        try {
            (async () => {
                setIsLoading(true);
                Location.requestPermissionsAsync().then(({ status }) => {
                    if (status !== "granted") {
                        setErrorMsg("La aplicación no tiene permisos para utilizar el GPS");
                        setIsLoading(false);
                        setIsReady(false);
                    } else {
                        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
                            .then((GPSLocation) => {
                                if (GPSLocation && GPSLocation.coords) {
                                    setLocation(GPSLocation.coords);
                                    data["latitud"] = GPSLocation.coords.latitude;
                                    data["longitud"] = GPSLocation.coords.longitude;
                                    setData(data);
                                }
                                setIsLoading(false);
                                setIsReady(true);
                            })
                            .catch(() => {
                                setErrorMsg(
                                    "El servicio de GPS del dispositivo no está habilitado"
                                );
                                setIsLoading(false);
                                setIsReady(false);
                            });
                    }
                });
            })();
        } catch {
            setErrorMsg("El servicio de GPS del dispositivo no está habilitado");
            setIsLoading(false);
            setIsReady(false);
        }
    }

    let text = "Latitud: -, Longitud: -";
    if (isLoading) {
        text = "Obteniendo localización...";
    } else if (errorMsg) {
        text = errorMsg;
    } else if (location && location.latitude && location.longitude) {
        text = `Latitud: ${location.latitude.toString()}, Longitud: ${location.longitude.toString()}`;
    }
    try {
        return (
            <View {...props}>
                <Text category="label">Localización (GPS):</Text>
                {isLoading && (
                    <Text category="label" style={{ textAlign: "center" }}>
                        Obteniendo localización...
                    </Text>
                )}
                {!isLoading && (
                    <Text category="label" style={{ textAlign: "center" }}>
                        {text}
                    </Text>
                )}
                {isLoading && (
                    <ActivityIndicator
                        color="green"
                        style={{ width: "100%", marginTop: 11, marginBottom: 5 }}
                    />
                )}
                {!isLoading && (
                    <Button
                        status="info"
                        size="small"
                        style={{ marginTop: 8, marginBottom: 5 }}
                        appearance="outline"
                        onPress={getGPSLocation}
                    >
                        ACTUALIZAR LOCALIZACIÓN
                    </Button>
                )}
                {!isLoading &&
                    isReady &&
                    location &&
                    location.latitude &&
                    location.longitude &&
                    !showMap && (
                        <Button
                            status="success"
                            size="small"
                            style={{ marginTop: 8, marginBottom: 5 }}
                            appearance="outline"
                            onPress={() => {
                                setShowMap(true);
                            }}
                        >
                            MOSTRAR MAPA
                        </Button>
                    )}
                {!isLoading && isReady && showMap && (
                    <Button
                        status="danger"
                        size="small"
                        style={{ marginTop: 8, marginBottom: 5 }}
                        appearance="outline"
                        onPress={() => {
                            setShowMap(false);
                        }}
                    >
                        CERRAR MAPA
                    </Button>
                )}
                {isReady && showMap && (
                    <MapView
                        region={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0038,
                            longitudeDelta: 0.0038,
                        }}
                        style={{
                            alignSelf: "center",
                            width: "99%",
                            height: 200,
                        }}
                        zoomEnabled={false}
                        zoomTapEnabled={false}
                        zoomControlEnabled={false}
                    >
                        <Marker
                            key={0}
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title="Lugar"
                        />
                    </MapView>
                )}
            </View>
        );
    } catch {
        return (
            <View {...props}>
                <Text category="label">Localización (GPS):</Text>
                {isLoading && (
                    <Text category="label" style={{ textAlign: "center" }}>
                        Obteniendo localización...
                    </Text>
                )}
                {!isLoading && (
                    <Text category="label" style={{ textAlign: "center" }}>
                        {text}
                    </Text>
                )}
                {isLoading && (
                    <ActivityIndicator
                        color="green"
                        style={{ width: "100%", marginTop: 11, marginBottom: 5 }}
                    />
                )}
                {!isLoading && (
                    <Button
                        status="info"
                        size="small"
                        style={{ marginTop: 8, marginBottom: 5 }}
                        appearance="outline"
                        onPress={getGPSLocation}
                    >
                        ACTUALIZAR LOCALIZACIÓN
                    </Button>
                )}
            </View>
        );
    }
};

export const ClientFormScreen = ({ route, navigation }) => {
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

        if (photoData["fotosgarantia"]) {
            for (const [index, photoContent] of photoData["fotosgarantia"].entries()) {
                count++;
                const config = {
                    headers: {
                        Accept: "*/*",
                        Pragma: "no-cache",
                        "Cache-Control": "no-cache",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
                        Connection: "keep-alive",
                        NombreArchivo: `${loanRequestId}-garantia-${count}.jpg`,
                        "Content-Type": "save/jpg",
                        Host: API_URL.replace("http://", ""),
                        Origin: API_URL,
                        Referer: API_URL + "/Modulos/Pymes/Procesos/AgregarSolicitud.htm",
                        "User-Agent":
                            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
                    },
                    timeout: 10000,
                };
                setIsSendingImages(true);
                axios
                    .post(API_URL, photoContent, config)
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
        (data["Cmd"] = 5), (data["Id"] = 3), (data["suc"] = 1), (data["Proc"] = "Solicitud");
        AsyncStorage.getItem("@current_user").then((JSONCurrentUser) => {
            if (JSONCurrentUser) {
                const currentUser = JSON.parse(JSONCurrentUser);
                (data["IdUsuario"] = currentUser.user_id), (data["Usuario"] = currentUser.username);
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

    const references = [...Array(16)].map((_, i) => React.useRef(null));

    return (
        <Layout>
            <ScrollView decelerationRate={0.97}>
                <Layout style={styles.innerLayout}>
                    <Text category="h5" style={styles.textTitle}>
                        Datos del Cliente
                    </Text>
                    <StandardInput
                        keyName="Nombre1"
                        label="Primer y Segundo Nombre (requerido):"
                        placeholder="Primer y Segundo Nombre"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            references[0].current.focus();
                        }}
                    />
                    <StandardInput
                        keyName="Apellido1"
                        label="Primer Apellido (requerido):"
                        placeholder="Primer Apellido"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        reference={references[0]}
                        onSubmitEditing={() => {
                            references[1].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <StandardInput
                        keyName="Apellido2"
                        label="Segundo Apellido:"
                        placeholder="Segundo Apellido"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        reference={references[1]}
                        onSubmitEditing={() => {
                            references[2].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <StandardInput
                        keyName="apodo"
                        label="Apodo:"
                        placeholder="Apodo"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        reference={references[2]}
                        onSubmitEditing={() => {
                            references[3].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputSex stateData={[data, setData]} style={styles.marginBottom} />
                    <InputBirthDate stateData={[data, setData]} style={styles.marginBottom} />
                    <StandardInput
                        keyName="telefonos"
                        label="Teléfonos (Separados por comas si son varios):"
                        placeholder="Números telefónicos"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        reference={references[3]}
                        onSubmitEditing={() => {
                            references[4].current.focus();
                        }}
                        keyboardType="number-pad"
                        returnKeyType="next"
                        inputType="multipleNumbers"
                    />
                    <InputProvince
                        reference={references[4]}
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                    />
                    <StandardInput
                        keyName="direcciondomicilio"
                        label="Dirección:"
                        placeholder="Dirección"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        reference={references[5]}
                        onSubmitEditing={() => {
                            references[6].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputGPSLocation stateData={[data, setData]} style={styles.marginBottom} />
                    <StandardInput
                        keyName="ciudadmunicipio"
                        label="Ciudad o Municipio:"
                        placeholder="Ciudad o Municipio"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        reference={references[6]}
                        onSubmitEditing={() => {
                            references[7].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <StandardInput
                        keyName="zonabarrio"
                        label="Zona o Barrio:"
                        placeholder="Zona o Barrio"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        returnKeyType="next"
                        reference={references[7]}
                        onSubmitEditing={() => {
                            references[8].current.focus();
                        }}
                    />
                    <StandardInput
                        keyName="referencia"
                        label="Referencias:"
                        placeholder="Referencias"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        returnKeyType="next"
                        reference={references[8]}
                        onSubmitEditing={() => {
                            references[9].current.focus();
                        }}
                    />
                    <StandardInput
                        keyName="lugarnacimiento"
                        label="Lugar de Nacimiento:"
                        placeholder="Lugar de Nacimiento"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        reference={references[9]}
                        onSubmitEditing={() => {
                            references[10].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <StandardInput
                        keyName="identificacion"
                        label="Cédula o Pasaporte (requerido):"
                        placeholder="Número de Cédula o Pasaporte"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        reference={references[10]}
                        onSubmitEditing={() => {
                            references[11].current.focus();
                        }}
                        returnKeyType="next"
                        keyboardType="number-pad"
                        inputType="identification"
                    />
                    <StandardInput
                        keyName="nodependientes"
                        label="Número de Dependientes:"
                        placeholder="Número de Dependientes"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        reference={references[11]}
                        onSubmitEditing={() => {
                            references[12].current.focus();
                        }}
                        returnKeyType="next"
                        keyboardType="number-pad"
                        inputType="number"
                    />
                    <InputPhotoId
                        statePhotoData={[photoData, setPhotoData]}
                        style={styles.marginBottom}
                    />
                    <InputBackPhotoId
                        statePhotoData={[photoData, setPhotoData]}
                        style={styles.marginBottom}
                    />
                    <InputPhotoClient
                        statePhotoData={[photoData, setPhotoData]}
                        style={styles.marginBottom}
                    />
                    <InputCivilState stateData={[data, setData]} style={styles.marginBottom} />
                    <StandardInput
                        keyName="nombreconyuge"
                        label="Nombre del Cónyuge:"
                        placeholder="Nombre del Cónyuge"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        reference={references[12]}
                        onSubmitEditing={() => {
                            references[13].current.focus();
                        }}
                        returnKeyType="next"
                    />
                    <InputStudyLevel
                        reference={references[13]}
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                    />
                    <StandardInput
                        keyName="Comentario"
                        label="Comentario Adicional:"
                        placeholder="Comentario Adicional"
                        stateData={[data, setData]}
                        style={styles.marginBottom}
                        reference={references[14]}
                        returnKeyType="next"
                        onSubmitEditing={() => navigation.navigate("Condiciones")}
                    />
                    <Button
                        status="success"
                        appearance="outline"
                        onPress={() => navigation.navigate("Condiciones")}
                        style={styles.nextButton}
                    >
                        SIGUIENTE (CONDICIONES)
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

            <Modal visible={isSuccessModalVisible} backdropStyle={styles.backdrop}>
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
        marginTop: 0,
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
