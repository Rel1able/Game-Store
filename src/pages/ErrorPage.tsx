import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <h1 className="text-6xl font-bold dark:text-white">404</h1>
      <p className="text-2xl dark:text-gray-200">Page Not Found</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go Home
      </Link>
    </div>
  );
}
