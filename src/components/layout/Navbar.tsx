import { Link } from "@/router";

const NAV_ITEMS = [
  { to: "/catan" as const, label: "Catan", image: "logos/catan.webp" },
  {
    to: "/7-wonders" as const,
    label: "7 Wonders",
    image: "logos/7_wonders.webp",
  },
  { to: "/dice" as const, label: "Dice", icon: "🎲" },
];

export function Navbar() {
  return (
    <nav className="bg-forest/95 text-sand sticky top-0 z-50 px-4 py-0 shadow-[0_2px_20px_rgba(28,37,36,0.3)] backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between">
        <Link
          to="/"
          className="font-display text-caramel hover:text-sand flex items-center gap-2 text-xl font-bold tracking-tight transition-colors duration-300"
        >
          <span className="text-2xl">♟</span>
          <span className="hidden sm:inline">Board Game Helpers</span>
          <span className="sm:hidden">BGH</span>
        </Link>
        <div className="flex gap-0.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sand/70 hover:bg-sand group relative flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 select-none"
              activeProps={{
                className:
                  "relative px-3 py-2 rounded-lg text-sm outline outline-sand font-medium text-caramel transition-all duration-200 group",
              }}
            >
              {item.image && <img src={item.image} height="52" width="52" />}
              {item.icon && (
                <span className="mr-1.5">
                  {item.icon} {item.label}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
