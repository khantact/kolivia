"use client";
import Link from "next/link";
import { auth } from "../utils/firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
export default function Home() {
	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setSignedIn(true);
			} else {
				setSignedIn(false);
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<div>
			<div className="flex flex-col min-h-screen justify-center items-center">
				<div aria-hidden="true" className="spinningBackground"></div>
				<h1 className="relative text-8xl font-bold select-none">
					KOlivia
				</h1>
				{signedIn ? (
					<div className="grid grid-cols-1 text-2xl pt-8">
						<button className="rounded-full bg-purple-700 py-2 px-4 hover:bg-purple-900 transition ease-in delay-75 duration-100 shadow-md">
							<Link href="/chat">Chat!</Link>
						</button>
					</div>
				) : (
					<div className="grid grid-cols-2 gap-5 text-2xl pt-8">
						<button className="rounded-full bg-purple-700 py-2 px-4 hover:bg-purple-900 transition ease-in delay-75 duration-100 shadow-md">
							<Link href="/login">Login</Link>
						</button>
						<button className="rounded-full bg-purple-700 py-2 px-4 hover:bg-purple-900 transition ease-in delay-75 duration-100 shadow-md">
							<Link href="/register">Register</Link>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
