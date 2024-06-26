"use client";
import React from "react";
import SideNavBar from "@/components/sideNavBar";
import { useState } from "react";
import { auth } from "@/utils/firebase/Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authConfig, loginIsRequired } from "@/utils/auth";
import { getSession } from "next-auth/react";
export default function Profile() {
	loginIsRequired();
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

				<button className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2 cursor-not-allowed" disabled>
					Change Password
				</button>

				<button className="bg-red-500 text-white py-2 px-4 rounded-md mr-2">
					Delete Account
				</button>

				<button
					onClick={handleAuth}
					className="bg-gray-500 text-white py-2 px-4 rounded-md cursor-not-allowed" disabled
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
