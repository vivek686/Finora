# Finora — Understand your money. Decide what's next.

This is a self-contained, single-file build of Finora — no build step, no install,
no server required.

## How to run it

Just open `finora.html` in any modern browser (double-click it, or drag it into a
browser window). Everything — the UI, the 8 analysis tools, the agent orchestrator,
and the demo dataset — is bundled into that one file, loading React/Babel/PapaParse
from public CDNs at runtime.

If your browser blocks local-file network requests, serve it instead:

```bash
npx serve .
# then open the printed http://localhost:... URL
```

The deterministic behavioral analysis can be tested without a build step with
`node tests/behavioral-insights.test.js` in an environment with Node.js.

## Try it

1. On the login screen, click **"✨ Autofill demo credentials"**, then **Sign in**.
   You'll land straight on a fully populated dashboard — no extra setup screen.
2. Go to **Ask Finora** and ask: *"Can I spend ₹5,000 this month?"*
   Watch the **Finora Activity** panel show which tools it selects and runs before
   it answers, grounded in your actual budget, obligations, and goal pace.
3. Back on the Dashboard, click **"Simulate surprise expense"** in the sidebar.
   A banner appears showing Finora re-evaluated your situation.
4. Ask the same question again — the answer is now different, because the
   underlying financial state changed. That's the core demo: continuous
   agentic re-evaluation, not a static tracker.

Other things to try from the sidebar: **Upload statement** (CSV import with
validation) and **Connect email** (a simulated inbox-sync — clearly labeled as
simulated, since it's a demo with no real OAuth backend).

## What's inside

- **8 deterministic analysis tools**: transaction analyzer, expense categorizer,
  recurring-payment detector, anomaly detector, budget analyzer, obligation
  analyzer, goal-progress calculator, spending-impact calculator
- **Behavioral spending insights**: measurable indicators for category and
  merchant concentration, small-purchase frequency, weekend share, and context
  coverage. These describe recorded behavior only; they do not infer emotions,
  intent, or mental state.
- **An agent orchestrator** that classifies intent from a free-text question,
  selects only the relevant tools, runs them, and reasons over the structured
  output to produce a grounded answer — every number comes from the tools, never
  invented
- **Demo-only auth** (any email/password works; the app is a local demo with no
  real backend) and a simulated email-sync integration, both clearly marked as
  simulated in the UI
- All financial state persists in your browser's local storage between visits
- Manual transactions and CSV imports may include an optional, 240-character
  factual context note. Context is kept in local browser storage and is used to
  explain pattern summaries; this demo has no backend and does not send it to
  an external AI service. Do not enter passwords, account numbers, or other
  sensitive personal details.

## Safety notes

Finora is decision-support software, not a financial advisor or investment
product. It does not give investment or stock recommendations, and phrases
projections as projections ("based on your recorded spending…"), never as
guarantees.

## Customized: start from zero

This build no longer auto-loads the demo dataset on login. Signing in now
shows a **"Set up your finances"** screen where **"Start from scratch"** is
the recommended, first option: enter your own income, budget, and (optional)
goal, then create a profile with **zero transactions**.

From there, use **"Add transaction"** in the sidebar to enter each transaction
by hand (date, description, merchant, amount, debit/credit) — one at a time,
or repeatedly via "Add & enter another". Uploading a CSV or the (simulated)
email sync are still available if you'd rather bring in a batch instead of
entering every line yourself.

The instant-demo-data and simulated-email options are still there for anyone
who wants to explore the app with sample data instead.
