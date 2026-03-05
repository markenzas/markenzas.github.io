import { Link } from '@/router';

const NAV_ITEMS = [
  { to: '/catan' as const, label: 'Catan', icon: '🏝️' },
  { to: '/7-wonders' as const, label: '7 Wonders', icon: '🏛️' },
  { to: '/dice' as const, label: 'Dice', icon: '🎲' },
];

export function Navbar() {
  return (
    <nav className="bg-forest/95 backdrop-blur-sm text-sand px-4 py-0 shadow-[0_2px_20px_rgba(28,37,36,0.3)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-14">
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-tight text-caramel hover:text-sand transition-colors duration-300 flex items-center gap-2"
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
              className="relative px-3 py-2 rounded-lg text-sm font-medium text-sand/70 hover:text-sand transition-all duration-200 group"
              activeProps={{
                className:
                  'relative px-3 py-2 rounded-lg text-sm font-medium text-caramel transition-all duration-200 group',
              }}
            >
              <span className="mr-1.5">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-caramel rounded-full transition-all duration-300 w-0 group-[.active]:w-2/3" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
