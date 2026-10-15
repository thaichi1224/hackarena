'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for a sign-in link');
    }
  };

  return (
    <div className="max-w-md rounded-xl border border-slate-800 p-6">
      <h2 className="text-xl font-semibold">Sign in</h2>
      <p className="mt-2 text-sm text-slate-400">Enter your email to sign in or register.</p>
      <div className="mt-4 flex gap-2">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 rounded-md bg-slate-900 px-3 py-2 text-white" />
        <button onClick={signIn} disabled={loading} className="rounded-md bg-cyan-600 px-3 py-2 text-white">{loading ? 'Sending...' : 'Send'}</button>
      </div>
    </div>
  );
}
