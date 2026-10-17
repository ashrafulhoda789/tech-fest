'use client';

import React, { useState } from 'react';
import { Send, Loader2, Calendar, MapPin } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { createRegister } from '@/lib/action/register';

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        whatsapp: '',
        organisation: '',
        attendingAs: 'Delegate',
        notes: '',
        consent: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.email) {
            toast.error("First name and email address are required!");
            return;
        }

        if (!formData.consent) {
            toast.error("Please agree to the consent checkbox.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await createRegister(formData);

            if (res.success) {
                toast.success("Registration interest submitted successfully!");
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    whatsapp: '',
                    organisation: '',
                    attendingAs: 'Delegate',
                    notes: '',
                    consent: false
                });
            } else {
                toast.error("Failed to submit registration.");
            }
        } catch (err) {
            console.error("Registration error:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F5F0] text-[#1A1A1A] dark:bg-[#111827] dark:text-gray-100 py-16 lg:py-24 px-4 sm:px-8 transition-colors duration-300">
            <Toaster position="top-right" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                <div className="lg:col-span-5 space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#8B7E58] dark:text-[#D9D28B] uppercase tracking-widest">
                            <Calendar size={14} />
                            <span>ATTEND BGCTUB TECH FEST</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase  tracking-tight leading-none text-[#0B132B] dark:text-white">
                            01-05 November 2026 <br />
                            <span className="text-[#6A795D] dark:text-[#A9B884]">BGCTUB CAMPUS</span>
                        </h1>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-[#D6CDBC] dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-2 font-mono text-xs text-gray-600 dark:text-gray-400">
                            <MapPin size={15} className="text-[#8B7E58]" />
                            <span>BGC Trust University Bangladesh, Chattogram</span>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed font-normal pt-2">
                            All programme days, project showcases, programming contests, workshops, and the closing gala dinner are included. Attendance remains subject to organiser confirmation.
                        </p>
                    </div>

                    <div className="pt-2 font-mono text-[11px] text-gray-500 dark:text-gray-400 space-y-1">
                        <p>Tracks available: Competitive Programming · Hackathon · AI Project Showcase</p>
                    </div>
                </div>

                <div className="lg:col-span-7 bg-white dark:bg-[#1F2937] border border-[#D6CDBC] dark:border-gray-700 p-8 sm:p-10 shadow-xl ">

                    <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-bold uppercase tracking-tight text-[#0B132B] dark:text-white">
                            Delegate details
                        </h2>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Fill up the form below to secure your registration slot for the tech fest.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="block font-mono text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    First name *
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder=""
                                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#12161F] border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#6A795D] transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block font-mono text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder=""
                                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#12161F] border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#6A795D] transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="block font-mono text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder=""
                                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#12161F] border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#6A795D] transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block font-mono text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    WhatsApp contact
                                </label>
                                <input
                                    type="text"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    placeholder=""
                                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#12161F] border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#6A795D] transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="block font-mono text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Organisation
                                </label>
                                <input
                                    type="text"
                                    name="organisation"
                                    value={formData.organisation}
                                    onChange={handleChange}
                                    placeholder="BGCTUB / University"
                                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#12161F] border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#6A795D] transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block font-mono text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Attending as
                                </label>
                                <select
                                    name="attendingAs"
                                    value={formData.attendingAs}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#12161F] border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#6A795D] transition-all"
                                >
                                    <option value="Delegate">Delegate</option>
                                    <option value="Contestant">Contestant</option>
                                    <option value="Speaker">Speaker</option>
                                    <option value="Volunteer">Volunteer</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block font-mono text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Participation notes
                            </label>
                            <textarea
                                name="notes"
                                rows="4"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Any special requirements or team name..."
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#12161F] border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#6A795D] transition-all resize-none"
                            />
                        </div>

                        <div className="flex items-start gap-3 pt-1">
                            <input
                                type="checkbox"
                                name="consent"
                                id="consent"
                                checked={formData.consent}
                                onChange={handleChange}
                                className="mt-1 h-4 w-4 border-gray-300 text-[#6A795D] focus:ring-[#6A795D]"
                            />
                            <label htmlFor="consent" className="text-xs text-gray-600 dark:text-gray-400 select-none">
                                I consent to the organisers using these details to administer my registration and contact me about the forum.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 px-6 bg-[#6A795D] hover:bg-[#526047] active:bg-[#434F3A] text-white font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={16} />
                                    <span>Submitting interest...</span>
                                </>
                            ) : (
                                <>
                                    <Send size={15} />
                                    <span>Send registration interest</span>
                                </>
                            )}
                        </button>

                    </form>

                </div>

            </div>
        </div>
    );
}