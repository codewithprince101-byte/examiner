"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { generateQuestions } from "../actions/generate-gemini";
import { LayoutTemplate, X, Pencil, CheckCircle2, ArrowRight, BookOpen } from "lucide-react";

// RBSE / NCERT Class 9 Science Chapters
const SCIENCE_CHAPTERS = [
  "Chapter 1: Matter in Our Surroundings",
  "Chapter 2: Is Matter Around Us Pure",
  "Chapter 3: Atoms and Molecules",
  "Chapter 4: Structure of the Atom",
  "Chapter 5: The Fundamental Unit of Life",
  "Chapter 6: Tissues",
  "Chapter 7: Motion",
  "Chapter 8: Force and Laws of Motion",
  "Chapter 9: Gravitation",
  "Chapter 10: Work and Energy",
  "Chapter 11: Sound",
  "Chapter 12: Improvement in Food Resources"
];

export default function CreatePaperPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const templates = [
    { id: 1, name: "Template 1: MCQ Special", desc: "5 Multiple Choice Questions" },
    { id: 2, name: "Template 2: Quick Blast", desc: "10 Very Short Questions" },
    { id: 3, name: "Template 3: Descriptive", desc: "5 Detailed Short Answers" },
  ];

  async function handleGenerate() {
    if (!topic || !selectedTemplate) return;
    setIsLoading(true);

    const data = await generateQuestions(topic, selectedTemplate);
    
    if (data) {
      localStorage.setItem("currentPaper", JSON.stringify(data));
      localStorage.setItem("currentTopic", topic);
      router.push("/editor");
    } else {
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="max-w-3xl mx-auto">
        
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-12">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">1</div>
             <span className="font-bold">Configure</span>
           </div>
           <div className="h-[2px] flex-1 bg-slate-200 mx-4"></div>
           <div className="flex items-center gap-2 opacity-30">
             <div className="w-8 h-8 bg-slate-400 rounded-lg flex items-center justify-center text-white font-bold">2</div>
             <span className="font-bold">Edit & Export</span>
           </div>
        </div>

        {!isLoading ? (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="space-y-6">
              
              {/* --- UPDATED: SELECT CHAPTER DROPDOWN --- */}
              <div>
                <label className="text-sm font-bold text-slate-500 block mb-2 uppercase tracking-wider">Step 1: Select Chapter</label>
                <div className="relative">
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-4 pl-12 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-lg appearance-none cursor-pointer font-medium text-slate-700"
                  >
                    <option value="" disabled>Choose a class 9 science chapter...</option>
                    {SCIENCE_CHAPTERS.map((chapter, index) => (
                      <option key={index} value={chapter}>
                        {chapter}
                      </option>
                    ))}
                  </select>
                  {/* Icon positioned absolutely inside the select wrapper */}
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  
                  {/* Custom Dropdown Arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-500 block mb-2 uppercase tracking-wider">Step 2: Choose Layout</label>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full p-5 rounded-2xl border-2 border-dashed transition-all flex items-center justify-between ${
                    selectedTemplate ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutTemplate className={selectedTemplate ? "text-blue-600" : "text-slate-400"} />
                    <span className={selectedTemplate ? "font-bold text-blue-900" : "text-slate-500"}>
                      {selectedTemplate ? `Template ${selectedTemplate} Selected` : "Choose a Paper Format"}
                    </span>
                  </div>
                  {selectedTemplate && <CheckCircle2 className="text-blue-600 w-6 h-6" />}
                </button>
              </div>

              <button
                disabled={!topic || !selectedTemplate}
                onClick={handleGenerate}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                Build paper
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* --- BEAUTIFUL LOADING STATE --- */
          <div className="space-y-6 animate-pulse">
            <div className="text-center py-10">
              <Pencil className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-slate-800">Forging your questions...</h2>
              <p className="text-slate-400">analyzing {topic}</p>
            </div>
            {/* Skeleton Cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-20 bg-slate-50 rounded w-full"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- TEMPLATE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Select Paper Format</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTemplate(t.id);
                    setIsModalOpen(false);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    selectedTemplate === t.id ? "border-blue-600 bg-blue-50" : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <p className="font-bold text-slate-800">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}