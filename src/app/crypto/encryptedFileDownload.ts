import { downloadContent } from "./fileDownloadUtil";

async function deriveKeyFromPassword(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return hashBuffer;
}

async function encryptFile(file: File, key: string) {
    const fileBuffer = await file.arrayBuffer();

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const keyBuffer = await deriveKeyFromPassword(key);

    const aesKey = await crypto.subtle.importKey("raw", keyBuffer, "AES-GCM", false, ["encrypt"]);

    const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        aesKey,
        fileBuffer
    );  

    return {
        data: ciphertext,
        iv: Array.from(iv),
    };
}

function toBase64(bytes: Uint8Array) {
    let binary = "";

    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return btoa(binary);
}

async function downloadEncryptedFileContent(file: File, key: string) {
    const encryptedContent = await encryptFile(file, key);

    const ivBase64 = toBase64(new Uint8Array(encryptedContent.iv));
    const contentBase64 = toBase64(new Uint8Array(encryptedContent.data));
    const payload = `${ivBase64}\n${contentBase64}`;

    downloadContent(payload)
}

export { downloadEncryptedFileContent };
