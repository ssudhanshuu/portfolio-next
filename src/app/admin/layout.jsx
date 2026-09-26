import { AdminProvider } from "@/context/Admincontext";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      <div className="bg-[#0a0a0f] min-h-screen text-white font-sans w-full relative">
        {/* Top Header */}
        <header className="h-20 w-full bg-[#0a0a0f] border-b border-[#22222f] flex items-center justify-center px-4 md:px-12 lg:px-16 sticky top-0 z-40">
          <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-wide hidden sm:block">Admin</h2>
            </div>

            <div className="flex items-center gap-6">

              <div className="flex items-center gap-4">
                <div className="relative cursor-pointer">
                  <BellIcon className="w-6 h-6 text-[#a1a1aa] hover:text-white transition" />
                  <span className="absolute -top-1 -right-1 bg-pink-500 w-2.5 h-2.5 rounded-full"></span>
                </div>
                <div className="w-9 h-9 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center cursor-pointer">
                  <span className="text-sm font-bold">U</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="w-full max-w-290 mx-auto flex flex-col md:flex-row gap-10 px-4">

          {/* Left */}
          <div className="w-full md:w-99.25 shrink-0">
            <AdminSidebar />
          </div>

          {/* Right */}
          <main className="w-full md:w-198.75 shrink-0">
            {children}
          </main>

        </div>

      </div>
    </AdminProvider >
  );
}
