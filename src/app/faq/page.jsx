'use client';

import React, { useState } from 'react';
import Banner from '@/components/layout/faq/Banner';
import { ChevronDown } from 'lucide-react';

const faqData = [
    {
        id: "01",
        question: "Who can participate in BGCTUB Tech Fest?",
        answer: "The BGCTUB Tech Fest is open to students, developers, competitive programmers, and tech enthusiasts from BGCTUB as well as participants from other universities and colleges across the country."
    },
    {
        id: "02",
        question: "What main events and segments are featured?",
        answer: "The tech fest features various segments including Intra/Inter-University Programming Contests, Project Showcase, Hackathons, Gaming Contests, Poster Presentations, and Keynote Tech Workshops."
    },
    {
        id: "03",
        question: "How do I register for the events and get confirmation?",
        answer: "You can register online through the official BGCTUB Tech Fest portal. Once your registration form and payment verification are complete, you will receive a confirmed e-ticket and participation ID via email."
    },
    {
        id: "04",
        question: "Will certificates and prize money be awarded?",
        answer: "Yes, top performers and winners across all segments will receive attractive prize money, crests, and certificates. Additionally, all registered participants will receive participation certificates and event kits."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#F7F5F0] text-[#1A1A1A]  selection:bg-[#6A795D] dark:bg-[#111827] dark:text-white selection:text-white">

            <Banner />

            <section className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
                <div className="border-t border-[#D6CDBC]">
                    {faqData.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={faq.id}
                                className="border-b border-[#D6CDBC] transition-colors duration-200"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full py-8 flex items-center justify-between text-left group focus:outline-none cursor-pointer"
                                >
                                    <div className="flex items-center gap-6 sm:gap-10">
                                        <span className="font-mono text-xs font-bold text-[#8B7E58] tracking-widest">
                                            {faq.id}
                                        </span>
                                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight group-hover:text-[#6A795D] transition-colors">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <div className={`transform transition-transform duration-300 text-[#8B7E58] ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                        <ChevronDown size={22} />
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="pl-12 sm:pl-16 pr-8 text-sm font-bold sm:text-base text-gray-700 dark:text-white leading-relaxed ">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}