"use client";
import React from "react";
import SideNavBar from "@/components/sideNavBar";
import { useEffect } from "react";
import { auth } from "@/utils/firebase/Firebase";
import { useRouter } from "next/navigation";

export default function Profile() {
	const router = useRouter();
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

				<button className="bg-green-500 text-white py-2 px-4 rounded-md">
					Link Google Account
				</button>
			</div>
		</div>
	);
}
