"use client";

import { useFileContext } from "@/context/FileContext";
import { usePasswordContext } from "@/context/PasswordContext";
import { downloadDecryptedFileContent } from "@/crypto/decryptFile";

interface DecryptionDownloadProps {
    setError: (error: string | null) => void;
}

function DecryptionDownload({ setError }: DecryptionDownloadProps) {
    const { file } = useFileContext();
    const { password } = usePasswordContext();
    const isDisabled = !file || !password;

    const clickHandler = async () => {
        if (!isDisabled) {
            try {
                await downloadDecryptedFileContent(file, password);
            } catch (error) {
                console.error("Decryption error:", error);
                setError("An error occurred during decryption. Please verify file format and password.");
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
            Decrypt file
        </button>
    </div>;
}

export default DecryptionDownload;
