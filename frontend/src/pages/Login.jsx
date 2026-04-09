import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Lock, ArrowRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, language, changeLanguage, t }) => {
    const navigate = useNavigate();
    const [method, setMethod] = useState('email'); // 'email' or 'phone'
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const text = t || {
        welcomeBack: "Welcome Back",
        signInToDashboard: "Sign in to your health dashboard",
        email: "Email",
        phone: "Phone",
        enterEmail: "Enter your email",
        enterPhone: "Enter phone number",
        enterPassword: "Enter password",
        signIn: "Sign In",
        dontHaveAccount: "Don't have an account?",
        signUp: "Sign up"
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock authentication
        if (identifier && password) {
            onLogin();
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-500">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800"
            >
                <div className="p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary-500/30">
                            <Activity className="text-white w-7 h-7" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{text.welcomeBack}</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{text.signInToDashboard}</p>

                        {/* Language Selector */}
                        <div className="flex flex-wrap justify-center gap-2 mb-2">
                            {['English', 'Tamil', 'Hindi', 'Spanish', 'French'].map((lang) => (
                                <button
                                    key={lang}
                                    type="button"
                                    onClick={() => changeLanguage(lang)}
                                    className={`text-xs px-2 py-1 rounded-full border transition-all ${language === lang
                                        ? 'bg-primary-100 dark:bg-primary-900 border-primary-200 dark:border-primary-700 text-primary-700 dark:text-primary-300 font-semibold'
                                        : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6">
                        <button
                            onClick={() => setMethod('email')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${method === 'email' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                        >
                            {text.email}
                        </button>
                        <button
                            onClick={() => setMethod('phone')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${method === 'phone' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                        >
                            {text.phone}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                {method === 'email' ? <Mail size={18} /> : <Phone size={18} />}
                            </div>
                            <input
                                type={method === 'email' ? 'email' : 'tel'}
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder={method === 'email' ? text.enterEmail : text.enterPhone}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 focus:border-primary-400 text-slate-900 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={text.enterPassword}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 focus:border-primary-400 text-slate-900 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-900 dark:bg-primary-600 text-white py-3 rounded-xl font-medium shadow-lg hover:bg-slate-800 dark:hover:bg-primary-500 transition-all flex items-center justify-center gap-2 group"
                        >
                            <span>{text.signIn}</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="#" className="text-xs text-slate-400 hover:text-primary-500">Forgot your password?</a>
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 text-center border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400">{text.dontHaveAccount} <a href="#" className="text-primary-600 font-medium hover:underline">{text.signUp}</a></p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
