import { downloadContent } from "./fileDownloadUtil";

async function deriveKeyFromPassword(password: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	return hashBuffer;
}

function fromBase64(base64: string) {
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);

	for (let i = 0; i < binary.length; i += 1) {
		bytes[i] = binary.charCodeAt(i);
	}

	return bytes;
}

async function decryptFileContent(file: File, key: string) {
	const payload = await file.text();
	const [ivBase64, encryptedContentBase64] = payload.trim().split(/\r?\n/, 2);

	if (!ivBase64 || !encryptedContentBase64) {
		throw new Error("Invalid encrypted file format. Expected '<iv>\\n<content>'.");
	}

	const iv = fromBase64(ivBase64);
	const encryptedContent = fromBase64(encryptedContentBase64);

	const keyBuffer = await deriveKeyFromPassword(key);
	const aesKey = await crypto.subtle.importKey("raw", keyBuffer, "AES-GCM", false, ["decrypt"]);

    console.log(key);
    console.log(ivBase64)
    console.log(encryptedContentBase64)

	return crypto.subtle.decrypt(
		{ name: "AES-GCM", iv },
		aesKey,
		encryptedContent,
	);
}

async function downloadDecryptedFileContent(file: File, key: string) {
    const decryptedContentBuffer = await decryptFileContent(file, key);
    const decryptedContent = new TextDecoder().decode(decryptedContentBuffer);
    
    downloadContent(decryptedContent, file.name.replace(/\.seal$/, "") || "decrypted.txt");
}

export { downloadDecryptedFileContent };
