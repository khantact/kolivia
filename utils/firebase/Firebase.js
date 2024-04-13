import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyCoeTUQ4wuM-o3R7XCOlU6xmFMr9FwwU2g",
	authDomain: "kolivia-e81f8.firebaseapp.com",
	projectId: "kolivia-e81f8",
	storageBucket: "kolivia-e81f8.appspot.com",
	messagingSenderId: "587452536170",
	appId: "1:587452536170:web:f1c3e3cb2fe03d8f3e8113",
	measurementId: "G-1QHDTGW4MJ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
