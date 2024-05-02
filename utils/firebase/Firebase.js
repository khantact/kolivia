import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyAbMekr5Dw9Xl4K4S1Jq1GtNGGewChxu_Y",
	authDomain: "kolivia-e81f8.firebaseapp.com",
	projectId: "kolivia-e81f8",
	storageBucket: "kolivia-e81f8.appspot.com",
	messagingSenderId: "587452536170",
	appId: "1:587452536170:web:f1c3e3cb2fe03d8f3e8113",
	measurementId: "G-1QHDTGW4MJ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
