"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { auth } from "../utils/firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

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
				<h1 className="relative text-8xl font-bold select-none shadow-lg font-serif">
					KOlivia
				</h1>
				<div className="w-max">
					<h1 className="text-center animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-white pr-1 text-xl text-white">
						Your personal AI assistant.
					</h1>
				</div>
				{signedIn ? (
					<div className="grid grid-cols-1 text-2xl pt-8">
						<button className="rounded-md bg-purple-700 py-2 px-4 hover:bg-purple-900 transition ease-in delay-75 duration-75 shadow-md">
							<Link href="/chat">Chat!</Link>
						</button>
					</div>
				) : (
					<div className="grid grid-cols-2 gap-5 text-2xl pt-8">
						<button
							onClick={async () => {
								await signIn("google", {
									callbackUrl: "/chat",
								});
							}}
							className="rounded-full bg-purple-700 py-2 px-4 hover:bg-purple-900 transition ease-in delay-75 duration-100 shadow-md"
						>
							Login
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
