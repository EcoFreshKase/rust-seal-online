"use client";

import { useFileContext } from "@/context/FileContext";
import { usePasswordContext } from "@/context/PasswordContext";
import { downloadEncryptedFileContent } from "@/crypto/encryptedFileDownload";
import { useState } from "react";

function EncryptionDownload() {
    const { file } = useFileContext();
    const { password } = usePasswordContext();
    const isDisabled = !file || !password;
    const [isError, setIsError] = useState(false);

    const clickHandler = async () => {
        if (!isDisabled) {
            try { 
                setIsError(false);
                await downloadEncryptedFileContent(file, password);
            } catch (error) {
                console.error("Encryption error:", error);
                setIsError(true);
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
        {isError && <p className="mt-2 text-sm text-red-600">An error occurred during encryption. Please try a larger password.</p>}
    </div>;
}

export default EncryptionDownload;
