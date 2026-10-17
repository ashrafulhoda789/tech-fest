"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const pathName = usePathname();

    if(pathName.startsWith('/admin')){
        return null
    }

    return (
        <footer className="relative bg-[#6A795D] text-white dark:bg-[#111827] dark:text-gray-100 border-t dark:border-gray-800 transition-colors duration-300">
            {/* Top Grid Area */}
            <div className="mx-auto max-w-[1600px] px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">

                    {/* Brand Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center border border-white/30 bg-white/10 text-2xl text-[#D9D28B] dark:border-gray-700 dark:bg-gray-800">
                                ✺
                            </div>
                            <div className="leading-tight">
                                <p className="text-base font-black tracking-tight text-white dark:text-gray-100">
                                    CSE TECH FEST 2026
                                </p>
                                <p className="text-[10px] font-bold uppercase tracking-[2px] text-white/80 dark:text-gray-400">
                                    BGC Trust University Bangladesh
                                </p>
                            </div>
                        </Link>

                        <p className="max-w-sm text-xs leading-relaxed text-white/80 dark:text-gray-300">
                            Empowering the next generation of engineers, developers, and tech pioneers through innovation, competitive programming, and creative excellence.
                        </p>

                        <div className="pt-2 text-xs space-y-1.5 text-white/90 dark:text-gray-300">
                            <p className="flex items-center gap-2">
                                <MapPin size={14} className="text-[#D9D28B] dark:text-blue-400" />
                                Chandanaish, Chattogram, Bangladesh
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail size={14} className="text-[#D9D28B] dark:text-blue-400" />
                                techfest@bgctub.ac.bd
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-mono text-xs font-extrabold uppercase tracking-[2px] text-[#D9D28B] dark:text-[#A9B884] mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5 text-xs font-semibold text-white/80 dark:text-gray-300">
                            <li>
                                <Link href="/about" className="hover:text-[#D9D28B] dark:hover:text-blue-400 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="hover:text-[#D9D28B] dark:hover:text-blue-400 transition-colors">
                                    Events Schedule
                                </Link>
                            </li>
                            
                            <li>
                                <Link href="/speakers" className="hover:text-[#D9D28B] dark:hover:text-blue-400 transition-colors">
                                    Guest Speakers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-mono text-xs font-extrabold uppercase tracking-[2px] text-[#D9D28B] dark:text-[#A9B884] mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-2.5 text-xs font-semibold text-white/80 dark:text-gray-300">
                            <li>
                                <Link href="/faq" className="hover:text-[#D9D28B] dark:hover:text-blue-400 transition-colors">
                                    Frequently Asked Questions
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="hover:text-[#D9D28B] dark:hover:text-blue-400 transition-colors">
                                    Registration Guidelines
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#D9D28B] dark:hover:text-blue-400 transition-colors">
                                    Contact Committee
                                </Link>
                            </li>
                            
                        </ul>
                    </div>

                    {/* Action & Back to top */}
                    <div className="flex flex-col justify-between space-y-4">
                        <div>
                            <h4 className="font-mono text-xs font-extrabold uppercase tracking-[2px] text-[#D9D28B] dark:text-[#A9B884] mb-4">
                                Join Fest
                            </h4>
                            <p className="text-xs text-white/80 dark:text-gray-300 mb-3">
                                Reserve your place for the biggest campus tech event.
                            </p>
                            <Link
                                href="/register"
                                className="inline-flex w-full items-center justify-center bg-[#B2BD7E] dark:bg-[#6A795D] px-4 py-2.5 text-xs font-bold uppercase tracking-[1.5px] text-white hover:bg-[#8E9162] dark:hover:bg-[#546249] transition-colors"
                            >
                                Register Now
                            </Link>
                        </div>

                        <button
                            onClick={scrollToTop}
                            className="inline-flex items-center justify-between border border-white/30 dark:border-gray-700 px-3 py-2.5 text-xs font-bold uppercase tracking-[1px] hover:bg-white hover:text-[#6A795D] dark:hover:bg-gray-800 dark:hover:text-white transition-all"
                        >
                            <span>Back to Top</span>
                            <ArrowUp size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="border-t border-white/20 dark:border-gray-800 bg-black/15 dark:bg-black/40 px-6 py-4">
                <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-2 sm:flex-row text-[11px] font-medium text-white/70 dark:text-gray-400">
                    <p>
                        © {new Date().getFullYear()} CSE Tech Fest, BGC Trust University Bangladesh. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:underline hover:text-white dark:hover:text-blue-400">Privacy Policy</Link>
                        <span>•</span>
                        <Link href="/terms" className="hover:underline hover:text-white dark:hover:text-blue-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;