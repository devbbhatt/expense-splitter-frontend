import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex">

                {/* Desktop Sidebar */}
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                {/* Mobile Sidebar */}
                {sidebarOpen && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/40 z-40"
                            onClick={() => setSidebarOpen(false)}
                        />

                        <div className="fixed top-0 left-0 z-50 md:hidden">
                           <div onClick={() => setSidebarOpen(false)}>
    <Sidebar />
</div>
                        </div>
                    </>
                )}

                <main className="flex-1 p-4 md:p-10">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default Layout;