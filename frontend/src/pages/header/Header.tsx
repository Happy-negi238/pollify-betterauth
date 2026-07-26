import { useAuth } from "@/context/AuthContext";
import { BarChart2, User2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { session } = useAuth()
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <BarChart2 strokeWidth={3} />
          </div>

          <h1 className="text-xl font-bold text-slate-800">Pollify</h1>
        </div>

        {session ?
          (
            <Link to={"/dashboard"}>
              <button
                className="rounded-lg cursor-pointer px-4 py-2 text-sm font-semibold text-neutral-800
              border border-neutral-500/20 shadow/5 hover:shadow/10 flex items-center justify-center gap-1"
              >
                <User2Icon size={17} />  <span>Dashboard</span>
              </button>
            </Link>
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
