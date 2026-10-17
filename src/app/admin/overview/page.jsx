"use client";

import { useState, useEffect } from "react";
import { Users, MessageSquare, ArrowUpRight, ShieldCheck, LoaderCircle, Mail, Phone, Calendar, ArrowRightFromLine, ArrowRight } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { getRegister } from "@/lib/api/register";
import { getContact } from "@/lib/api/contact";

export default function AdminDashboardOverview() {
    const [stats, setStats] = useState({
        totalRegistrations: 0,
        totalContacts: 0,
    });
    const [recentRegistrations, setRecentRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {

            const [regRes, contactRes] = await Promise.all([
                getRegister(),
                getContact()
            ]);

            const regs = regRes.success ? (regRes.data || []) : [];
            const contacts = contactRes.success ? (contactRes.data || []) : [];

            setStats({
                totalRegistrations: regs.length,
                totalContacts: contacts.length,
            });

            setRecentRegistrations(regs.slice(0, 5));

        } catch (err) {
            console.error("Dashboard fetch error:", err);
            toast.error("Failed to load dashboard summary!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#F7F5F0] dark:bg-[#111827]">
                <LoaderCircle className="animate-spin text-[#6A795D]" size={36} />
            </div>
        );
    }

    return (
        <div className="min-h-screen  text-[#1A1A1A] dark:text-gray-100 px-4 sm:px-8 py-10 transition-colors duration-300">
            <Toaster position="top-right" />

            <div className="max-w-7xl mx-auto space-y-8">

                <div className="border-b border-[#D6CDBC] dark:border-gray-800 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase  tracking-tight text-[#0B132B] dark:text-white">
                            Dashboard Overview
                        </h1>
                        <p className="text-xs uppercase tracking-wider text-[#7A7568] dark:text-gray-400 mt-1">
                            Welcome back, Admin. Here is the live summary of BGCTUB Tech Fest.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6A795D]/10 dark:bg-gray-800 border border-[#6A795D]/30 text-xs font-mono font-bold text-[#6A795D] dark:text-[#A9B884]">
                        <ShieldCheck size={15} />
                        <span>System Secure & Active</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Total Registrations */}
                    <div className=" border border-[#D6CDBC] dark:border-gray-700 p-6 shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                                Total Registrations
                            </span>
                            <h2 className="text-4xl font-black  text-[#0B132B] dark:text-white">
                                {stats.totalRegistrations}
                            </h2>
                        </div>
                        <div className="h-12 w-12 bg-[#6A795D]/10 dark:bg-gray-800 text-[#6A795D] dark:text-[#A9B884] flex items-center justify-center rounded-sm">
                            <Users size={24} />
                        </div>
                    </div>

                    <div className=" border border-[#D6CDBC] dark:border-gray-700 p-6 shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                                Contact Inquiries
                            </span>
                            <h2 className="text-4xl font-black  text-[#0B132B] dark:text-white">
                                {stats.totalContacts}
                            </h2>
                        </div>
                        <div className="h-12 w-12 bg-[#6A795D]/10 dark:bg-gray-800 text-[#6A795D] dark:text-[#A9B884] flex items-center justify-center rounded-sm">
                            <MessageSquare size={24} />
                        </div>
                    </div>

                    <div className=" border border-[#D6CDBC] dark:border-gray-700 p-6 shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                                Fest Date / Status
                            </span>
                            <h2 className="text-xl font-bold  text-[#6A795D] dark:text-[#A9B884]">
                                Nov 01 - 05, 2026
                            </h2>
                        </div>
                        <div className="h-12 w-12 bg-[#6A795D]/10 dark:bg-gray-800 text-[#6A795D] dark:text-[#A9B884] flex items-center justify-center rounded-sm">
                            <Calendar size={24} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center pt-2">
                    <span className="font-mono text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Quick Links:</span>
                    <Link
                        href="/admin/registration"
                        className="px-4 py-2 bg-[#6A795D] hover:bg-[#526047] text-white font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 shadow-xs"
                    >
                        <span>Manage Registrations</span>
                        <ArrowUpRight size={14} />
                    </Link>
                    <Link
                        href="/admin/message"
                        className="px-4 py-2  border border-[#D6CDBC] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 shadow-xs"
                    >
                        <span>View Contact Messages</span>
                        <ArrowUpRight size={14} />
                    </Link>
                </div>

                <div className=" border border-[#D6CDBC] dark:border-gray-700 p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
                        <h2 className="text-lg font-bold uppercase tracking-tight text-[#0B132B] dark:text-white">
                            Recent Registrations
                        </h2>
                        <Link
                            href="/admin/registration"
                            className="font-mono text-xs text-[#6A795D] dark:text-[#A9B884] hover:underline uppercase font-bold flex items-center"
                        >
                            <span>View All</span>
                            <ArrowRight size={10}/>
                        </Link>
                    </div>

                    {recentRegistrations.length === 0 ? (
                        <div className="py-8 text-center text-xs text-gray-500 font-mono">
                            No registration entries found yet.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-800 font-mono text-[11px] text-gray-500 dark:text-gray-400 uppercase">
                                        <th className="py-3 px-4 font-bold">Delegate Name</th>
                                        <th className="py-3 px-4 font-bold">Email</th>
                                        <th className="py-3 px-4 font-bold">Attending As</th>
                                        <th className="py-3 px-4 font-bold">Organisation</th>
                                        <th className="py-3 px-4 font-bold text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs font-mono">
                                    {recentRegistrations.map((reg) => (
                                        <tr key={reg.id || reg._id} className="hover:bg-[#FAFAF7] dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">
                                                {reg.first_name} {reg.last_name}
                                            </td>
                                            <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">
                                                {reg.email}
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span className="px-2 py-0.5 bg-[#6A795D]/10 text-[#6A795D] dark:text-[#A9B884] text-[10px] font-bold uppercase border border-[#6A795D]/20">
                                                    {reg.attending_as || "Delegate"}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">
                                                {reg.organisation || "N/A"}
                                            </td>
                                            <td className="py-3.5 px-4 text-right text-gray-400">
                                                {new Date(reg.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}