import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Scale,
  UserRound,
  Receipt,
  LogOut,
} from "lucide-react";
import Logo from "./Logo";
import { getInitials } from "../utils/format";
import { useCurrentUser } from "../context/UserContext";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Groups", path: "/groups", icon: FolderKanban },
  { name: "Add Expense", path: "/expense", icon: Receipt },
  { name: "Balances", path: "/balances", icon: Scale },
  { name: "Profile", path: "/profile", icon: UserRound },
];

function Sidebar({ onNavigate, onLogout }) {
  const { user } = useCurrentUser();

  return (
    <aside className="flex h-full w-72 flex-col bg-sidebar text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <Logo inverted />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
            {getInitials(user?.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {user?.name || "Account"}
            </p>
            <p className="truncate text-xs text-gray-400">
              {user?.email || "Signed in"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
