import { initializeApp } from "@firebase/app";
import firebaseConfig from "./config";

export const initFirebaseApp = () => initializeApp(firebaseConfig);
