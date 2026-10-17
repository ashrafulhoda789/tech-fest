import React from 'react';
import { Trophy, Users, Lightbulb, Code2, Rocket, Globe } from 'lucide-react';

const WhyTechFest = () => {
    const features = [
        {
            icon: Trophy,
            title: "Competitive Contests",
            description: "Showcase your skills in competitive programming, hackathons, and project showcases to win exciting prize pools.",
        },
        {
            icon: Code2,
            title: "Hands-on Workshops",
            description: "Learn cutting-edge technologies, AI trends, and web frameworks directly from industry experts and mentors.",
        },
        {
            icon: Users,
            title: "Networking Opportunities",
            description: "Connect with like-minded developers, technology leaders, alumni, and potential recruiters from top tech companies.",
        },
        {
            icon: Lightbulb,
            title: "Innovation & Ideas",
            description: "Transform your raw ideas into impactful real-world projects and pitch them to tech enthusiasts and judges.",
        },
        {
            icon: Rocket,
            title: "Career Boost",
            description: "Get noticed by software agencies, start-ups, and recruiters looking for talent directly from the university campus.",
        },
        {
            icon: Globe,
            title: "Tech Community",
            description: "Be part of a growing ecosystem of engineers and creators passionate about building the future with software.",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-[#F7F2E7] dark:bg-[#111827] text-[#292929] dark:text-white border-b border-[#D9D28B]/60 dark:border-white/10">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-10">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <span className="font-mono text-xs font-extrabold uppercase tracking-[2.5px] text-[#A48643] dark:text-[#D9D28B] mb-2">
                        • WHY JOIN US •
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight  text-gray-900 dark:text-white">
                        Why Attend <span className="text-[#8E874E] dark:text-[#A9B884]">CSE Tech Fest?</span>
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-[#55534B] dark:text-gray-300 leading-relaxed">
                        A dynamic platform bringing together students, developers, and tech innovators to compete, learn, and collaborate under one roof.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="group relative border border-[#D9D28B]/80 dark:border-white/10 bg-white/60 dark:bg-[#1E222B] p-6 sm:p-8 transition-all duration-300 hover:border-[#8E874E] hover:shadow-md dark:hover:border-white/30"
                            >
                                <div className="flex h-12 w-12 items-center justify-center border border-[#A48643]/40 bg-[#F7F2E7] dark:bg-[#161922] text-[#A48643] dark:text-[#D9D28B] mb-5 group-hover:bg-[#8E874E] group-hover:text-white transition-colors duration-300">
                                    <Icon size={22} />
                                </div>

                                <h3 className="text-lg font-extrabold uppercase tracking-tight text-gray-900 dark:text-white mb-2">
                                    {item.title}
                                </h3>

                                <p className="text-xs sm:text-sm text-[#55534B] dark:text-gray-300 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyTechFest;