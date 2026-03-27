"use client";

import EncryptionDownload from "../components/Crypto/EncryptionDownload/EncryptionDownload";
import DecryptionDownload from "../components/Crypto/DecryptionDownload/DecryptionDownload";
import FileUpload from "../components/FileUpload/FileUpload";
import PasswordInput from "../components/PasswordInput/PasswordInput";
import { useState } from "react";

export default function Home() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center bg-white px-16 py-32 dark:bg-black sm:items-start *:py-4">
        <p className="w-full text-center font-bold text-3xl">
          🦭 Online
        </p>
        <FileUpload />
        <PasswordInput />
        <div className="flex w-full justify-center gap-15">
          <EncryptionDownload setError={setError}/>
          <DecryptionDownload setError={setError}/>
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
     </main>
    </div>
  );
}
