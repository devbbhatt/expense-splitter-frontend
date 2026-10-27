import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import api from "../services/api";
import { UserContext } from "../context/UserContext";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuButtonRef = useRef(null);
  const mobileNavigationRef = useRef(null);
  const wasSidebarOpen = useRef(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await api.get("/users/me");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadCurrentUser();
  }, []);

  useEffect(() => {
    if (!sidebarOpen) {
      if (wasSidebarOpen.current) {
        menuButtonRef.current?.focus();
        wasSidebarOpen.current = false;
      }

      return undefined;
    }

    wasSidebarOpen.current = true;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileNavigationRef.current?.querySelector("a")?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        mobileNavigationRef.current?.querySelectorAll(
          'a[href], button:not(:disabled)'
        ) || []
      );
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [sidebarOpen]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="min-h-screen bg-canvas">
        <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-40 md:block">
          <Sidebar onLogout={logout} />
        </div>

        {sidebarOpen && (
          <div
            id="mobile-navigation"
            ref={mobileNavigationRef}
            className="fixed inset-0 z-50 md:hidden"
          >
            <button
              type="button"
              className="absolute inset-0 bg-ink/40"
              aria-label="Close navigation"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative h-full w-72 max-w-[85vw] shadow-float">
              <Sidebar
                onNavigate={() => setSidebarOpen(false)}
                onLogout={() => {
                  setSidebarOpen(false);
                  logout();
                }}
              />
            </div>
          </div>
        )}

        <div className="md:pl-72">
          <Navbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            menuButtonRef={menuButtonRef}
            onLogout={logout}
          />
          <main className="min-w-0 p-4 pb-10 md:p-8">
            <div className="page-wrap min-w-0">{children}</div>
          </main>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default Layout;
