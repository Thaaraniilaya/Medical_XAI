import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Droplets, TrendingUp, Calendar, Zap, Wind, Thermometer } from 'lucide-react';

const HealthDashboard = () => {
    return (
        <div className="space-y-8 p-4 md:p-8">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Health Analytics</h1>
                <p className="text-slate-500 dark:text-slate-400">Comprehensive view of your vital signs and overall health trends.</p>
            </header>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="Heart Rate" value="72 bpm" trend="+2%" icon={<Heart className="text-rose-500" />} color="bg-rose-50" />
                <MetricCard title="Blood Pressure" value="120/80" trend="Normal" icon={<Activity className="text-blue-500" />} color="bg-blue-50" />
                <MetricCard title="Glucose" value="95 mg/dL" trend="Fasting" icon={<Droplets className="text-amber-500" />} color="bg-amber-50" />
                <MetricCard title="SpO2" value="98%" trend="Stable" icon={<Wind className="text-teal-500" />} color="bg-teal-50" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Heart Rate Trend */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-100 mb-6 flex items-center gap-2">
                        <Activity size={20} className="text-primary-500" />
                        Heart Rate History
                    </h3>
                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                        {[65, 70, 72, 68, 74, 72, 70, 75, 73, 71, 74, 72].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${(h / 100) * 100}%` }}
                                transition={{ delay: i * 0.05 }}
                                className="w-full bg-rose-200 rounded-t-md relative group hover:bg-rose-400 transition-colors"
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">{h}</div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-400">
                        <span>8 AM</span>
                        <span>12 PM</span>
                        <span>4 PM</span>
                        <span>8 PM</span>
                    </div>
                </div>

                {/* Sleep Analysis */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-100 mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-purple-500" />
                        Sleep Quality
                    </h3>
                    <div className="h-64 flex items-end justify-between gap-4 px-4">
                        {[7, 6.5, 8, 7.5, 6, 8.5, 7.5].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${(h / 10) * 100}%` }}
                                className="w-full bg-purple-200 rounded-t-lg relative group hover:bg-purple-400 transition-colors"
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">{h}h</div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-400">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full"><Zap size={24} /></div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Activity Level</p>
                        <h4 className="text-xl font-bold text-slate-800 dark:text-white">Moderately Active</h4>
                    </div>
                </div>
                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full"><Thermometer size={24} /></div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Body Temp</p>
                        <h4 className="text-xl font-bold text-slate-800 dark:text-white">98.6°F</h4>
                    </div>
                </div>
                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full"><Droplets size={24} /></div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Hydration</p>
                        <h4 className="text-xl font-bold text-slate-800 dark:text-white">1.5L / 2.5L</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, trend, icon, color }) => (
    <motion.div whileHover={{ y: -5 }} className="glass-card p-6">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${color} dark:bg-opacity-20 bg-opacity-50`}>
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <span className="text-xs font-semibold bg-white dark:bg-slate-800 px-2 py-1 rounded-full shadow-sm text-slate-600 dark:text-slate-300 transition-colors">{trend}</span>
        </div>
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1 transition-colors">{value}</p>
    </motion.div>
);

export default HealthDashboard;
