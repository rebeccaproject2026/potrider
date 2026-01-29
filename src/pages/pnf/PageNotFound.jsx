import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F4F7FB] px-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        {/* 404 text */}
        <h1 className="text-6xl font-extrabold text-gray-800 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Page Not Found
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

