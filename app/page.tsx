import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <div
          aria-hidden="true"
          className="-z-10 absolute inset-y-16 inset-x-0 w-16 rounded-full animate-rotate-360 bg-gradient-to-b from-pink-500 to-purple-600 blur-3xl mx-auto scale-y-150 scale-x-175 opacity-75"
        ></div>
        <h1 className="relative text-8xl font-bold select-none">KOlivia</h1>
        <div className="grid grid-cols-2 gap-5 text-2xl pt-8">
          <button className="rounded-full bg-purple-700 py-2 px-4 hover:bg-purple-900 transition ease-in delay-75 duration-100 shadow-md">
            <Link href="/testing">Login</Link>
          </button>
          <button className="rounded-full bg-purple-700 py-2 px-4 hover:bg-purple-900 transition ease-in delay-75 duration-100 shadow-md">
            <Link href="/register">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
