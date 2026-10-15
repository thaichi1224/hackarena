import Navbar from '@/components/Navbar';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Navbar />
        <main className="pt-6">{children}</main>
      </div>
    </div>
  );
}
