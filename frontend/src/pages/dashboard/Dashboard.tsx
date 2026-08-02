import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Globe,
  Lock,
  Loader2,
  Plus,
  ExternalLink,
  PlusIcon,
  PowerIcon,
  Trash2,
} from "lucide-react";
import { dashboard, deleteQuestion, signOut } from "@/better-auth/api";
import type { DashboardType } from "@/better-auth/types";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const [polls, setPolls] = useState<DashboardType>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const dashboardDetailHandler = async () => {
      const response = await dashboard();
      const { data } = response;
      setPolls(data.result);
    };

    dashboardDetailHandler();
  }, []);

  const logOutHandler = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const response = await signOut();
      const { error } = response.data;

      if (error) {
        toast.error("Failed to log out");
        return;
      }

      setSession(null);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const deleteHandler = async (id: string) => {
    if (deletingId) return;

    setDeletingId(id);

    try {
      const response = await deleteQuestion(id);
      const { message } = response;

      toast.success(message);
      setPolls((prev) =>
        prev ? prev.filter((question) => question.id !== id) : prev,
      );
    } catch {
      toast.error("Failed to delete poll");
    } finally {
      setDeletingId(null);
    }
  };

  if (!polls?.length) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
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
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-5xl px-5 py-8">
        <div className="mb-8 flex items-start justify-between">
          <div className="">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage all your polls
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to={"/polls"}>
              <button
                className="flex items-center gap-1 rounded-lg bg-blue-600 hover:bg-blue-600/90 px-4 py-2 text-sm 
                font-semibold text-white shadow-[inset_0_2px_1px_rgba(96,165,250,0.8)] text-shadow-2xs text-shadow-black/40"
              >
                <PlusIcon size={16} strokeWidth={2} />
                Create Poll
              </button>
            </Link>

            <button
              onClick={logOutHandler}
              disabled={isLoggingOut}
              className="flex items-center gap-1 rounded-lg border border-red-300 bg-red-50
               px-4 py-2 text-sm font-semibold text-red-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Logging out...
                </>
              ) : (
                <>
                  <PowerIcon size={16} />
                  Logout
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 space-y-1">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="rounded-xl border border-neutral-500/30 shadow-sm
               bg-white p-4 transition-all hover:border-neutral-500/40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className=" flex gap-2 items-center">
                    <h2 className="text-lg font-semibold">{poll.title}</h2>
                    <div
                      className={`rounded px-2 py-0.5 text-xs font-medium ${poll.status === "live"
                          ? "bg-green-100 text-green-700 border border-green-300/40"
                          : "bg-red-100 text-red-700 border border-red-300"
                        }`}
                    >
                      {poll.status}
                    </div>
                  </div>

                  <p className="mt-1 line-clamp-2 text-sm text-neutral-400">
                    {poll.description || "No description"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteHandler(poll.id)}
                  disabled={deletingId === poll.id}
                  className="group flex items-center rounded px-1 py-1 transition hover:bg-red-400/20 
                  disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deletingId === poll.id ? (
                    <Loader2 size={16} className="animate-spin text-red-500" />
                  ) : (
                    <Trash2
                      strokeWidth={2}
                      size={16}
                      className="text-slate-600 transition duration-100 group-hover:text-red-500/80"
                    />
                  )}
                </button>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-5 text-sm text-muted-foreground">
                <div
                  className="flex items-center gap-0.5 text-blue-600/70 hover:text-blue-600 transition-all ease-in-out
                 duration-100 font-medium"
                >
                  {poll.visibility === "public" ? (
                    <Globe size={14} />
                  ) : (
                    <Lock size={14} />
                  )}

                  {poll.visibility.charAt(0).toUpperCase() +
                    poll.visibility.slice(1)}
                </div>

                <div
                  className="flex items-center gap-1 text-orange-500/80 transition-all ease-in-out
                 duration-100 font-medium"
                >
                  <CalendarDays size={14} />
                  {new Date(poll.createdAt).toLocaleDateString()}
                </div>

                <Link to={`/poll-detail/${poll.dashboardCode}`}>
                  <div className="flex items-center gap-1 font-medium">
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
