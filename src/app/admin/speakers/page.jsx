"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, LoaderCircle, Edit2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { createSpeaker, deleteSpeaker } from "@/lib/action/speakars";
import { getSpeakers } from "@/lib/api/speakers";

export default function AdminSpeakersPage() {
    const [speakers, setSpeakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form states
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [designation, setDesignation] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");

    // Fetch existing speakers
    const fetchSpeakersData = async () => {
        try {
            const res = await getSpeakers();
            if (res.success) {
                setSpeakers(res.data || []);
            }
        } catch (err) {
            console.error("Error loading speakers:", err);
            toast.error("Failed to load speakers!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpeakersData();
    }, []);

    const resetForm = () => {
        setName("");
        setImage("");
        setDesignation("");
        setCountry("");
        setDescription("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !designation) {
            toast.error("Name and Designation are required!");
            return;
        }

        setSubmitting(true);
        const payload = { name, image, designation, country, description };

        try {
            const res = await createSpeaker(payload);

            if (res.success) {
                toast.success("Speaker added successfully!");
                fetchSpeakersData();
                resetForm();
            } else {
                toast.error(res.message || "Operation failed.");
            }
        } catch (err) {
            console.error("Submit error:", err);
            toast.error("Something went wrong!");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = (id) => {
        toast((t) => (
            <div className="flex flex-col gap-3 text-sm text-gray-800 dark:text-gray-200">
                <p className="font-semibold">Are you sure you want to delete this speaker?</p>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 text-xs bg-gray-300 dark:bg-gray-700 rounded font-bold"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                const data = await deleteSpeaker(id);
                                if (data.success) {
                                    setSpeakers(speakers.filter(s => (s.id || s._id) !== id));
                                    toast.success("Speaker deleted successfully!");
                                } else {
                                    toast.error("Delete failed!");
                                }
                            } catch (err) {
                                // console.error("Delete failed:", err);
                                toast.error("Failed to delete speaker!");
                            }
                        }}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 font-bold"
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
        <div className="min-h-screen  dark:text-white px-4 sm:px-8 py-10">

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: 'var(--toast-bg, #fff)',
                        color: 'var(--toast-color, #333)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                    },

                    className: 'dark:bg-[#1E222B] dark:text-white dark:border-white/10 dark:shadow-lg',
                }}
            />
            <div className="mx-auto max-w-[1400px]">

                <div className="mb-8 border-b border-[#D9D28B]/60 pb-5 dark:border-gray-800">
                    <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                        Speakers Management
                    </h1>
                    <p className="text-xs uppercase tracking-wider text-[#7A7568] dark:text-gray-400 mt-1">
                        Create and manage tech fest keynote speakers & guests
                    </p>
                </div>

                <div className="border border-[#D9D28B]  dark:border-gray-700 p-6 sm:p-8 shadow-sm mb-12">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                        <h2 className="text-sm font-extrabold uppercase tracking-widest dark:text-[#D9D28B]">
                            Add New Speaker
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-white">
                                    Speaker Name *
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Dr. Alan Turing"
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161922] px-3 py-2.5 text-sm focus:outline-none focus:border-[#A48643]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">
                                    Designation *
                                </label>
                                <input
                                    type="text"
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    placeholder="e.g. Professor & AI Researcher"
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161922] px-3 py-2.5 text-sm focus:outline-none focus:border-[#A48643]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="e.g. United Kingdom"
                                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161922] px-3 py-2.5 text-sm focus:outline-none focus:border-[#A48643]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    placeholder="https://example.com/speaker.jpg"
                                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161922] px-3 py-2.5 text-sm focus:outline-none focus:border-[#A48643]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">
                                    Description / Bio
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Short bio about the speaker..."
                                    rows="2"
                                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161922] px-3 py-2 text-sm focus:outline-none focus:border-[#A48643]"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-3">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-[#6A795D] hover:bg-[#526047] text-white px-6 py-3 text-xs font-bold uppercase tracking-[1.5px] transition-colors flex items-center gap-2"
                            >
                                {submitting && <LoaderCircle className="animate-spin h-4 w-4" />}
                                Save & Publish Speaker
                            </button>
                        </div>
                    </form>
                </div>

                {/* Existing Speakers List */}
                <div>
                    <h2 className="text-lg font-extrabold tracking-wider mb-4">
                        Existing Speakers ({speakers.length})
                    </h2>

                    <div className="space-y-4">
                        {speakers.length === 0 ? (
                            <div className="border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-sm text-gray-500">
                                No speakers added yet.
                            </div>
                        ) : (
                            speakers.map((speaker) => {
                                const sId = speaker.id || speaker._id;
                                return (
                                    <div
                                        key={sId}
                                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-[#D9D28B] dark:border-gray-700 bg-white dark:bg-[#161922] p-4 sm:p-5 gap-4 shadow-xs"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full">
                                                {speaker.image ? (
                                                    <img
                                                        src={speaker.image}
                                                        alt={speaker.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-xs font-bold text-gray-500">
                                                        IMG
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                                        {speaker.name}
                                                    </h3>
                                                    {speaker.country && (
                                                        <span className="text-[10px] font-mono px-2 py-0.5 bg-[#F7F2E7] dark:bg-gray-800 text-[#A48643] dark:text-yellow-400 border border-[#D9D28B] dark:border-gray-700">
                                                            {speaker.country}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-[#6A795D] dark:text-[#8E9162] font-semibold mt-0.5">
                                                    {speaker.designation}
                                                </p>
                                                {speaker.description && (
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                                                        {speaker.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Buttons (Edit & Delete) */}
                                        <div className="flex items-center gap-2 self-end sm:self-center">
                                            <Link
                                                href={`/admin/speakers/${sId}`}
                                                className="h-9 w-9 flex items-center justify-center border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
                                                title="Edit Speaker"
                                            >
                                                <Edit2 size={16} />
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(sId)}
                                                className="h-9 w-9 flex items-center justify-center border border-red-300 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 transition-colors"
                                                title="Delete Speaker"
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
        </div>
    );
}