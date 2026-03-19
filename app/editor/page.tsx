"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { Save, Trash2, ChevronLeft, Download, Plus, Type } from "lucide-react";

interface QuestionItem {
  question: string;
  answer: string;
}

export default function EditorPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [topic, setTopic] = useState("");

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("currentPaper");
    const savedTopic = localStorage.getItem("currentTopic");

    if (savedData) {
      setQuestions(JSON.parse(savedData));
      setTopic(savedTopic || "Untitled Paper");
    } else {
      // If no data, send them back to create
      router.push("/create");
    }
  }, [router]);

  // Update a specific question or answer
  const handleUpdate = (
    index: number,
    field: keyof QuestionItem,
    value: string
  ) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  // Remove a question
  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Add a blank question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "New Question", answer: "New Answer" },
    ]);
  };

  const handleSave = () => {
    const existingPapers = JSON.parse(
      localStorage.getItem("savedPapers") || "[]"
    );

    const newPaper = {
      id: Date.now().toString(), // Unique ID based on time
      topic: topic || "Untitled Paper",
      date: new Date().toLocaleDateString(),
      questions: questions,
    };

    localStorage.setItem(
      "savedPapers",
      JSON.stringify([...existingPapers, newPaper])
    );
    alert("Paper saved to your library!");
  };

  // --- NEW: PDF Export Function ---
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;
    let y = 20; // Vertical position tracker

    // Add Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    const title = topic || "Question Paper";
    doc.text(title, margin, y);
    y += 15;

    // Add Questions & Answers
    questions.forEach((item, index) => {
      // Setup Question Font
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      const qText = `Q${index + 1}: ${item.question}`;
      // Wrap text to fit page width
      const splitQuestion = doc.splitTextToSize(qText, maxLineWidth);

      // Check if we need a new page before writing the question
      if (y + splitQuestion.length * 7 > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(splitQuestion, margin, y);
      y += splitQuestion.length * 7 + 2; // Move Y down based on lines

      // Setup Answer Font
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(80, 80, 80); // Slight gray for answers

      const aText = `Answer: ${item.answer}`;
      const splitAnswer = doc.splitTextToSize(aText, maxLineWidth);

      // Check if we need a new page before writing the answer
      if (y + splitAnswer.length * 7 > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(splitAnswer, margin, y);
      y += splitAnswer.length * 6 + 12; // Extra padding after answer

      // Reset text color for the next question
      doc.setTextColor(0, 0, 0);
    });

    // Save the PDF
    const filename = `${
      topic.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "document"
    }.pdf`;
    doc.save(filename);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      {/* --- EDITOR HEADER --- */}
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
                <Type className="w-4 h-4 text-blue-600" />
                {topic}
              </h1>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                Editor Mode • {questions.length} Questions
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-sm"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleExportPDF} // Attached the function here
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold text-sm shadow-md"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-4xl mx-auto px-6 mt-10">
        <div className="space-y-8">
          {questions.map((item, index) => (
            <div
              key={index}
              className="group relative bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all"
            >
              {/* Question Number & Remove */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">
                  Question {String(index + 1).padStart(2, "0")}
                </span>
                <button
                  onClick={() => removeQuestion(index)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Editable Question */}
              <textarea
                value={item.question}
                onChange={(e) =>
                  handleUpdate(index, "question", e.target.value)
                }
                className="w-full bg-transparent text-xl font-bold text-slate-800 resize-none outline-none border-b border-transparent focus:border-blue-200 pb-2 mb-4"
                rows={2}
              />

              {/* Editable Answer */}
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                </div>
                <textarea
                  value={item.answer}
                  onChange={(e) =>
                    handleUpdate(index, "answer", e.target.value)
                  }
                  className="w-full bg-transparent text-slate-500 text-sm leading-relaxed resize-none outline-none border-b border-transparent focus:border-blue-100"
                  rows={2}
                />
              </div>
            </div>
          ))}

          {/* Add Question Button */}
          <button
            onClick={addQuestion}
            className="w-full py-6 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center gap-2 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="font-bold">Add Manual Question</span>
          </button>
        </div>
      </main>
    </div>
  );
}
