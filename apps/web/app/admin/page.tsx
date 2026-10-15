import Layout from '../layouts/DefaultLayout';
import AdminPanel from '@/components/AdminPanel';

export default function AdminPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Admin Console</p>
          <h1 className="mt-2 text-3xl font-semibold">Manage challenges</h1>
        </div>
        <AdminPanel />
      </div>
    </Layout>
  );
}
