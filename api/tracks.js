// GET /api/tracks — Fetch available tracks (from DB or fallback)
const { supabase, json, handleCors } = require('./supabase');

const defaultTracks = [
  { name: 'Web Development', icon: '🌐', description: 'HTML, CSS, JavaScript, React. Build responsive sites and deploy them live.', tags: ['HTML/CSS', 'JavaScript', 'React'] },
  { name: 'Game Development', icon: '🎮', description: 'Build browser games with Canvas, Phaser, and JavaScript. Ship on itch.io.', tags: ['Canvas', 'Phaser.js', 'Game Design'] },
  { name: 'AI & Machine Learning', icon: '🤖', description: 'Train models, build chatbots, play with LLMs. Python + real datasets.', tags: ['Python', 'TensorFlow', 'LLMs'] },
  { name: 'UI/UX Design', icon: '🎨', description: 'Figma, design systems, user research. Make things that look and feel amazing.', tags: ['Figma', 'Prototyping', 'Design Systems'] },
];

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  if (req.method === 'OPTIONS') return;
  if (req.method !== 'GET') return json(res, { error: 'Method not allowed' }, 405);

  try {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .eq('is_active', true)
      .order('id');

    if (error || !data || data.length === 0) {
      return json(res, { tracks: defaultTracks });
    }

    return json(res, { tracks: data });
  } catch (err) {
    return json(res, { tracks: defaultTracks });
  }
};
