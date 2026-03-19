import React from "react";
import { Target, Zap, Users, Code, TrendingUp, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Automating the Future of <span className="text-blue-600">Assessments</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            We build AI-driven tools that help coaching centers generate question papers instantly, eliminating manual labor and saving countless hours of administrative work.
          </p>
        </div>
      </section>

      {/* --- OUR MISSION --- */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-6">
              <Target className="w-4 h-4" />
              Our Mission
            </div>
            <h2 className="text-3xl font-bold mb-4">Built for Real-World Speed and Efficiency</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Traditional paper creation is slow, repetitive, and expensive. Our platform uses AI to generate highly accurate question papers that can be exported directly to PDF. 
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Whether a coaching center needs one paper a week or multiple daily tests, our tool cuts down labor costs and lets educators focus on what actually matters: teaching.
            </p>
            
            <div className="space-y-3">
              {[
                "Instant AI-generated questions",
                "One-click PDF export",
                "Zero manual formatting required",
                "Drastically reduced operational costs"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">Lightning Fast</h3>
              <p className="text-sm text-slate-500 mt-2">Generate papers in seconds, not hours.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center mt-8">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">Cost Effective</h3>
              <p className="text-sm text-slate-500 mt-2">Cut down on typing and formatting labor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- LEADERSHIP TEAM --- */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-bold uppercase tracking-wider mb-4">
            <Users className="w-4 h-4" />
            Leadership
          </div>
          <h2 className="text-3xl font-bold">Meet the Founders</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Prince - CEO */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6">
              <Code className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Prince</h3>
            <p className="text-blue-600 font-semibold mb-4 uppercase text-sm tracking-widest">Chief Executive Officer</p>
            <p className="text-slate-600 leading-relaxed">
              As a long-visioned founder and full-stack developer, Prince engineered this platform from the ground up. He connects the dots between complex AI capabilities and seamless user interfaces, ensuring the product solves real-world technical bottlenecks for coaching institutes.
            </p>
          </div>

          {/* Aryan - COO */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Aryan</h3>
            <p className="text-blue-600 font-semibold mb-4 uppercase text-sm tracking-widest">Chief Operating Officer</p>
            <p className="text-slate-600 leading-relaxed">
              Aryan is the engine that drives execution. With exceptional communication skills and unshakeable confidence, he bridges the gap between the technology and the end-users. He ensures the business operations run flawlessly and that coaching centers get exactly what they need.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}