"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type FileContextValue = {
  file: File | null;
  saveFile: (nextFile: File) => void;
  removeFile: () => void;
  getFile: () => File | null;
};

const FileContext = createContext<FileContextValue | undefined>(undefined);

function FileProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<File | null>(null);

  const saveFile = useCallback((nextFile: File) => {
    setFile(nextFile);
  }, []);

  const removeFile = useCallback(() => {
    setFile(null);
  }, []);

  const getFile = useCallback(() => file, [file]);

  const value = useMemo(
    () => ({ file, saveFile, removeFile, getFile }),
    [file, saveFile, removeFile, getFile],
  );

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
}

function useFileContext() {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error("useFileContext must be used within FileProvider");
  }

  return context;
}

export { FileProvider, useFileContext };
