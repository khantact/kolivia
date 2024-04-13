"use client";
import { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/Firebase";
import { useRouter } from "next/navigation";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [pwdConditionsMet, setPwdConditionsMet] = useState(false);
	const router = useRouter();

	const handleEmailChange = (e: any) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: any) => {
		setPassword(e.target.value);
	};

	const handleConfirmPasswordChange = (e: any) => {
		setConfirmPassword(e.target.value);
	};

	const validateForm = () => {
		if (password !== confirmPassword) {
			setErrorMessage("Passwords do not match!");
			setPwdConditionsMet(false);
		} else if (password.length < 6 || !/\d/.test(password)) {
			setErrorMessage(
				"Passwords must be at least 6 characters long and contain at least one number"
			);
			setPwdConditionsMet(false);
		} else {
			setErrorMessage("");
			setPwdConditionsMet(true);
		}
	};
	const handleFormSubmit = (e: any) => {
		e.preventDefault();
		validateForm();
		if (pwdConditionsMet) {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					console.log("success in creating user");
					router.push("/testing");
				})
				.catch((e) => {
					const errorCode = e.code;
					const errorMessage = e.message;
					console.log(
						"Error code: ",
						errorCode,
						"Error message: ",
						errorMessage
					);
				});
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<Link href="/" className="mb-4 text-blue-500 text-sm">
				&larr; Back to Home
			</Link>
			<form
				className="bg-gray-700 p-4 px-16 shadow-md rounded-md relative"
				onSubmit={handleFormSubmit}
			>
				<h2 className="text-2xl mb-6">Register</h2>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium"
					>
						Email
					</label>
					<input
						onChange={handleEmailChange}
						value={email}
						type="email"
						id="email"
						name="email"
						className="mt-1 p-2 border rounded-md w-full text-black"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium"
					>
						Password
					</label>
					<input
						value={password}
						onChange={handlePasswordChange}
						type="password"
						id="password"
						name="password"
						className="mt-1 p-2 border rounded-md w-full text-black"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium"
					>
						Confirm Password
					</label>
					<input
						onChange={handleConfirmPasswordChange}
						value={confirmPassword}
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						className="mt-1 p-2 border rounded-md w-full text-black"
					/>
				</div>

				<button
					type="submit"
					className="text-white py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 transition ease-in duration-75"
				>
					Register
				</button>
			</form>
			<div
				className={
					errorMessage
						? "absolute bottom-4 right-4 bg-red-400 rounded-md p-4 text-pretty flex items-center"
						: "hidden"
				}
			>
				<span className="mr-2">{errorMessage}</span>
				<button
					className="text-white hover:text-gray-300"
					onClick={() => setErrorMessage("")}
				>
					X
				</button>
			</div>
		</div>
	);
};

export default Register;
