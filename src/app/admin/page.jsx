'use client';
import React, { useState, useEffect } from 'react';
import {
    Shield,
    Eye,
    EyeOff,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { adminSignIn } from '@/lib/action/user';
import { useRouter } from 'next/navigation';

export default function AdminSignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const router = useRouter();

    useEffect(() => {
        const adminUser = localStorage.getItem('admin_user');
        if (adminUser) {
            router.replace('/admin/overview');
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        if (!email || !password) {
            setError('Please fill in both email and password fields.');
            return;
        }

        setIsLoading(true);

        try {
            const data = await adminSignIn(email, password);

            if (!data || !data.success) {
                throw new Error(data?.message || 'Invalid credentials. Please try again.');
            }

            setSuccessMsg(`Welcome back, ${data.data?.name || 'Admin'}! Redirecting...`);

            if (data.data) {
                localStorage.setItem('admin_user', JSON.stringify(data.data));
            }

            setTimeout(() => {
                router.push('/admin/overview');
            }, 1200);

        } catch (err) {
            console.error('Sign In Error:', err);
            setError(err.message || 'Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#6A795D] text-white flex flex-col justify-between font-sans selection:bg-red-500 selection:text-white relative overflow-hidden">

            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl mx-auto items-center px-4 sm:px-8 py-8 lg:py-0 z-10">

                <div className="hidden lg:flex flex-col justify-between h-auto max-w-lg pr-8 lg:pr-12 space-y-8 my-auto border-r border-white/10 py-12">

                    <div className="space-y-6">
                        <div className="w-14 h-14 bg-[#E53935] flex items-center justify-center rounded-sm shadow-lg shadow-red-900/20">
                            <Shield className="w-7 h-7 text-white" />
                        </div>

                        <div className="font-mono text-xs tracking-widest text-[#ffcdd2] font-bold uppercase">
                            PROTECTED WORKSPACE · 2026
                        </div>

                        <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight uppercase">
                            THE PUBLIC RECORD STARTS BEHIND THIS DOOR.
                        </h1>

                        <p className="text-slate-100 text-sm leading-relaxed font-normal opacity-90">
                            Edit the summit, receive enquiries, publish regional briefings, and manage correspondence from one controlled workspace.
                        </p>
                    </div>

                    <div className="pt-6">
                        <div className="inline-flex items-center space-x-2 bg-black/30 border border-white/10 px-3.5 py-1.5 rounded-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="font-mono text-[11px] font-semibold text-slate-200 uppercase tracking-widest">
                                MANAGED CONTENT STORE
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-center lg:justify-end items-center my-auto">
                    <div className="w-full max-w-md bg-[#F4F5F7] text-slate-900 rounded-sm p-8 sm:p-10 shadow-2xl relative border border-slate-200">

                        <div className="font-mono text-xs font-bold text-[#D32F2F] tracking-widest uppercase mb-1">
                            WELCOME BACK
                        </div>

                        <h2 className="text-2xl font-black text-[#0B132B] uppercase tracking-wider mb-8">
                            SIGN IN
                        </h2>

                        {error && (
                            <div className="mb-6 p-3.5 bg-red-50 border-l-4 border-red-600 rounded-r text-red-700 text-xs font-medium flex items-start space-x-2">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                                <span>{error}</span>
                            </div>
                        )}

                        
                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div className="space-y-1.5">
                                <label className="block font-mono text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                                    EMAIL ADDRESS
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E293B] focus:border-transparent transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block font-mono text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                                    PASSWORD
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E293B] focus:border-transparent transition-all pr-10 placeholder:text-slate-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1"
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-2 py-3 px-4 bg-[#1E2942] hover:bg-[#0F172A] active:bg-[#020617] text-white font-medium text-sm rounded-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer uppercase"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin text-slate-300" />
                                        <span>Verifying session...</span>
                                    </>
                                ) : (
                                    <span>Enter control room</span>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-200">
                            <p className="text-slate-500 text-xs leading-relaxed">
                                Public account creation is closed. An administrator must create every additional team account.
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            <footer className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-10 text-slate-200 text-xs font-mono opacity-80">
                <div>
                    <span>SECURE SYSTEM</span>
                </div>
            </footer>

        </div>
    );
}