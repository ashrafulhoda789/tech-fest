"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SpeakerCard({ speaker, index, id }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const serialNumber = String(index + 1).padStart(2, "0");

    return (
        <div
            id={id}
            className="py-14 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center relative transition-all duration-300 rounded-xl p-4"
        >
            {/* Left Side: Image with Top-Left Number */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end pr-0 lg:pr-4">
                <div className="relative">
                    <span className="absolute -top-6 left-0 text-xs font-mono font-bold tracking-widest text-[#A48643] dark:text-[#D9D28B]">
                        {serialNumber}
                    </span>

                    <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 border-2 border-[#D9D28B]/50 shadow-sm">
                        {speaker.image ? (
                            <img
                                src={speaker.image}
                                alt={speaker.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-mono text-gray-400">
                                NO IMAGE
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side: Details & Bio */}
            <div className="lg:col-span-8 space-y-3 pl-0 lg:pl-4">
                {speaker.country && (
                    <span className="block text-[11px] font-mono uppercase tracking-[2px] text-[#A48643] dark:text-[#D9D28B] font-extrabold">
                        {speaker.country}
                    </span>
                )}

                <h2 className="text-3xl sm:text-4xl lg:text-5xl  font-black tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                    {speaker.name}
                </h2>

                <p className="text-xs sm:text-sm font-semibold text-[#6A795D] dark:text-[#A9B884] uppercase tracking-wider pt-1">
                    {speaker.designation}
                </p>

                {speaker.description && (
                    <div className="pt-2 max-w-2xl">
                        <p
                            className={`text-sm sm:text-base text-gray-700 dark:text-gray-300 font-sans leading-relaxed ${!isExpanded ? "line-clamp-3" : ""
                                }`}
                        >
                            {speaker.description}
                        </p>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest uppercase text-[#A48643] dark:text-[#D9D28B] hover:underline focus:outline-none"
                        >
                            {isExpanded ? (
                                <>
                                    Read Less <ChevronUp size={14} />
                                </>
                            ) : (
                                <>
                                    Read More <ChevronDown size={14} />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}