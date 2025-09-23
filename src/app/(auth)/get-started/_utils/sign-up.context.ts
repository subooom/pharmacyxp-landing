// /signup/_context/SignUpContext.tsx
import { createContext, useContext } from "react";
import { SignUpContextType } from "./types";

export const SignUpContext = createContext<SignUpContextType | undefined>(
  undefined,
);

export const useSignUpContext = () => {
  const ctx = useContext(SignUpContext);
  if (!ctx)
    throw new Error("useSignUpContext must be used inside SignUpProvider");
  return ctx;
};
