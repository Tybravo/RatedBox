"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const handleSuccess = () => {
    // No redirect here, let the form handle the success message
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gray-50/50">
      <div className="w-full max-w-md">
        <RegisterForm onSuccess={handleSuccess} />
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary font-medium hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
