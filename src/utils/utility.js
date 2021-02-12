import noImage from "./../media/no_image.jpg"

export const limitLength = (str) => {
    const temp = str[0].toUpperCase() + str.substr(1, str.length > 15 ? 15: str.length - 1)
    return temp.length <= 15 ? temp : temp + "..."
}

export const capitalize = (str) => {
    const temp = str[0].toUpperCase() + str.substr(1, str.length - 1)
    return temp
}

export const defaultPictureUrl = noImage


export const toBase64 = (file) => {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Your file is corrupted!"));
    })
}

export const WebSocketUrl = "wss://gwm8skmuc4.execute-api.ap-south-1.amazonaws.com/dev"