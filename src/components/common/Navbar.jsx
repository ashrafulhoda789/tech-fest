"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/common/ThemeToggle";
import { usePathname } from "next/navigation";
import { getEvents } from "@/lib/api/events";

const staticNavLinks = [
    {
        name: "About",
        href: "/about",
        children: [
            { name: "About Us", href: "/about" },
            { name: "Contact", href: "/contact" },
        ],
    },
    { name: "Speakers", href: "/speakers" },
    { name: "FAQ", href: "/faq" },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const [eventChildren, setEventChildren] = useState([
        { name: "Upcoming Events", href: "/events/upcoming" },
        { name: "Past Events", href: "/events/past" },
    ]);

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setOpenMenu(null);
    };

    const pathName = usePathname();

    useEffect(() => {
        async function fetchDynamicEvents() {
            try {
                const json = await getEvents();
                if (json.success && json.data?.length > 0) {
                   
                    const ongoingFest = json.data[0];
                    const days = ongoingFest.days || [];

                    if (days.length > 0) {
                        const dynamicChildren = days.map((day, index) => ({
                            name: `${day.day_number || day.dayNumber || `Day ${index + 1}`} - ${day.date_str || day.dateStr || ''}`,
                            href: `/events`, 
                        }));
                        setEventChildren(dynamicChildren);
                    }
                }
            } catch (err) {
                console.error("Failed to load nav events:", err);
            }
        }

        fetchDynamicEvents();
    }, []);

    if (pathName.startsWith('/admin')) {
        return null;
    }

    const navLinks = [
        staticNavLinks[0], // About
        {
            name: "Events",
            href: "/events",
            children: eventChildren, 
        },
        ...staticNavLinks.slice(1), 
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-[#D9D28B] bg-[#f7f2e7] text-[#292929] dark:border-gray-700 dark:bg-[#111827] dark:text-white">
            <nav className="mx-auto flex min-h-[78px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-10">

                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex shrink-0 items-center gap-3"
                >
                    <div className="flex h-10 w-10 items-center justify-center border border-[#d8cbb0] bg-white text-2xl text-[#b58a3b]">
                        ✺
                    </div>

                    <div className="leading-tight">
                        <p className="text-sm font-extrabold tracking-tight sm:text-base">
                            TECH FEST
                        </p>
                        <p className="mt-1 hidden max-w-[190px] text-[10px] font-bold uppercase leading-[1.5] tracking-[2px] text-gray-600 sm:block dark:text-gray-400">
                            Connecting People Through Events
                        </p>
                    </div>
                </Link>

                <div className="hidden items-center gap-5 xl:flex 2xl:gap-7">
                    {navLinks.map((link) => (
                        <div key={link.name} className="group relative">
                            <div className="flex items-center gap-1">
                                <Link
                                    href={link.href}
                                    className="whitespace-nowrap text-[13px] font-bold transition-colors hover:text-[#D9D28B] dark:hover:text-[#B2BD7E]"
                                >
                                    {link.name}
                                </Link>

                                {link.children && (
                                    <svg
                                        className="h-3 w-3 transition-transform group-hover:rotate-180"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    >
                                        <path
                                            d="m5 7 5 5 5-5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </div>

                            {link.children && (
                                <div className="invisible absolute left-0 top-full z-50 w-64 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                                    <div className="border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                        {link.children.map((child, idx) => (
                                            <Link
                                                key={idx}
                                                href={child.href}
                                                className="block px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-[#b58a3b] dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-[#B2BD7E]"
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                    <ThemeToggle />

                    <Link
                        href="/register"
                        className="hidden border border-[#a89a7c] px-4 py-3 text-[11px] font-bold uppercase tracking-[1.5px] transition-colors hover:bg-[#8E9162] hover:text-white sm:inline-flex dark:border-gray-600 dark:hover:bg-white dark:hover:text-gray-900"
                    >
                        Register
                    </Link>

                    <Link
                        href="/contact"
                        className="hidden bg-[#8E9162] px-4 py-3 text-[11px] font-bold uppercase tracking-[1.5px] text-white transition-colors hover:bg-[#98702c] sm:inline-flex"
                    >
                        Contact
                    </Link>

                    <button
                        type="button"
                        onClick={() => {
                            setMobileOpen((previous) => !previous);
                            setOpenMenu(null);
                        }}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-navigation"
                        className="flex h-10 w-10 items-center justify-center rounded border border-[#d8cbb0] transition-colors hover:bg-[#eee5d4] xl:hidden dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        {mobileOpen ? (
                            <svg
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            >
                                <path d="m18 6-12 12M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {mobileOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-[#e5dfd2] bg-[#f7f2e7] px-5 py-4 xl:hidden dark:border-gray-700 dark:bg-[#111827]"
                >
                    <div className="mx-auto flex max-w-[1600px] flex-col">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="border-b border-[#e5dfd2] last:border-b-0 dark:border-gray-700"
                            >
                                <div className="flex min-h-12 items-center justify-between gap-3">
                                    <Link
                                        href={link.href}
                                        onClick={closeMobileMenu}
                                        className="flex-1 py-3 text-sm font-semibold transition-colors hover:text-[#b58a3b] dark:hover:text-blue-400"
                                    >
                                        {link.name}
                                    </Link>

                                    {link.children && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenMenu(
                                                    openMenu === link.name
                                                        ? null
                                                        : link.name
                                                )
                                            }
                                            aria-label={`Toggle ${link.name} submenu`}
                                            aria-expanded={openMenu === link.name}
                                            className="flex h-10 w-10 items-center justify-center rounded hover:bg-[#eee5d4] dark:hover:bg-gray-800"
                                        >
                                            <svg
                                                className={`h-4 w-4 transition-transform duration-200 ${openMenu === link.name
                                                        ? "rotate-180"
                                                        : ""
                                                    }`}
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            >
                                                <path
                                                    d="m5 7 5 5 5-5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {link.children && openMenu === link.name && (
                                    <div className="mb-3 ml-3 border-l-2 border-[#b58a3b] pl-4">
                                        {link.children.map((child, idx) => (
                                            <Link
                                                key={idx}
                                                href={child.href}
                                                onClick={closeMobileMenu}
                                                className="block py-3 text-sm text-gray-600 transition-colors hover:text-[#b58a3b] dark:text-gray-300 dark:hover:text-blue-400"
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
                            <Link
                                href="/register"
                                onClick={closeMobileMenu}
                                className="border border-[#a89a7c] px-4 py-3 text-center text-xs font-bold uppercase tracking-wider"
                            >
                                Register
                            </Link>

                            <Link
                                href="/contact"
                                onClick={closeMobileMenu}
                                className="bg-[#b58a3b] px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white"
                            >
                                Contact
                            </Link>
                        </div>

                       
                        <div className="mt-4 hidden gap-3 sm:flex xl:hidden">
                            <Link
                                href="/register"
                                onClick={closeMobileMenu}
                                className="border border-[#a89a7c] px-4 py-3 text-xs font-bold uppercase tracking-wider"
                            >
                                Register
                            </Link>

                            <Link
                                href="/contact"
                                onClick={closeMobileMenu}
                                className="bg-[#b58a3b] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;