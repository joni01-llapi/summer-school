// POST /api/register — Register student
const { supabase, parseBody, json, handleCors } = require('./supabase');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  if (req.method !== 'POST') {
    return json(res, { error: 'Method not allowed' }, 405);
  }

  try {
    const body = await parseBody(req);

    // Validation
    if (!body.full_name?.trim()) return json(res, { error: 'Full name is required' }, 400);
    if (!body.email?.trim()) return json(res, { error: 'Email is required' }, 400);
    if (!body.track?.trim()) return json(res, { error: 'Track is required' }, 400);

    const { data, error } = await supabase.from('registrations').insert({
      full_name: body.full_name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      age: body.age ? parseInt(body.age) : null,
      track: body.track.trim(),
      offer_plan: body.offer_plan || 'Core',
      message: body.message?.trim() || null,
    });

    if (error) {
      // Check for duplicate email
      if (error.code === '23505') {
        return json(res, { error: 'This email is already registered!' }, 409);
      }
      console.error('Supabase insert error:', error);
      return json(res, { error: 'Database error' }, 500);
    }

    return json(res, { success: true, message: 'Registration successful!' });
  } catch (err) {
    console.error('Register API error:', err);
    return json(res, { error: 'Invalid request' }, 400);
  }
};
