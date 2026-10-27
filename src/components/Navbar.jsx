import { LogOut, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useCurrentUser } from "../context/UserContext";
import Button from "./ui/Button";

function Navbar({ sidebarOpen, setSidebarOpen, menuButtonRef, onLogout }) {
  const { user } = useCurrentUser();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            ref={menuButtonRef}
            type="button"
            className="rounded-xl p-2 text-ink hover:bg-canvas md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={sidebarOpen}
            aria-controls={sidebarOpen ? "mobile-navigation" : undefined}
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
          <div className="hidden min-w-0 max-w-64 text-right sm:block">
            <p className="truncate text-sm font-medium text-ink" title={user?.name}>
              {user?.name}
            </p>
            <p className="truncate text-xs text-muted" title={user?.email}>
              {user?.email}
            </p>
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
