'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F7F2E7] dark:bg-[#0F172A] text-[#1E293B] dark:text-slate-100 flex flex-col items-center justify-center px-6 py-12 selection:bg-[#B39050] selection:text-white transition-colors duration-300">

            <div className="w-full max-w-md bg-white dark:bg-[#1E293B] border border-[#C2B280]/40 dark:border-[#B39050]/30 shadow-xl shadow-stone-200/60 dark:shadow-none p-10 sm:p-12 text-center mb-8 transform transition-transform hover:scale-[1.01]">
                {/* Large Gold Serif 404 */}
                <h1 className="text-7xl sm:text-8xl tracking-tight text-[#B39050] dark:text-[#D4AF37] mb-3 select-none">
                    404
                </h1>

                <div className="w-12 h-[1px] bg-[#B39050]/40 dark:bg-[#D4AF37]/40 mx-auto mb-4" />

                <p className="text-xs font-semibold tracking-[0.25em] text-[#B39050] dark:text-[#D4AF37] uppercase">
                    OUT OF THE DECK
                </p>
            </div>

            <div className="max-w-lg text-center space-y-3 mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] dark:text-white tracking-tight">
                    This page is outside the record.
                </h2>

                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                    The address may have changed. Return to the summit archive or continue with the programme.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
                <Link
                    href="/"
                    className="w-full sm:w-auto px-7 py-3 bg-[#B2BD7E] hover:bg-[#8E9162] dark:bg-[#B39050] dark:hover:bg-[#96783B] text-white text-sm font-medium transition-colors duration-200 text-center shadow-sm"
                >
                    Return home
                </Link>

                <Link
                    href="/fests"
                    className="w-full sm:w-auto px-7 py-3 bg-white dark:bg-[#1E293B] hover:bg-stone-50 dark:hover:bg-[#334155] text-[#1E293B] dark:text-slate-200 border border-[#B39050] dark:border-[#B39050]/60 text-sm font-medium transition-colors duration-200 text-center shadow-sm"
                >
                    View Events
                </Link>
            </div>

        </div>
    );
}