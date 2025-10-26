# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Security Features

This application implements multiple layers of security:

### 1. Authentication & Authorization
- ✅ Clerk-based authentication (industry standard)
- ✅ Server-side session validation
- ✅ Protected API routes with auth checks
- ✅ Route-level middleware protection

### 2. API Security
- ✅ Stripe webhook signature verification
- ✅ Environment variable isolation
- ✅ No client-side secret exposure
- ✅ Security headers (CSP, HSTS, etc.)

### 3. Data Protection
- ✅ No database (reduced attack surface)
- ✅ Clerk metadata for user state
- ✅ HTTPS enforcement in production
- ✅ Secure cookie handling

### 4. CI/CD Security
- ✅ Automated secret scanning (TruffleHog, GitLeaks)
- ✅ Dependency vulnerability scanning
- ✅ Static code analysis (Semgrep, ESLint)
- ✅ Build-time secret detection

## Known Security Considerations

### ⚠️ Mock Activation Endpoint
**File:** `app/api/mock/activate/route.ts`

This endpoint is for **DEVELOPMENT ONLY** and allows authenticated users to bypass payment.

**Action Required Before Production:**
```bash
# Delete or disable this endpoint:
rm app/api/mock/activate/route.ts

# Or add environment check:
if (process.env.NODE_ENV === 'production') {
  return NextResponse.json({ error: 'Not available' }, { status: 404 })
}
```

### Rate Limiting
Currently not implemented. For production, add rate limiting:

```bash
npm install @upstash/ratelimit @upstash/redis
```

### Input Validation
No validation library is currently used. Consider adding:

```bash
npm install zod
```

## Reporting a Vulnerability

**DO NOT** open public issues for security vulnerabilities.

Instead, please email security concerns to: [your-email@example.com]

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

**Response Time:**
- Initial response: Within 48 hours
- Status update: Within 7 days
- Fix timeline: Depends on severity

## Security Best Practices

### For Developers

1. **Never commit `.env.local`**
   ```bash
   # Verify it's in .gitignore:
   cat .gitignore | grep ".env"
   ```

2. **Rotate secrets regularly**
   - Clerk keys: Every 90 days
   - Stripe keys: After any suspected exposure

3. **Use GitHub Secrets for CI/CD**
   ```bash
   # Set in: Repository Settings → Secrets → Actions
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   CLERK_SECRET_KEY
   STRIPE_SECRET_KEY
   STRIPE_PRICE_ID
   STRIPE_WEBHOOK_SECRET
   ```

4. **Review dependencies**
   ```bash
   npm audit
   npm outdated
   ```

### For Deployments

1. **Environment Variables**
   - Use your hosting platform's secret management
   - Never hardcode secrets in code
   - Use different keys for dev/staging/production

2. **HTTPS Only**
   - Enforce HTTPS redirects
   - Enable HSTS headers (already configured)

3. **Monitoring**
   - Enable Stripe webhook monitoring
   - Set up Clerk security alerts
   - Monitor failed authentication attempts

4. **Remove Development Features**
   - Delete `/api/mock/activate`
   - Disable verbose error logging
   - Remove source maps in production

## Security Headers

The following security headers are automatically applied (see `next.config.js`):

- **HSTS:** Force HTTPS for 2 years
- **X-Frame-Options:** Prevent clickjacking
- **CSP:** Restrict resource loading
- **X-Content-Type-Options:** Prevent MIME sniffing
- **Referrer-Policy:** Control referer information
- **Permissions-Policy:** Disable unnecessary browser features

## Dependency Security

### Automated Scanning
- npm audit runs on every push
- OWASP Dependency Check (daily)
- Semgrep security rules

### Manual Review
```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Check outdated packages
npm outdated
```

## Compliance

### OWASP Top 10 Coverage

| Risk | Status | Mitigation |
|------|--------|------------|
| A01: Broken Access Control | ✅ | Clerk middleware + auth checks |
| A02: Cryptographic Failures | ✅ | TLS, secure env vars |
| A03: Injection | ✅ | No SQL, API validation |
| A04: Insecure Design | ⚠️ | Mock endpoint needs removal |
| A05: Security Misconfiguration | ✅ | Security headers, CSP |
| A06: Vulnerable Components | ✅ | Automated scanning |
| A07: Auth Failures | ✅ | Clerk handles auth |
| A08: Data Integrity | ✅ | Webhook signatures |
| A09: Logging Failures | ⚠️ | Needs production monitoring |
| A10: SSRF | ✅ | No external requests |

## Contact

For security questions or concerns:
- Email: [your-security-email@example.com]
- GitHub: [@jonthebeef](https://github.com/jonthebeef)

Last updated: 2025-10-26
