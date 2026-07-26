import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Globe,
  Lock,
  Plus,
  ExternalLink,
  PlusIcon,
  PowerIcon,
} from "lucide-react";
import { dashboard, signOut } from "@/better-auth/api";
import type { DashboardType } from "@/better-auth/types";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const [polls, setPolls] = useState<DashboardType>(null);

  useEffect(() => {
    const dashboardDetailHandler = async () => {
      const response = await dashboard();
      const { data } = response;
      setPolls(data.result);
    };

    dashboardDetailHandler();
  }, []);


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

  if (!polls?.length) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          No polls found
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Create your first poll and start collecting responses.
        </p>

        <button
          onClick={() => navigate("/polls")}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          <Plus size={18} />
          Create your first poll
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-5xl px-5 py-8">
        <div className="mb-8 flex items-start justify-between">
          <div className="">
            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage all your polls
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to={"/polls"}>
              <button className="flex items-center gap-1 rounded-lg bg-black px-4 py-2 text-sm 
              font-semibold text-white shadow-[inset_0_0_8px_rgba(255,255,255,1)]">
                <PlusIcon size={16} strokeWidth={2} />
                Create Poll
              </button>
            </Link>

            <button
              onClick={logOutHandler}
              className="flex items-center gap-1 rounded-lg border border-red-300 bg-red-50
               px-4 py-2 text-sm font-semibold text-red-600"
            >
              <PowerIcon size={16} />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 space-y-1">
          {polls.map((poll) => (
            <div
              key={poll.id}
              onClick={() =>
                navigate(`/poll-detail/${poll.dashboardCode}`)
              }
              className="group rounded-xl border border-neutral-500/30 shadow-sm
               bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-neutral-500/40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {poll.title}
                  </h2>

                  <p className="mt-1 line-clamp-2 text-sm text-neutral-500 text-muted-foreground">
                    {poll.description || "No description"}
                  </p>
                </div>

                <div
                  className={`rounded-full px-3 py-1 text-xs font-medium ${poll.status === "live"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {poll.status}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-5 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  {poll.visibility === "public" ? (
                    <Globe size={14} />
                  ) : (
                    <Lock size={14} />
                  )}

                  {poll.visibility.charAt(0).toUpperCase() + poll.visibility.slice(1)}
                </div>

                <div className="flex items-center gap-1 ">
                  <CalendarDays size={14} />
                  {new Date(poll.createdAt).toLocaleDateString()}
                </div>

                <Link to={`poll-details/${poll.dashboardCode}`}>
                  <div className="flex items-center gap-1">
                    <ExternalLink size={14} />
                    Link
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
