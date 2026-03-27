"use client";

import { useFileContext } from "@/context/FileContext";
import { usePasswordContext } from "@/context/PasswordContext";
import { downloadEncryptedFileContent } from "@/crypto/encryptedFileDownload";

interface EncryptionDownloadProps {
    setError: (error: string | null) => void;
}

function EncryptionDownload({ setError }: EncryptionDownloadProps) {
    const { file } = useFileContext();
    const { password } = usePasswordContext();
    const isDisabled = !file || !password;

    const clickHandler = async () => {
        if (!isDisabled) {
            try { 
                await downloadEncryptedFileContent(file, password);
            } catch (error) {
                console.error("Encryption error:", error);
                setError("An error occurred during encryption. Please try a larger password.");
            }
        }
    };

    return <div>
        <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={isDisabled}
        onClick={clickHandler}
        >
            Encrypt file
        </button>
    </div>;
}

export default EncryptionDownload;
