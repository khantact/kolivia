"use client";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/Firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();

	const handleEmailChange = (e: any) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e: any) => {
		setPassword(e.target.value);
	};

	const handleFormSubmit = (e: any) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setErrorMessage("");
				router.push("/chat");
			})
			.catch((e) => {
				const eCode = e.code;
				if (e.code) {
					setErrorMessage("Invalid login, please try again.");
				}
			});
	};
	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<div className="spinningBackground"></div>
			<Link
				className="mb-4 text-blue-500 text-sm hover:text-blue-300 hover:underline transition ease-in"
				href="/"
			>
				&larr; Back to Home
			</Link>
			<form
				className="bg-gray-700 p-8 px-16 shadow-md rounded-md"
				onSubmit={handleFormSubmit}
			>
				<h2 className="text-2xl mb-6 font-bold text-center select-none ">
					Login
				</h2>

				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium select-none"
					>
						Email
					</label>
					<input
						type="email"
						required
						onChange={handleEmailChange}
						value={email}
						id="email"
						name="email"
						className="inputBox"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium select-none"
					>
						Password
					</label>
					<input
						type="password"
						onChange={handlePasswordChange}
						required
						value={password}
						id="password"
						name="password"
						className="inputBox"
					/>
				</div>

				<button
					type="submit"
					className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full transition ease-in duration-75"
				>
					Log In
				</button>
			</form>
			<Link
				href="/resetpassword"
				className="text-blue-500 text-sm hover:underline hover:text-blue-300 mt-4 transition ease-in"
			>
				Forgot Password?
			</Link>

			<div
				className={
					errorMessage
						? "absolute bottom-4 right-4 bg-red-400 rounded-md p-4 text-pretty flex items-center"
						: "hidden"
				}
			>
				<span className="mr-2">{errorMessage}</span>
				<button
					className="text-white hover:text-gray-500"
					onClick={() => setErrorMessage("")}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M14.121 14.121a1 1 0 0 1-1.414 0L10 11.414l-2.121 2.121a1 1 0 1 1-1.414-1.414L8.586 10 6.465 7.879a1 1 0 1 1 1.414-1.414L10 8.586l2.121-2.121a1 1 0 1 1 1.414 1.414L11.414 10l2.121 2.121a1 1 0 0 1 0 1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Login;
