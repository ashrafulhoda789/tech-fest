"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Calendar, LoaderCircle } from "lucide-react";
import { createEvent, deleteEvent } from "@/lib/action/events";
import { getEvents } from "@/lib/api/events";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const EventsPage = () => {
    const [fests, setFests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Form States
    const [festTitle, setFestTitle] = useState("CSE Tech Fest 2026");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [days, setDays] = useState([
        {
            dayNumber: "DAY 01",
            dateStr: "14 October 2026",
            theme: "Opening & Seminars",
            sessions: [
                { startTime: "10:00", endTime: "10:30", category: "OPENING", title: "Opening Ceremony", description: "" }
            ]
        }
    ]);

    const fetchFests = async () => {
        try {
            const data = await getEvents();

            if (data.success) {
                setFests(data.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch fests:", err);
            toast.error("Failed to load event schedules!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFests();
    }, []);

    // Add / Remove Day
    const handleAddDay = () => {
        const nextNum = `DAY 0${days.length + 1}`;
        setDays([...days, { dayNumber: nextNum, dateStr: "", theme: "", sessions: [] }]);
        toast.success("New day added!");
    };

    const handleRemoveDay = (index) => {
        setDays(days.filter((_, i) => i !== index));
        toast.success("Day removed!");
    };

    // Add / Remove Session
    const handleAddSession = (dayIndex) => {
        const updated = [...days];
        updated[dayIndex].sessions.push({ startTime: "10:00", endTime: "11:00", category: "SESSION", title: "", description: "", topics: "" });
        setDays(updated);
        toast.success("New session added!");
    };

    const handleRemoveSession = (dayIndex, sessionIndex) => {
        const updated = [...days];
        updated[dayIndex].sessions = updated[dayIndex].sessions.filter((_, i) => i !== sessionIndex);
        setDays(updated);
        toast.success("Session removed!");
    };

    const handleSessionChange = (dayIndex, sessionIndex, field, value) => {
        const updated = [...days];
        updated[dayIndex].sessions[sessionIndex][field] = value;
        setDays(updated);
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const payload = { title: festTitle, startDate, endDate, days };

            const data = await createEvent(payload);
            if (data.success) {
                toast.success("Fest schedule created successfully!");
                fetchFests();

            } else {
                setError(data.message || "Failed to create.");
                toast.error(data.message || "Failed to create event schedule!");
            }
        } catch (err) {
            setError("Something went wrong!");
            toast.error("Something went wrong while creating schedule!");
        } finally {
            setSubmitting(false);
        }
    };

    // Handle Delete Fest
    const handleDelete = async (id) => {
        toast((t) => (
            <div className="flex flex-col gap-2 p-2 bg-white dark:bg-[#8E9162] text-gray-900 dark:text-white">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                    Are you sure you want to delete this schedule?
                </p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-2.5 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 dark:border-white/10 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                
                                const data = await deleteEvent(id);
                                if (data.success) {
                                    setFests(fests.filter(f => f.id !== id));
                                    toast.success("Schedule deleted successfully!");
                                } else {
                                    toast.error(data.message || "Delete failed!");
                                }
                            } catch (err) {
                                console.error("Delete failed:", err);
                                toast.error("Failed to delete schedule!");
                            }
                        }}
                        className="px-2.5 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
            style: {
                background: 'transparent',
                boxShadow: 'none',
                padding: 0,
            },
        });
    };

    return (
        <div className="p-2 md:p-6 space-y-8 max-w-7xl mx-auto">
           
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: 'var(--toast-bg, #fff)',
                        color: 'var(--toast-color, #333)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                    },
                    // Tailwind dark mode classes support via wrapper or custom class if needed
                    className: 'dark:bg-[#1E222B] dark:text-white dark:border-white/10 dark:shadow-lg',
                }}
            />

            <div className='flex justify-between items-center py-4 border-b border-[#8E9162]/40'>
                <div className='flex flex-col gap-1'>
                    <span className='text-2xl md:text-3xl  font-extrabold tracking-tight text-gray-900 dark:text-white'>EVENTS & FEST SCHEDULES</span>
                    <span className='uppercase text-[10px] md:text-[11px] font-semibold text-[#484a2f] dark:text-[#A9B884]'>Create, Manage, and Edit Multi-Day Schedules</span>
                </div>
            </div>

            <div className="border border-gray-200 bg-[#F8F6F0] p-6 shadow-sm dark:border-white/10 dark:bg-[#1E222B]">
                <h3 className="text-base  font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-[#8B7E58]" /> Create New Fest Schedule
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Fest Title</label>
                            <input type="text" value={festTitle} onChange={(e) => setFestTitle(e.target.value)} className="w-full border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none dark:border-white/20 dark:bg-[#161922] dark:text-white" required />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Start Date</label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full  border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none dark:border-white/20 dark:bg-[#161922] dark:text-white" required />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">End Date</label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none dark:border-white/20 dark:bg-[#161922] dark:text-white" required />
                        </div>
                    </div>

                    {/* Days Builder */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold tracking-wider uppercase text-gray-500">Days & Timetables</h4>
                            <button type="button" onClick={handleAddDay} className="inline-flex items-center gap-1 bg-[#2D3A2C] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3D4F3B]">
                                <Plus size={14} /> Add Day
                            </button>
                        </div>

                        {days.map((day, dayIndex) => (
                            <div key={dayIndex} className=" border border-gray-300 bg-white p-4 dark:border-white/10 dark:bg-[#161922] space-y-3">
                                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-200 dark:border-white/10">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-[#8B7E58]/20 px-2 py-0.5 text-xs font-bold text-[#635839] ">{day.dayNumber}</span>
                                        <input type="text" placeholder="Date (e.g. 14 October 2026)" value={day.dateStr} onChange={(e) => { const u = [...days]; u[dayIndex].dateStr = e.target.value; setDays(u); }} className="border-b border-dashed border-gray-400 bg-transparent text-xs font-semibold outline-none dark:text-white" required />
                                    </div>
                                    <input type="text" placeholder="Day Theme (e.g. Opening & Seminars)" value={day.theme} onChange={(e) => { const u = [...days]; u[dayIndex].theme = e.target.value; setDays(u); }} className="w-full sm:w-60 border-b border-dashed border-gray-400 bg-transparent text-xs outline-none dark:text-gray-300" />
                                    {days.length > 1 && <button type="button" onClick={() => handleRemoveDay(dayIndex)} className="text-red-500"><Trash2 size={15} /></button>}
                                </div>

                                <div className="space-y-2 pl-2 border-l-2 border-[#8B7E58]/30">
                                    <div className="flex justify-between items-center text-[11px] text-gray-500">
                                        <span>Sessions</span>
                                        <button type="button" onClick={() => handleAddSession(dayIndex)} className="text-[#8B7E58] font-bold flex items-center gap-1"><Plus size={12} /> Add Session</button>
                                    </div>

                                    {day.sessions.map((session, sIndex) => (
                                        <div key={sIndex} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-gray-50 dark:bg-[#1E222B] p-2.5  border border-gray-200 dark:border-white/5">
                                            <div className="sm:col-span-3 flex gap-1 items-center">
                                                <input type="text" placeholder="10:00" value={session.startTime} onChange={(e) => handleSessionChange(dayIndex, sIndex, 'startTime', e.target.value)} className="w-14 border  px-1 py-1 text-xs dark:bg-[#161922] dark:border-white/10 dark:text-white" required />
                                                <span>-</span>
                                                <input type="text" placeholder="11:00" value={session.endTime} onChange={(e) => handleSessionChange(dayIndex, sIndex, 'endTime', e.target.value)} className="w-14 border  px-1 py-1 text-xs dark:bg-[#161922] dark:border-white/10 dark:text-white" required />
                                            </div>
                                            <div className="sm:col-span-8 space-y-1">
                                                <div className="flex gap-2">
                                                    <input type="text" placeholder="CATEGORY" value={session.category} onChange={(e) => handleSessionChange(dayIndex, sIndex, 'category', e.target.value)} className="w-1/3 border  px-2 py-1 text-[11px] dark:bg-[#161922] dark:border-white/10 dark:text-amber-300" />
                                                    <input type="text" placeholder="Session Title" value={session.title} onChange={(e) => handleSessionChange(dayIndex, sIndex, 'title', e.target.value)} className="w-2/3 border  px-2 py-1 text-xs font-semibold dark:bg-[#161922] dark:border-white/10 dark:text-white" required />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-1 flex justify-end">
                                                <button type="button" onClick={() => handleRemoveSession(dayIndex, sIndex)} className="text-red-400"><Trash2 size={13} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {error && <p className="text-xs text-red-500">{error}</p>}

                    <div className="flex justify-end pt-2">
                        <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 bg-[#8E9162] px-6 py-3 text-xs font-bold text-white shadow hover:bg-[#777A50]">
                            {submitting && <LoaderCircle size={14} className="animate-spin" />} Save & Publish Schedule
                        </button>
                    </div>
                </form>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Existing Fest Schedules</h3>

                {loading ? (
                    <p className="text-xs text-gray-500">Loading schedules...</p>
                ) : fests.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">No schedules created yet.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {fests.map((fest) => (
                            <div key={fest.id} className="flex justify-between items-center border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1C2029]">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{fest.title}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">Date Range: {fest.start_date} to {fest.end_date}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={`/admin/events/${fest.id}/`} className="p-2  border border-gray-200 hover:bg-gray-100 dark:border-white/10 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300">
                                        <Edit3 size={15} />
                                    </Link>
                                    <button onClick={() => handleDelete(fest.id)} className="p-2  border border-red-200 hover:bg-red-50 text-red-500">
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsPage;