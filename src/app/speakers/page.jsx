"use client";

import { useState, useEffect } from "react";
import PreviewScrollListener from "@/components/dashboard/layout/PreviewScrollListener";
import { getSpeakers } from "@/lib/api/speakers";
import Banner from "@/components/layout/speakers/Banner";
import SpeakerCard from "@/components/layout/speakers/SpeakerCard";

export default function SpeakersPage() {
    const [speakers, setSpeakers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSpeakers() {
            try {
                const res = await getSpeakers();
                if (res.success) {
                    setSpeakers(res.data || []);
                }
            } catch (err) {
                console.error("Failed to load speakers data:", err);
            } finally {
                setLoading(false);
            }
        }

        loadSpeakers();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F2E7] dark:bg-[#111827]  text-[#A48643]">
                Loading Speakers...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#F7F2E7] text-[#292929] dark:bg-[#111827] dark:text-white">
            <PreviewScrollListener />

            <section className="scroll-mt-4 mb-10">
                <Banner />
            </section>

            <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
                {speakers.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 text-lg">
                        No speakers available at the moment.
                    </div>
                ) : (
                    <div className="divide-y divide-[#D9D28B]/60 dark:divide-gray-800">
                        {speakers.map((speaker, index) => (
                            <SpeakerCard
                                key={speaker.id || speaker._id || index}
                                id={`speaker-${speaker.id || speaker._id}`}
                                speaker={speaker}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}