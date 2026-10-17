"use client";

import { useState, useEffect } from "react";
import PreviewScrollListener from "@/components/dashboard/layout/PreviewScrollListener";
import Banner from "@/components/layout/events/Banner";
import FestDayTabs from "@/components/layout/events/FestDayTabs";
import FestTimeline from "@/components/layout/events/FestTimeline";
import { getEvents } from "@/lib/api/events";

export default function FestLandingPage() {
    const [festData, setFestData] = useState(null);
    const [activeDayIndex, setActiveDayIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFest() {
            try {
                const json = await getEvents();

                if (json.success && json.data?.length > 0) {
                    setFestData(json.data[0]);
                }
            } catch (err) {
                console.error("Failed to load fest data:", err);
            } finally {
                setLoading(false);
            }
        }

        loadFest();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F2EB] ">
                Loading Schedule...
            </div>
        );
    }

    if (!festData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F2EB] ">
                No Event Schedule Available.
            </div>
        );
    }

    const days = festData.days || [];
    const activeDay = days[activeDayIndex];

    return (
        <main className="min-h-screen bg-[#F7F2E7] text-[#292929] dark:bg-[#111827] dark:text-white">
            <PreviewScrollListener />

            <section id="fest-title" className="scroll-mt-4">
                <div id="fest-dates">
                    <Banner
                        subtitle={festData.title}
                        dateRange={`${festData.start_date} - ${festData.end_date}`}
                        locationCode="CHITTAGONG"
                    />
                </div>
            </section>

            {/* Day Switcher Tabs */}
            {days.length > 0 && (
                <FestDayTabs
                    days={days}
                    activeDayIndex={activeDayIndex}
                    onSelectDay={setActiveDayIndex}
                />
            )}

            <div className="py-6">
                {activeDay && (
                    <section id={`day-${activeDayIndex + 1}`} className="scroll-mt-4">
                        <FestTimeline activeDay={activeDay} />
                    </section>
                )}
            </div>
        </main>
    );
}