import logoOnly from "../assets/logo_only.png";
import AnnouncementsBar from "./dashboard/AnnouncementsBar";
import Navbar from "./dashboard/Navbar";
import Sidebar from "./dashboard/Sidebar";
import SocialListing from "./dashboard/SocialListing";

const DashboardLayout = () => {
  return (
    <div className="min-h-0  grid grid-cols-[250px_1fr]">
      <img
        src={logoOnly}
        className="fixed right-10 bottom-5 opacity-30 h-10 w-10"
      />
      {/* Sidebar */}
      <aside className=" border border-r-accent ">
        <Sidebar />
      </aside>

      {/* Right side (Navbar + Content) */}
      <div className="flex flex-col">
        {/* Navbar */}
        <header className="  py-3 px-5 bg-card border border-b-accent">
          <Navbar />
        </header>

        {/* Content area */}
        <main className="flex flex-1 min-h-0 overflow-hidden">
          <section className="flex-1 p-4 min-h-0 overflow-hidden">
            <SocialListing />
          </section>

          <aside className="w-84 p-4 bg-card border border-l-accent overflow-y-auto shrink-0">
            <AnnouncementsBar />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
