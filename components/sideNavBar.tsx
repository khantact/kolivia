import Link from "next/link";
import { auth } from "@/utils/firebase/Firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
const SideNavBar = () => {
	const router = useRouter();
	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				router.push("/");
			})
			.catch((e) => {
				// console.log(e.message);
			});
	};
	return (
		<nav className="h-screen bg-gray-800 text-white">
			<div className="p-4">
				<h1 className="text-xl font-bold border-b-4 shadow-md border-gray-700">
					KOlivia
				</h1>
			</div>
			<ul className="space-y-2">
				<li>
					<Link
						href="/"
						className="block py-2 px-4 hover:bg-gray-700"
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						href="/chat"
						className="block py-2 px-4 hover:bg-gray-700"
					>
						Chat
					</Link>
				</li>
				<li>
					<Link
						href="/profile"
						className="block py-2 px-4 hover:bg-gray-700"
					>
						Profile
					</Link>
				</li>
				<li>
					<Link
						href="#"
						className="block py-2 px-4 hover:bg-gray-700 "
						onClick={handleSignOut}
					>
						Sign Out
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default SideNavBar;
