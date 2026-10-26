import { LogOut, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useCurrentUser } from "../context/UserContext";
import Button from "./ui/Button";

function Navbar({ sidebarOpen, setSidebarOpen, onLogout }) {
  const { user } = useCurrentUser();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="rounded-xl p-2 text-ink hover:bg-canvas md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="md:hidden">
            <Logo compact />
          </div>
          <p className="hidden text-sm text-muted md:block">
            Split expenses clearly with friends and groups
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-ink">{user?.name}</p>
            <p className="text-xs text-muted">{user?.email}</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onLogout}
            className="shrink-0"
          >
            <LogOut size={14} />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
