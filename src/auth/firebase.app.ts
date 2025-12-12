import { getApp, getApps, initializeApp } from "@firebase/app";
import firebaseConfig from "./config";

export const initFirebaseApp = () => {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
};
