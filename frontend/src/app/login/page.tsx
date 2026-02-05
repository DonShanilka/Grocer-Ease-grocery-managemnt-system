"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "@/src/reducer/AuthSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppDispatch, RootState } from "@/src/store/Store";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: "", // This will handle both username or email
        password: "",
    });

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(login(formData));
        if (login.fulfilled.match(result)) {
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
                <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Welcome Back
                </h1>
                <p className="text-gray-400 text-center mb-8 text-sm">Sign in to manage your grocery store</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Username or Email</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono text-sm"
                            placeholder="admin@example.com"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="block text-sm font-medium text-gray-400">Password</label>
                            <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot?</a>
                        </div>
                        <input
                            type="password"
                            required
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-blue-500/25 mt-4"
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium ml-1">
                        Register for free
                    </Link>
                </p>
            </div>
        </div>
    );
}
