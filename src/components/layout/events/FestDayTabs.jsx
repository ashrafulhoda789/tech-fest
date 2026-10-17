export default function FestDayTabs({ days, activeDayIndex, onSelectDay }) {
    return (
        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-2 sm:grid-cols-3 border-b border-[#D6CDBC] dark:border-white/10">
            {days.map((day, idx) => {
                const isActive = activeDayIndex === idx;
                return (
                    <button
                        key={idx}
                        onClick={() => onSelectDay(idx)}
                        className={`text-left p-6 sm:p-8 transition border-b sm:border-b-0 sm:border-r border-[#D6CDBC] dark:border-white/10 last:border-r-0 ${isActive
                                ? "bg-[#EFECE3] dark:bg-[#252A36] ring-1 ring-inset ring-[#8B7E58] dark:ring-[#D9CEAE]"
                                : "bg-[#F5F2EB] dark:bg-[#1A1F29] hover:bg-[#EFECE3]/50 dark:hover:bg-[#222733]"
                            }`}
                    >
                        <div className="text-[11px] font-mono tracking-widest uppercase text-[#8B7E58] dark:text-[#D9CEAE] font-bold">
                            {day.day_number || `DAY 0${idx}`}
                        </div>
                        <div className="mt-2 text-lg sm:text-xl  font-bold text-[#1A1A1A] dark:text-white">
                            {day.date_str} · {day.theme}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}