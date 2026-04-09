import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Plus, Calendar, MessageSquare, Utensils, Clock, FileClock, FileText, ChevronRight, X, Pill, Droplets, Dumbbell } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="p-4 lg:p-8 space-y-8">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 tracking-tight">
                    Good Afternoon, John
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-2 font-light">
                    Your health vitals are stable today. What would you like to focus on?
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Task Planner (3 columns wide) */}
                <div className="lg:col-span-3 space-y-6">
                    <DailyTaskWidget />
                </div>

                {/* Center Column: Actions & Core Features (6 columns wide) */}
                <div className="lg:col-span-6 space-y-8">

                    {/* Main Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ActionCard
                            title="Diet Planner"
                            icon={<Utensils size={32} />}
                            desc="Manage meal plans"
                            color="bg-gradient-to-br from-emerald-500 to-teal-600"
                            delay={0.1}
                            onClick={() => navigate('/planner')}
                        />
                        <ActionCard
                            title="AI Assistant"
                            icon={<MessageSquare size={32} />}
                            desc="Chat with your virtual health guide"
                            color="bg-gradient-to-br from-indigo-500 to-purple-600"
                            delay={0.2}
                            onClick={() => navigate('/chat')}
                        />
                        <ActionCard
                            title="Appointments"
                            icon={<Calendar size={32} />}
                            desc="View Health Journal & Logs"
                            color="bg-gradient-to-br from-rose-500 to-pink-600"
                            delay={0.3}
                            onClick={() => navigate('/journal')}
                        />
                        <ActionCard
                            title="Upload Report"
                            icon={<FileText size={32} />}
                            desc="Analyze medical documents"
                            color="bg-gradient-to-br from-blue-500 to-indigo-600"
                            delay={0.4}
                            onClick={() => navigate('/reports')}
                        />
                    </div>
                </div>

                {/* Right Column / Or Bottom: History (3 columns wide) */}
                <div className="lg:col-span-3 space-y-6">
                    <HistoryWidget />
                </div>
            </div>
        </div>
    );
};

const ActionCard = ({ title, icon, desc, color, delay, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`p-6 cursor-pointer group relative overflow-hidden h-40 flex flex-col justify-between shadow-xl rounded-2xl ${color} text-white`}
    >
        <div className={`absolute top-[-20%] right-[-10%] p-4 opacity-20 group-hover:opacity-30 transition-opacity transform rotate-12`}>
            {React.cloneElement(icon, { size: 120 })}
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-md shadow-inner mb-2">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm opacity-90">{desc}</p>
        </div>
    </motion.div>
);

const DailyTaskWidget = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('health_tasks');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: "Breakfast - Oatmeal & Fruits", time: "08:00", completed: true, type: "diet" },
            { id: 2, title: "Morning Medication", time: "09:00", completed: true, type: "med" },
            { id: 3, title: "Hydration Check", time: "10:30", completed: false, type: "water" },
            { id: 4, title: "Lunch - Grilled Chicken Salad", time: "13:00", completed: false, type: "diet" },
            { id: 5, title: "Evening Walk (30 mins)", time: "17:00", completed: false, type: "exercise" },
        ];
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', time: '', type: 'diet' });

    useEffect(() => {
        localStorage.setItem('health_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const toggle = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.title || !newTask.time) return;
        const task = {
            id: Date.now(),
            title: newTask.title,
            time: newTask.time,
            completed: false,
            type: newTask.type
        };
        setTasks([...tasks, task].sort((a, b) => a.time.localeCompare(b.time)));
        setNewTask({ title: '', time: '', type: 'diet' });
        setIsModalOpen(false);
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

    return (
        <div className="glass-card p-6 h-full relative">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-emerald-500" />
                    Task Planner
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:rotate-90 transition-transform"
                >
                    <Plus size={18} />
                </button>
            </h3>
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 thin-scrollbar">
                {tasks.map((task, idx) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => toggle(task.id)}
                        className={`p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition-all ${task.completed ? 'bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/50 opacity-60' : 'bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 hover:shadow-md'}`}
                    >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-slate-600'}`}>
                            {task.completed && <CheckCircle size={12} className="text-white" />}
                        </div>
                        <div className="flex-1">
                            <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>{task.title}</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{formatTimeDisplay(task.time)}</p>
                        </div>
                    </motion.div>
                ))}
                {tasks.length === 0 && <p className="text-center text-slate-400 text-xs py-4 italic">No tasks yet.</p>}
            </div>

            <button
                onClick={() => navigate('/planner')}
                className="w-full mt-4 py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-center gap-2"
            >
                Manage All Tasks
            </button>

            {/* Quick Add Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 dark:border-slate-800 relative"
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={20} />
                            </button>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Add Task</h2>
                            <form onSubmit={addTask} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Task Title"
                                    required
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="time"
                                        required
                                        value={newTask.time}
                                        onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                                    />
                                    <select
                                        value={newTask.type}
                                        onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                                    >
                                        <option value="diet">Diet</option>
                                        <option value="med">Medication</option>
                                        <option value="water">Water</option>
                                        <option value="exercise">Exercise</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all text-sm">
                                    Add Task
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const HistoryWidget = () => {
    return (
        <div className="glass-card p-6 h-full">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <FileClock size={20} className="text-blue-500" />
                History
            </h3>
            <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                            <FileText size={16} />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Report Analysis</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Complete blood count verified.</p>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">2 days ago</span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 text-sm text-primary-600 font-medium hover:underline flex items-center justify-center">
                View All <ChevronRight size={14} />
            </button>
        </div>
    );
};

export default Home;
