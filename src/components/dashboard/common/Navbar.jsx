"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    Menu,
    ChevronDown,
    Settings,
    LogOut,
    CalendarDays,
    Ticket,
    Users,
    Wallet,
    LayoutDashboard,
    Tags,
    ChartNoAxesCombined,
    CalendarRange,
    HelpCircle,
} from "lucide-react";
import ThemeToggle from "@/components/common/ThemeToggle";

const pages = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Events", href: "/admin/events", icon: CalendarDays },
    { label: "Categories", href: "/admin/categories", icon: Tags },
    { label: "Bookings", href: "/admin/bookings", icon: Ticket },
    { label: "Attendees", href: "/admin/attendees", icon: Users },
    { label: "Payments", href: "/admin/payments", icon: Wallet },
    { label: "Reports", href: "/admin/reports", icon: ChartNoAxesCombined },
    { label: "Calendar", href: "/admin/calendar", icon: CalendarRange },
    { label: "Settings", href: "/admin/settings", icon: Settings },
    { label: "Help & Support", href: "/admin/help", icon: HelpCircle },
];

function Dropdown({ children, className = "" }) {
    return (
        <div
            className={`absolute right-0 top-full z-[60] mt-3 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-black/[0.08] dark:border-white/10 dark:bg-[#252A34] ${className}`}
        >
            {children}
        </div>
    );
}

export default function AdminNavbar({ onMenuClick }) {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const [adminInfo, setAdminInfo] = useState({
        name: "Admin User",
        email: "admin@bgctub.ac.bd",
        role: "Administrator",
    });

    useEffect(() => {
        setMounted(true);

        try {
            const storedUser = localStorage.getItem("admin_user");
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                setAdminInfo({
                    name: parsed.name || parsed.firstName || "Admin User",
                    email: parsed.email || "admin@bgctub.ac.bd",
                    role: parsed.role || "Administrator",
                });
            }
        } catch (e) {
            console.error("Failed to load admin user from storage", e);
        }
    }, []);

    useEffect(() => {
        setProfileOpen(false);
    }, [pathname]);

    const activePage = [...pages]
        .filter((page) =>
            page.href === "/admin"
                ? pathname === "/admin"
                : pathname === page.href ||
                pathname.startsWith(`${page.href}/`)
        )
        .sort((a, b) => b.href.length - a.href.length)[0];

    const pageTitle = activePage?.label || "Dashboard";

    function navigateTo(href) {
        setProfileOpen(false);
        router.push(href);
    }

    if (!mounted) return null;

    const initialLetter = adminInfo.name ? adminInfo.name.charAt(0).toUpperCase() : "A";

    return (
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-3 border-b border-gray-200/80 bg-white/90 px-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#191D25]/90 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open navigation menu"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-[#6A795D] dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/10 lg:hidden"
                >
                    <Menu size={20} />
                </button>

                <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="hidden sm:inline">Admin</span>
                        <span className="hidden sm:inline">/</span>
                        <span className="truncate">Management</span>
                    </div>

                    <h1 className="mt-0.5 truncate text-base font-bold text-gray-900 dark:text-white sm:text-lg">
                        {pageTitle}
                    </h1>
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <div className="relative flex shrink-0 items-center gap-3 sm:gap-4">
                    <ThemeToggle />

                    <button
                        type="button"
                        onClick={() => setProfileOpen(!profileOpen)}
                        aria-label="Open admin profile menu"
                        aria-expanded={profileOpen}
                        className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-100 dark:hover:bg-white/[0.06] sm:gap-3 sm:pl-2 cursor-pointer"
                    >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D9D28B] text-sm font-bold text-[#292A22]">
                            {initialLetter}
                        </span>

                        <span className="hidden text-left sm:block">
                            <span className="block text-xs font-semibold text-gray-900 dark:text-white truncate max-w-[120px]">
                                {adminInfo.name}
                            </span>
                            <span className="mt-0.5 block text-[10px] text-gray-500">
                                {adminInfo.role}
                            </span>
                        </span>

                        <ChevronDown
                            size={15}
                            className="hidden text-gray-400 sm:block"
                        />
                    </button>

                    {profileOpen && (
                        <>
                            <button
                                type="button"
                                aria-label="Close profile menu"
                                onClick={() => setProfileOpen(false)}
                                className="fixed inset-0 z-40 cursor-default"
                            />

                            <Dropdown className="w-60 p-2">
                                <div className="border-b border-gray-100 px-3 py-3 dark:border-white/10">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                        {adminInfo.name}
                                    </p>
                                    <p className="mt-1 truncate text-xs text-gray-500">
                                        {adminInfo.email}
                                    </p>
                                    <span className="mt-2 inline-flex rounded-md bg-[#D9D28B]/30 px-2 py-1 text-[10px] font-semibold text-gray-700 dark:text-gray-200">
                                        {adminInfo.role}
                                    </span>
                                </div>

                                <div className="py-1">
                                   
                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            
                                            localStorage.removeItem("admin_user");
                                            router.push("/admin");
                                        }}
                                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                                    >
                                        <LogOut size={15} />
                                        <span>Log out</span>
                                    </button>
                                </div>
                            </Dropdown>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}