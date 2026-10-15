import Layout from '../layouts/DefaultLayout';
import Login from '@/components/Login';

export default function LoginPage() {
  return (
    <Layout>
      <div className="flex justify-center pt-10">
        <Login />
      </div>
    </Layout>
  );
}
