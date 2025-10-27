# LAPP Framework Demo

A minimal, local-first web app demonstrating the **LAPP framework**: **Landing Page, Authentication, Payments, then Product**.

Built with Next.js 14, Clerk, and Stripe - runs entirely on localhost:4000.

## Features

- 🏠 **Landing Page** - Clear value proposition with call-to-action
- 🔐 **Authentication** - Powered by Clerk with user metadata
- 💳 **Payments** - Stripe Checkout with subscription mode
- 🚀 **Product** - Protected dashboard for paid users
- 💾 **No Database** - Paid status persists via Clerk metadata
- 🔒 **Local-First** - Runs completely on localhost

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Clerk Authentication
- Stripe Payments (test mode)

## Prerequisites

- Node.js 18+ installed
- Stripe CLI installed ([installation guide](https://stripe.com/docs/stripe-cli))
- Clerk account (free tier works)
- Stripe account (test mode)

## Quick Start

### 1. Environment Setup

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Fill in your keys in `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

**Getting your keys:**

- **Clerk keys**: Sign up at [clerk.com](https://clerk.com) → Create application → Copy keys from dashboard
- **Stripe secret key**: Sign up at [stripe.com](https://stripe.com) → Developers → API keys
- **Stripe price ID**: Stripe Dashboard → Products → Create product (£10/month) → Copy price ID
- **Stripe webhook secret**: Generated in step 4 below

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Dev Server (Port 3001)

```bash
npm run dev -- -p 3001
```

The app will be available at [http://localhost:3001](http://localhost:3001)

### 4. Start Stripe Webhook Listener

In a **new terminal window**:

```bash
stripe listen --forward-to localhost:3001/api/webhook/stripe
```

Copy the webhook signing secret (`whsec_...`) and add it to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Restart the dev server** after adding the webhook secret.

### 5. Test the Flow

1. Visit [http://localhost:3001](http://localhost:3001)
2. Click **"Get Started - Sign In"** and create an account (or sign in)
3. Click **"Upgrade to Pro"**
4. Click **"Upgrade Now"** button
5. Use test card: `4242 4242 4242 4242` (any future date, any CVC)
6. Complete payment
7. You'll be redirected to `/success`
8. The webhook should automatically activate your account (check the Stripe CLI terminal)
9. Click **"Go to Dashboard"** to access the protected product area

**If the webhook hasn't fired yet:** Click the **"Activate Access"** button on the success page as a manual fallback.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── checkout/route.ts       # Creates Stripe Checkout session (returns JSON)
│   │   ├── webhook/stripe/route.ts # Handles Stripe webhooks
│   │   └── mock/activate/route.ts  # Manual activation fallback
│   ├── dashboard/page.tsx          # Protected product area (paid users only)
│   ├── upgrade/page.tsx            # Pricing page with Stripe Checkout
│   ├── success/page.tsx            # Post-payment success page
│   ├── layout.tsx                  # Root layout with ClerkProvider
│   ├── page.tsx                    # Landing page
│   └── globals.css                 # Tailwind styles
├── components/
│   ├── UpgradeButton.tsx           # Client component for Stripe Checkout
│   └── ActivateButton.tsx          # Client component for manual activation
├── lib/
│   └── clerk-helpers.ts            # Clerk metadata utilities
├── middleware.ts                   # Route protection with Clerk
└── .env.local.example              # Environment variables template
```

## How It Works

### Authentication Flow

1. Users sign in via Clerk (modal or dedicated pages)
2. Clerk manages sessions and user state
3. Protected routes check authentication via middleware

### Payment Flow

1. Authenticated users visit `/upgrade`
2. Click "Upgrade Now" → Client component calls `/api/checkout`
3. API returns JSON with Checkout session URL
4. Client redirects to Stripe Checkout
5. User completes payment with test card
6. Stripe redirects to `/success`
7. Webhook fires → `/api/webhook/stripe` marks user as paid in Clerk metadata
8. User can access `/dashboard`

### Paid Status Persistence

- **No database required** - paid status stored in Clerk's `publicMetadata`
- `markUserAsPaid(userId)` updates Clerk metadata
- `isUserPaid(userId)` checks Clerk metadata
- Persists across server restarts and all contexts

### Manual Activation Fallback

If the Stripe webhook hasn't fired yet (rare in production, common in local dev):

1. User lands on `/success` page
2. Clicks **"Activate Access"** button
3. Calls `/api/mock/activate` to manually mark user as paid
4. Redirects to `/dashboard`

## Routes & Access Control

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page with sign-in CTA |
| `/upgrade` | Auth required | Pricing page for unpaid users |
| `/dashboard` | Auth + paid required | Protected product area |
| `/success` | Auth required | Post-payment confirmation |

## Important Notes

### Port 3001

This app **must** run on port 3001 (not the default 3000) to match the environment configuration and webhook setup.

### Stripe Test Mode

Always use test mode credentials. Test card numbers:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Any future expiry date and any CVC

### Webhook Requirement

The Stripe webhook listener (`stripe listen`) **must** be running for automatic payment activation. Without it, users need to click the manual "Activate Access" button.

### Clerk Metadata

Paid status is stored in Clerk's `publicMetadata.isPaid`. This persists across:

- Server restarts
- Multiple server instances
- Development and production
- All authentication contexts

## Troubleshooting

### Blank screen after clicking "Upgrade Now"

✅ **Fixed**: The API route returns JSON and the client component handles the redirect.

### Paid status doesn't persist

✅ **Fixed**: Using Clerk metadata instead of in-memory storage.

### Webhook not working

- Ensure `stripe listen` is running
- Check that `STRIPE_WEBHOOK_SECRET` is set in `.env.local`
- Restart the dev server after adding the secret
- Use the manual "Activate Access" button as fallback

### Can't access dashboard after payment

1. Check the Stripe CLI terminal for webhook events
2. Verify `STRIPE_WEBHOOK_SECRET` is correct
3. Click "Activate Access" on the success page
4. Check browser console for errors

## Development

```bash
# Start dev server on port 3001
npm run dev -- -p 3001

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## License

MIT

---

**🧠 This is a demo application for learning the LAPP framework. Not intended for production use without proper security review and enhancements.**

Built with comprehensive security CI/CD pipeline including secret scanning, dependency checks, and license compliance. All changes are automatically validated before merging.

