const challenges = [
  {
    id: 'web-001',
    title: 'Password Reset Puzzle',
    category: 'Web',
    difficulty: 'Easy',
    points: 100,
  },
  {
    id: 'crypto-001',
    title: 'Shift Cipher',
    category: 'Crypto',
    difficulty: 'Medium',
    points: 200,
  },
  {
    id: 'forensics-001',
    title: 'Packet Whisper',
    category: 'Forensics',
    difficulty: 'Hard',
    points: 300,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-12 flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">HackArena</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">Ethical Cybersecurity Training</h1>
          </div>
          <button className="rounded-full border border-cyan-500 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20">
            Join league
          </button>
        </header>

        <section className="mb-12 grid gap-6 md:grid-cols-3">
          <StatCard label="Active players" value="2,184" />
          <StatCard label="Challenges" value="38" />
          <StatCard label="Average score" value="4,920" />
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-glow">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Challenge feed</p>
              <h2 className="mt-2 text-2xl font-semibold">Featured labs</h2>
            </div>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Live
            </span>
          </div>

          <div className="space-y-4">
            {challenges.map((challenge) => (
              <article key={challenge.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">{challenge.category}</p>
                  <h3 className="mt-2 text-lg font-semibold">{challenge.title}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="rounded-full border border-slate-600 px-2 py-1 text-xs text-slate-300">{challenge.difficulty}</span>
                  <span className="text-sm font-medium text-cyan-300">{challenge.points} pts</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-bold text-cyan-300">{value}</p>
    </div>
  );
}
