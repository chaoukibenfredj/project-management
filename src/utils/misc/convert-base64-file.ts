export function convertBase64ToFile(base64 : string) {
    const date = new Date().valueOf();
    let text = '';
    base64 = base64.slice(22) ;
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    const imageName = date + '.' + text + '.png';
    const imageBlob = dataURItoBlob(base64);
    const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
    return imageFile ;
}

function dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
}