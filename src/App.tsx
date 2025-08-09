import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/routes";
import { useAppStore } from "./app/store";

const Navbar: React.FC = () => {
  const user = useAppStore((s) => s.user);
  const setUser = useAppStore((s) => s.setUser);
  const logout = useAppStore((s) => s.logout);

  const toggleRole = () => {
    if (!user) {
      setUser({ id: 2, name: "مدیر تست", role: "admin", email: "" });
      return;
    }
    if (user.role === "user") {
      setUser({ ...user, role: "admin" });
    } else {
      setUser({ ...user, role: "user" });
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <a href="/" className="text-lg font-bold text-gray-800">
            modular website
          </a>
          <a href="/products" className="text-gray-600 hover:text-gray-900">
            محصولات
          </a>
          <a href="/users" className="text-gray-600 hover:text-gray-900">
            کاربران
          </a>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-700">
            {user ? `${user.name} (${user.role})` : "مهمان"}
          </div>
          <button
            onClick={toggleRole}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            {user
              ? user.role === "admin"
                ? "سوئیچ به user"
                : "سوئیچ به admin"
              : "ورود مدیر تست"}
          </button>
          {user?.role && (
            <button onClick={logout} className="px-3 py-1 border rounded">
              خروج
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container mx-auto p-4">
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
};

export default App;
