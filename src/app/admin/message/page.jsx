"use client";

import { useState, useEffect } from "react";
import { Trash2, LoaderCircle, Mail, Phone, Building, Calendar } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { getContact } from "@/lib/api/contact";
import { deleteContact } from "@/lib/action/contact";

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessagesData = async () => {
        try {
            const res = await getContact();
            if (res.success) {
                setMessages(res.data || []);
            } else {
                toast.error("Failed to load messages!");
            }
        } catch (err) {
            console.error("Error loading messages:", err);
            toast.error("Something went wrong while loading messages!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessagesData();
    }, []);

    const handleDelete = (id) => {
        toast((t) => (
            <div className="flex flex-col gap-3 text-sm text-gray-800 dark:text-black">
                <p className="font-semibold">Are you sure you want to delete this message?</p>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 text-xs bg-gray-300 dark:bg-white font-bold cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                const data = await deleteContact(id);
                                if (data && data.success) {
                                    setMessages((prev) => prev.filter(m => (m.id || m._id) !== id));
                                    toast.success("Message deleted successfully!");
                                } else {
                                    toast.error(data?.message || "Delete failed!");
                                }
                            } catch (err) {
                                console.error("Delete failed:", err);
                                toast.error("Failed to delete message!");
                            }
                        }}
                        className="px-3 py-1 text-xs bg-red-600 text-white hover:bg-red-700 font-bold cursor-pointer"
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
                <LoaderCircle className="animate-spin text-[#A48643]" size={36} />
            </div>
        );
    }

    return (
        <div className="min-h-screen dark:text-white px-4 sm:px-8 py-10 transition-colors duration-300">
            <Toaster position="top-right" reverseOrder={false} />

            <div className="mx-auto max-w-7xl">

                <div className="mb-8 border-b border-[#D9D28B]/60 pb-5 dark:border-gray-800">
                    <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                        Contact Messages ({messages.length})
                    </h1>
                    <p className="text-xs uppercase tracking-wider text-[#7A7568] dark:text-gray-400 mt-1">
                        Review and manage inquiries submitted from the public contact form
                    </p>
                </div>

                <div className="space-y-4">
                    {messages.length === 0 ? (
                        <div className="border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center text-sm text-gray-500 rounded-sm">
                            No contact messages received yet.
                        </div>
                    ) : (
                        messages.map((msg) => {
                            const msgId = msg.id || msg._id;
                            return (
                                <div
                                    key={msgId}
                                    className="flex flex-col md:flex-row items-start md:items-center justify-between border border-[#D9D28B] dark:border-gray-700 bg-white dark:bg-[#161922] p-5 sm:p-6 gap-6 shadow-xs rounded-sm"
                                >
                                    <div className="space-y-3 flex-1">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                                {msg.first_name} {msg.last_name}
                                            </h3>
                                            {msg.subject && (
                                                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#F7F2E7] dark:bg-gray-800 text-[#A48643] dark:text-yellow-400 border border-[#D9D28B] dark:border-gray-700 uppercase">
                                                    {msg.subject}
                                                </span>
                                            )}
                                            <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1 ml-auto">
                                                <Calendar size={12} />
                                                {new Date(msg.created_at).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-600 dark:text-gray-400">
                                            <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 hover:text-[#6A795D]">
                                                <Mail size={14} className="text-[#8B7E58]" />
                                                <span>{msg.email}</span>
                                            </a>
                                            {msg.phone && (
                                                <span className="flex items-center gap-1.5">
                                                    <Phone size={14} className="text-[#8B7E58]" />
                                                    <span>{msg.phone}</span>
                                                </span>
                                            )}
                                            {msg.organisation && (
                                                <span className="flex items-center gap-1.5">
                                                    <Building size={14} className="text-[#8B7E58]" />
                                                    <span>{msg.organisation}</span>
                                                </span>
                                            )}
                                        </div>

                                        <div className="p-3 bg-[#FAFAF7] dark:bg-[#12161F] border border-gray-200 dark:border-gray-800 text-xs sm:text-sm text-gray-700 dark:text-gray-300 rounded-sm whitespace-pre-wrap leading-relaxed">
                                            {msg.message}
                                        </div>
                                    </div>

                                    <div className="self-end md:self-center">
                                        <button
                                            onClick={() => handleDelete(msgId)}
                                            className="h-10 w-10 flex items-center justify-center border border-red-300 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 transition-colors rounded-sm cursor-pointer"
                                            title="Delete Message"
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