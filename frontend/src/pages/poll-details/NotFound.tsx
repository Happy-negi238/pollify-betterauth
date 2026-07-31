import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-slate-900">Poll Not Found</h1>

        <p className="mt-3 text-slate-500">
          The poll you're looking for doesn't exist, has been removed, or the
          link is invalid.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
