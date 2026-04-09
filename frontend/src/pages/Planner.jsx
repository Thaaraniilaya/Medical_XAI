import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight, Plus, CheckCircle, Clock, X, Trash2, Utensils, Pill, Droplets, Dumbbell } from 'lucide-react';

const Planner = () => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('health_tasks');
        return saved ? JSON.parse(saved) : [
            { id: 1, time: "08:00", title: "Breakfast - Oatmeal & Fruits", type: "diet", completed: true },
            { id: 2, time: "09:00", title: "Morning Medication", type: "med", completed: true },
            { id: 3, time: "10:30", title: "Hydration Check", type: "water", completed: false },
            { id: 4, time: "13:00", title: "Lunch - Grilled Chicken Salad", type: "diet", completed: false },
            { id: 5, time: "17:00", title: "Evening Walk (30 mins)", type: "exercise", completed: false },
        ];
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', time: '', type: 'diet' });

    useEffect(() => {
        localStorage.setItem('health_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.title || !newTask.time) return;

        const task = {
            id: Date.now(),
            title: newTask.title,
            time: newTask.time, // Store in HH:MM format
            type: newTask.type,
            completed: false
        };

        setTasks([...tasks, task].sort((a, b) => a.time.localeCompare(b.time)));
        setNewTask({ title: '', time: '', type: 'diet' });
        setIsModalOpen(false);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const formatTimeDisplay = (time24) => {
        if (!time24) return "";
        const [h, m] = time24.split(':');
        const hh = parseInt(h);
        const suffix = hh >= 12 ? 'PM' : 'AM';
        const h12 = hh % 12 || 12;
        const displayH = h12 < 10 ? `0${h12}` : h12;
        return `${displayH}:${m} ${suffix}`;
    };

    const getIcon = (type) => {
        switch (type) {
            case 'diet': return <Utensils size={18} />;
            case 'med': return <Pill size={18} />;
            case 'water': return <Droplets size={18} />;
            case 'exercise': return <Dumbbell size={18} />;
            default: return <Clock size={18} />;
        }
    };

    const getColor = (type) => {
        switch (type) {
            case 'diet': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
            case 'med': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
            case 'water': return 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400';
            case 'exercise': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
            default: return 'bg-slate-100 dark:bg-slate-800 text-slate-600';
        }
    };

    const completionRate = tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;

    return (
        <div className="space-y-6">
            <header className="mb-8 pl-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Health Planner</h1>
                    <p className="text-slate-500 dark:text-slate-400">Your daily schedule for specific diet, meds, and activities.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
                >
                    <Plus size={20} />
                    Add New Task
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Timeline */}
                <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence>
                        {tasks.map((task, index) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                layout
                                className={`p-4 rounded-xl border flex items-center gap-4 transition-all group ${task.completed ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md'}`}
                            >
                                <div className="w-20 text-xs font-bold text-slate-400 dark:text-slate-500 text-center uppercase tracking-tighter">
                                    {formatTimeDisplay(task.time)}
                                </div>
                                <div className={`p-2.5 rounded-xl ${getColor(task.type)}`}>
                                    {getIcon(task.type)}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-semibold ${task.completed ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-800 dark:text-slate-200'}`}>
                                        {task.title}
                                    </h3>
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-600">{task.type}</span>
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${task.completed ? 'bg-emerald-500 text-white scale-110' : 'bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 hover:text-emerald-500'}`}
                                    >
                                        <CheckCircle size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {tasks.length === 0 && (
                        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                            <Calendar size={48} className="mx-auto mb-4 text-slate-300" />
                            <p className="text-slate-500">No tasks planned for today. Add one to get started!</p>
                        </div>
                    )}
                </div>

                {/* Sidebar Widget */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
                        <h3 className="font-bold text-lg mb-2 relative z-10">Daily Completion</h3>
                        <div className="flex items-end gap-2 mb-2 relative z-10">
                            <span className="text-5xl font-black">{completionRate}%</span>
                            <span className="text-sm opacity-80 mb-2 font-bold uppercase tracking-wider">done</span>
                        </div>
                        <div className="w-full bg-black/20 rounded-full h-3 mb-4 relative z-10 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${completionRate}%` }}
                                className="bg-white rounded-full h-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            ></motion.div>
                        </div>
                        <p className="text-sm opacity-90 font-medium leading-relaxed relative z-10">
                            {completionRate === 100 ? "Amazing! You've crushed all your health goals for today! 🎉" :
                                completionRate > 50 ? "You're doing great! More than halfway there. Stay consistent! 💪" :
                                    "Start ticking off some tasks to boost your health score! 🚀"}
                        </p>
                    </div>

                    <div className="glass-card p-6 border border-slate-100 dark:border-slate-800">
                        <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                            <Utensils size={18} className="text-orange-500" />
                            Planner Quick Tips
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li className="flex gap-2"><span>•</span> Set realistic times for your meals and meds.</li>
                            <li className="flex gap-2"><span>•</span> Don't forget hydration breaks in between!</li>
                            <li className="flex gap-2"><span>•</span> Plan your exercises for when you're most energetic.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Add Task Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-800 relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Create New Goal</h2>

                            <form onSubmit={addTask} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Task Title</label>
                                    <input
                                        type="text"
                                        placeholder="E.g. Take Blood Pressure Meds"
                                        required
                                        value={newTask.title}
                                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Time</label>
                                        <input
                                            type="time"
                                            required
                                            value={newTask.time}
                                            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Category</label>
                                        <select
                                            value={newTask.type}
                                            onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        >
                                            <option value="diet">Diet</option>
                                            <option value="med">Medication</option>
                                            <option value="water">Water</option>
                                            <option value="exercise">Exercise</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-4 rounded-xl text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
                                    >
                                        Add Task
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

export default Planner;
