# GitHub Secrets Setup for CI/CD

The CI/CD pipeline requires GitHub Secrets to build successfully.

## Required Secrets

Go to: **https://github.com/jonthebeef/newcastle/settings/secrets/actions**

Click **"New repository secret"** and add each of these:

### 1. NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
```
Name: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
Value: [Copy from your .env.local file]
```
Get from: https://dashboard.clerk.com → Your App → API Keys

### 2. CLERK_SECRET_KEY
```
Name: CLERK_SECRET_KEY
Value: [Copy from your .env.local file]
```
Get from: https://dashboard.clerk.com → Your App → API Keys

### 3. STRIPE_SECRET_KEY
```
Name: STRIPE_SECRET_KEY
Value: [Copy from your .env.local file]
```
Get from: https://dashboard.stripe.com/test/apikeys

### 4. STRIPE_PRICE_ID
```
Name: STRIPE_PRICE_ID
Value: [Copy from your .env.local file]
```
Get from: https://dashboard.stripe.com/test/products

### 5. STRIPE_WEBHOOK_SECRET
```
Name: STRIPE_WEBHOOK_SECRET
Value: [Copy from your .env.local file]
```
Get from running: `stripe listen --forward-to localhost:4000/api/webhook/stripe`

## Why These Are Needed

The build step in the CI/CD pipeline needs to:
- Compile pages that use Clerk authentication (requires publishable key)
- Run the build process with proper environment configuration

Without these secrets, the build will fail with:
```
Error: @clerk/clerk-react: Missing publishableKey
```

## Security Note

⚠️ **IMPORTANT**: These are test/development keys.

**Before production deployment, you MUST:**
1. Rotate all these keys to production keys
2. Generate new webhook secrets
3. Update all GitHub Secrets with production values
4. Never commit real API keys to the repository

## After Adding Secrets

1. Go to the Actions tab: https://github.com/jonthebeef/newcastle/actions
2. Find the failed workflow run
3. Click "Re-run all jobs"
4. The build should now succeed ✅
