import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Info, 
  X 
} from 'lucide-react';
import campusBg from '../assets/jklu-campus.webp';

export function LoginPortal({ onLogin }) {
  const [username, setUsername] = useState('faculty@jklu.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalNotice, setModalNotice] = useState(null); // { title, message }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const isDeanOrAdmin = 
        username.toLowerCase().includes('admin') || 
        username.toLowerCase().includes('dean');

      onLogin({
        username: username || 'faculty@jklu.edu.in',
        role: isDeanOrAdmin ? 'admin' : 'professor',
        displayName: isDeanOrAdmin ? 'Dr. Pushpendra Singh (Dean)' : 'Prof. Anurag Sharma',
        roleLabel: isDeanOrAdmin ? 'Campus Administrator' : 'Department Faculty',
        email: username || 'faculty@jklu.edu.in'
      });
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden font-sans text-white select-none">
      {/* Background Image with Cinematic Gradient Overlays */}
      <div className="fixed inset-0 z-0">
        <img
          src={campusBg}
          alt="JKLU Campus Panoramic View"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:transition-transform duration-1000"
        />
        {/* Dark Vignette Overlay matching TCS iON aesthetic for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/50" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 w-full px-6 py-5 sm:px-12 flex items-center justify-between">
        {/* Logo matching TCS iON logo placement */}
        <div className="flex items-center gap-3">
          <div className="flex items-center tracking-tight">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
              jklu
            </span>
            <div className="relative flex items-center ml-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">
                i
              </span>
              <div className="relative mx-0.5 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  O
                </span>
                {/* Power notch indicator inside O */}
                <div className="absolute top-1.5 w-1 h-2 bg-rose-500 rounded-full" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-white">
                N
              </span>
            </div>
          </div>
          <span className="hidden sm:inline-block h-6 w-px bg-white/20 mx-1" />
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-300 uppercase tracking-widest">
            Enterprise Campus Portal
          </span>
        </div>
      </header>

      {/* Main Center Content: Left Hero + Right Floating Card */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-4 sm:py-8 flex-1 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        
        {/* Left Column: Big Bold Headline */}
        <div className="flex-1 max-w-2xl text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.18] tracking-tight text-white drop-shadow-md">
            Experience the best with JKLU's all new enterprise applications portal
          </h1>
        </div>

        {/* Right Column: Floating Enterprise Login Card */}
        <div className="w-full max-w-[430px] shrink-0">
          <div className="bg-white rounded-3xl shadow-2xl p-7 sm:p-9 text-slate-800 border border-slate-100">
            {/* Form Title */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Enterprise Login
              </h2>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field (No Forgot Username) */}
              <div className="space-y-1.5">
                <label htmlFor="username" className="block text-xs font-semibold text-slate-700">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    spellCheck="false"
                    autoCapitalize="none"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-hidden text-slate-900 bg-slate-50/50 hover:bg-white focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="password" className="font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setModalNotice({
                      title: 'Reset Password',
                      message: 'Password reset links are dispatched to your registered recovery mobile number and JKLU Google Workspace email.'
                    })}
                    className="text-blue-600 hover:text-blue-700 hover:underline text-[11px] font-medium cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-hidden text-slate-900 bg-slate-50/50 hover:bg-white focus:bg-white transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Keep Me Signed In & Tooltip */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                    className="w-4 h-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>Keep me signed in.</span>
                </label>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setInfoTooltip(!infoTooltip)}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                    title="Click for sign-in policy information"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>

                  {infoTooltip && (
                    <div className="absolute right-0 bottom-full mb-2 w-56 p-2.5 bg-slate-900 text-slate-200 text-[11px] rounded-xl shadow-xl z-30 leading-snug">
                      Keeps your authentication token securely stored in localStorage for 30 days. Do not select on shared lab computers.
                    </div>
                  )}
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Bottom Footer matching TCS iON layout */}
      <footer className="relative z-10 w-full px-6 sm:px-12 py-4 bg-black/40 backdrop-blur-md border-t border-white/10 text-[11px] sm:text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-end">
          {/* Legal and Privacy Links */}
          <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-slate-400">
            <button 
              type="button" 
              onClick={() => setModalNotice({
                title: 'Terms of Use',
                message: 'All campus resources, software licenses, and physical venues are governed by the JKLU IT & Academic Governance Charter 2026.'
              })}
              className="hover:text-white cursor-pointer"
            >
              Terms of Use
            </button>
            <span>|</span>
            <button 
              type="button" 
              onClick={() => setModalNotice({
                title: 'Privacy Notice',
                message: 'User authentication credentials and attendance data are encrypted end-to-end and strictly retained according to university compliance policies.'
              })}
              className="hover:text-white cursor-pointer"
            >
              Privacy Notice
            </button>
            <span>|</span>
            <button 
              type="button" 
              onClick={() => setModalNotice({
                title: 'Cookie Policy',
                message: 'Essential cookies and local storage tokens are utilized solely to keep users securely signed in.'
              })}
              className="hover:text-white cursor-pointer"
            >
              Cookie Policy
            </button>
            <span>|</span>
            <button 
              type="button" 
              onClick={() => setModalNotice({
                title: 'Customize Cookies',
                message: 'Preferences updated: Functional, Analytical, and Security cookies enabled.'
              })}
              className="hover:text-white cursor-pointer"
            >
              Customize Cookies
            </button>
          </div>
        </div>
      </footer>

      {/* Generic Notice Modal */}
      {modalNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 text-slate-800 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-base text-slate-900">{modalNotice.title}</h4>
              <button
                type="button"
                onClick={() => setModalNotice(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{modalNotice.message}</p>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setModalNotice(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}