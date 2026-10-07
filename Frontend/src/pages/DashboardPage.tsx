import { Outlet } from "react-router-dom";
import logoOnly from "../assets/logo_only.png";
import Navbar from "./dashboard/Navbar";
import Sidebar from "./dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="h-screen grid grid-cols-[250px_1fr] overflow-hidden">
      <img
        src={logoOnly}
        className="fixed right-10 bottom-5 opacity-30 h-10 w-10"
      />
      <aside className="border border-r-accent h-screen overflow-hidden">
        <Sidebar />
      </aside>

      <div className="flex flex-col h-screen min-h-0">
        <header className="py-3 px-5 bg-card border border-b-accent shrink-0">
          <Navbar />
        </header>

        <main className="flex flex-1 min-h-0 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;