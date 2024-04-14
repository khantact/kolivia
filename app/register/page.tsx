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
					router.push("/chat");
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
			<div className="spinningBackground"></div>
			<Link
				href="/"
				className="mb-4 text-blue-500 text-sm hover:text-blue-300 hover:underline transition ease-in"
			>
				&larr; Back to Home
			</Link>
			<form
				className="bg-gray-700 p-4 px-16 shadow-lg rounded-md relative select-none"
				onSubmit={handleFormSubmit}
			>
				<h2 className="text-2xl mb-6 text-center font-bold">
					Register
				</h2>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium select-none"
					>
						Email
					</label>
					<input
						onChange={handleEmailChange}
						value={email}
						type="email"
						id="email"
						name="email"
						required
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
						value={password}
						required
						onChange={handlePasswordChange}
						type="password"
						id="password"
						name="password"
						className="inputBox"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium select-none"
					>
						Confirm Password
					</label>
					<input
						onChange={handleConfirmPasswordChange}
						value={confirmPassword}
						type="password"
						required
						id="confirmPassword"
						name="confirmPassword"
						className="inputBox"
					/>
				</div>

				<button
					type="submit"
					className="text-white py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 transition ease-in duration-75 w-full"
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

export default Register;
