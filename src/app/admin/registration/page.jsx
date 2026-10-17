"use client";

import { useState, useEffect } from "react";
import { Trash2, LoaderCircle, Mail, Phone, Building, Calendar, UserCheck } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { getRegister } from "@/lib/api/register";
import { deleteRegister } from "@/lib/action/register";

export default function AdminRegistrationsPage() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch registrations data
    const fetchRegistrationsData = async () => {
        try {
            const res = await getRegister();
            if (res.success) {
                setRegistrations(res.data || []);
            } else {
                toast.error(res.message || "Failed to load registrations!");
            }
        } catch (err) {
            console.error("Error loading registrations:", err);
            toast.error("Something went wrong while loading registrations!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrationsData();
    }, []);

    const handleDelete = (id) => {
        toast((t) => (
            <div className="flex flex-col gap-3 text-sm text-gray-800 dark:text-black">
                <p className="font-semibold">Are you sure you want to delete this registration?</p>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 text-xs bg-gray-300 dark:bg-white  font-bold cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                const data = await deleteRegister(id);
                                if (data && data.success) {
                                    setRegistrations((prev) => prev.filter(r => (r.id || r._id) !== id));
                                    toast.success("Registration deleted successfully!");
                                } else {
                                    toast.error( "Delete failed!");
                                }
                            } catch (err) {
                                // console.error("Delete failed:", err);
                                toast.error("Failed to delete registration!");
                            }
                        }}
                        className="px-3 py-1 text-xs bg-red-600 text-white  hover:bg-red-700 font-bold cursor-pointer"
                    >
                        Confirm
                    </button>

                </div>
            </div>
        ), { duration: Infinity });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F2E7] dark:bg-[#111827]">
                <LoaderCircle className="animate-spin text-[#6A795D]" size={36} />
            </div>
        );
    }

    return (
        <div className="min-h-screen dark:text-white px-4 sm:px-8 py-10 transition-colors duration-300">
            <Toaster position="top-right" reverseOrder={false} />

            <div className="mx-auto max-w-7xl">

                <div className="mb-8 border-b border-[#D9D28B]/60 pb-5 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                            Event Registrations ({registrations.length})
                        </h1>
                        <p className="text-xs uppercase tracking-wider text-[#7A7568] dark:text-gray-400 mt-1">
                            Review and manage participants registered for BGCTUB Tech Fest
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {registrations.length === 0 ? (
                        <div className="border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center text-sm text-gray-500 ">
                            No registrations found yet.
                        </div>
                    ) : (
                        registrations.map((reg) => {
                            const regId = reg.id || reg._id;
                            return (
                                <div
                                    key={regId}
                                    className="flex flex-col md:flex-row items-start md:items-center justify-between border border-[#D9D28B] dark:border-gray-700 bg-white dark:bg-[#161922] p-5 sm:p-6 gap-6 shadow-xs "
                                >
                                    <div className="space-y-3 flex-1">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                                {reg.first_name} {reg.last_name}
                                            </h3>
                                            <span className="text-[10px] font-mono px-2.5 py-0.5 bg-[#6A795D]/10 text-[#6A795D] dark:text-[#A9B884] border border-[#6A795D]/30 uppercase font-bold">
                                                {reg.attending_as || "Delegate"}
                                            </span>
                                            <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1 ml-auto">
                                                <Calendar size={12} />
                                                {new Date(reg.created_at).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-600 dark:text-gray-400">
                                            <a href={`mailto:${reg.email}`} className="flex items-center gap-1.5 hover:text-[#6A795D]">
                                                <Mail size={14} className="text-[#8B7E58]" />
                                                <span>{reg.email}</span>
                                            </a>
                                            {reg.whatsapp && (
                                                <span className="flex items-center gap-1.5">
                                                    <Phone size={14} className="text-[#8B7E58]" />
                                                    <span>{reg.whatsapp}</span>
                                                </span>
                                            )}
                                            {reg.organisation && (
                                                <span className="flex items-center gap-1.5">
                                                    <Building size={14} className="text-[#8B7E58]" />
                                                    <span>{reg.organisation}</span>
                                                </span>
                                            )}
                                        </div>

                                        {reg.notes && (
                                            <div className="p-3 bg-[#FAFAF7] dark:bg-[#12161F] border border-gray-200 dark:border-gray-800 text-xs sm:text-sm text-gray-700 dark:text-gray-300  leading-relaxed">
                                                <span className="font-bold font-mono text-[11px] text-[#8B7E58] block mb-1 uppercase">Notes:</span>
                                                {reg.notes}
                                            </div>
                                        )}
                                    </div>

                                    <div className="self-end md:self-center">
                                        <button
                                            onClick={() => handleDelete(regId)}
                                            className="h-10 w-10 flex items-center justify-center border border-red-300 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 transition-colors  cursor-pointer"
                                            title="Delete Registration"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

            </div>
        </div>
    );
}