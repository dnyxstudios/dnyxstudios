# SOP-004 — Webhook Endpoints for dnyxstudios.com

This document tells the site builder exactly which n8n webhooks to POST to, what filter strings n8n enforces, and what JSON body to send.

**Rule of thumb:** every webhook below is filtered on a specific `event` string immediately after the n8n trigger fires. Any POST that doesn't match its filter is dropped silently — no Attio write, no Notion log, no ClickUp task, no email. This is intentional: it prevents a misrouted request from running the wrong workflow.

All endpoints use the production n8n instance: `https://n8n.srv1617364.hstgr.cloud`.

---

## Production URL vs Test URL — what's the difference?

Every webhook in n8n has **two URLs**: a production URL and a test URL. Both URLs exist for every webhook listed below.

| URL type | When it fires | Where the request shows up | Use when |
|---|---|---|---|
| **Production** `/webhook/<path>` | Always, as long as the workflow is active | Runs the full workflow silently in the background; visible in n8n Executions tab | Live forms in production. This is what you POST to from dnyxstudios.com once everything is wired up. |
| **Test** `/webhook-test/<path>` | **Only after you click "Listen for test event"** in the n8n editor, and **only for the next ONE request**. Then it stops listening. | Streams the incoming payload into the n8n editor's visual canvas so you can step through every node with the real request data. | Developing or debugging the form. Lets you see exactly what JSON the site is sending, and inspect every node's output (Parse Fields, Build Attio Body, etc.) without polluting Attio/Notion/ClickUp with junk data. |

### How to use a test URL

1. Open the relevant workflow in the [n8n editor](https://n8n.srv1617364.hstgr.cloud/workflows).
2. Click on the Webhook node (always the first node).
3. Click **"Listen for test event"** at the bottom of the node panel. The button turns red and the webhook starts listening.
4. Submit the form on your site (or fire a `curl` POST) to the **test URL** below — not the production URL.
5. The n8n canvas lights up showing exactly what each node received and produced. You can re-run individual nodes from there to iterate.
6. The test URL stops listening after one request. To capture another, click "Listen for test event" again.

### Important: test URLs do NOT trigger the live workflow

A POST to `/webhook-test/sop004-qualification` does **not** write to Attio or Notion — even when the workflow is active. The request is captured purely for inspection in the editor. You must use the production URL `/webhook/sop004-qualification` to actually run the side-effects.

Use test URLs during development. Switch to production URLs once the form is wired up and ready to go live.

---

## Webhook 1 — Qualification Form Submission

Fires when a lead submits the qualification form (Full Name, Email, Budget).

| Spec | Value |
|---|---|
| Method | `POST` |
| Production URL | `https://n8n.srv1617364.hstgr.cloud/webhook/sop004-qualification` |
| Test URL | `https://n8n.srv1617364.hstgr.cloud/webhook-test/sop004-qualification` |
| Content-Type | `application/json` |
| n8n filter | `body.event === "qualification_form_submitted"` — anything else dropped |

### Request body — required keys (exact names, no aliases)

```json
{
  "event": "qualification_form_submitted",
  "full_name": "Jane Doe",
  "email": "jane@example.com",
  "budget": "$1,500-$3,000",
  "source": "instagram"
}
```

### Field rules

- **`event`** — must be the literal string `"qualification_form_submitted"`. Anything else and n8n drops the request.
- **`full_name`** — required, non-empty string.
- **`email`** — required, valid email format.
- **`budget`** — required. **MUST** be one of these exact strings (Attio rejects anything else with a 400):
  - `Less than $800`
  - `$800-$1,500`
  - `$1,500-$3,000`
  - `$3,000-$4,500`
  - `$4,500+`
- **`source`** — optional. Captured from the qualification page's URL parameter (e.g. `?source=instagram`). If missing or empty string, n8n defaults to `"Website"`. Suggested values: `website`, `instagram`, `manychat`, `tiktok`, `referral`, `paid-ads`.

### Frontend routing (your responsibility, not n8n's)

After the POST resolves, route the user based on the budget value:
- `budget === "Less than $800"` → redirect to `/not-a-fit`
- Any other budget → redirect to the Cal.com booking page

n8n does NOT send any redirect response. It just acknowledges the POST and writes to Attio + Notion in the background.

---

## Webhook 2 — Cal.com Booking

You do not need to do anything for this one. Cal.com sends it directly. Listed here for completeness so you don't accidentally double-post from the site.

| Spec | Value |
|---|---|
| Method | `POST` (sent by Cal.com) |
| Production URL | `https://n8n.srv1617364.hstgr.cloud/webhook/sop004-booking` |
| Test URL | `https://n8n.srv1617364.hstgr.cloud/webhook-test/sop004-booking` |
| Source | Cal.com webhook subscription |
| n8n filter | `body.triggerEvent === "BOOKING_CREATED"` |

---

## Webhook 3 — Pre-Call Brief Form Submission

Fires when a lead submits the pre-call brief form on the post-booking page (`/pre-call?email=...`).

| Spec | Value |
|---|---|
| Method | `POST` |
| Production URL | `https://n8n.srv1617364.hstgr.cloud/webhook/sop004-brief` |
| Test URL | `https://n8n.srv1617364.hstgr.cloud/webhook-test/sop004-brief` |
| Content-Type | `application/json` |
| n8n filter | `body.event === "precall_brief_submitted"` — anything else dropped |

### Request body — required keys (exact names)

```json
{
  "event": "precall_brief_submitted",
  "email_hidden": "jane@example.com",
  "email_fallback": "",
  "product_description": "We make B2B SaaS analytics for finance teams...",
  "video_goal": "Product Demo",
  "video_platform": "YouTube",
  "client_deadline": "2026-06-15",
  "reference_video": "https://youtube.com/watch?v=..."
}
```

### Field rules

- **`event`** — must be the literal string `"precall_brief_submitted"`.
- **`email_hidden`** — populated by the URL parameter from the post-booking redirect (`?email=...`). Pre-filled on page load, not visible to the user. Send empty string `""` if the URL param is missing — **never `null`**.
- **`email_fallback`** — the visible "Confirm your email" input. Show this field on the form **only when `email_hidden` is empty**. Send empty string `""` when not used.
- **`product_description`** — required, non-empty string.
- **`video_goal`** — dropdown. Send the option title as a plain string. (Confirm the dropdown option list with Danny before launch so it matches the ClickUp/Attio expected values exactly.)
- **`video_platform`** — dropdown. Send the option title as a plain string. (Same — confirm list with Danny.)
- **`client_deadline`** — optional. ISO date `YYYY-MM-DD`. Send empty string `""` if the user didn't provide one.
- **`reference_video`** — optional. Full URL. Send empty string `""` if not provided.

### Empty-string vs null

Always send `""` for optional empty fields, never `null`. Attio rejects `null` inside attribute arrays with a 400 error (see learning-v2.md rule 2).

---

## Testing the webhooks before launch

Two modes — pick based on what you're trying to verify.

### Mode A: Test URL (inspect payload, don't write data)

Use this while iterating on the form. The request shows up live in the n8n editor; nothing is written to Attio / Notion / ClickUp.

1. Open the workflow in the n8n editor.
2. Click the Webhook node → **"Listen for test event"**.
3. Fire the curl below (or submit the form) **within ~2 minutes** — that's roughly how long n8n listens before timing out.
4. Inspect every node's output in the editor.

```bash
# Qualification — TEST URL (inspect only, no writes)
curl -X POST https://n8n.srv1617364.hstgr.cloud/webhook-test/sop004-qualification \
  -H "Content-Type: application/json" \
  -d '{
    "event": "qualification_form_submitted",
    "full_name": "Test Lead",
    "email": "test@example.com",
    "budget": "$1,500-$3,000",
    "source": "test"
  }'

# Pre-call brief — TEST URL (inspect only, no writes)
curl -X POST https://n8n.srv1617364.hstgr.cloud/webhook-test/sop004-brief \
  -H "Content-Type: application/json" \
  -d '{
    "event": "precall_brief_submitted",
    "email_hidden": "test@example.com",
    "email_fallback": "",
    "product_description": "Test product description",
    "video_goal": "Drive Demos",
    "video_platform": "Website",
    "client_deadline": "2026-06-15",
    "reference_video": ""
  }'
```

If you haven't clicked "Listen for test event" first, the test URL returns `404` — that's the expected behaviour, not a bug.

### Mode B: Production URL (full end-to-end, writes real data)

Use this once the workflow is wired up and you want to confirm the side-effects (Attio record created, Notion row logged, ClickUp task created) actually happen. **Anything you POST here writes to live systems**, so use throwaway test emails like `sop004-test@dnyxstudios.com` and clean up after.

```bash
# Qualification — PRODUCTION URL (writes to Attio + Notion)
curl -X POST https://n8n.srv1617364.hstgr.cloud/webhook/sop004-qualification \
  -H "Content-Type: application/json" \
  -d '{
    "event": "qualification_form_submitted",
    "full_name": "Test Lead",
    "email": "test@example.com",
    "budget": "$1,500-$3,000",
    "source": "test"
  }'

# Pre-call brief — PRODUCTION URL (writes to Attio + ClickUp)
curl -X POST https://n8n.srv1617364.hstgr.cloud/webhook/sop004-brief \
  -H "Content-Type: application/json" \
  -d '{
    "event": "precall_brief_submitted",
    "email_hidden": "test@example.com",
    "email_fallback": "",
    "product_description": "Test product description",
    "video_goal": "Drive Demos",
    "video_platform": "Website",
    "client_deadline": "2026-06-15",
    "reference_video": ""
  }'
```

Successful response in both modes: HTTP 200 with `{"ok":true}`. The rest of the workflow runs asynchronously. Production runs are visible in the n8n **Executions** tab.

---

## What happens after each POST

| Webhook | Side effects in order |
|---|---|
| Qualification | (1) Upsert Attio contact by email — sets budget, lead_source, status (`New Lead` if qualified or `Lost` + `lost_reason=Budget Too Low` if under $800). (2) Log row to Notion form-fills database. |
| Cal.com Booking | (1) Upsert Attio by email — sets phone, booking_date, booking_time, status=`Call Booked`. (2) Schedule 3 reminder emails (24h / 1h / 15min before call). (3) 24h after booking, check if pre-call brief was submitted; if not, send a personalised chase email with a pre-filled form link. |
| Pre-call Brief | (1) Match Attio contact by `email_hidden` then `email_fallback`. (2) Mark `brief_received=true`. (3) Create Attio note titled "Pre-Call Brief" with the answers in markdown. (4) Create a ClickUp draft task in the pre-call list with all 5 custom fields populated. (5) If no email match, create a flagged Attio contact and Telegram-alert Danny for manual merging. |

---

## Contact

Questions about field names, payload shapes, or filter behaviour → ask Danny. Do not change the `event` strings or top-level body keys without coordinating — that breaks the n8n filters.
