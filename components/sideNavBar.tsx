import Link from "next/link";

const SideNavBar = () => {
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
			</ul>
		</nav>
	);
};

export default SideNavBar;
