import { BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "Features", id: "features" },
  { name: "How it Works", id: "how-it-works" },
  { name: "Pricing", id: "pricing" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <BarChart2 strokeWidth={4} />
          </div>

          <h1 className="text-xl font-semibold text-slate-800">Pollify</h1>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="transition hover:text-blue-600"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm">
            <Link to="/log-in">Log in</Link>
          </button>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
            <Link to="/sign-up">Sign up</Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
