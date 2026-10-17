"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { LoaderCircle, Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { updateEvent } from "@/lib/action/events";
import { getEvents } from "@/lib/api/events";

export default function EditFestPage() {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [activeDayIndex, setActiveDayIndex] = useState(0);

    // Form State
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [days, setDays] = useState([]);

    // Refs for Auto-Scrolling
    const previewRefs = useRef([]);
    const websitePreviewRef = useRef(null);

    useEffect(() => {
        async function fetchFest() {
            try {
                
                const json = await getEvents();
                if (json.success) {
                    const currentFest = json.data.find((f) => f.id.toString() === id);
                    if (currentFest) {
                        setTitle(currentFest.title || "");
                        setStartDate(currentFest.start_date || "");
                        setEndDate(currentFest.end_date || "");
                        setDays(currentFest.days || []);
                    }
                }
            } catch (err) {
                console.error("Failed to load fest details:", err);
                toast.error("Failed to load fest details!");
            } finally {
                setLoading(false);
            }
        }
        fetchFest();
    }, [id]);

    const handleFieldFocus = (dayIdx) => {
        setActiveDayIndex(dayIdx);
        if (previewRefs.current[dayIdx]) {
            previewRefs.current[dayIdx].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const scrollPreviewToSection = (sectionId) => {
        websitePreviewRef.current?.contentWindow?.postMessage(
            {
                type: "SCROLL_TO_SECTION",
                sectionId,
            },
            window.location.origin
        );
    };

    const handleAddDay = () => {
        const nextNum = `DAY 0${days.length + 1}`;
        setDays([...days, { day_number: nextNum, date_str: "", theme: "", sessions: [] }]);
        toast.success("New day added successfully!");
    };

    const handleRemoveDay = (dIdx) => {
        setDays(days.filter((_, i) => i !== dIdx));
        toast.success("Day removed successfully!");
    };

    const handleAddSession = (dIdx) => {
        const updated = [...days];
        updated[dIdx].sessions.push({ start_time: "10:00", end_time: "11:00", category: "SESSION", title: "", description: "", topics: "" });
        setDays(updated);
        toast.success("New session added!");
    };

    const handleRemoveSession = (dIdx, sIdx) => {
        const updated = [...days];
        updated[dIdx].sessions = updated[dIdx].sessions.filter((_, i) => i !== sIdx);
        setDays(updated);
        toast.success("Session removed!");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const payload = { title, startDate, endDate, days };

            const data = await updateEvent(id, payload)
            if (data.success) {
                toast.success("Fest schedule updated successfully!");

                if (websitePreviewRef.current) {
                    websitePreviewRef.current.contentWindow.postMessage(
                        { type: "REFRESH_FEST_DATA", payload },
                        window.location.origin
                    );
                   
                    websitePreviewRef.current.src = websitePreviewRef.current.src;
                }
            } else {
                toast.error(data.message || "Update failed.");
            }
        } catch (err) {
            // console.error("Error updating fest:", err);
            toast.error("Something went wrong!");
        } finally {
            setSubmitting(false);
        }
    };

    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F2EB] dark:bg-[#12161F]">
                <LoaderCircle className="animate-spin text-[#8B7E58]" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden text-gray-900 dark:text-gray-100">

            <Toaster position="top-right" reverseOrder={false} />

            

            <div className="w-full lg:w-1/2 h-[70vh] lg:h-[80vh] p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-[#D6CDBC] dark:border-white/10">
                <div className="w-full h-full border border-[#D6CDBC] dark:border-white/10 bg-white overflow-hidden">
                    <iframe
                        ref={websitePreviewRef}
                        src="https://tech-fest.asrafulhoda789.workers.dev/events"
                        title="Live Website Preview"
                        className="w-full h-full border-0"
                    />
                </div>
            </div>

            {/* RIGHT SIDE: Edit Form Container */}
            <div className="w-full lg:w-[48%] lg:h-full lg:overflow-y-auto p-5 sm:p-6 lg:p-8 space-y-8 relative">

                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/10">
                    <h1 className="text-lg font-bold">Edit Fest Schedule Form</h1>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6 pb-24">

                    {/* Main Meta Info */}
                    <div className="space-y-4  border border-gray-200 dark:border-white/10 bg-[#FAFAF7] dark:bg-[#1A1F29] p-5">
                        <h3 className="text-xs font-mono font-bold tracking-widest text-[#8B7E58] uppercase">Main Fest Information</h3>
                        <div>
                            <label className="block text-xs font-semibold mb-1">Fest Title</label>
                            <input
                                type="text"
                                value={title}
                                onFocus={() => scrollPreviewToSection("fest-title")}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-[#12161F] px-3 py-2 text-sm outline-none"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onFocus={() => scrollPreviewToSection("fest-dates")}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-ful rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#12161F] px-3 py-2 text-sm outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onFocus={() => scrollPreviewToSection("fest-dates")}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-[#12161F] px-3 py-2 text-sm outline-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Days & Sessions */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-mono font-bold tracking-widest text-[#8B7E58] uppercase">Event Days & Sessions</h3>
                            <button type="button" onClick={handleAddDay} className="inline-flex items-center gap-1  bg-[#2D3A2C] px-3 py-1.5 text-xs font-semibold text-white">
                                <Plus size={14} /> Add Day
                            </button>
                        </div>

                        {days.map((day, dIdx) => (
                            <div
                                key={dIdx}
                                onClick={() => {
                                    handleFieldFocus(dIdx);
                                    scrollPreviewToSection(`day-${dIdx + 1}`);
                                }}
                                className={` border p-5 bg-[#FAFAF7] dark:bg-[#1A1F29] transition cursor-pointer space-y-4 ${activeDayIndex === dIdx ? "ring-2 ring-[#8B7E58] border-transparent" : "border-gray-200 dark:border-white/10"
                                    }`}
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-200 dark:border-white/10">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={day.day_number || day.dayNumber || ""}
                                            onFocus={() => scrollPreviewToSection(`day-${dIdx + 1}`)}
                                            onChange={(e) => {
                                                const updated = [...days];
                                                updated[dIdx].day_number = e.target.value;
                                                setDays(updated);
                                            }}
                                            className="w-20 border  px-2 py-1 text-xs font-bold bg-white dark:bg-[#12161F] dark:border-white/10"
                                        />
                                        <input
                                            type="text"
                                            value={day.date_str || day.dateStr || ""}
                                            onFocus={() => scrollPreviewToSection(`day-${dIdx + 1}`)}
                                            onChange={(e) => {
                                                const updated = [...days];
                                                updated[dIdx].date_str = e.target.value;
                                                setDays(updated);
                                            }}
                                            placeholder="14 October 2026"
                                            className="w-36 border  px-2 py-1 text-xs font-semibold bg-white dark:bg-[#12161F] dark:border-white/10"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        value={day.theme || ""}
                                        onFocus={() => scrollPreviewToSection(`day-${dIdx + 1}`)}
                                        onChange={(e) => {
                                            const updated = [...days];
                                            updated[dIdx].theme = e.target.value;
                                            setDays(updated);
                                        }}
                                        placeholder="Day Theme"
                                        className="w-48 border  px-2 py-1 text-xs bg-white dark:bg-[#12161F] dark:border-white/10"
                                    />
                                    {days.length > 1 && (
                                        <button type="button" onClick={() => handleRemoveDay(dIdx)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                {/* Sessions List */}
                                <div className="space-y-3 pl-2 border-l-2 border-[#8B7E58]/40">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] font-mono text-gray-500 uppercase">Sessions List</span>
                                        <button type="button" onClick={() => handleAddSession(dIdx)} className="text-xs font-bold text-[#8B7E58] flex items-center gap-1">
                                            <Plus size={13} /> Add Session
                                        </button>
                                    </div>

                                    {day.sessions?.map((session, sIdx) => (
                                        <div key={sIdx} className="space-y-2 bg-white dark:bg-[#12161F] p-3 border border-gray-200 dark:border-white/5  text-xs">
                                            <div className="flex flex-wrap gap-2 items-center">
                                                <input
                                                    type="text"
                                                    value={session.start_time || ""}
                                                    onFocus={() => scrollPreviewToSection(`session-${dIdx + 1}-${sIdx + 1}`)}
                                                    onChange={(e) => {
                                                        const updated = [...days];
                                                        updated[dIdx].sessions[sIdx].start_time = e.target.value;
                                                        setDays(updated);
                                                    }}
                                                    placeholder="10:00 AM"
                                                    className="w-20 border  px-1.5 py-1 dark:bg-[#161922] dark:border-white/10"
                                                />
                                                <span>-</span>
                                                <input
                                                    type="text"
                                                    value={session.end_time || ""}
                                                    onFocus={() => scrollPreviewToSection(`session-${dIdx + 1}-${sIdx + 1}`)}
                                                    onChange={(e) => {
                                                        const updated = [...days];
                                                        updated[dIdx].sessions[sIdx].end_time = e.target.value;
                                                        setDays(updated);
                                                    }}
                                                    placeholder="11:30 AM"
                                                    className="w-20 border  px-1.5 py-1 dark:bg-[#161922] dark:border-white/10"
                                                />
                                                <input
                                                    type="text"
                                                    value={session.category || ""}
                                                    onFocus={() => scrollPreviewToSection(`session-${dIdx + 1}-${sIdx + 1}`)}
                                                    onChange={(e) => {
                                                        const updated = [...days];
                                                        updated[dIdx].sessions[sIdx].category = e.target.value;
                                                        setDays(updated);
                                                    }}
                                                    placeholder="CATEGORY"
                                                    className="flex-1 border  px-2 py-1 font-mono text-[10px] dark:bg-[#161922] dark:border-white/10"
                                                />
                                                <button type="button" onClick={() => handleRemoveSession(dIdx, sIdx)} className="text-red-400 hover:text-red-600">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                value={session.title || ""}
                                                onFocus={() => scrollPreviewToSection(`session-${dIdx + 1}-${sIdx + 1}`)}
                                                onChange={(e) => {
                                                    const updated = [...days];
                                                    updated[dIdx].sessions[sIdx].title = e.target.value;
                                                    setDays(updated);
                                                }}
                                                placeholder="Session Title"
                                                className="w-full border  px-2 py-1 font-semibold dark:bg-[#161922] dark:border-white/10"
                                            />
                                            <input
                                                type="text"
                                                value={session.description || ""}
                                                onFocus={() => scrollPreviewToSection(`session-${dIdx + 1}-${sIdx + 1}`)}
                                                onChange={(e) => {
                                                    const updated = [...days];
                                                    updated[dIdx].sessions[sIdx].description = e.target.value;
                                                    setDays(updated);
                                                }}
                                                placeholder="Short description..."
                                                className="w-full border  px-2 py-1 text-gray-600 dark:text-gray-300 dark:bg-[#161922] dark:border-white/10"
                                            />

                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Floating Action */}
                    <div className="sticky bottom-0 left-0 w-full p-4 bg-white/90 dark:bg-[#161922]/90 backdrop-blur border-t border-gray-200 dark:border-white/10 flex justify-end">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center gap-2  bg-[#8E9162] px-6 py-3 text-xs font-bold text-white shadow-lg hover:bg-[#777A50]"
                        >
                            {submitting && <LoaderCircle size={16} className="animate-spin" />}
                            <Save size={16} /> Save Changes & Update Live
                        </button>
                    </div>

                </form>
            </div>

        </div>
    );
}