"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { 
  FileText, 
  Trash2, 
  Edit3, 
  Calendar, 
  ChevronLeft,
  ArrowRight,
  DownloadCloud
} from "lucide-react";

interface QuestionItem {
  question: string;
  answer: string;
}

interface SavedPaper {
  id: string;
  topic: string;
  date: string;
  questions: QuestionItem[];
}

export default function SavedPapersPage() {
  const router = useRouter();
  const [papers, setPapers] = useState<SavedPaper[]>([]);

  // Load saved papers from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("savedPapers");
    if (saved) {
      setPapers(JSON.parse(saved));
    }
  }, []);

  // Delete a specific paper
  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this paper?");
    if (!confirmDelete) return;

    const updatedPapers = papers.filter((paper) => paper.id !== id);
    setPapers(updatedPapers);
    localStorage.setItem("savedPapers", JSON.stringify(updatedPapers));
  };

  // Open a paper back in the editor
  const handleOpenPaper = (paper: SavedPaper) => {
    localStorage.setItem("currentPaper", JSON.stringify(paper.questions));
    localStorage.setItem("currentTopic", paper.topic);
    router.push("/editor");
  };

  // --- UPDATED: Export ALL Papers & Clear Memory ---
  const handleExportAll = () => {
    if (papers.length === 0) {
      alert("No papers to export!");
      return;
    }

    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;

    papers.forEach((paper, paperIndex) => {
      // Start a new page for every paper EXCEPT the first one
      if (paperIndex > 0) {
        doc.addPage();
      }
      
      let y = 20;

      // Add Paper Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(paper.topic || "Untitled Paper", margin, y);
      y += 8;

      // Add Date under the title
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(`Generated on: ${paper.date}`, margin, y);
      y += 15;
      doc.setTextColor(0, 0, 0); // Reset color to black

      // Add Questions & Answers for this specific paper
      if (paper.questions && paper.questions.length > 0) {
        paper.questions.forEach((item, index) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          
          const qText = `Q${index + 1}: ${item.question}`;
          const splitQuestion = doc.splitTextToSize(qText, maxLineWidth); 
          
          if (y + (splitQuestion.length * 7) > 280) {
            doc.addPage();
            y = 20;
          }
          
          doc.text(splitQuestion, margin, y);
          y += splitQuestion.length * 7 + 2;

          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(80, 80, 80); 
          
          const aText = `Answer: ${item.answer}`;
          const splitAnswer = doc.splitTextToSize(aText, maxLineWidth);

          if (y + (splitAnswer.length * 7) > 280) {
            doc.addPage();
            y = 20;
          }

          doc.text(splitAnswer, margin, y);
          y += splitAnswer.length * 6 + 12; 
          doc.setTextColor(0, 0, 0); 
        });
      } else {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text("No questions in this paper.", margin, y);
      }
    });

    // Save the combined PDF
    doc.save("Master_Question_Bank.pdf");

    // --- MVP WORKFLOW: Clear the library after successful export ---
    setPapers([]); // Clear the state so UI updates instantly
    localStorage.removeItem("savedPapers"); // Wipe the local storage
    alert("Export successful! The library has been cleared for the next batch.");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* --- HEADER --- */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-lg flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Paper Library
              </h1>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                {papers.length} Saved Papers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Export All Button */}
            {papers.length > 0 && (
              <button 
                onClick={handleExportAll}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-semibold text-sm shadow-sm"
              >
                <DownloadCloud className="w-4 h-4" />
                Export All & Clear
              </button>
            )}
            
            <button 
              onClick={() => router.push("/create")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold text-sm shadow-md"
            >
              Create New
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-5xl mx-auto px-6 mt-10">
        {papers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm mt-10">
            <div className="w-16 h-16 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No papers saved yet</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Your generated test papers will appear here. Start by creating your first paper!
            </p>
            <button 
              onClick={() => router.push("/create")}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              Create a Paper
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper) => (
              <div 
                key={paper.id} 
                className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                      <Calendar className="w-3 h-3" />
                      {paper.date}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-2">
                    {paper.topic}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {paper.questions?.length || 0} Questions
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-8 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => handleOpenPaper(paper)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-700 rounded-xl font-bold text-sm transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                    Open & Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(paper.id)}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Delete Paper"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}