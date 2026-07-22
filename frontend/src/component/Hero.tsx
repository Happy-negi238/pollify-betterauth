import { BarChart2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-slate-50" id="home">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-2">
        {/* Left */}
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            Smart Polling Made Simple
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-slate-900">
            Create. Share.
            <br />
            Understand.
            <br />
            <span className="text-blue-600">Polls that Connect.</span>
          </h1>

          <p className="mt-5 max-w-md text-md leading-5 text-slate-500">
            Build interactive polls in seconds and watch results update live.
            Perfect for communities, classrooms, events and product feedback.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button className="rounded-lg bg-blue-600 px-6 py-3 text-md font-medium text-white transition hover:bg-blue-700">
              Create account
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs text-green-600">
              ✓
            </div>
            No sign-up required to vote
          </div>
        </div>

        {/* Right */}
        <div className="relative flex justify-center">
          {/* Background Shape */}
          <div className="absolute -top-10 right-0 h-80 w-80 rounded-[3rem] bg-blue-100/60 blur-3xl" />

          <div
            className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 
          shadow-xl shadow-slate-200/40"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-base font-semibold text-slate-800">
                  What feature should we build next?
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  128 votes received
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <BarChart2 strokeWidth={4} />
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {[
                {
                  option: "Real-time Analytics",
                  percent: "42%",
                  width: "w-[42%]",
                },
                {
                  option: "Custom Themes",
                  percent: "28%",
                  width: "w-[28%]",
                },
                {
                  option: "Export Results",
                  percent: "18%",
                  width: "w-[18%]",
                },
                {
                  option: "More Integrations",
                  percent: "12%",
                  width: "w-[12%]",
                },
              ].map((item) => (
                <div key={item.option}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-700">{item.option}</span>
                    <span className="text-slate-500">{item.percent}</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full bg-blue-600 ${item.width}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
              <p className="text-sm font-medium text-blue-700">Live Results</p>

              <p className="mt-1 text-xs text-slate-500">
                Votes update instantly without refreshing the page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
