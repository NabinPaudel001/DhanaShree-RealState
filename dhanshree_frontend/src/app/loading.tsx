import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-50 via-white to-sky-50 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Logo Section */}
        <div className="relative">
          <div className="w-24 h-24 bg-white rounded-2xl shadow-2xl border border-sky-200 flex items-center justify-center">
            <img
              src="/user/logo.png"
              alt="Dhanashree Real Estate"
              className="w-16 h-16 object-contain"
            />
          </div>
          {/* Animated Ring */}
          <div className="absolute inset-0 rounded-2xl border-4 border-transparent border-t-sky-500 animate-spin"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 via-sky-700 to-sky-600 bg-clip-text text-transparent">
            Dhanashree Real Estate
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <p className="text-sky-600 font-medium">
            Loading your dream properties...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-sky-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-500 to-sky-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
