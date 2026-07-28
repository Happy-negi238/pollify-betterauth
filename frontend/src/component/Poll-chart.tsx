import type { PollChartProps } from "@/better-auth/types";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Rectangle,
} from "recharts";

const COLORS = [
    "#60a5fa",
    "#34d399",
    "#fbbf24",
    "#f87171",
    "#a78bfa",
    "#22d3ee",
];

const PollChart = ({ answer }: PollChartProps) => {
    const totalVotes = answer.reduce((acc, curr) => acc + curr.votes, 0);

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-4">
                        <div>
                            <p className="text-lg font-medium text-slate-500">Total Responses</p>
                            <p className=" text-2xl font-semibold text-slate-900">{totalVotes}</p>
                        </div>
                    </div>
                    <span className="inline-flex items-center rounded-lg bg-transparent px-3 
                    py-1 text-sm font-semibold text-green-500 border border-green-500">
                        Live
                    </span>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                    {/* <div className="h-48 rounded-xl bg-white shadow-sm" /> */}
                    <div className="w-full h-96 rounded-xl border bg-white p-4 border-transparent">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={answer}>
                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="title" />

                                <YAxis allowDecimals={false} />

                                <Tooltip />

                                <Bar
                                    dataKey="votes"
                                    radius={[8, 8, 0, 0]}
                                    shape={(props) => (
                                        <Rectangle {...props} fill={COLORS[props.index % COLORS.length]} />
                                    )}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>



    );
};

export default PollChart;
