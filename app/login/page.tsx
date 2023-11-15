import Link from "next/link";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <a className="mb-4 text-blue-500 text-sm">
        <Link href="/">&larr; Back to Home</Link>
      </a>
      <form className="bg-gray-700 p-8 px-16 shadow-md rounded-md">
        <h2 className="text-2xl mb-6">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 border rounded-md w-full text-black"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 border rounded-md w-full text-black"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
