import React from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
export async function eventCreation(data) {
	// data is dictionary with labels
	console.log("eventCreation:", data);
	const uid = data["userID"];
	let refreshToken = "";
	// example of data
	// {
	//   calendarReason: 'go to the Dentist',
	//   PM_TIME_START: '3PM',
	//   PM_TIME_END: '5PM'
	// }
	const docSnap = await getDoc(doc(db, "users", uid));
	if (docSnap.exists()) {
		refreshToken = docSnap.data().refreshToken;
	} else {
		console.log("error in retrieving refreshtoken");
	}
	const oauth2client = new google();
	try {
		// console.log(response);
		// const response = await fetch("https://oauth2.googleapis.com/token", {
		// 	method: "POST",
		// 	client_id:
		// 		"5306929988-tekg4kvr1onm3em4p8gf2gbsai3ef5ac.apps.googleusercontent.com",
		// 	client_secret: process.env.GOOGLE_CLIENT_SECRET,
		// 	grant_type: "refresh_token",
		// 	refresh_token: refreshToken,
		// });
	} catch (e) {
		console.log(e.message);
	}
	return;
}
