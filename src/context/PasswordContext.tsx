"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PasswordContextValue = {
  password: string |  null;
  savePassword: (password: string) => void;
  removePassword: () => void;
  getPassword: () => string |  null;
};

const PasswordContext = createContext<PasswordContextValue | undefined>(undefined);

function PasswordProvider({ children }: { children: ReactNode }) {
  const [password, setPassword] = useState<string | null>(null);

  const savePassword = useCallback((nextPassword: string) => {
    setPassword(nextPassword);
  }, []);

  const removePassword = useCallback(() => {
    setPassword(null);
  }, []);

  const getPassword = useCallback(() => password, [password]);

  const value = useMemo(
    () => ({ password, savePassword, removePassword, getPassword }),
    [password, savePassword, removePassword, getPassword],
  );

  return <PasswordContext.Provider value={value}>{children}</PasswordContext.Provider>;
}

function usePasswordContext() {
  const context = useContext(PasswordContext);  
  if (!context) {
    throw new Error("usePasswordContext must be used within PasswordProvider");
  }

  return context;
}

export { PasswordProvider, usePasswordContext };
