import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Lock, Sparkles, Send } from 'lucide-react';
import { TsgLogo } from '../components/brand/TsgLogo';
import { HeroIllustration } from '../components/illustrations/HeroIllustration';
import { Button } from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-yellow-200 selection:text-yellow-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <TsgLogo size="md" />
          <div className="flex items-center gap-3">
            <Link to="/login" className="no-underline">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/register" className="no-underline">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80">
        {/* Background circuit grid subtle accents */}
        <div className="absolute inset-0 bg-[radial-gradient(#0052ff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              {/* TSG Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                <span>Eyad Aboelftoh Product Suite</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-yellow-700 font-extrabold">Saraha 2.0</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] m-0">
                Honest feedback, <span className="text-blue-600 underline decoration-yellow-300 decoration-wavy decoration-2">frictionless</span> conversations.
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed m-0">
                Receive authentic anonymous messages with strict identity protection. When both sides agree, disclose identities and transition into real-time conversations.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/register" className="no-underline">
                  <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Create Your Profile
                  </Button>
                </Link>
                <Link to="/send" className="no-underline">
                  <Button size="lg" variant="secondary" leftIcon={<Send className="w-4 h-4 text-blue-600" />}>
                    Send Anonymous Message
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs font-bold text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Identity Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>Cookie Session Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Fast Execution</span>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroIllustration className="w-full max-w-md h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Step Workflow */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 font-bold text-xs uppercase tracking-wider mb-3">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight m-0 mb-12">
            From Anonymous Note to Two-Way Dialogue
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-yellow-200 flex items-center justify-center font-black text-xl mb-6 shadow-sm shadow-blue-500/30">
                  01
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Share Your Link</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Generate your personal anonymous inbox link and share it anywhere. Receive candid, constructive messages with sender identities hidden.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-blue-50/50 border border-blue-200/80 hover:border-blue-400 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-yellow-300 text-yellow-950 flex items-center justify-center font-black text-xl mb-6 shadow-sm shadow-yellow-400/30">
                  02
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Request Identity</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Curious who wrote a thoughtful note? Send an identity disclosure request. The original sender gets notified and decides whether to disclose or decline.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl mb-6 shadow-sm shadow-slate-900/30">
                  03
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Unlocked Conversation</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Upon mutual acceptance, identity is securely disclosed and an end-to-end conversation thread is generated with the original message attached.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TSG Footer */}
      <footer className="mt-auto bg-slate-900 text-white border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <TsgLogo theme="blue" size="md" />
          <p className="text-xs text-slate-400 text-center sm:text-right m-0">
            Engineered by <span className="text-yellow-200 font-bold">Eyad Aboelftoh</span>.
          </p>
        </div>
      </footer>
    </div>
  );
};
