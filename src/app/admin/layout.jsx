"use client";

import AdminSidebar from "@/components/dashboard/common/DashboardSidebar";
import AdminNavbar from "@/components/dashboard/common/Navbar";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const isLoginPage = pathname === "/admin";

    useEffect(() => {
        if (isLoginPage) {
            setAuthorized(true);
            return;
        }

        const adminUser = localStorage.getItem("admin_user");
        const token = localStorage.getItem("token");

        if (!adminUser && !token) {
            setAuthorized(false);

            router.replace("/admin");
        } else {
            setAuthorized(true);
        }
    }, [pathname, isLoginPage, router]);

    if (isLoginPage) {
        return <div className="min-h-screen bg-[#6A795D]">{children}</div>;
    }

    if (!authorized) {
        return (
            <div className="min-h-screen bg-[#191D25] flex items-center justify-center text-white">
                <div className="flex items-center gap-2 font-mono text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Checking Authorization...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F7F4] text-gray-900 transition-colors dark:bg-[#191D25] dark:text-gray-100">
            <AdminSidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onNavigate={() => setSidebarOpen(false)}
            />

            <div className="min-h-screen lg:pl-[270px]">
                <AdminNavbar
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="min-h-[calc(100vh-76px)] p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}