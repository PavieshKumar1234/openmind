import { Home, PlusCircle, User, LogOut } from "lucide-react";

function Sidebar({ activePage, setActivePage, onLogout }) {
  const navItems = [
    {
      id: "feed",
      label: "Feed",
      icon: Home,
    },
    {
      id: "create",
      label: "Create",
      icon: PlusCircle,
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <aside className="glass fixed left-4 top-4 bottom-4 hidden lg:flex w-72 rounded-3xl p-6 flex-col z-20">
      <h1 className="neon-title text-3xl font-black tracking-wide">
        OpenMind
      </h1>

      <p className="text-slate-400 mt-2 text-sm">
        Modern Social Blogging Platform
      </p>

      <nav className="mt-10 space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                activePage === item.id
                  ? "bg-sky-400 text-slate-950 font-bold"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <button
        onClick={onLogout}
        className="mt-auto flex items-center gap-3 rounded-2xl px-4 py-3 text-red-300 hover:bg-red-500/10 transition"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;