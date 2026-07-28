import { getPollDetail } from "@/better-auth/api"
import type { PollAnswer, PollDetailType } from "@/better-auth/types";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
    Clock3,
    Globe,
    UserRound,
    QrCode,
    Copy,
    ChartColumn,
    Edit3,
    Trash2,
    PlusIcon,
} from "lucide-react";
import QRCode from "react-qr-code";
import { socket } from "@/socket";

import NotFound from "./NotFound";
import PollChart from "@/component/Poll-chart";

// A lightweight, deterministic "QR-like" placeholder pattern so the panel
// doesn't need an external QR library. Swap for a real QR generator later.
function QrPlaceholder({ value }: { value: string }) {
    const baseUrl = window.location.origin;
    const voteUrl = `${baseUrl}/vote/${value}`;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <QRCode
                value={voteUrl}
                size={220}
                bgColor="#FFFFFF"
                fgColor="#111827"
                level="H"
            />
        </div>
    );
}

// ---- Cards --------------------------------- 

function PollInformationCard({ poll }: { poll: PollDetailType }) {
    const expires = poll.duration instanceof Date ? poll.duration.toLocaleString() : new Date(poll.duration).toLocaleString();
    const mode = poll.visibility === "public" ? "Public" : "Private";

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-slate-900">
                <h2 className="text-lg font-semibold">{poll.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{poll.description}</p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {mode}
                    </span>
                    <span className="text-xs text-slate-500">Poll code: {poll.pollCode}</span>
                </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3 text-slate-500">
                        <Clock3 className="h-4 w-4" strokeWidth={2} />
                        <span className="text-sm font-medium">Expires</span>
                    </div>
                    <p className="mt-3 text-base font-semibold text-slate-900">{expires}</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3 text-slate-500">
                        <UserRound className="h-4 w-4" strokeWidth={2} />
                        <span className="text-sm font-medium">Responses</span>
                    </div>
                    <p className="mt-3 text-base font-semibold text-slate-900">0</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3 text-slate-500">
                        <Globe className="h-4 w-4" strokeWidth={2} />
                        <span className="text-sm font-medium">Mode</span>
                    </div>
                    <p className="mt-3 text-base font-semibold text-slate-900">{mode}</p>
                </div>
            </div>
        </section>
    );
}

function SharePollCard({ poll }: { poll: PollDetailType }) {
    const [copied, setCopied] = useState(false);
    const baseUrl = window.location.origin;
    const voteUrl = `${baseUrl}/vote/${poll.pollCode}`;
    const [tab, setTab] = useState<"link" | "qr">("link");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(voteUrl);
        } catch (e) {
            // clipboard may be unavailable in this preview context
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-[20px] font-semibold text-slate-900">Share this poll</h2>
                    </div>
                    <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
                        {[
                            { value: "link", label: "Link" },
                            { value: "qr", label: "QR Code" },
                        ].map((option) => (
                            <div key={option.value}>
                                <button
                                    key={option.value}
                                    onClick={() => setTab(option.value as "link" | "qr")}
                                    className={`flex rounded-lg px-4 py-2 text-xs font-semibold transition 
                                    ${tab === option.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
                                >
                                    {option.value === "qr" && <QrCode className="h-4 w-4 mr-1" />}
                                    {option.label}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {tab === "qr" ? (
                    <div className="grid place-items-center rounded-xl border border-slate-200 bg-slate-50 p-6">
                        <QrPlaceholder value={poll.pollCode} />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-slate-700 text-sm break-all">
                            {voteUrl}
                        </div>
                        <button
                            onClick={handleCopy}
                            className="inline-flex items-center justify-center gap-2 rounded-lg
                             bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-700"
                        >
                            <Copy className="h-4 w-4" strokeWidth={2} />
                            {copied ? "Copied" : "Copy link"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

function Header({ title }: { title: string }) {
    return (
        <header className="mb-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="space-y-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                                <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
                                <span className="flex rounded-md bg-transparent border border-green-500
                                 px-2 py-0.5 text-xs font-md text-green-500">
                                    Active
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                                <Edit3 className="h-4 w-4" strokeWidth={2} />
                                Edit
                            </button>
                            <Link to={"/polls"}>
                                <button className="inline-flex items-center gap-1 rounded-xl border border-slate-200
                             bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                                    <PlusIcon className="h-4 w-4" strokeWidth={2} />
                                    Create Poll
                                </button>
                            </Link>
                            <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 
                            px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                                <ChartColumn className="h-4 w-4" strokeWidth={2} />
                                Publish Results
                            </button>
                            <button className="inline-flex items-center justify-center rounded-2xl border border-red-400 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-50">
                                <Trash2 className="h-4 w-4 text-red-400" strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 h-px w-full bg-slate-200" />
        </header>
    );
}

const PollDetails = () => {
    const params = useParams() as { dashboard_code?: string };
    const dashboardCode = params.dashboard_code;
    const [pollData, setPollData] = useState<PollDetailType | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    // const [answer, setAnswer] = useState<PollAnswer | null>(null);

    useEffect(() => {
        if (!dashboardCode) {
            setNotFound(true);
            setLoading(false);
            return;
        }

        const checkDashboardCode = async () => {
            try {
                const response = await getPollDetail(dashboardCode);
                const { data } = response;

                if (!data) {
                    setNotFound(true);
                    return;
                }

                setPollData(data);
            } catch (error) {
                setNotFound(true)
            } finally {
                setLoading(false)
            }
        };

        checkDashboardCode();

        socket.connect();
        socket.on("server:poll:updated", (poll) => {
            console.log("Previous Poll Data:", pollData);
            console.log("Updated Answer:", poll);

            const updateAnswer = poll.updatedAnswer as PollAnswer;

            setPollData((prev) => {
                console.log("prev: ", prev)
                if (!prev) return prev;

                return {
                    ...prev,
                    answers: prev.answers.map((answer) =>
                        answer.id === updateAnswer.id
                            ? updateAnswer
                            : answer
                    ),
                }
            })
        });

        return () => {
            socket.off("server:poll:updated");
            socket.disconnect();
        };

    }, [dashboardCode]);


    if (loading) {
        return (
            <div>Loading...</div>
        );
    }

    if (notFound) {
        return <NotFound />
    }

    if (!pollData) {
        return null;
    }

    return (
        <div className="min-h-screen w-full bg-slate-50">
            <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 py-6">
                <Header title={pollData.title} />

                <div className="flex flex-col gap-6 items-start">
                    <div className="w-full">
                        <PollInformationCard poll={pollData} />
                    </div>
                    <div className="w-full">
                        <SharePollCard poll={pollData} />
                    </div>
                </div>

                <div className="mt-6">
                    <PollChart answer={pollData.answers} />
                </div>
            </div>
        </div>
    );
};

export default PollDetails;
