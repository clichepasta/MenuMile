import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] rounded-full bg-orange-600/10 blur-[150px] pointer-events-none" />

      {/* Navbar */}
      <header className="w-full max-w-6xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-900 z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-bold text-white shadow-lg">
            MM
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            MenuMile
          </span>
        </div>
        <Link
          href="/auth/login"
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/40 backdrop-blur-md rounded-lg transition"
        >
          Sign In
        </Link>
      </header>

      {/* Hero Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center py-20 z-10">
        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-medium uppercase tracking-wider mb-6">
          Enterprise Logistics & Delivery
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.1] mb-6">
          Streamlining{' '}
          <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Multi-Tenant Kitchens
          </span>{' '}
          and Rider Operations.
        </h1>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
          An enterprise-grade platform connecting restaurant stations, delivery partners, and
          customers. Built with real-time tracking, idempotent shift planning, and strict tenant isolation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link
            href="/auth/login"
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-medium rounded-xl text-sm transition shadow-lg shadow-amber-500/10 flex items-center justify-center"
          >
            Access Operations Dashboard
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
          {/* Card 1 */}
          <div className="p-6 bg-slate-900/40 backdrop-blur-md border border-slate-900 hover:border-slate-800/80 rounded-2xl text-left transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-500/20 transition">
              🍽️
            </div>
            <h3 className="text-lg font-bold mb-2">Kitchen Stations</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Segment prep flows across specialized kitchen areas (grill, salad, pastry) with automated preparation checks.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-slate-900/40 backdrop-blur-md border border-slate-900 hover:border-slate-800/80 rounded-2xl text-left transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4 group-hover:bg-orange-500/20 transition">
              🏍️
            </div>
            <h3 className="text-lg font-bold mb-2">Rider Shifts</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Claim shift slots, plan recurring availability schedules using standard RFC 5545 rules, and track payouts.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-slate-900/40 backdrop-blur-md border border-slate-900 hover:border-slate-800/80 rounded-2xl text-left transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-4 group-hover:bg-red-500/20 transition">
              🔒
            </div>
            <h3 className="text-lg font-bold mb-2">Tenant Boundaries</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Enforce enterprise-grade security rules restricting views and operations to authorized branches, staff, or riders.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-8 border-t border-slate-900 text-center text-xs text-slate-600 mt-auto">
        &copy; {new Date().getFullYear()} MenuMile. All rights reserved.
      </footer>
    </div>
  );
}
