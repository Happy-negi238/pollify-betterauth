import { Check, Link2, BarChart3 } from "lucide-react";

const steps = [
  {
    id: "01",
    icon: Check,
    title: "Create Your Poll",
    description:
      "Add your question, options, visibility, and poll duration in just a few clicks.",
  },
  {
    id: "02",
    icon: Link2,
    title: "Share the Link",
    description:
      "Send your poll using a public link so participants can vote instantly.",
  },
  {
    id: "03",
    icon: BarChart3,
    title: "Watch Live Results",
    description:
      "See votes update in real time with beautiful charts and live analytics.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-slate-50 py-24" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            How it Works
          </span>

          <h2 className="mt-4 text-3xl font-semibold text-slate-900">
            Create a poll in three simple steps
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            From creating your first question to tracking live votes, everything
            takes just a few minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16 grid gap-10 md:grid-cols-3">
          {/* Connecting Line */}
          <div className="absolute left-0 top-10 hidden h-px w-full bg-slate-200 md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/40"
              >
                {/* Step Number */}
                <div className="absolute -top-7 left-6 flex h-13 w-13 items-center justify-center rounded-full border-4 border-slate-50 bg-blue-600 text-md font-semibold text-white">
                  {step.id}
                </div>

                {/* Icon */}
                <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={24} />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
