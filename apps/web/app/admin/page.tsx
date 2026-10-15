'use client';
import AdminPanel from '@/components/AdminPanel';
import Layout from '../layouts/DefaultLayout';

export default function AdminPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-semibold">Admin</h1>
      <p className="mt-4 text-sm text-slate-300">This area provides CRUD for challenges. Keep your admin secret safe.</p>
      <div className="mt-6">
        <AdminPanel />
      </div>
    </Layout>
  );
}
