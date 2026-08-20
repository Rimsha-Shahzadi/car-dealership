const features = [
  { title: "Instant booking", desc: "Reserve a car in under a minute, no phone calls needed." },
  { title: "Verified fleet", desc: "Every vehicle is inspected and insured before it's listed." },
  { title: "24/7 support", desc: "Our team is always on standby if plans change." },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">Why DriveHub</h2>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{f.title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
