import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4">
      <Link href="/" className="text-lg font-bold text-cyan-300">
        HackArena
      </Link>
      <div className="flex items-center gap-4 text-sm text-slate-300">
        <Link href="/challenges" className="hover:text-white">Challenges</Link>
        <Link href="/scoreboard" className="hover:text-white">Leaderboard</Link>
        <Link href="/admin" className="rounded-md border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-cyan-200 hover:bg-cyan-500/20">Admin</Link>
        <Link href="/login" className="rounded-md bg-white px-3 py-1.5 text-slate-900 hover:bg-slate-200">Login</Link>
      </div>
    </nav>
  );
}
