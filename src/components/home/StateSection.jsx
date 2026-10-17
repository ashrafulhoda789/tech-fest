

const StateSection = () => {
    const details = [
        {
            title: "VENUE",
            description: "BGC Trust University Bangladesh",
        },
        {
            title: "FORMAT",
            description: "In-person, multi-category competitive tech fest",
        },
        {
            title: "PARTICIPANTS",
            description: "University students & tech enthusiasts via registration",
        },
        {
            title: "LANGUAGES",
            description: "English · Bengali",
        },
    ];

    return (
        <section className="w-full bg-[#F7F2E7] dark:bg-[#111827] border-y border-[#D9D28B]/60 dark:border-white/10">
            <div className="mx-auto max-w-[1600px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D9D28B]/60 dark:divide-white/10">
                {details.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 space-y-3 transition-colors hover:bg-[#efe8db] dark:hover:bg-white/[0.02]"
                    >
                        <span className="font-mono text-xs font-extrabold uppercase tracking-[2px] text-[#A48643] dark:text-[#D9D28B]">
                            {item.title}
                        </span>
                        <p className="text-sm sm:text-base font-semibold text-[#292929] dark:text-gray-100 leading-snug">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StateSection;