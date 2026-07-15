// ═══════════════════════════════════════════════════════════════
// API Client — calls Vercel serverless functions
// ═══════════════════════════════════════════════════════════════

const API_BASE = '/api';

async function apiFetch(endpoint, body) {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

// ── Submit contact form ──
async function submitContact(data) {
  return apiFetch('contact', data);
}

// ── Register student ──
async function submitRegistration(data) {
  return apiFetch('register', data);
}

// ── Subscribe to newsletter ──
async function subscribeNewsletter(email, name) {
  return apiFetch('subscribe', { email, name });
}
