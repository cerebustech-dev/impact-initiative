import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          The Impact Initiative
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-body max-w-2xl mx-auto leading-relaxed">
          A 6-month AI leadership journey for the leaders who shape what comes
          next. Read deeply, think critically, lead boldly.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/curriculum"
            className="inline-flex items-center justify-center px-8 py-3 bg-amber text-white font-semibold rounded-xl hover:bg-amber-dark transition-colors shadow-lg shadow-amber/20"
          >
            View Curriculum
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-amber text-amber font-semibold rounded-xl hover:bg-amber hover:text-white transition-colors"
          >
            About the Program
          </Link>
        </div>
      </div>
    </section>
  );
}
