import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Navbar />
                    <main className="flex-1 pb-0 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
