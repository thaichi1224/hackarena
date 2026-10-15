import Layout from '../layouts/DefaultLayout';

const leaderboard = [
  { name: 'Ada', score: 980, badge: 'Expert' },
  { name: 'Liam', score: 860, badge: 'Pro' },
  { name: 'Nora', score: 760, badge: 'Rising' },
  { name: 'Kai', score: 640, badge: 'New' },
];

export default function ScoreboardPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Leaderboard</p>
          <h1 className="mt-2 text-3xl font-semibold">Global rankings</h1>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          <table className="w-full text-left">
            <thead className="bg-slate-800 text-sm uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Badge</th>
                <th className="px-4 py-3 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player, index) => (
                <tr key={player.name} className="border-t border-slate-800 text-sm text-slate-200">
                  <td className="px-4 py-3">#{index + 1}</td>
                  <td className="px-4 py-3">{player.name}</td>
                  <td className="px-4 py-3">{player.badge}</td>
                  <td className="px-4 py-3 text-right text-cyan-300">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
