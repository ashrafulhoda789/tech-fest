"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    MapPin,
    Radio,
} from "lucide-react";
import { getEvents } from "@/lib/api/events";

const getCountdown = (targetDate) => {
    const difference = Math.max(
        0,
        new Date(targetDate).getTime() - Date.now()
    );

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
            (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor((difference / 1000) % 60),
        finished: difference === 0,
    };
};

const pad = (number) => String(number).padStart(2, "0");

const Hero = () => {
    const [festData, setFestData] = useState(null);
    const [countdown, setCountdown] = useState(null);

    // ১. হিরো পেজের ভেতরেই ইভেন্ট ডেটা ফেচ করা হচ্ছে
    useEffect(() => {
        async function loadFest() {
            try {
                const json = await getEvents();
                if (json.success && json.data?.length > 0) {
                    setFestData(json.data[0]);
                }
            } catch (err) {
                console.error("Failed to load fest data for hero:", err);
            }
        }
        loadFest();
    }, []);

    // ২. ডেটা আসার পর কাউন্টডাউন ক্যালকুলেশন শুরু হবে
    const targetDateString = festData?.start_date ? `${festData.start_date}T08:30:00+01:00` : "2026-12-03T08:30:00+01:00";

    useEffect(() => {
        const updateCountdown = () => {
            setCountdown(getCountdown(targetDateString));
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, [targetDateString]);

    const startDate = festData?.start_date || "03 December 2026";
    const endDate = festData?.end_date || "04 December 2026";
    const dateRangeText = `${startDate} - ${endDate}`;

    const formattedBottomDate = festData?.start_date
        ? new Date(festData.start_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).toUpperCase().replace(/ /g, ' ')
        : "03 DEC '26";

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2">

            <div className="flex items-center bg-[#F7F2E7] px-6 py-16 text-[#292929] dark:bg-[#111827] dark:text-white sm:px-10 sm:py-20 lg:px-12 xl:px-16 2xl:px-20">
                <div className="mx-auto w-full max-w-2xl">

                    <p className="mb-6 text-[10px] font-extrabold uppercase leading-5 tracking-[2.5px] text-[#9A7738] sm:text-xs sm:tracking-[3px]">
                        Global Forum on Technology, Innovation & Ideas
                        <span className="mx-2 text-[#D9D28B]">•</span>
                        {festData?.title || "December 2026"}
                    </p>

                    <h1 className="max-w-2xl text-4xl font-black uppercase leading-[0.98] tracking-[-2px] sm:text-5xl md:text-6xl xl:text-[68px] xl:tracking-[-3.5px]">
                        Ideas That
                        <br />
                        Move The
                        <br />
                        <span className="text-[#8E874E]">
                            World Forward.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-xl text-base leading-7 text-[#55534B] sm:text-lg sm:leading-8">
                        Join developers, innovators, entrepreneurs,
                        and creative minds for a meaningful event
                        built around ideas, collaboration, and the
                        future of technology.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Link
                            href="/register"
                            className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#6A795D] px-5 py-3 text-xs font-extrabold uppercase tracking-[1.5px] text-white transition-colors hover:bg-[#4e534a]"
                        >
                            Reserve a Place
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/events"
                            className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#A69A78] px-5 py-3 text-xs font-extrabold uppercase tracking-[1.2px] transition-colors hover:bg-[#D9D28B]/30"
                        >
                            <CalendarDays className="h-4 w-4" />
                            Explore Events
                        </Link>
                    </div>

                    <div className="mt-9 flex flex-col gap-4 text-sm font-medium text-[#514E45] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 shrink-0 text-[#A48643]" />
                            <span>{dateRangeText}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 shrink-0 text-[#A48643]" />
                            <span>Chittagong, Bangladesh</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative isolate flex min-h-[480px] items-center overflow-hidden bg-[#545d4c] px-5 py-16 text-white sm:px-10 sm:py-20 lg:min-h-0 lg:px-10 xl:px-16 2xl:px-20">

                {/* Decorative Circles */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-44 -right-40 -z-10 h-[380px] w-[380px] rounded-full border border-white/10 sm:h-[480px] sm:w-[480px]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-36 -right-32 -z-10 h-[300px] w-[300px] rounded-full border border-white/10 sm:h-[390px] sm:w-[390px]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-28 -right-24 -z-10 h-[220px] w-[220px] rounded-full border border-[#D9D28B]/20 sm:h-[300px] sm:w-[300px]"
                />

                <div className="mx-auto w-full max-w-xl">

                    {/* Countdown Header */}
                    <div className="flex items-center justify-between border-b border-white/25 pb-4">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#D9D28B]" />
                            <span className="text-[10px] font-extrabold uppercase tracking-[2px]">
                                Live Countdown
                            </span>
                        </div>

                        <Radio className="h-4 w-4 text-[#D9D28B]" />
                    </div>

                    <div className="mt-8">
                        <p className="text-xs font-extrabold uppercase tracking-[2px] text-[#D9D28B] sm:text-sm">
                            {countdown?.finished
                                ? "The moment is here"
                                : "The event begins in"}
                        </p>

                        <h2 className="mt-3 max-w-lg text-4xl font-black uppercase leading-[0.98] tracking-[-1.5px] sm:text-5xl md:text-6xl xl:text-[58px]">
                            {countdown?.finished ? (
                                <>
                                    Time&apos;s <br />Ticking.<br /> Make It <br /> Matter.
                                </>
                            ) : (
                                <>
                                    Clock is running.<br /> Own your <br /> time.
                                </>
                            )}
                        </h2>
                    </div>

                    {/* Timer Boxes */}
                    <div
                        className="mt-8 border border-white/25 bg-[#1C2B50]/60 p-3 sm:p-5"
                        aria-label="Event countdown"
                        aria-live="off"
                    >
                        <div className="grid grid-cols-4 gap-2 sm:gap-3">
                            {[
                                {
                                    label: "Days",
                                    value: countdown?.days ?? 0,
                                },
                                {
                                    label: "Hours",
                                    value: countdown?.hours ?? 0,
                                },
                                {
                                    label: "Minutes",
                                    value: countdown?.minutes ?? 0,
                                },
                                {
                                    label: "Seconds",
                                    value: countdown?.seconds ?? 0,
                                },
                            ].map((unit) => (
                                <div
                                    key={unit.label}
                                    className="min-w-0 text-center"
                                >
                                    <div className="flex h-12 items-center justify-center rounded-sm bg-[#F7F2E7] px-1 font-mono text-xl font-bold tabular-nums text-[#29385F] shadow-lg sm:h-16 sm:text-3xl">
                                        {unit.label === "Days"
                                            ? unit.value
                                            : pad(unit.value)}
                                    </div>

                                    <p className="mt-2 text-[8px] font-extrabold uppercase tracking-[1px] text-[#D9D28B] sm:text-[9px]">
                                        {unit.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-white/25 pt-5">
                        <div>
                            <p className="text-xl font-black uppercase tracking-[2px] sm:text-2xl">
                                {startDate} - {endDate}
                            </p>
                            <p className="mt-2 text-[10px] font-medium text-white/60">
                                Two days. Endless possibilities.
                            </p>
                        </div>

                        <p className="text-[9px] font-extrabold uppercase tracking-[1.5px] text-[#D9D28B]">
                            {formattedBottomDate} · 08:30 CET
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;