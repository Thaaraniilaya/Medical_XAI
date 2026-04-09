import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Lock, Eye, Globe, ChevronRight, LogOut, Save, Mail, Phone } from 'lucide-react';

const Settings = ({ isDark, toggleTheme, language, changeLanguage, t }) => {
    const text = t || {
        settings: "Settings",
        language: "Language",
        appearance: "Appearance",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        profile: "Profile",
        logout: "Log Out"
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Menu */}
            <div className="lg:col-span-1">
                <MenuWidget text={text} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <SettingsIcon className="text-primary-500" />
                        {text.settings}
                    </h2>
                </div>

                <div className="grid gap-6">
                    <ProfileCard />
                    <AccountSettings />
                    <LanguageSettings language={language} changeLanguage={changeLanguage} text={text} />
                    <PrivacySettings />
                    <AppearanceSettings isDark={isDark} toggleTheme={toggleTheme} text={text} />
                </div>
            </div>
        </div>
    );
};

const LanguageSettings = ({ language, changeLanguage, text }) => (
    <div className="glass-card p-8">
        <SectionHeader title="Language Preferences" icon={<Globe size={20} className="text-emerald-600" />} color="bg-emerald-100" />
        <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">Select your preferred language for the AI Assistant and Reports.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['English', 'Tamil', 'Hindi', 'Spanish', 'French'].map((lang) => (
                    <button
                        key={lang}
                        onClick={() => changeLanguage(lang)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${language === lang
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-md transform scale-105'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'}`}
                    >
                        {lang}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const ProfileCard = () => (
    <div className="glass-card p-6 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <div className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-lg z-10 bg-white dark:bg-slate-900 p-1 mb-3 mt-8">
            <img
                src="https://ui-avatars.com/api/?name=User&background=0d9488&color=fff"
                alt="User"
                className="w-full h-full rounded-full object-cover"
            />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">John Doe</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">john.doe@example.com</p>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wide border border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800">
            Pro Plan
        </span>
    </div>
);

const MenuWidget = ({ text }) => (
    <div className="glass-card p-4 space-y-2">
        <MenuItem icon={<User size={18} />} label="Account" active />
        <MenuItem icon={<Lock size={18} />} label="Security" />
        <MenuItem icon={<Bell size={18} />} label="Notifications" />
        <MenuItem icon={<Shield size={18} />} label="Privacy" />
        <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors text-sm font-medium">
            <LogOut size={18} />
            {text.logout}
        </button>
    </div>
);

const MenuItem = ({ icon, label, active }) => (
    <button className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-sm font-medium ${active ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
        <div className="flex items-center gap-3">
            {icon}
            {label}
        </div>
        <ChevronRight size={16} className={`text-slate-400 dark:text-slate-600 ${active ? 'text-primary-500' : ''}`} />
    </button>
);

const SectionHeader = ({ title, icon, color }) => (
    <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${color} bg-opacity-20 text-${color.split('-')[1]}-600`}>
            {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h3>
    </div>
);

const AccountSettings = () => (
    <div className="glass-card p-8">
        <SectionHeader title="Personal Information" icon={<User size={20} className="text-blue-600" />} color="bg-blue-100" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Full Name" value="John Doe" />
            <InputField label="Email" value="john.doe@example.com" icon={<Mail size={16} />} />
            <InputField label="Phone" value="+1 (555) 012-3456" icon={<Phone size={16} />} />
            <InputField label="Location" value="New York, USA" />
        </div>
        <div className="mt-6 flex justify-end">
            <button className="bg-slate-900 dark:bg-primary-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-primary-500 transition-colors flex items-center gap-2">
                <Save size={16} /> Save Changes
            </button>
        </div>
    </div>
);

const PrivacySettings = () => (
    <div className="glass-card p-8">
        <SectionHeader title="Privacy & Security" icon={<Lock size={20} className="text-rose-600" />} color="bg-rose-100" />
        <div className="space-y-4">
            <ToggleItem title="Two-Factor Authentication" desc="Enable extra security layer" checked={true} />
            <ToggleItem title="Public Profile" desc="Allow others to see your health achievements" checked={false} />
            <ToggleItem title="Data Sharing" desc="Share anonymous data for research" checked={true} />
        </div>
    </div>
);

const AppearanceSettings = ({ isDark, toggleTheme, text }) => (
    <div className="glass-card p-8">
        <SectionHeader title="Appearance & Notifications" icon={<Eye size={20} className="text-purple-600" />} color="bg-purple-100" />
        <div className="space-y-4">
            <ToggleItem
                title="Dark Mode"
                desc="Switch to dark theme"
                checked={isDark}
                onChange={toggleTheme}
            />
            <ToggleItem title="Email Notifications" desc="Receive weekly health summaries" checked={true} />
        </div>
    </div>
);

const InputField = ({ label, value, icon }) => (
    <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">{label}</label>
        <div className="relative">
            <input
                type="text"
                defaultValue={value}
                className="w-full pl-3 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            {icon && <div className="absolute right-3 top-2.5 text-slate-400 dark:text-slate-500">{icon}</div>}
        </div>
    </div>
);

const ToggleItem = ({ title, desc, checked, onChange }) => {
    // If onChange is provided, use it (controlled). Otherwise use local state (uncontrolled).
    const isControlled = onChange !== undefined;
    const [localOn, setLocalOn] = useState(checked);
    const isOn = isControlled ? checked : localOn;

    const handleClick = () => {
        if (isControlled) {
            onChange();
        } else {
            setLocalOn(!localOn);
        }
    };

    return (
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer" onClick={handleClick}>
            <div>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
            </div>
            <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${isOn ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${isOn ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
        </div>
    );
};

export default Settings;
