export default function FestTimeline({ activeDay }) {
    if (!activeDay) return null;

    return (
        <section className="max-w-7xl mx-auto py-12 px-6 sm:px-12 lg:px-16 text-gray-900 dark:text-gray-100">
            {/* Day Header */}
            <div className="border-b border-[#D6CDBC] dark:border-white/10 pb-6 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end">
                <div>
                    <span className="text-xs font-mono tracking-widest uppercase text-[#8B7E58] dark:text-[#D9CEAE]">
                        {activeDay.date_str}
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-1 text-[#1A1A1A] dark:text-white">
                        {activeDay.theme}
                    </h2>
                </div>
                <div className="mt-4 sm:mt-0 text-xs font-mono tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                    {activeDay.sessions?.length || 0} PROGRAMME MOMENTS
                </div>
            </div>

            {/* Sessions List */}
            <div className="space-y-0">
                {activeDay.sessions?.map((session, sIdx) => (
                    <div
                        key={sIdx}
                        className="grid grid-cols-1 lg:grid-cols-12 py-8 border-b border-[#D6CDBC] dark:border-white/10 items-start gap-6"
                    >
                        {/* Time Column */}
                        <div className="lg:col-span-2 font-mono text-xs text-gray-600 dark:text-gray-400 tracking-wider">
                            <div>{session.start_time}</div>
                            {session.end_time && <div>{session.end_time}</div>}
                        </div>

                        {/* Content Column */}
                        <div className="lg:col-span-10 space-y-3">
                            <span className="inline-block text-[10px] font-mono tracking-widest uppercase text-[#8B7E58] dark:text-[#D9CEAE] font-bold">
                                {session.category}
                            </span>
                            <h3 className="text-2xl sm:text-3xl  font-bold text-[#1A1A1A] dark:text-white">
                                {session.title}
                            </h3>
                            {session.description && (
                                <p className="text-sm text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
                                    {session.description}
                                </p>
                            )}

                            {/* Topics / Bullet Points */}
                            {session.topics && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-gray-700 dark:text-gray-300 font-sans">
                                    {(typeof session.topics === 'string' ? session.topics.split(',') : session.topics).map((topic, tIdx) => (
                                        <div key={tIdx} className="flex items-center gap-2">
                                            <span className="h-1 w-1 bg-[#8B7E58] dark:bg-[#D9CEAE] rounded-full shrink-0"></span>
                                            <span>{topic.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}