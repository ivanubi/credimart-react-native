import React, { useState, useEffect } from "react";
import { Image, View, Platform } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";

export const MultipleImageInput = (props: any) => {
    const [images, setImages] = useState([]);
    const [photoData, setPhotoData] = props.statePhotoData;
    const [index, setIndex] = useState(0);
    const keyName = props.keyName;
    const imagesBase64 = [];

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Lo siento, la aplicación necesita permisos de cámara para poder enviar fotos"
                    );
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            base64: true,
        });

        if (!result.cancelled) {
            images[index] = result.uri;
            setIndex(index + 1);
            setImages(images);
            imagesBase64[index] = result.base64;
            photoData[keyName] = imagesBase64;
            setPhotoData(photoData);
        }
    };

    const deleteLastImage = () => {
        if (index >= 0) {
            images.pop();
            imagesBase64.pop();
            setImages(images);
            setIndex(index - 1);
        }
    };

    return (
        <View {...props}>
            <Text category="label">{props.label}</Text>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {index == 0 && (
                    <Button
                        status="success"
                        size="small"
                        appearance="outline"
                        style={{ width: "100%" }}
                        onPress={pickImage}
                    >
                        {props.buttonLabel}
                    </Button>
                )}
                {images.map((item, index) => {
                    return (
                        <Image
                            key={index}
                            source={{ uri: item }}
                            style={{ width: 250, height: 150, marginTop: 2 }}
                        />
                    );
                })}
                {index > 0 && (
                    <View style={{ width: "100%", marginTop: 2 }}>
                        <Button
                            status="danger"
                            size="small"
                            appearance="outline"
                            style={{ width: "100%", marginTop: 2 }}
                            onPress={deleteLastImage}
                        >
                            BORRAR ÚLTIMA FOTO -
                        </Button>
                        <Button
                            status="success"
                            size="small"
                            appearance="outline"
                            style={{ width: "100%", marginTop: 2 }}
                            onPress={pickImage}
                        >
                            AGREGAR OTRA +
                        </Button>
                    </View>
                )}
            </View>
        </View>
    );
};
