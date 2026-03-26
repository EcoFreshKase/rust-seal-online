"use client";

import { useState } from "react";
import { useFileContext } from "@/app/context/FileContext";
import { usePasswordContext } from "@/app/context/PasswordContext";
import { downloadDecryptedFileContent } from "@/app/crypto/decryptFile";

function DecryptionDownload() {
    const { file } = useFileContext();
    const { password } = usePasswordContext();
    const isDisabled = !file || !password;
    const [isError, setIsError] = useState(false);

    const clickHandler = async () => {
        if (!isDisabled) {
            try {
                setIsError(false);
                await downloadDecryptedFileContent(file, password);
            } catch (error) {
                console.error("Decryption error:", error);
                setIsError(true);
            }
        }
    };

    return <div>
        <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            disabled={isDisabled}
            onClick={clickHandler}
        >
            Decrypt file
        </button>
        {isError && <p className="mt-2 text-sm text-red-600">An error occurred during decryption. Please verify file format and password.</p>}
    </div>;
}

export default DecryptionDownload;
