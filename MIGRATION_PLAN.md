# Netlify → Vercel Migration Plan

Migrating `dnyxstudios.com` from Netlify to Vercel while keeping the domain.

**Estimated total time:** 60–90 minutes of active work, plus DNS propagation wait.
**Risk:** Low. The site is a static export with no backend, no Netlify Forms, no Netlify Functions — just HTML/CSS/JS pointed at an n8n webhook.

---

## Before you start — read this once

- **Do not delete anything in Netlify until Vercel is verified live.** Netlify stays as your instant rollback.
- The site is a **static export** (`next.config.ts` has `output: "export"`). Vercel handles this fine. You can optionally switch to native Next.js after the migration to unlock SSR/ISR/image optimization, but **don't do that during the migration** — one change at a time.
- You'll need accounts/access to:
  - Netlify (current host)
  - Your domain registrar (whoever you bought `dnyxstudios.com` from — GoDaddy, Namecheap, Cloudflare, Porkbun, etc.)
  - GitHub (where the repo lives)
  - Vercel (sign up at vercel.com if you haven't — use GitHub login for easiest repo import)

---

## Phase 1 — Prep (do this the day before, ~15 min)

- [ ] **1.1** Confirm the repo is pushed to GitHub and `main` is up to date.
- [ ] **1.2** Log into Netlify. Go to **Site configuration → Environment variables**. Copy the values of these three vars somewhere safe (password manager, not a plain text file):
  - `NEXT_PUBLIC_N8N_WEBHOOK_URL`
  - `NEXT_PUBLIC_POSTHOG_KEY`
  - `NEXT_PUBLIC_POSTHOG_HOST`

  (These are the only env vars the site uses, per `.env.local`.)
- [ ] **1.3** Log into Netlify → **Domains** tab. Note which of these you have:
  - **Type A:** "Netlify DNS" is shown as the DNS provider. The domain's nameservers at your registrar point to `dns1.p0X.nsone.net` (or similar).
  - **Type B:** "External DNS" — DNS is managed at your registrar with `A`/`CNAME` records pointing to Netlify.

  Write down which type. The steps in Phase 4 depend on this.
- [ ] **1.4** Log into your domain registrar. Find the DNS panel for `dnyxstudios.com`. **Lower the TTL** on the apex record and the `www` record to **300 seconds (5 min)**. Save. This means when you flip DNS tomorrow, propagation takes minutes instead of hours.
- [ ] **1.5** If `dnyxstudios.com` receives email (e.g. `danny@dnyxstudios.com`), note the `MX`, `TXT` (SPF), and any `DKIM`/`DMARC` records. Screenshot the full DNS panel. You'll need these to survive the move.

---

## Phase 2 — Set up Vercel project (~20 min)

- [ ] **2.1** Go to **vercel.com → Add New → Project**.
- [ ] **2.2** Click **Import Git Repository**, authorize GitHub if prompted, and select the `dnyxstudios` website repo.
- [ ] **2.3** On the configure screen:
  - **Framework Preset:** Next.js (should auto-detect)
  - **Root Directory:** leave as `./`
  - **Build Command:** leave default (`next build`)
  - **Output Directory:** leave default (Vercel detects `output: "export"` and handles it)
  - **Install Command:** leave default
- [ ] **2.4** Expand **Environment Variables** and add all three from step 1.2:

  | Name | Value | Environments |
  |---|---|---|
  | `NEXT_PUBLIC_N8N_WEBHOOK_URL` | (from Netlify) | Production, Preview, Development |
  | `NEXT_PUBLIC_POSTHOG_KEY` | (from Netlify) | Production, Preview, Development |
  | `NEXT_PUBLIC_POSTHOG_HOST` | (from Netlify) | Production, Preview, Development |
- [ ] **2.5** Click **Deploy**. Wait ~2 min for the first build.
- [ ] **2.6** When it finishes, you'll get a URL like `dnyxstudios-website-abc123.vercel.app`. Open it.

---

## Phase 3 — Verify on the Vercel URL (~10 min)

**Don't skip this.** If something's broken, fix it before touching DNS.

- [ ] **3.1** Open the `*.vercel.app` URL in an incognito window.
- [ ] **3.2** Click through every page: home, services, portfolio, contact, not-a-fit, apply modal.
- [ ] **3.3** Submit the contact form with a test entry. Confirm the submission lands wherever n8n routes it.
- [ ] **3.4** Open the apply modal, submit a test application. Confirm it lands.
- [ ] **3.5** In PostHog, confirm pageview/event capture is working from the new domain.
- [ ] **3.6** Check the browser console — no red errors, especially nothing about missing env vars or CORS.

**If anything is broken:** stop here. 99% of the time it's a typo'd env var, or a hardcoded reference to the Netlify URL somewhere in the code. Fix and redeploy before continuing.

---

## Phase 4 — Add the custom domain in Vercel (~5 min)

- [ ] **4.1** Vercel → your project → **Settings → Domains**.
- [ ] **4.2** Add `dnyxstudios.com`. When asked "Redirect to?", choose **No redirect** (you want apex as the primary).
- [ ] **4.3** Add `www.dnyxstudios.com`. Choose **Redirect to `dnyxstudios.com`**.
- [ ] **4.4** Vercel will now show "Invalid Configuration" with the DNS records it needs. Screenshot or copy these — they'll look like:
  - For apex `dnyxstudios.com`: `A` record → `76.76.21.21` (Vercel's anycast IP)
  - For `www`: `CNAME` → `cname.vercel-dns.com`

  Keep this tab open. You'll need these values in Phase 5.

---

## Phase 5 — Switch DNS (~15 min, then wait)

**Do this when you're ready to cut over.** Once DNS flips, traffic starts going to Vercel.

### If you're Type A (Netlify DNS)

- [ ] **5.1a** At your registrar, change the nameservers for `dnyxstudios.com` away from Netlify. Two sub-options:
  - **Easy path:** Use Vercel's nameservers. In Vercel → Domains, click **Nameservers** to see them (usually `ns1.vercel-dns.com` / `ns2.vercel-dns.com`). Set those at your registrar. Vercel will auto-create the A and CNAME records.
  - **Manual path:** Use your registrar's default nameservers, then go into their DNS panel and add the `A` and `CNAME` records from step 4.4 yourself. **Also re-create the MX/SPF/DKIM records from step 1.5** or email will break.
- [ ] **5.2a** Nameserver changes take 1–6 hours to propagate.

### If you're Type B (External DNS)

- [ ] **5.1b** At your registrar's DNS panel:
  - Find the existing apex `A` record (pointing to Netlify) and **change it** to point to Vercel's IP from step 4.4. Don't delete and re-add — edit in place to avoid downtime windows.
  - Find the `www` `CNAME` (pointing to a `*.netlify.app`) and **change it** to `cname.vercel-dns.com`.
  - Leave MX, TXT, and all other records alone.
- [ ] **5.2b** With TTL at 300s, this propagates in ~5–15 min.

### Both paths

- [ ] **5.3** Verify propagation. In a terminal:
  ```
  dig dnyxstudios.com +short
  dig www.dnyxstudios.com +short
  ```
  The apex should return `76.76.21.21` (or whatever Vercel told you). `www` should return a Vercel CNAME chain.
- [ ] **5.4** Go back to Vercel → Domains. Both rows should turn green with "Valid Configuration" and SSL "Issued." This can take an extra 5–10 min after DNS resolves while Let's Encrypt provisions the cert.

---

## Phase 6 — Final verification (~10 min)

- [ ] **6.1** Open `https://dnyxstudios.com` in a fresh incognito window. Should load over HTTPS with a valid cert.
- [ ] **6.2** Open `https://www.dnyxstudios.com`. Should 308-redirect to `https://dnyxstudios.com`.
- [ ] **6.3** Repeat the smoke test from Phase 3 (every page, both forms, PostHog events) — this time on the real domain.
- [ ] **6.4** Open https://www.ssllabs.com/ssltest/ and run it against `dnyxstudios.com`. Should grade A or A+.
- [ ] **6.5** If email is on this domain, send yourself a test email to `danny@dnyxstudios.com`. Confirm it arrives.

**If everything passes:** you're live on Vercel. The migration is done from a traffic standpoint.

---

## Phase 7 — Cleanup (wait 48 hours, then ~10 min)

Wait two full days of confirmed Vercel traffic before doing this. Gives you a safety net.

- [ ] **7.1** In the repo, delete `netlify.toml` and commit:
  ```
  git rm netlify.toml
  git commit -m "Remove Netlify config after migration to Vercel"
  git push
  ```
- [ ] **7.2** Vercel will auto-rebuild on push. Verify the site still works.
- [ ] **7.3** Netlify → Site settings → **Build & deploy → Stop builds**. (Don't delete the site yet — keep it as a frozen rollback for another week or two.)
- [ ] **7.4** After 2–3 weeks of zero issues, Netlify → **Site settings → General → Delete site**.
- [ ] **7.5** At your registrar, raise TTL on the apex/www records back up to 3600s (1 hour) or higher to reduce DNS query cost.

---

## Rollback (if Phase 6 fails badly)

If the site is broken on the real domain after DNS flips and you can't fix it fast:

- **Type B (External DNS):** at your registrar, change the apex `A` and `www` `CNAME` back to the original Netlify values you screenshotted in Phase 1. Propagation: ~5 min with the lowered TTL.
- **Type A (Netlify DNS):** point nameservers back to Netlify's. Slower (~1–6 hours), so Type B is more recoverable.

Netlify is still building from `main` and still has the env vars (you didn't touch them), so it'll serve traffic again the moment DNS points back.

---

## Optional follow-up (after migration is solid)

The site currently uses `output: "export"` (static HTML). On Vercel this works but you're not using Vercel's strengths. Once the migration has been stable for a week, consider:

- [ ] Remove `output: "export"` and `trailingSlash: true` from `next.config.ts`.
- [ ] This unlocks: server components, ISR, the `next/image` component with automatic optimization, API routes (so you could move the n8n webhook call server-side and stop exposing it as `NEXT_PUBLIC_`), middleware, etc.
- [ ] Test thoroughly on a Vercel preview deploy before merging — removing static export changes how the site is served.

---

## Reference: what's NOT changing

- The repo location (still GitHub).
- The domain registrar (still wherever you bought it).
- The form backend (still n8n).
- PostHog (still PostHog, still capturing).
- Email (still wherever you have it, *as long as you preserved MX/SPF records*).

What's changing is just **where the static HTML is served from**.
