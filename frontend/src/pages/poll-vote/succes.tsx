import { CheckCircle2 } from "lucide-react";

const Success = ({ message }: { message: string }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Vote Submitted!
          </h1>

          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {message}
          </p>

          <div className="mt-6 w-full rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-medium text-green-700">
              ✅ Your response has been recorded successfully.
            </p>
            <p className="mt-1 text-sm text-green-600">
              Thank you for participating in this poll.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
