export default function Banner({ title, subtitle, dateRange, locationCode }) {
    return (
        <section className="relative flex flex-col lg:flex-row min-h-[75vh] w-full bg-[#F7F2E7] text-[#292929] dark:bg-[#111827] dark:text-white border-b border-[#545d4c]">
            {/* Left Content Area */}
            <div className="flex-1 flex flex-col justify-center  p-8 sm:p-12 lg:p-16">
                <div>
                    <span className="text-xs font-mono tracking-widest uppercase text-[#8B7E58] font-semibold">
                        {dateRange}
                    </span>
                    <h1 className="mt-4 text-4xl sm:text-6xl lg:text-8xl  font-extrabold tracking-tight leading-[1.05]">
                        THREE DAYS. <br/> ONE SHARED ROAD FORWARD.
                    </h1>
                </div>
                <div className="mt-8 max-w-xl">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-white font-sans leading-relaxed">
                        {subtitle}
                    </p>
                    
                </div>
            </div>

            {/* Right Dark Navy Panel */}
            <div className="w-full lg:w-[38%] bg-[#545d4c] text-white flex flex-col items-center justify-center p-12 lg:p-16 relative overflow-hidden">
                <div className="text-center">
                    <h2 className="text-5xl sm:text-7xl font-extrabold tracking-wider">
                        BGC TRUST UNIVERSITY BANGLADESH
                    </h2>
                    <p className="mt-3 text-xs font-mono tracking-widest text-gray-400 uppercase">
                        TECH FEST / 2026
                    </p>
                </div>
            </div>
        </section>
    );
}