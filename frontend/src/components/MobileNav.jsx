import { Home, PlusCircle, User } from "lucide-react";

function MobileNav({ activePage, setActivePage }) {
  const navItems = [
    {
      id: "feed",
      icon: Home,
    },
    {
      id: "create",
      icon: PlusCircle,
    },
    {
      id: "profile",
      icon: User,
    },
  ];

  return (
    <div className="lg:hidden glass fixed bottom-4 left-4 right-4 z-40 rounded-3xl p-3 flex justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`rounded-2xl p-3 transition ${
              activePage === item.id
                ? "bg-sky-400 text-slate-950"
                : "text-slate-300"
            }`}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
}

export default MobileNav;