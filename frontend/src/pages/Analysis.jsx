import React, { useState } from 'react';
import { FileText, Search, AlertCircle, CheckCircle, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { analyzeReport, saveReport } from '../api/api';

const Analysis = ({ language = 'English', t }) => {
    const text = t || {
        uploadReport: "Upload Medical Report",
        pasteText: "Paste your medical report text below for an AI-powered analysis.",
        pasteMode: "Paste Text",
        fileMode: "Upload File",
        analyze: "Analyze Report",
        analyzing: "Analyzing...",
        interpretation: "Interpretation",
        dietPlan: "Diet Plan",
        healthTips: "Health Tips",
        clickUpload: "Click to Upload",
        removeFile: "Remove File"
    };
    const [mode, setMode] = useState("text"); // 'text' or 'file'
    const [reportText, setReportText] = useState("");
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'success', 'error'

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleAnalyze = async () => {
        if (mode === "text" && !reportText.trim()) return;
        if (mode === "file" && !file) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            let payload;
            if (mode === "file") {
                const formData = new FormData();
                formData.append("file", file);
                payload = formData;
            } else {
                payload = reportText;
            }

            const data = await analyzeReport(payload, language);
            setResult(data.summary);
        } catch (err) {
            console.error("Analysis failed:", err);
            const errorMessage = err.response?.data?.error || err.message || "Failed to analyze report.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!result) return;
        setSaveStatus('saving');
        try {
            await saveReport({
                content: result,
                language,
                type: 'Medical Report Analysis'
            });
            setSaveStatus('success');
            setTimeout(() => setSaveStatus(null), 3000);
        } catch (err) {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus(null), 3000);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Left Input Section */}
            <div className="flex flex-col gap-4">
                <div className="glass-card p-6 flex-1 flex flex-col">
                    <div className="mb-4 flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <FileText className="text-primary-500" />
                                {text.uploadReport}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{text.pasteText}</p>
                        </div>
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800">
                            {language} Mode
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                        {/* Tab Switcher (Text vs File) */}
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg transition-colors">
                            <button
                                onClick={() => { setReportText(""); setFile(null); setMode("text"); }}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === "text" ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}
                            >
                                {text.pasteMode}
                            </button>
                            <button
                                onClick={() => { setReportText(""); setFile(null); setMode("file"); }}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === "file" ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}
                            >
                                {text.fileMode}
                            </button>
                        </div>

                        {mode === "text" ? (
                            <textarea
                                value={reportText}
                                onChange={(e) => setReportText(e.target.value)}
                                placeholder="Paste your medical report text here..."
                                className="flex-1 w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30 transition-all resize-none font-mono text-sm leading-relaxed"
                            />
                        ) : (
                            <div className="flex-1 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors flex flex-col items-center justify-center p-8 text-center cursor-pointer relative group">
                                {file ? (
                                    <div className="pointer-events-none">
                                        <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 p-3 rounded-xl mb-3 inline-block">
                                            <FileText size={32} />
                                        </div>
                                        <p className="font-medium text-slate-700 dark:text-slate-200">{file.name}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                                        <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="mt-4 text-xs text-rose-500 hover:underline pointer-events-auto relative z-20">{text.removeFile}</button>
                                    </div>
                                ) : (
                                    <div className="pointer-events-none">
                                        <div className="bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 p-3 rounded-xl mb-3 shadow-sm group-hover:scale-110 transition-transform inline-block">
                                            <UploadCloud size={32} />
                                        </div>
                                        <p className="font-medium text-slate-700 dark:text-slate-200">{text.clickUpload}</p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">PDF, DOCX, JPG, PNG supported</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleAnalyze}
                            disabled={loading || (!reportText.trim() && !file)}
                            className="bg-slate-900 dark:bg-primary-600 hover:bg-slate-800 dark:hover:bg-primary-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium disabled:opacity-50 transition-all shadow-lg shadow-slate-200 dark:shadow-primary-950/20"
                        >
                            {loading ? <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> : <Search size={18} />}
                            {loading ? text.analyzing : text.analyze}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Result Section */}
            <div className="flex flex-col h-full">
                <div className={`glass-card p-8 h-full relative overflow-hidden transition-all duration-500 ${!result && !loading ? 'flex items-center justify-center bg-slate-100/50 border-dashed' : ''}`}>

                    {!result && !loading && !error && (
                        <div className="text-center text-slate-400">
                            <FileText size={64} className="mx-auto mb-4 opacity-20" />
                            <p>Analysis results will appear here</p>
                        </div>
                    )}

                    {loading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
                            <div className="w-16 h-16 border-4 border-primary-100 dark:border-primary-900/30 border-t-primary-500 rounded-full animate-spin mb-4" />
                            <p className="text-slate-600 dark:text-slate-300 font-medium animate-pulse">Processing Report...</p>
                        </div>
                    )}

                    {error && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center gap-3">
                            <AlertCircle size={20} />
                            {error}
                        </motion.div>
                    )}

                    {result && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                                <div className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 p-2 rounded-lg">
                                    <CheckCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">Analysis Complete</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Generated by Gemini AI</p>
                                </div>
                            </div>

                            <div className="prose prose-slate prose-sm max-w-none flex-1 overflow-y-auto pr-2">
                                <AlertBlock title={text.interpretation} content={result} />

                                <div className="mt-8 space-y-4">
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                                        <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 mb-2">
                                            <span className="text-lg">🥗</span> {text.dietPlan}
                                        </h4>
                                        <p className="text-emerald-700 dark:text-emerald-400 text-sm">
                                            {result.includes("Diet Plan") ? "Check the detailed summary above for your personalized diet plan." : "No specific diet plan generated. Please input more details."}
                                        </p>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50">
                                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                                            <span className="text-lg">💡</span> {text.healthTips}
                                        </h4>
                                        <p className="text-blue-700 dark:text-blue-400 text-sm">
                                            {result.includes("Health Tips") ? "Review the health tips section in the report above." : "Stay hydrated and monitor your vitals regularily."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                                <button className="flex-1 py-2 px-4 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    Copy Result
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saveStatus === 'saving'}
                                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${saveStatus === 'success' ? 'bg-emerald-500 text-white' : saveStatus === 'error' ? 'bg-rose-500 text-white' : 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/50'}`}
                                >
                                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Failed' : 'Save to Record'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AlertBlock = ({ title, content }) => (
    <div className="mb-4">
        <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed">
            {content}
        </div>
    </div>
);

export default Analysis;
