'use client';

import { Cpu, Trophy, Users, Rocket, Award, ShieldCheck } from 'lucide-react';

const stats = [
    { id: 1, label: 'EXPECTED ATTENDEES', value: '300+', icon: Users },
    { id: 2, label: 'CONTEST SEGMENTS', value: '08+', icon: Trophy },
    { id: 3, label: 'UNIVERSITIES JOINING', value: '30+', icon: Cpu },
    { id: 4, label: 'PRIZE POOL (BDT)', value: '100K+', icon: Award },
];

export default function AboutPage() {
    return (
        <section className="bg-[#F7F5F0] text-[#1A1A1A] dark:bg-[#111827] dark:text-gray-100 py-16 sm:py-24 px-6 font-sans border-t border-b border-[#D6CDBC] dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-16">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                    <div className="lg:col-span-7 space-y-4">
                        <div className="inline-flex items-center gap-2 bg-[#6A795D]/10 dark:bg-[#6A795D]/20 border border-[#6A795D]/30 dark:border-[#6A795D]/50 px-3.5 py-1.5 ">
                            <span className="w-2 h-2  bg-[#6A795D] dark:bg-[#8E9162] animate-pulse"></span>
                            <span className="font-mono text-xs font-bold text-[#526047] dark:text-[#A9B884] uppercase tracking-widest">
                                BGC TRUST UNIVERSITY BANGLADESH
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#0B132B] dark:text-white leading-tight">
                            EMPOWERING INNOVATION & TECH LEADERSHIP.
                        </h2>
                    </div>
                    <div className="lg:col-span-5">
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-normal border-l-2 border-[#8B7E58] dark:border-[#D9D28B] pl-4">
                            Organized by the Department of Computer Science & Engineering, BGCTUB Tech Fest is the flagship national technology summit bringing together the brightest engineering minds, competitive programmers, and innovators.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white dark:bg-[#1F2937] border border-[#D6CDBC] dark:border-gray-700 p-8 shadow-sm flex flex-col justify-between space-y-6 hover:border-[#6A795D] dark:hover:border-[#8E9162] transition-colors group ">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-[#6A795D] text-white flex items-center justify-center  shadow-sm">
                                <Rocket className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-wider text-[#0B132B] dark:text-white">
                                Our Vision
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                To cultivate a transformative hub for students to bridge theoretical knowledge with real-world technological advancements, fostering research, problem-solving, and software craftsmanship.
                            </p>
                        </div>
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 font-mono text-[11px] font-semibold text-[#8B7E58] dark:text-[#D9D28B] tracking-widest uppercase">
                            01 · FUTURE READINESS
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1F2937] border border-[#D6CDBC] dark:border-gray-700 p-8 shadow-sm flex flex-col justify-between space-y-6 hover:border-[#6A795D] dark:hover:border-[#8E9162] transition-colors group ">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-[#8B7E58] text-white flex items-center justify-center  shadow-sm">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-wider text-[#0B132B] dark:text-white">
                                Competitive Excellence
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                Hosting prestigious tracks including Inter-University Programming Contests (IUPC), Hackathons, and Project Showcases to challenge and reward national talent.
                            </p>
                        </div>
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 font-mono text-[11px] font-semibold text-[#8B7E58] dark:text-[#D9D28B] tracking-widest uppercase">
                            02 · HIGH-STAKES COMPETITION
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1F2937] border border-[#D6CDBC] dark:border-gray-700 p-8 shadow-sm flex flex-col justify-between space-y-6 hover:border-[#6A795D] dark:hover:border-[#8E9162] transition-colors group ">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-[#1E2942] dark:bg-[#374151] text-white flex items-center justify-center  shadow-sm">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-wider text-[#0B132B] dark:text-white">
                                Industry Bridge
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                Creating seamless career pathways by connecting participating students with industry leaders, tech experts, researchers, and potential recruiters.
                            </p>
                        </div>
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 font-mono text-[11px] font-semibold text-[#8B7E58] dark:text-[#D9D28B] tracking-widest uppercase">
                            03 · NETWORK & GROWTH
                        </div>
                    </div>

                </div>

                <div className="bg-[#656f5c] dark:bg-[#1E293B] text-white p-8 sm:p-10  shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8 border dark:border-gray-800">
                    {stats.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.id} className="space-y-2 border-l border-white/10 dark:border-white/20 pl-6 first:border-l-0 first:pl-0">
                                <div className="flex items-center gap-2 text-[#D9D28B]">
                                    <Icon size={18} />
                                    <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                                        {item.label}
                                    </span>
                                </div>
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                                    {item.value}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}