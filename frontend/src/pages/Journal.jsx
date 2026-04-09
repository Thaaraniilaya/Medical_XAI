import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Calendar, MapPin, Clock, User, Plus, Search, ChevronRight, Bookmark, X, Trash2, FileText, Activity } from 'lucide-react';

const Journal = () => {
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem('health_journal');
        return saved ? JSON.parse(saved) : [
            { id: 1, date: "2026-01-04", type: "Appointment", title: "Dr. Sarah Wilson - Dental Checkup", content: "Routine checkup and cleaning. Everything looks good. Next visit in 6 months.", location: "City Dental Clinic", time: "10:30 AM" },
            { id: 2, date: "2026-01-02", type: "Daily Note", title: "Feeling Better", content: "Energy levels are returning. The new diet plan seems to be working well. No fatigue reported today.", location: "Home", time: "08:15 PM" },
            { id: 3, date: "2025-12-28", type: "Appointment", title: "Cardiology Follow-up", content: "Blood pressure is stable at 120/80. Doctor recommended continuing the current medication.", location: "General Hospital", time: "02:00 PM" },
        ];
    });

    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [newEntry, setNewEntry] = useState({
        title: "",
        date: new Date().toISOString().split('T')[0],
        time: "",
        type: "Appointment",
        content: "",
        location: ""
    });

    useEffect(() => {
        localStorage.setItem('health_journal', JSON.stringify(entries));
    }, [entries]);

    const addEntry = (e) => {
        e.preventDefault();
        if (!newEntry.title || !newEntry.content) return;

        const entry = {
            id: Date.now(),
            ...newEntry
        };

        // Sort by date (descending)
        setEntries([entry, ...entries].sort((a, b) => b.date.localeCompare(a.date)));
        setIsAdding(false);
        setNewEntry({
            title: "",
            date: new Date().toISOString().split('T')[0],
            time: "",
            type: "Appointment",
            content: "",
            location: ""
        });
    };

    const deleteEntry = (id) => {
        setEntries(entries.filter(e => e.id !== id));
    };

    const filteredEntries = entries.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                        <Book className="text-indigo-500" />
                        Health Journal
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">Track your appointments, logs, and medical history in one place.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search journal..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm w-full md:w-64"
                        />
                    </div>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2 font-bold"
                    >
                        <Plus size={20} />
                        <span className="hidden sm:inline">Add Entry</span>
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Stats / Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-6 border-l-4 border-indigo-500">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-2">Total Entries</h3>
                        <p className="text-4xl font-black text-indigo-600 dark:text-indigo-400">{entries.length}</p>
                        <p className="text-xs text-slate-400 mt-2">Personal healthcare timeline</p>
                    </div>

                    <div className="glass-card p-6">
                        <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                            <Bookmark size={18} className="text-indigo-500" />
                            Journal Tips
                        </h4>
                        <div className="space-y-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            <p>• Log your feelings daily to spot health trends.</p>
                            <p>• Keep detailed notes of doctor recommendations.</p>
                            <p>• Map your recovery progress with photos or text.</p>
                        </div>
                    </div>
                </div>

                {/* Journal Content */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

                        <div className="space-y-10">
                            <AnimatePresence>
                                {filteredEntries.map((entry, index) => (
                                    <motion.div
                                        key={entry.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        layout
                                        className="relative flex flex-col md:flex-row gap-6 group"
                                    >
                                        {/* Timeline Marker */}
                                        <div className="hidden md:flex absolute left-6 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-500 group-hover:scale-125 transition-transform"></div>

                                        <div className="md:w-32 pt-1">
                                            <p className="text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{entry.time}</p>
                                        </div>

                                        <div className="flex-1 glass-card p-6 hover:shadow-xl transition-shadow border-slate-100 dark:border-slate-800 relative group/card">
                                            <button
                                                onClick={() => deleteEntry(entry.id)}
                                                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover/card:opacity-100 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${entry.type === 'Appointment' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300'}`}>
                                                        {entry.type}
                                                    </span>
                                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{entry.title}</h3>
                                                </div>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                                                {entry.content}
                                            </p>
                                            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                                                {entry.location && (
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-full">
                                                        <MapPin size={14} className="text-indigo-500" />
                                                        {entry.location}
                                                    </div>
                                                )}
                                                {entry.time && (
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-full">
                                                        <Clock size={14} className="text-indigo-500" />
                                                        {entry.time}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {filteredEntries.length === 0 && (
                                <div className="text-center py-20">
                                    <Book size={48} className="mx-auto mb-4 text-slate-300" />
                                    <p className="text-slate-500">No journal entries found. Start recording your health journey!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Entry Modal */}
            <AnimatePresence>
                {isAdding && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-y-auto max-h-[90vh]"
                        >
                            <button
                                onClick={() => setIsAdding(false)}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <Plus className="text-indigo-600" />
                                Add Journal Entry
                            </h2>

                            <form onSubmit={addEntry} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Entry Title</label>
                                        <input
                                            type="text"
                                            placeholder="E.g. Visit to Dr. Sharma"
                                            required
                                            value={newEntry.title}
                                            onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={newEntry.date}
                                            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Time (Optional)</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 10:30 AM"
                                            value={newEntry.time}
                                            onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Entry Type</label>
                                        <select
                                            value={newEntry.type}
                                            onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        >
                                            <option value="Appointment">Appointment</option>
                                            <option value="Daily Note">Daily Note</option>
                                            <option value="Medication Change">Medication Change</option>
                                            <option value="Lab Result">Lab Result</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Location</label>
                                        <input
                                            type="text"
                                            placeholder="E.g. Apex Hospital"
                                            value={newEntry.location}
                                            onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Notes / Content</label>
                                        <textarea
                                            placeholder="Describe your visit or how you were feeling..."
                                            required
                                            rows={4}
                                            value={newEntry.content}
                                            onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsAdding(false)}
                                        className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 dark:shadow-none transition-all"
                                    >
                                        Save Entry
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Journal;
