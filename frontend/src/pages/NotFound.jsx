import React from "react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="text-center p-10 bg-white shadow-xl rounded-lg">
        <h1 className="text-9xl font-extrabold text-amber-500 mb-4">404</h1>

        <p className="text-3xl font-semibold text-gray-800 mb-6">
          Page Not Found
        </p>

        <a
          href="/"
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
