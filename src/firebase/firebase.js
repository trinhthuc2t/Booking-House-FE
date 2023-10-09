
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage' ;
const firebaseConfig = {
    apiKey: "AIzaSyAxKSuOhHdxmQnzeFsy1SXnLcjNBGYo52A",
    authDomain: "fir-15eec.firebaseapp.com",
    projectId: "fir-15eec",
    storageBucket: "fir-15eec.appspot.com",
    messagingSenderId: "670148680907",
    appId: "1:670148680907:web:f8e383eb52e9870eec8f4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);