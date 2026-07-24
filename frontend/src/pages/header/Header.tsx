import { signOut } from "@/better-auth/api";
import { useAuth } from "@/context/AuthContext";
import { BarChart2, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "Features", id: "features" },
  { name: "How it Works", id: "how-it-works" },
  { name: "Pricing", id: "pricing" },
];

const Header = () => {

  const { session, setSession } = useAuth();

  const logOutHandler = async () => {
    console.log("handler");
    const response = await signOut();
    const { error } = response.data;

    if (error) {
      toast.error("Failed to log out")
      return;
    }

    setSession(null);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <BarChart2 strokeWidth={3} />
          </div>

          <h1 className="text-xl font-bold text-slate-800">Pollify</h1>
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

        {session ?
          (
            <button
              onClick={logOutHandler}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-neutral-800
              border border-neutral-500/20 shadow/5 hover:shadow/10 flex items-center justify-center gap-1"
            >
              <LogOut size={17}/>  <span>Log out</span>
            </button>
          ) :
          (
            <div className="flex gap-3">
              <Link to="/log-in">
                <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm">
                  Log in
                </button>
              </Link>

              <Link to="/sign-up">
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                  Sign up
                </button>
              </Link>
            </div>
          )
        }

      </div>
    </header>
  );
};

export default Header;
