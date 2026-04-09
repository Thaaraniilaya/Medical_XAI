import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { translations } from '../translations';

const LanguageSelection = ({ onSelectLanguage }) => {
    const languages = [
        { code: 'English', label: 'English', native: 'English', flag: '🇺🇸' },
        { code: 'Tamil', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
        { code: 'Hindi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
        { code: 'Spanish', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
        { code: 'French', label: 'French', native: 'Français', flag: '🇫🇷' },
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
                {/* Left Side - Visual */}
                <div className="md:w-5/12 bg-gradient-to-br from-indigo-600 to-purple-700 p-10 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                            <Globe size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Choose your Language</h1>
                        <p className="text-indigo-100 opacity-90 text-lg">
                            Select your preferred language to customize your experience.
                        </p>
                    </div>

                    <div className="relative z-10 mt-12">
                        <div className="flex gap-2 opacity-50">
                            <span className="text-xs border border-white/30 rounded-full px-3 py-1">नमस्ते</span>
                            <span className="text-xs border border-white/30 rounded-full px-3 py-1">Bonjour</span>
                            <span className="text-xs border border-white/30 rounded-full px-3 py-1">Hello</span>
                            <span className="text-xs border border-white/30 rounded-full px-3 py-1">வணக்கம்</span>
                        </div>
                    </div>

                    {/* Abstract blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl -ml-20 -mb-20"></div>
                </div>

                {/* Right Side - Selection Grid */}
                <div className="md:w-7/12 p-8 md:p-12 overflow-y-auto bg-slate-50 dark:bg-slate-950">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Available Languages</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {languages.map((lang, index) => (
                            <motion.button
                                key={lang.code}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => onSelectLanguage(lang.code)}
                                className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all text-left"
                            >
                                <div className="text-3xl">{lang.flag}</div>
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {lang.label}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-indigo-600/70 transition-colors">
                                        {lang.native}
                                    </p>
                                </div>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500">
                                    <Check size={20} />
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-400">
                            You can change this later in Settings.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LanguageSelection;
