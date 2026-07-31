import type { AnswersType } from "@/better-auth/types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Rectangle,
} from "recharts";
import "@/index.css";

type ResultProps = {
  answer: AnswersType;
};

const Result = ({ answer }: ResultProps) => {
  return (
    <div className="max-w-full bg-zinc-50 flex flex-col items-center justify-center min-h-screen">
      <div
        className="rounded-xl bg-white border py-6 pr-7 shadow-sm
    border-zinc-300 max-w-4xl w-full "
      >
        <h2 className="mb-2 text-3xl font-semibold text-center">
          Final Result
        </h2>
        <p className="text-center mb-6 text-lg text-neutral-600">
          Correct answer is shown with Green Color
        </p>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={answer}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="title" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="votes"
              radius={[8, 8, 0, 0]}
              shape={(props) => {
                const current = answer[props.index];

                return (
                  <Rectangle
                    {...props}
                    fill={current.isCorrect ? "#22C55E" : "#9ca3af"}
                    opacity={current.isCorrect ? 1 : 1}
                  ></Rectangle>
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Result;
