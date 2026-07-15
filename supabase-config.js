// ═══════════════════════════════════════════════════════════════
// Supabase Config — Digital Summer School
// Replace KEY below with your actual anon key from Supabase
// ═══════════════════════════════════════════════════════════════

const SUPABASE_URL = 'https://xroulfuohqvlktqqdwhr.supabase.co/rest/v1';
const SUPABASE_ANON_KEY = 'sb_publishable_XoOoeGC2b6R38P5oz1FQUQ_X42pYOVF';

// ── Generic fetch helper ──
async function supabaseFetch(table, { method = 'POST', body } = {}) {
  const res = await fetch(`${SUPABASE_URL}/${table}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase error (${res.status}): ${err}`);
  }
  return true;
}

// ── Submit contact form ──
async function submitContact(data) {
  return supabaseFetch('contacts', {
    body: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      track_interest: data.track_interest || null,
      message: data.message
    }
  });
}

// ── Register student ──
async function submitRegistration(data) {
  return supabaseFetch('registrations', {
    body: {
      full_name: data.full_name,
      email: data.email,
      phone: data.phone || null,
      age: data.age ? parseInt(data.age) : null,
      track: data.track,
      offer_plan: data.offer_plan || 'Core',
      message: data.message || null
    }
  });
}

// ── Subscribe to newsletter ──
async function subscribeNewsletter(email, name) {
  return supabaseFetch('subscribers', {
    body: { email, name: name || null }
  });
}
