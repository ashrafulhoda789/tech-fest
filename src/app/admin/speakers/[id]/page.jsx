"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LoaderCircle, Save, Globe, Briefcase } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { updateSpeaker } from "@/lib/action/speakars";
import { getSpeakers } from "@/lib/api/speakers";

export default function SpeakerDetailPage() {
    const params = useParams();
    const router = useRouter();
    const speakerId = params.id;

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form states
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [designation, setDesignation] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");

    const websitePreviewRef = useRef(null);

    const scrollPreviewToSection = (sectionId) => {
        websitePreviewRef.current?.contentWindow?.postMessage(
            {
                type: "SCROLL_TO_SECTION",
                sectionId,
            },
            window.location.origin
        );
    };

    useEffect(() => {
        async function fetchSpeaker() {
            try {
                const res = await getSpeakers();
                if (res.success && Array.isArray(res.data)) {
                    const found = res.data.find(
                        (s) => String(s.id || s._id) === String(speakerId)
                    );
                    if (found) {
                        setName(found.name || "");
                        setImage(found.image || "");
                        setDesignation(found.designation || "");
                        setCountry(found.country || "");
                        setDescription(found.description || "");
                    } else {
                        toast.error("Speaker not found!");
                        router.push("/admin/speakers");
                    }
                }
            } catch (err) {
                // console.error("Error fetching speaker:", err);
                toast.error("Failed to load speaker details!");
            } finally {
                setLoading(false);
            }
        }

        if (speakerId) {
            fetchSpeaker();
        }
    }, [speakerId, router]);

    // Handle Update Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !designation) {
            toast.error("Name and Designation are required!");
            return;
        }

        setSubmitting(true);
        const payload = { name, image, designation, country, description };

        try {
            const res = await updateSpeaker(speakerId, payload);
            if (res.success) {
                toast.success("Speaker details updated successfully!");

                if (websitePreviewRef.current) {
                    websitePreviewRef.current.contentWindow.postMessage(
                        { type: "REFRESH_SPEAKER_DATA", payload },
                        window.location.origin
                    );
                    websitePreviewRef.current.src = websitePreviewRef.current.src;
                }

                setTimeout(() => {
                    router.push(`/admin/speakers/${speakerId}`);
                }, 1000);
            } else {
                toast.error(res.message || "Failed to update speaker!");
            }
        } catch (err) {
            console.error("Update error:", err);
            toast.error("Something went wrong during update!");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F2E7] dark:bg-[#111827]">
                <LoaderCircle className="animate-spin text-[#A48643]" size={36} />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden text-gray-900 dark:text-gray-100">
            <Toaster position="top-right" reverseOrder={false} />

            <div className="w-full lg:w-1/2 h-[70vh] lg:h-[80vh] p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-[#D6CDBC] dark:border-white/10">
                <div className="flex items-center justify-between mb-3">
                    <Link
                        href="/admin/speakers"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6A795D] dark:text-[#A9B884] hover:underline"
                    >
                        <ArrowLeft size={14} /> Back to List
                    </Link>
                </div>

                <div className="w-full h-full border border-[#D6CDBC] dark:border-white/10 bg-white overflow-hidden shadow-sm">
                    <iframe
                        ref={websitePreviewRef}
                        src="http://localhost:3000/speakers"
                        title="Live Website Preview"
                        className="w-full h-full border-0"
                    />
                </div>
            </div>

            <div className="w-full lg:w-1/2 lg:h-full lg:overflow-y-auto p-5 sm:p-6 lg:p-8 space-y-8 relative">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/10">
                    <div>
                        <h1 className="text-lg  font-bold uppercase tracking-tight">Edit Speaker Profile</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Update speaker info and preview instantly</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 pb-24">
                    {/* Instant Card Preview Box */}
                    <div className="border border-[#D9D28B] dark:border-gray-700 bg-white/70 dark:bg-[#1A2234] p-5 shadow-xs">
                        <h3 className="text-xs font-mono font-bold tracking-widest text-[#A48643] dark:text-[#D9D28B] uppercase mb-4">
                            Instant Card Preview
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-800 border border-[#D9D28B] rounded-full shadow-inner">
                                {image ? (
                                    <img src={image} alt={name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                                        IMG
                                    </div>
                                )}
                            </div>
                            <div className="overflow-hidden">
                                <h4 className="text-base font-bold truncate">{name || "Speaker Name"}</h4>
                                <p className="text-xs text-[#6A795D] dark:text-[#A9B884] font-semibold truncate flex items-center gap-1 mt-0.5">
                                    <Briefcase size={12} /> {designation || "Designation"}
                                </p>
                                {country && (
                                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 bg-[#F7F2E7] dark:bg-gray-800 text-[#A48643] border border-[#D9D28B] mt-1.5">
                                        {country}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 border border-gray-200 dark:border-white/10 bg-[#FAFAF7] dark:bg-[#1A1F29] p-5">
                        <h3 className="text-xs font-mono font-bold tracking-widest text-[#8B7E58] uppercase">Speaker Information</h3>

                        <div>
                            <label className="block text-xs font-semibold mb-1">Speaker Name *</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onFocus={() => scrollPreviewToSection(`speaker-${speakerId}`)}
                                placeholder="e.g. Dr. Alan Turing"
                                required
                                className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-[#12161F] px-3.5 py-2.5 text-sm outline-none focus:border-[#A48643]"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold mb-1">Designation *</label>
                                <input
                                    type="text"
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    onFocus={() => scrollPreviewToSection(`speaker-${speakerId}`)}
                                    placeholder="e.g. Professor & AI Researcher"
                                    required
                                    className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-[#12161F] px-3.5 py-2.5 text-sm outline-none focus:border-[#A48643]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-1">Country</label>
                                <input
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    onFocus={() => scrollPreviewToSection(`speaker-${speakerId}`)}
                                    placeholder="e.g. United Kingdom"
                                    className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-[#12161F] px-3.5 py-2.5 text-sm outline-none focus:border-[#A48643]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold mb-1">Image URL</label>
                            <input
                                type="url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                onFocus={() => scrollPreviewToSection(`speaker-${speakerId}`)}
                                placeholder="https://example.com/speaker.jpg"
                                className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-[#12161F] px-3.5 py-2.5 text-sm outline-none focus:border-[#A48643]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold mb-1">Description / Bio</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                onFocus={() => scrollPreviewToSection(`speaker-${speakerId}`)}
                                placeholder="Short bio about the speaker..."
                                rows="3"
                                className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-[#12161F] px-3.5 py-2.5 text-sm outline-none focus:border-[#A48643]"
                            />
                        </div>
                    </div>

                    <div className="sticky bottom-0 left-0 w-full p-4 bg-white/90 dark:bg-[#161922]/90 backdrop-blur border-t border-gray-200 dark:border-white/10 flex justify-end gap-3">

                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center gap-2 bg-[#6A795D] hover:bg-[#526047] px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-colors  tracking-[1.5px]"
                        >
                            {submitting && <LoaderCircle size={16} className="animate-spin" />}
                            <Save size={15} /> Save Changes & Update Live
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}