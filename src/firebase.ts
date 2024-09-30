import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXRI4Dk4A7qvefTJXHJFq-SzdOMt7oE-k",
  authDomain: "sns-flatform01-cc81c.firebaseapp.com",
  projectId: "sns-flatform01-cc81c",
  storageBucket: "sns-flatform01-cc81c.appspot.com",
  messagingSenderId: "326069783056",
  appId: "1:326069783056:web:d7e628687944704a56d895",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
