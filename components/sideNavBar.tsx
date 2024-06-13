import Link from "next/link";
import { auth } from "@/utils/firebase/Firebase";

import { useRouter } from "next/navigation";
import { RiHome3Line } from "react-icons/ri";
import { IoIosChatboxes } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
const SideNavBar = () => {
	const router = useRouter();
	const handleSignOut = () => {
		signOut().then(() => {
			router.push("/");
		});
	};
	return (
		<nav className="h-screen bg-gray-800 text-white min-w-[15vw] p-4">
			<div className="">
				<h1 className="text-2xl font-bold border-b-4 shadow-md border-gray-700 w-full text-center">
					KOlivia
				</h1>
			</div>
			<ul className="space-y-10 just">
				<li className="">
					<Link
						href="/"
						className="py-2 mt-4 p-2 hover:bg-gray-700 w-full flex gap-4 rounded-md transition ease-in duration-50"
					>
						<div className="flex gap-4 w-full place-content-center">

						<RiHome3Line className="text-xl" />
						Home
						</div>
					</Link>
				</li>
				<li className="">
					<Link
						href="/chat"
						className="py-2 p-2 hover:bg-gray-700 w-full flex gap-4 rounded-md transition ease-in duration-50"
					>
						<div className="flex gap-4 w-full place-content-center">

						<IoIosChatboxes className="text-xl" />
						Chat
						</div>
					</Link>
				</li>
				<li className="flex">
					<Link
						href="/profile"
						className="py-2 p-2 hover:bg-gray-700 w-full flex gap-4 rounded-md transition ease-in duration-50"
					>
						<div className="flex gap-4 w-full place-content-center">

						<MdAccountCircle className="text-xl" />
						Profile
						</div>
					</Link>
				</li>
				<li className="flex">
					<Link
						href="#"
						className="py-2 p-2 hover:bg-gray-700 w-full flex gap-4 rounded-md transition ease-in duration-50"
						onClick={handleSignOut}
					>
						<div className="flex gap-4 w-full place-content-center">

						<FaSignOutAlt className="text-xl" />
						Sign Out
						</div>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default SideNavBar;
