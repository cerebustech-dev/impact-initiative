import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | The Impact Initiative",
  description:
    "Learn about The Impact Initiative — a 6-month leadership development program in partnership with Walsh College.",
};

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold">About the Program</h1>

        <div className="mt-8 prose prose-slate max-w-none space-y-8">
          {/* Program Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold mt-0">What is The Impact Initiative?</h2>
            <p className="text-slate-body leading-relaxed">
              The Impact Initiative is a 6-month leadership development program
              offered through HR&apos;s Leadership Academy. AI is one of
              several topics we explore — but it&apos;s the one reshaping every
              other topic, so we give it serious attention. This isn&apos;t a
              technical bootcamp — it&apos;s a reading-and-discussion journey
              through the ideas, debates, and practical skills that will define
              the next decade of leadership.
            </p>
            <p className="text-slate-body leading-relaxed">
              Roughly 10 supervisors and managers meet monthly to discuss
              carefully curated readings — from foundational research to
              practical guides for leading through change. Each month builds on
              the last, moving from &ldquo;what is this?&rdquo; to &ldquo;what
              do I do about it?&rdquo;
            </p>
          </section>

          {/* Program Structure */}
          <section>
            <h2 className="text-2xl font-bold">How It Works</h2>
            <div className="grid sm:grid-cols-2 gap-6 not-prose mt-4">
              <div className="bg-white rounded-xl p-6 shadow-sm shadow-card-shadow">
                <h3 className="font-serif text-lg font-semibold text-slate-heading">
                  Monthly Readings
                </h3>
                <p className="mt-2 text-sm text-slate-body">
                  Two to three readings per month — essays, papers, lectures,
                  and one book. Each is chosen to give you a different angle on
                  the same big question.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm shadow-card-shadow">
                <h3 className="font-serif text-lg font-semibold text-slate-heading">
                  Group Discussion
                </h3>
                <p className="mt-2 text-sm text-slate-body">
                  Monthly sessions where we dig into the readings together. The
                  goal isn&apos;t consensus — it&apos;s developing your own
                  informed perspective.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm shadow-card-shadow">
                <h3 className="font-serif text-lg font-semibold text-slate-heading">
                  Progressive Depth
                </h3>
                <p className="mt-2 text-sm text-slate-body">
                  We start with foundations, move through competing visions and
                  risks, debate the big questions, then get practical. Each
                  month builds on the last.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm shadow-card-shadow">
                <h3 className="font-serif text-lg font-semibold text-slate-heading">
                  Looking Forward
                </h3>
                <p className="mt-2 text-sm text-slate-body">
                  In Month 6, we turn everything we&apos;ve learned into a
                  lens for the future — what&apos;s accelerating, what&apos;s
                  still ahead, and what it means to lead well through it.
                </p>
              </div>
            </div>
          </section>

          {/* About Rod */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">About the Instructor</h2>
            <p className="text-slate-body leading-relaxed italic text-lg">
              Most AI training teaches prompts.<br />
              This one teaches discernment.
            </p>
            <p className="text-slate-body leading-relaxed">
              Rod Davenport is the CIO and one of the instructors in
              HR&apos;s &ldquo;The Impact Initiative.&rdquo; The real AI gap
              isn&apos;t access; it&apos;s judgment — especially when the tool
              is fast, persuasive, and occasionally wrong.
            </p>
            <p className="text-slate-body leading-relaxed">
              We&apos;ll do just enough tech to build shared mental models,
              including a quick tour of AI history: symbolic AI, what changed
              with machine learning, and why transformers changed the game.
            </p>
            <p className="text-slate-body leading-relaxed">
              Then we&apos;ll spend most of our time on what leaders
              can&apos;t dodge: what should be automated, what must remain
              human, how trust gets earned (or lost), and how to use AI to
              amplify good intent instead of scaling bad habits.
            </p>
          </section>

          {/* Walsh College Partnership */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Walsh College Partnership</h2>
            <p className="text-slate-body leading-relaxed">
              The Impact Initiative is offered in coordination with{" "}
              <a
                href="https://www.walshcollege.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber hover:text-amber-dark underline underline-offset-2"
              >
                Walsh College
              </a>
              , bringing academic rigor and institutional support to what is
              fundamentally a practical leadership development experience.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link
            href="/curriculum"
            className="inline-flex items-center justify-center px-8 py-3 bg-amber text-white font-semibold rounded-xl hover:bg-amber-dark transition-colors shadow-lg shadow-amber/20"
          >
            View the Curriculum
          </Link>
        </div>
      </div>
    </div>
  );
}
