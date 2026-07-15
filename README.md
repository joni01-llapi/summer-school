# Digital Summer School — Full Stack App 🚀

**Stack:** HTML/CSS/JS frontend → Vercel serverless functions → Supabase

## 📁 Project Structure

```
summer-school/
├── api/                  # Vercel serverless functions
│   ├── supabase.js       # Shared Supabase client
│   ├── contact.js        # POST /api/contact
│   ├── register.js       # POST /api/register
│   ├── subscribe.js      # POST /api/subscribe
│   └── tracks.js         # GET /api/tracks
├── index.html            # Main page
├── styles.css            # Theme (blue & white)
├── script.js             # Frontend logic
├── api-client.js         # API fetch helpers
├── vercel.json           # Vercel config
├── package.json          # Dependencies
├── .env.example          # Environment variables template
└── node_modules/         # Dependencies (npm install)
```

## 🚀 Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — full stack summer school"
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

### 2. Import to Vercel

- Go to [vercel.com](https://vercel.com) → **Add New Project**
- Import your GitHub repo
- **Framework Preset:** Other
- **Root Directory:** `summer-school/`

### 3. Set Environment Variables

In Vercel Dashboard → **Settings → Environment Variables**, add:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | `https://xroulfuohqvlktqqdwhr.supabase.co` |
| `SUPABASE_ANON_KEY` | Your anon key from Supabase Settings → API |

Then **Deploy** ✅

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run locally with Vercel CLI
npx vercel dev
```

The app will be available at `http://localhost:3000`.

## 🗄️ Database Tables (Supabase)

SQL skriptin e gjen ne `supabase-schema.sql` ose ngjite direkt ne Supabase SQL Editor.
