import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, FileText, Activity, Home as HomeIcon, LogOut, Bell, Settings as SettingsIcon, BarChart, Star, Globe, Phone, X, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import HealthDashboard from './pages/HealthDashboard';
import Chat from './pages/Chat';
import Analysis from './pages/Analysis';
import Login from './pages/Login';
import Planner from './pages/Planner';
import Settings from './pages/Settings';
import LanguageSelection from './components/LanguageSelection';
import Journal from './pages/Journal';

// Translations
import { translations } from './translations';

// Placeholder Components
const Reports = () => <div className="p-8 text-center text-slate-500">Reports Dashboard Coming Soon</div>;

const TopNavbar = ({ onLogout, language, changeLanguage, t, onEmergencyCall }) => {
  const [showLang, setShowLang] = useState(false);
  // Get languages from the keys of the translations object
  const languages = Object.keys(translations);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/20 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-tr from-primary-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-primary-500/20">
          <Activity className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300">
          MediXAI
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-full border border-white/50 dark:border-slate-700 backdrop-blur-md">
        <NavLinkItem to="/" icon={<HomeIcon size={18} />} label={t.home} />
        <NavLinkItem to="/dashboard" icon={<LayoutDashboard size={18} />} label={t.dashboard} />
        <NavLinkItem to="/reports" icon={<FileText size={18} />} label={t.reports} />
        <NavLinkItem to="/journal" icon={<Book size={18} />} label="Journal" />
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-4">

        {/* Language Dropdown */}
        <div className="relative z-50">
          <button
            onClick={() => setShowLang(!showLang)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-slate-700 transition-all shadow-sm"
          >
            <Globe className="w-4 h-4" />
            <span>{language}</span>
            <SettingsIcon size={14} className="opacity-50" />
          </button>

          {showLang && (
            <div className="absolute top-full mt-2 right-0 w-32 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden py-1 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-200">
              {languages.length > 0 ? languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => { changeLanguage(lang); setShowLang(false); }}
                  className={`px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${language === lang ? 'text-primary-600 font-bold bg-primary-50 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  {lang}
                </button>
              )) : (
                <div className="px-4 py-2 text-xs text-slate-400">Loading...</div>
              )}
            </div>
          )}
        </div>

        {/* Emergency Call Button */}
        <button
          onClick={onEmergencyCall}
          className="p-2.5 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all border border-rose-100 dark:border-rose-800 shadow-sm animate-pulse"
          title="Emergency Caretaker Call"
        >
          <Phone size={20} />
        </button>

        <NavLink
          to="/settings"
          className={({ isActive }) => `p-2 rounded-full transition-colors relative ${isActive ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <SettingsIcon size={20} />
        </NavLink>
        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onLogout}>
          <img
            src="https://ui-avatars.com/api/?name=User&background=0d9488&color=fff"
            alt="User"
            className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"
          />
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-800 dark:text-white leading-none">John Doe</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">PRO Member</p>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLinkItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm ${isActive
        ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50'
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const FloatingChatButton = () => {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/chat')}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-primary-500 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-primary-500/50 transition-shadow"
      title="Chat with Personal Assistant"
    >
      <MessageSquare size={24} />
    </motion.button>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'English');
  const [languageSelected, setLanguageSelected] = useState(() => localStorage.getItem('languageSelected') === 'true');

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setLanguageSelected(true);
    localStorage.setItem('language', lang);
    localStorage.setItem('languageSelected', 'true');
  };

  // Initialize theme on mount
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    // Optional: We can decide if we want to reset language selection on logout
    // For now, keeping it persisted is better UX.
  };

  return (
    <Router>
      <AuthWrapper
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isDark={isDark}
        toggleTheme={toggleTheme}
        language={language}
        changeLanguage={changeLanguage}
        languageSelected={languageSelected}
        setLanguageSelected={setLanguageSelected}
      />
    </Router>
  );
}

const CaretakerModal = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 to-pink-600"></div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 mb-4">
            <Phone size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Emergency Contact</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Contacting your assigned caretaker or emergency services.</p>

          <div className="w-full space-y-3 mb-8">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="text-left">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Caretaker</p>
                <p className="text-lg font-bold text-slate-800 dark:text-white">Mrs. Sarah Wilson</p>
              </div>
              <a href="tel:+15550123" className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all">
                <Phone size={20} />
              </a>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="text-left">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Hospital (Emergency)</p>
                <p className="text-lg font-bold text-slate-800 dark:text-white">911 / Emergency</p>
              </div>
              <a href="tel:911" className="p-3 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const AuthWrapper = ({ isAuthenticated, onLogin, onLogout, isDark, toggleTheme, language, changeLanguage, languageSelected, setLanguageSelected, t }) => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  console.log("DEBUG: AuthWrapper Language:", language);
  const t_val = t || (translations && translations[language]) || (translations && translations['English']) || {};
  console.log("DEBUG: t_val defined:", !!t_val);

  if (!isAuthenticated) {
    return <Login onLogin={onLogin} language={language} changeLanguage={changeLanguage} t={t_val} />;
  }

  // Force language selection after login if not already selected
  if (!languageSelected) {
    return <LanguageSelection onSelectLanguage={changeLanguage} />;
  }

  return (
    <div className={`min-h-screen relative transition-colors duration-500 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Animated Mesh Background */}
      <div className="mesh-gradient-bg">
        <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] animate-pulse ${isDark ? 'bg-purple-900/30' : 'bg-purple-400/20'}`}></div>
        <div className={`absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] animate-pulse delay-1000 ${isDark ? 'bg-blue-900/30' : 'bg-blue-400/20'}`}></div>

        {/* Floating Curiosity Elements */}
        {!isDark && (
          <>
            <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-tr from-pink-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-element"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-tr from-blue-300 to-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-element" style={{ animationDelay: '2s' }}></div>
          </>
        )}
        {isDark && (
          <>
            <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-indigo-500/20 rounded-full blur-2xl floating-element"></div>
            <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl floating-element" style={{ animationDelay: '-5s' }}></div>
          </>
        )}
      </div>

      {!isLoginPage && <TopNavbar onLogout={onLogout} language={language} changeLanguage={changeLanguage} t={t_val} onEmergencyCall={() => setIsEmergencyModalOpen(true)} />}

      <main className="container mx-auto pb-20 relative z-10">
        <Routes>
          <Route path="/" element={<Home t={t_val} />} />
          <Route path="/dashboard" element={<HealthDashboard t={t_val} />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/reports" element={<Analysis language={language} t={t_val} />} />
          <Route path="/chat" element={<Chat language={language} t={t_val} />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/settings" element={<Settings isDark={isDark} toggleTheme={toggleTheme} language={language} changeLanguage={changeLanguage} t={t_val} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!isLoginPage && <FloatingChatButton />}

      <CaretakerModal isOpen={isEmergencyModalOpen} onClose={() => setIsEmergencyModalOpen(false)} t={t_val} />
    </div>
  );
}

export default App;
