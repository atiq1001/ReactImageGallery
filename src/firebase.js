import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYfAHtwJ3lGBv1G09Hg2sTknxSDdGq15o",
  authDomain: "test-388fc.firebaseapp.com",
  projectId: "test-388fc",
  storageBucket: "test-388fc.appspot.com",
  messagingSenderId: "414804592776",
  appId: "1:414804592776:web:0b9ff2fe06acaeefe6373d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export default app;
