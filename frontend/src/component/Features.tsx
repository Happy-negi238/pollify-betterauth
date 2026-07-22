import {
  Activity,
  Share2,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-time Results",
    description: "Watch votes update instantly as participants cast their responses.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share polls using a simple link. No account required to vote.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description: "Create public or private polls with complete control over access.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Optimized for desktop, tablet, and mobile devices.",
  },
];

const Features = () => {
  return (
    <section className="bg-slate-50 py-20" id="features">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            Features
          </span>

          <h2 className="mt-4 text-3xl font-semibold text-slate-900">
            Everything you need to create engaging polls
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Powerful features packed into a clean and simple interface. Create,
            share, and monitor polls in real time.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
