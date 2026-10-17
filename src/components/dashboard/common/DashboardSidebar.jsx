"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CalendarDays,
    Ticket,
    Users,
    X,
    ChevronRight,
    LogOut,
    MessageCircleMore,
} from "lucide-react";
import { Button } from "@heroui/react";

const navigation = [
    {
        title: "MAIN MENU",
        items: [
            {
                label: "Dashboard",
                href: "/admin/overview",
                icon: LayoutDashboard,
                exact: true,
            },
            {
                label: "Events",
                href: "/admin/events",
                icon: CalendarDays,
            },
            
            {
                label: "Speakers",
                href: "/admin/speakers",
                icon: Users,
            },
            {
                label: "Registration",
                href: "/admin/registration",
                icon: Ticket,
            },
            {
                label: "Message",
                href: "/admin/message",
                icon: MessageCircleMore,
            },
        ],
    },
];

export default function AdminSidebar({
    open,
    onClose,
    onNavigate,
}) {
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("admin_user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        localStorage.removeItem("token_expires_at");
        window.location.href = "/admin/";
    };

    return (
        <>
            {open && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-white/5 bg-[#586151] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-5">
                    <Link
                        href="/"
                        onClick={onNavigate}
                        className="flex items-center gap-3"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl text-[#20242D]">
                            <img
                                src={'/icon.svg'}
                                className="w-10 h-10"
                                alt="Logo"
                            />
                        </span>

                        <span>
                            <span className="block text-lg font-bold uppercase tracking-tight text-white">
                                Tech Fest
                            </span>
                            <span className="block text-[11px] tracking-wide">
                                EVENT MANAGEMENT
                            </span>
                        </span>
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
                    {navigation.map((group) => (
                        <div key={group.title}>
                            <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.16em]">
                                {group.title}
                            </p>

                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const Icon = item.icon;

                                    const isActive = item.exact
                                        ? pathname === item.href
                                        : pathname === item.href ||
                                        pathname.startsWith(`${item.href}/`);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={onNavigate}
                                            aria-current={isActive ? "page" : undefined}
                                            className={`group flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${isActive
                                                ? "bg-[#a4a177] shadow-sm"
                                                : "hover:bg-white/[0.07] hover:text-white"
                                                }`}
                                        >
                                            <Icon
                                                size={18}
                                                strokeWidth={isActive ? 2.2 : 1.8}
                                                className={
                                                    isActive
                                                        ? "shrink-0"
                                                        : "shrink-0 transition-transform group-hover:scale-105"
                                                }
                                            />

                                            <span className="flex-1">{item.label}</span>

                                            {isActive && (
                                                <ChevronRight size={15} strokeWidth={2.2} />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="shrink-0 border-t border-white/10 p-4">
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className={'w-full border-none text-red-400 hover:bg-[#686547] rounded-none flex items-center justify-center px-4 py-2 cursor-pointer'}
                    >
                        <span>Log Out</span>
                        <LogOut size={18} className="text-red-400" />
                    </Button>
                </div>
            </aside>
        </>
    );
}