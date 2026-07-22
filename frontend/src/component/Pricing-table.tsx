const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for individuals and small communities.",
    features: [
      "Up to 5 active polls",
      "Unlimited votes",
      "Public & private polls",
      "Live results",
    ],
  },
  {
    name: "Standard",
    price: "$9",
    description: "Designed for creators and growing teams.",
    features: [
      "Unlimited polls",
      "Advanced analytics",
      "Custom branding",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For organizations with advanced requirements.",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "SSO Authentication",
      "Custom integrations",
    ],
  },
];

const Pricing = () => {
  return (
    <section className="bg-slate-50 py-24" id="pricing">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            Pricing
          </span>

          <h2 className="mt-4 text-3xl font-semibold text-slate-900">
            Simple pricing for everyone
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Start for free today. Premium plans are currently under development
            and will be available soon.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.popular
                  ? "border-blue-300 shadow-lg shadow-blue-100/50"
                  : "border-slate-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute right-6 top-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-slate-900">
                {plan.name}
              </h3>

              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-bold text-slate-900">
                  {plan.price}
                </span>

                {plan.price !== "Custom" && (
                  <span className="pb-1 text-sm text-slate-500">/month</span>
                )}
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-500">
                {plan.description}
              </p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-slate-600"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs text-blue-600">
                      ✓
                    </div>

                    {feature}
                  </li>
                ))}
              </ul>

              <button
                disabled
                className="mt-10 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 py-3 text-sm font-medium text-slate-500"
              >
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
