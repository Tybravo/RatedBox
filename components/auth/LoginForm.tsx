"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const loginSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
    onSuccess?: (token: string, user: any) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      // Success
      if (onSuccess) onSuccess(result.token, result.user);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-primary shadow-sm hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">Login</h2>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="Enter phone number"
            className="w-full px-4 py-2 rounded-lg border-2 border-accent-purple focus:outline-none focus:ring-2 focus:ring-accent-purple/50 transition-colors"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 rounded-lg border-2 border-accent-purple focus:outline-none focus:ring-2 focus:ring-accent-purple/50 transition-colors"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex justify-end">
            <Link href="#" className="text-sm text-primary hover:underline">
                Forgot password?
            </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
}
