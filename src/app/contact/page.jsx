'use client';

import React, { useState } from 'react';
import { Send, MapPin, Phone, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { createContact } from '@/lib/action/contact';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organisation: '',
        subject: '',
        message: '',
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

        if (!formData.firstName || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (!formData.consent) {
            toast.error("Please agree to the consent checkbox.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await createContact(formData);

            if (res.success) {
                toast.success(res.message || "Your message has been sent successfully!");
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    organisation: '',
                    subject: '',
                    message: '',
                    consent: false
                });
            } else {
                toast.error(res.message || "Failed to send message.");
            }
        } catch (err) {
            console.error("Contact submit error:", err);
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
                        <div className="font-mono text-xs font-bold text-[#8B7E58] dark:text-[#D9D28B] uppercase tracking-widest">
                            CONTACT WITH US
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase  tracking-tight leading-none text-[#0B132B] dark:text-white">
                            We will get back to you with answers.
                        </h1>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-[#D6CDBC] dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300">
                        <p className="font-medium text-xs sm:text-sm tracking-wide leading-relaxed">
                            General enquiries · Registration · Partnership
                        </p>
                        <div className="pt-2">
                            <a
                                href="mailto:info@bgctubtechfest.org"
                                className="inline-block font-mono text-xs sm:text-sm font-bold text-[#6A795D] dark:text-[#A9B884] hover:underline"
                            >
                                info@bgctubtechfest.org
                            </a>
                        </div>
                    </div>

                    {/* Quick Info Cards */}
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-3 text-xs font-mono text-gray-600 dark:text-gray-400">
                            <MapPin size={16} className="text-[#8B7E58]" />
                            <span>BGC Trust University Bangladesh, Chattogram</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-mono text-gray-600 dark:text-gray-400">
                            <Phone size={16} className="text-[#8B7E58]" />
                            <span>+880 31 000000 / Support Desk</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 bg-white dark:bg-[#1F2937] border border-[#D6CDBC] dark:border-gray-700 p-8 sm:p-10 shadow-xl">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="block font-mono text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    First Name *
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
                                    Last Name
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
                                    Email Address *
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
                                    Phone / WhatsApp
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
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
                                    placeholder="University Name"
                                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#12161F] border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#6A795D] transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block font-mono text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Registration / Sponsorship"
                                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] dark:bg-[#12161F] border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#6A795D] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block font-mono text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                How can we help? *
                            </label>
                            <textarea
                                name="message"
                                rows="5"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write your message or inquiry details here..."
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
                                I consent to the summit team using these details to respond to this enquiry.
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
                                    <span>Sending message...</span>
                                </>
                            ) : (
                                <>
                                    <Send size={15} />
                                    <span>Send to desk</span>
                                </>
                            )}
                        </button>

                    </form>

                </div>

            </div>
        </div>
    );
}