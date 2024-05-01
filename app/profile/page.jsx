"use client";
import React from "react";
import SideNavBar from "@/components/sideNavBar";
import { useEffect, useState } from "react";
import { auth } from "@/utils/firebase/Firebase";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import * as gapi from "google-api-javascript-client";
export default function Profile() {
	const router = useRouter();
	const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
	const API_KEY = process.env.GOOGLE_API_KEY;
	const provider = new GoogleAuthProvider();
	const [googleAccountLinked, setGoogleAccountLinked] = useState(false);
	const [googleUser, setGoogleUser] = useState(null);

	// GOOGLE CALENDAR HELPER FUNCTIONS
	const handleAuth = () => {
		if (!googleAccountLinked) {
			signInWithPopup(auth, provider)
				.then((result) => {
					// access token
					const credential =
						GoogleAuthProvider.credentialFromResult(result);
					const token = credential?.accessToken;
					const user = result.user;
					setGoogleAccountLinked(true);
					setGoogleUser(user);
				})
				.catch((e) => {
					console.log("error logging in google account");
					console.log("error message:", e.message);
					setGoogleAccountLinked(false);
				});
		}
	};

	// auth checking
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (!user) {
				router.push("/login");
			}
		});

		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex">
			<div className="">
				<SideNavBar />
			</div>
			<div className="grow p-4">
				<h1 className="text-2xl font-bold mb-4">Profile Settings</h1>

				<div className="mb-4">
					<label
						htmlFor="newPassword"
						className="block font-semibold"
					>
						New Password
					</label>
					<input
						type="password"
						id="newPassword"
						className="border rounded-md p-2 w-full"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="confirmNewPassword"
						className="block font-semibold"
					>
						Confirm New Password
					</label>
					<input
						type="password"
						id="confirmNewPassword"
						className="border rounded-md p-2 w-full"
					/>
				</div>

				<button className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">
					Change Password
				</button>

				<button className="bg-red-500 text-white py-2 px-4 rounded-md mr-2">
					Delete Account
				</button>

				<button
					onClick={handleAuth}
					className="bg-green-500 text-white py-2 px-4 rounded-md"
				>
					{googleAccountLinked ? (
						<span>Google Account Already Linked!</span>
					) : (
						<span>Link Google Account</span>
					)}
				</button>
			</div>
		</div>
	);
}
