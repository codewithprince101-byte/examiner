import Link from "next/link";
import { MoveRight, FileText, Zap, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            E
          </div>
          <span className="text-xl font-bold tracking-tight">EXAMINER</span>
        </div>
        <div className="flex gap-8 text-sm font-medium text-slate-500">
          <Link
            href="/about-us"
            className="hover:text-blue-600 transition-colors"
          >
            about us
          </Link>
          <Link
            href="#features"
            className="hidden sm:block hover:text-blue-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/saved-papers"
            className="hidden md:flex hover:text-blue-600 transition-colors"
          >
            Saved Papers
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Next-Gen Question Generation
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-8">
            Build perfect exams in{" "}
            <span className="text-blue-600">seconds.</span>
          </h1>

          <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl">
            The AI-powered question generator designed for teachers and
            students. Generate structured papers for RBSE, CBSE.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/create"
              className="group flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all active:scale-95"
            >
              Start Generating
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/history"
              className="flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all"
            >
              View History
            </Link>
          </div>
        </div>

        {/* Quick Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-blue-600" />}
            title="Instant Streaming"
            desc="Watch questions appear in real-time. No more waiting for full-page reloads."
          />
          <FeatureCard
            icon={<FileText className="w-6 h-6 text-blue-600" />}
            title="JSON Structured"
            desc="Clean, parseable data that looks beautiful on any device or printed page."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6 text-blue-600" />}
            title="Board Standard"
            desc="Tailored for 9th-12th grade curriculum with custom difficulty control."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
      <div className="mb-4 p-3 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}
