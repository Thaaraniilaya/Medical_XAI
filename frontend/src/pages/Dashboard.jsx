import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Droplets, TrendingUp, Calendar, CheckCircle, AlertCircle, Phone, FileClock, FileText } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Health Overview</h1>
                    <p className="text-slate-500 mt-2">Welcome back! Here's your health summary for today.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                    <Calendar size={16} />
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Heart Rate"
                    value="72 bpm"
                    trend="+2% from yesterday"
                    icon={<Heart className="text-rose-500" size={24} />}
                    color="bg-rose-50"
                    trendColor="text-emerald-600"
                />
                <MetricCard
                    title="Blood Pressure"
                    value="120/80"
                    subtitle="mmHg"
                    trend="Normal Range"
                    icon={<Activity className="text-blue-500" size={24} />}
                    color="bg-blue-50"
                    trendColor="text-emerald-600"
                />
                <MetricCard
                    title="Glucose"
                    value="95"
                    subtitle="mg/dL"
                    trend="Fasting"
                    icon={<Droplets className="text-amber-500" size={24} />}
                    color="bg-amber-50"
                    trendColor="text-slate-500"
                />
                <MetricCard
                    title="Sleep"
                    value="7h 30m"
                    trend="Avg. Quality: 85%"
                    icon={<TrendingUp className="text-purple-500" size={24} />}
                    color="bg-purple-50"
                    trendColor="text-purple-600"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: History & Tasks */}
                <div className="lg:col-span-2 space-y-6">

                    {/* History of Records */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold text-slate-700 mb-6 flex items-center gap-2">
                            <FileClock size={20} className="text-primary-500" />
                            Recent Activity & History
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mt-1">
                                    <FileText size={18} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-800">Blood Test Report Uploaded</h4>
                                    <p className="text-sm text-slate-500">Analysis completed. Results normal.</p>
                                    <span className="text-xs text-slate-400 mt-2 block">2 hours ago</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="bg-purple-100 p-2 rounded-lg text-purple-600 mt-1">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-800">Appointment Scheduled</h4>
                                    <p className="text-sm text-slate-500">Dr. Smith (Cardiologist) - Confirmed.</p>
                                    <span className="text-xs text-slate-400 mt-2 block">Yesterday</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Task Panel (Diet/Tips/Appointments) */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold text-slate-700 mb-6 flex items-center gap-2">
                            <CheckCircle size={20} className="text-emerald-500" />
                            Your Task Panel
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Diet Planner Card */}
                            <div
                                onClick={() => navigate('/planner')}
                                className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center text-emerald-600 mb-3">
                                    <span className="text-xl">🥗</span>
                                </div>
                                <h4 className="font-semibold text-emerald-900">Diet Planner</h4>
                                <p className="text-xs text-emerald-700 mt-1">View meal plans</p>
                            </div>

                            {/* Health Tips Card */}
                            <div
                                onClick={() => navigate('/chat', { state: { initialPrompt: "Give me 5 daily health tips for my condition." } })}
                                className="bg-blue-50 border border-blue-100 p-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center text-blue-600 mb-3">
                                    <span className="text-xl">💡</span>
                                </div>
                                <h4 className="font-semibold text-blue-900">Health Tips</h4>
                                <p className="text-xs text-blue-700 mt-1">Daily advice for better living.</p>
                            </div>

                            {/* Appointment Fixes Card */}
                            <div
                                onClick={() => navigate('/chat', { state: { initialPrompt: "I need to schedule an appointment with a cardiologist." } })}
                                className="bg-rose-50 border border-rose-100 p-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div className="bg-rose-100 w-10 h-10 rounded-full flex items-center justify-center text-rose-600 mb-3">
                                    <span className="text-xl">📅</span>
                                </div>
                                <h4 className="font-semibold text-rose-900">Appointments</h4>
                                <p className="text-xs text-rose-700 mt-1">Manage and fix schedule conflicts.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Vitals Graph (Small) & Emergency */}
                <div className="space-y-6">
                    {/* Vitals Graph Simplified */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold text-slate-700 mb-4">Weekly Trend</h3>
                        <div className="h-40 flex items-end gap-2 justify-between px-2">
                            {[40, 60, 45, 70, 50, 65, 80].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    whileHover={{ scale: 1.1, backgroundColor: '#3b82f6' }}
                                    className="w-full bg-slate-200 rounded-t-sm relative group cursor-pointer"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        Value: {h}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-primary-500 to-teal-600 text-white">
                        <h3 className="font-bold text-lg mb-2">Need a quick analysis?</h3>
                        <p className="text-teal-100 text-sm mb-4">Upload your latest medical report for an instant AI summary.</p>
                        <button
                            onClick={() => navigate('/analysis')}
                            className="w-full bg-white text-primary-600 py-2 rounded-lg font-medium hover:bg-teal-50 transition-colors"
                        >
                            Analyze Report
                        </button>
                    </div>

                    {/* Emergency Contact Widget */}
                    <EmergencyContactWidget />
                </div>
            </div>
        </div>
    );
};

const ToDoListWidget = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Take medication (Metformin)", done: false },
        { id: 2, text: "Walk for 30 mins", done: true },
    ]);
    const [newTask, setNewTask] = useState("");

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
        setNewTask("");
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    return (
        <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-emerald-500" />
                Daily Goals
            </h3>
            <div className="space-y-3 mb-4">
                {tasks.map(task => (
                    <div key={task.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer" onClick={() => toggleTask(task.id)}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                            {task.done && <CheckCircle size={14} className="text-white" />}
                        </div>
                        <span className={`text-sm ${task.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task.text}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={addTask} className="flex gap-2">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new goal..."
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
                <button type="submit" className="bg-slate-900 text-white px-3 py-2 rounded-lg text-sm font-medium">+</button>
            </form>
        </div>
    );
};

const EmergencyContactWidget = () => {
    const [contact, setContact] = useState({ name: "Dr. Smith", phone: "555-0123" });
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="glass-card p-6 border-l-4 border-rose-500">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <AlertCircle size={20} className="text-rose-500" />
                    Emergency
                </h3>
                <button onClick={() => setIsEditing(!isEditing)} className="text-xs text-slate-400 hover:text-primary-500">
                    {isEditing ? "Save" : "Edit"}
                </button>
            </div>

            {isEditing ? (
                <div className="space-y-2">
                    <input
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        className="w-full text-sm border p-1 rounded" placeholder="Name"
                    />
                    <input
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        className="w-full text-sm border p-1 rounded" placeholder="Phone"
                    />
                </div>
            ) : (
                <div>
                    <p className="text-sm font-medium text-slate-700">{contact.name}</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{contact.phone}</p>
                    <button className="w-full mt-4 bg-rose-50 text-rose-600 py-2 rounded-lg text-sm font-medium hover:bg-rose-100 transition-colors flex items-center justify-center gap-2">
                        <Phone size={16} /> Call Now
                    </button>
                </div>
            )}
        </div>
    );
};

const MetricCard = ({ title, value, subtitle, trend, icon, color, trendColor }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-card p-6 relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${color.replace('bg-', 'text-')}`}>
            {React.cloneElement(icon, { size: 64 })}
        </div>
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${color}`}>
                {icon}
            </div>
        </div>
        <div>
            <h3 className="text-slate-500 font-medium text-sm">{title}</h3>
            <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-slate-800">{value}</span>
                {subtitle && <span className="text-sm text-slate-400">{subtitle}</span>}
            </div>
            <p className={`text-xs font-medium mt-2 ${trendColor}`}>
                {trend}
            </p>
        </div>
    </motion.div>
);

export default Dashboard;
