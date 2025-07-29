# Email Revert Instructions

## Quick Revert (Recommended Method)

To revert all email addresses back to `info@empowervb.com`, simply edit the file:

**`src/config/contact.js`**

Change these lines:
```javascript
email: 'empowervbclub@gmail.com', // Temporarily changed from info@empowervb.com
emailDisplay: 'empowervbclub@gmail.com', // Temporarily changed from info@empowervb.com
emailLink: 'mailto:empowervbclub@gmail.com', // Temporarily changed from mailto:info@empowervb.com
```

Back to:
```javascript
email: 'info@empowervb.com',
emailDisplay: 'info@empowervb.com', 
emailLink: 'mailto:info@empowervb.com',
```

Then run:
```bash
npm run build
git add .
git commit -m "revert: Change email back to info@empowervb.com"
git push origin main
```

## Manual Revert (If Needed)

If for some reason the config file approach doesn't work, you would need to manually change these files:

### API Functions:
- `functions/api/contact.js`
- `functions/api/coaching.js` 
- `functions/api/general.js`
- `functions/api/sponsorship.js`

### Frontend Pages:
- `src/components/layout/BaseLayout.astro`
- `src/components/forms/InterestForm.astro`
- `src/components/forms/SponsorshipForm.astro`
- `src/pages/contact.astro`
- `src/pages/coaching.astro`
- `src/pages/sponsorship.astro`
- `src/pages/sponsors.astro`
- `src/pages/thank-you.astro`
- `src/pages/thank-you-coaching.astro`
- `src/pages/thank-you-message.astro`
- `src/pages/thank-you-sponsorship.astro`

### News Articles:
- `src/content/news/2025-07-26-pre-registration-opens.md`
- `src/content/news/2025-08-01-official-launch.md`
- `src/content/news/2025-07-15-coaches-wanted.md`

But the config file method should handle everything automatically! 