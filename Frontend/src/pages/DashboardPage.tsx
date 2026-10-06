import React from "react";
import logoOnly from "../assets/logo_only.png";
import logo from "../assets/campus_connect_logo.svg";

const DashboardLayout = () => {
  return (
    <div className="h-screen grid grid-cols-[250px_1fr]">
      <img
        src={logoOnly}
        className="fixed right-10 bottom-5 opacity-30 h-10 w-10"
      />
      {/* Sidebar */}
      <aside className=" p-4 bg-card border border-r-accent ">
        <img src={logo} alt="Campus Connect Logo" className="w-50  mx-auto opacity-60 mb-3" />
        
      </aside>

      {/* Right side (Navbar + Content) */}
      <div className="flex flex-col">
        {/* Navbar */}
        <header className="  p-4 bg-card border border-b-accent">Navbar</header>

        {/* Content area */}
        <main className="flex flex-1">
          {/* Post section (wider middle) */}
          <section className="flex-1  p-4">Posts</section>

          {/* Trending section (right side) */}
          <aside className="w-64  p-4 bg-card border border-l-accent">
            Trending
          </aside>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
