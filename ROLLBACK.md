# Rollback Guide: Pre-Multilingual Baseline

This repository has preserved the exact pre-multilingual state. All multilingual files and changes are isolated on branch `feature/i18n-multilingual`. The default English production branch `main` and a dedicated git tag `pre-i18n-baseline` remain identical to the pre-migration baseline (`ccfdc7a`).

---

## 1. Local Working Directory Rollback (Instant)

To immediately switch your local repository back to the pre-multilingual English website:

```bash
# Switch to main branch:
git checkout main

# Or switch directly to the tagged pre-i18n commit:
git checkout pre-i18n-baseline
```

To switch back to the multilingual feature branch at any time:

```bash
git checkout feature/i18n-multilingual
```

---

## 2. Production Deployment Rollback

If you ever need to overwrite production (`makecontactsheet.com`) with the pre-multilingual baseline:

```bash
# 1. Checkout baseline
git checkout pre-i18n-baseline

# 2. Build and deploy
npm run build
npm run deploy
```

---

## 3. Preview Deployment Information

The preview deployment was created using an isolated branch name (`preview`) on Cloudflare Pages:

- **Preview URL**: `https://preview.frameproof-4fw.pages.dev`
- **Unique Build Hash URL**: `https://3522643e.frameproof-4fw.pages.dev`
- **Robots Header**: Cloudflare Pages automatically sends `X-Robots-Tag: noindex, nofollow` on all preview URLs, preventing search engine indexing until you choose to merge and deploy to production.
- **Production Status**: Production (`makecontactsheet.com`) has **not** been modified or touched by the preview deployment.
