import Layout from '../layouts/DefaultLayout';

const challenges = [
  { id: 'web-001', title: 'Password Reset Puzzle', category: 'Web', difficulty: 'Easy', points: 100 },
  { id: 'crypto-001', title: 'Shift Cipher', category: 'Crypto', difficulty: 'Medium', points: 200 },
  { id: 'forensics-001', title: 'Packet Whisper', category: 'Forensics', difficulty: 'Hard', points: 300 },
];

export default function ChallengesPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Challenge board</p>
          <h1 className="mt-2 text-3xl font-semibold">Available labs</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {challenges.map((challenge) => (
            <article key={challenge.id} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{challenge.category}</p>
              <h2 className="mt-3 text-xl font-semibold text-white">{challenge.title}</h2>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                <span>{challenge.difficulty}</span>
                <span className="text-cyan-300">{challenge.points} pts</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
