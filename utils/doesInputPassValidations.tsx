export function doesInputPassValidations(data: any, setModalVisibility: any, setKeysMissing: any) {
    const requiredKeyNames = [
        ["Nombre1", "Nombre del Cliente"],
        ["Apellido1", "Apellido del Cliente"],
        ["identificacion", "Documento de Identificación del Cliente"],
        ["montosolicitado", "Monto Solicitado (en RD$)"],
    ];
    let keysMissing = [];

    for (const key in requiredKeyNames) {
        if (!data[requiredKeyNames[key][0]]) {
            keysMissing.push(requiredKeyNames[key][1]);
        }
    }
    if (Boolean(keysMissing.length)) {
        setKeysMissing(keysMissing);
        setModalVisibility(true);
        return false;
    }
    return true;
}
