import React from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase/Firebase";
import * as chrono from "chrono-node";

export async function eventCreation(data) {
	// data is dictionary with labels

	// console.log("eventCreation:", data);
	const uid = data["userID"];
	let refreshToken = "";
	let accessToken = "";
	let summary = data.calendarReason;

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

	try {
		const params = new URLSearchParams();
		params.append("client_id", process.env.GOOGLE_CLIENT_ID);
		params.append("client_secret", process.env.GOOGLE_CLIENT_SECRET);
		params.append("grant_type", "refresh_token");
		params.append("refresh_token", refreshToken);
		const response = await fetch("https://oauth2.googleapis.com/token", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: params,
		});
		if (response.ok) {
			const data = await response.json();
			accessToken = data.access_token;
		}
	} catch (e) {
		console.log(e.message);
	}
	// create google event

	const event = {
		summary: summary,
		start: {
			dateTime: chrono.parseDate(data.PM_TIME_START).toISOString(),
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		end: {
			dateTime: chrono.parseDate(data.PM_TIME_END).toISOString(),
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
	};
	await fetch(
		"https://www.googleapis.com/calendar/v3/calendars/primary/events",
		{
			method: "POST",
			headers: {
				Authorization: "Bearer " + accessToken,
			},
			body: JSON.stringify(event),
		}
	)
		.then((data) => {
			return data.json();
		})
		.then((data) => {
			console.log(data);
			console.log("event created");
		});
	return;
}
