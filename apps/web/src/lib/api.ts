// Lightweight API helper to call the backend from the web app
export async function apiFetch(path: string, method = 'GET', body?: any, adminSecret?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (adminSecret) headers['x-admin-secret'] = adminSecret;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, { method, body: body ? JSON.stringify(body) : undefined, headers });
  return res.json();
}
