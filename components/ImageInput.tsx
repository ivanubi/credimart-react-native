import React, { useState, useEffect } from "react";
import { Image, View, Platform } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";

export const ImageInput = (props: any) => {
    const [imageURI, setImageURI] = useState("");
    const [photoData, setPhotoData] = props.statePhotoData;
    const keyName = props.keyName;

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
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            setImageURI(result.uri);
            photoData[keyName] = result.base64;
            setPhotoData(photoData);
        }
    };

    return (
        <View {...props}>
            <Text category="label">{props.label}</Text>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Button
                    status="success"
                    size="small"
                    appearance="outline"
                    style={{ width: "100%" }}
                    onPress={pickImage}
                >
                    {props.buttonLabel}
                </Button>
                {Boolean(imageURI) && (
                    <Image source={{ uri: imageURI }} style={{ width: 250, height: 150 }} />
                )}
            </View>
        </View>
    );
};
