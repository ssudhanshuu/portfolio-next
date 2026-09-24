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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-wide hidden sm:block">Admin</h2>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex bg-[#13131a] rounded-lg items-center px-4 py-2.5 border border-[#22222f] w-72">
                <MagnifyingGlassIcon className="w-5 h-5 text-[#a1a1aa] mr-2" />
                <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-[#71717a]" />
              </div>
              <div className="flex items-center gap-4">
                <div className="relative cursor-pointer">
                  <BellIcon className="w-6 h-6 text-[#a1a1aa] hover:text-white transition" />
                  <span className="absolute -top-1 -right-1 bg-pink-500 w-2.5 h-2.5 rounded-full"></span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center cursor-pointer">
                  <span className="text-sm font-bold">U</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-12 px-4 lg:px-16 py-8">
          <div className="w-full md:w-72 flex-shrink-0">
            <AdminSidebar />
          </div>
          
          <main className="flex-1 w-full overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
