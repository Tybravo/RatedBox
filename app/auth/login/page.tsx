"use client";

import LoginForm from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const handleSuccess = (token: string, user: any) => {
    // Store token if needed (though usually handled by cookies or local storage in the form/api)
    // For now, let's assume the API or Form handles storage or we do it here
    // The previous read of LoginForm didn't show storage logic, so I should probably add it here or in the form.
    // However, usually we store it in localStorage or cookies.
    // Let's store in localStorage for simplicity as requested "JWT for auth session"
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    
    router.push("/"); // Redirect to account or home
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gray-50/50">
      <div className="w-full max-w-md">
        <LoginForm onSuccess={handleSuccess} />
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-primary font-medium hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
