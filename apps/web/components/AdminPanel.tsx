'use client';

import { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [secret, setSecret] = useState('');
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', slug: '', points: 100, difficulty: 'Easy', flag: '' });

  const fetchChallenges = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/challenges`, { headers: { 'x-admin-secret': secret } });
    const json = await res.json();
    setLoading(false);
    if (res.ok) setChallenges(json.challenges || []);
    else alert(json.error || 'Unauthorized');
  };

  const createChallenge = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/challenges`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret }, body: JSON.stringify(form) });
    const json = await res.json();
    if (res.ok) {
      alert('Created');
      fetchChallenges();
    } else alert(json.error || 'Failed');
  };

  useEffect(() => {
    if (secret) fetchChallenges();
  }, [secret]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-800 p-4">
        <label className="text-sm text-slate-400">Admin secret</label>
        <input value={secret} onChange={(e) => setSecret(e.target.value)} className="mt-2 w-full rounded-md bg-slate-900 px-3 py-2 text-white" placeholder="enter admin secret" />
      </div>

      <div className="rounded-xl border border-slate-800 p-4">
        <h3 className="text-lg font-medium">Create challenge</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-md bg-slate-900 px-3 py-2" />
          <input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-md bg-slate-900 px-3 py-2" />
          <input placeholder="Points" type="number" value={form.points} onChange={(e) => setForm({ ...form, points: Number(e.target.value) })} className="rounded-md bg-slate-900 px-3 py-2" />
          <input placeholder="Difficulty" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className="rounded-md bg-slate-900 px-3 py-2" />
          <input placeholder="Flag" value={form.flag} onChange={(e) => setForm({ ...form, flag: e.target.value })} className="col-span-2 rounded-md bg-slate-900 px-3 py-2" />
        </div>
        <div className="mt-3">
          <button onClick={createChallenge} className="rounded-md bg-emerald-600 px-3 py-2">Create</button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Existing challenges</h3>
        {loading ? <p>Loading...</p> : (
          <ul className="mt-3 space-y-2">
            {challenges.map((c) => (
              <li key={c.id} className="rounded-md border border-slate-800 p-3">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-sm text-slate-400">{c.slug} • {c.points} pts</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
