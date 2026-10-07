import { Link } from "react-router-dom";
import logo from "../../assets/campus_connect_logo.svg";
import { useLogOut } from "../../features/auth/hooks/useLogOut";

export interface SidebarRoute {
  name: string;
  link: string;
}

export interface RoutesInterface {
  routes: SidebarRoute[];
}

const Routes: RoutesInterface = {
  routes: [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Explore", link: "/explore" },
    { name: "MarketPlace", link: "/market-place" },
    { name: "Notifications", link: "/notifications" },
    { name: "Chat", link: "/chat" },
    { name: "Profile", link: "/profile" },
  ],
};

const Sidebar = () => {
  const { mutate: logout, isPending } = useLogOut();

  const handleLogOut = () => {
    logout();
  };
  return (
    <div className=" h-full p-2 bg-card flex flex-col justify-between ">
      <div>
        <img
          src={logo}
          alt="Campus Connect Logo"
          className="w-50 mx-auto opacity-60 mb-5"
        />

        <ul className="space-y-3">
          {Routes.routes.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className="block px-4 text-body py-2 rounded-lg text-text-muted border border-accent hover:text-text-primary hover:border-accent-hover hover:bg-primary"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button
          className="w-[98%] bg-primary py-2 rounded-xl border border-accent-hover ml-1 mr-1 mt-3 hover:bg-primary-hover text-xl font-body font-semibold text-text-primary hover:cursor-pointer mb-5"
          type="submit"
          onClick={handleLogOut}
        >
          {isPending ? "Logging Out..." : "LogOut"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
