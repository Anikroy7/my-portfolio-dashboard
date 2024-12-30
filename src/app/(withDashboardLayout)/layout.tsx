// src/layouts/layout.tsx
import NavbarComponent from "@/src/components/dashboard/Navbar";
import Sidebar from "@/src/components/dashboard/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <NavbarComponent />
        {children}
      </main>
    </div>
  );
}
