"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

export default function AccessAccountPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gray-50/50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-700/50 hover:-translate-y-1 transition-all duration-300 text-center border border-gray-100">
        
        {/* Logo Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
            <MapPin className="w-10 h-10 text-white" fill="currentColor" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-primary-dark mb-4 tracking-tight">
          CleanRest
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-10 text-lg leading-relaxed">
          Login here or Register an account <br />
          in seconds to access exciting <br />
          features
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <Link 
            href="/auth/login"
            className="block w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl transition-colors duration-300 shadow-md shadow-primary/20 flex items-center justify-center gap-2"
          >
            <span>Login here</span>
            <span className="text-xl">→</span>
          </Link>

          <Link 
            href="/auth/register"
            className="block w-full bg-white border-2 border-primary text-primary hover:bg-blue-50 font-semibold py-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span>
            <span>Register in Seconds</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
