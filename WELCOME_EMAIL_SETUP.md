# Welcome Email Configuration Guide

## Overview
Your application is already configured to send welcome emails after user registration. The welcome email is triggered when a user verifies their email address.

## Current Configuration

### 1. Email Flow
1. User registers via `/api/customers` (MyAccountRegisterForm.tsx)
2. Payload CMS creates customer with `_verified: false`
3. Verification email is sent via `createTokenAndSendEmail` hook
4. When user clicks verification link, `_verified` is set to `true`
5. **Welcome email is automatically sent** via `sendWelcomeEmail` hook

### 2. Hook Configuration
Location: `src/collections/(ecommerce)/Customers/index.ts`

```typescript
hooks: {
  afterOperation: [createTokenAndSendEmail],  // Sends verification email
  afterChange: [sendWelcomeEmail],             // Sends welcome email after verification
}
```

### 3. Welcome Email Hook
Location: `src/collections/(ecommerce)/Customers/hooks/sendWelcomeEmail.ts`

The hook triggers when `_verified` changes from `false` to `true`:
```typescript
if (previousDoc._verified === false && doc._verified === true) {
  // Send welcome email
}
```

### 4. Email Template
- Template Component: `src/components/Emails/WelcomeEmail/variants/Default.tsx`
- Uses React Email components
- Includes logo, greeting, and call-to-action button
- Translations available in English, Chinese, and Croatian

### 5. Email Translations
Location: `translations/en.json`, `translations/zh.json`, `translations/hr.json`

```json
"Emails": {
  "welcome": {
    "greeting": "Hello {name},",
    "preview": "Welcome to our shop! We're glad to have you here",
    "subject": "Welcome to our store",
    "body": "Thank you for creating an account in our store. We hope you will enjoy your shopping experience.",
    "button": "Go shopping"
  }
}
```

## Required Configuration

### Option 1: Admin Panel Configuration (Recommended)
1. Log in to Payload Admin Panel
2. Navigate to **Shop settings** → **Email Messages**
3. Go to the **SMTP** tab
4. Fill in the following fields:
   - **Host**: Your SMTP server (e.g., smtp.gmail.com, smtp.sendgrid.net)
   - **Port**: SMTP port (usually 587 for TLS, 465 for SSL)
   - **Secure**: Check if using SSL/TLS
   - **User**: Your SMTP username/email
   - **Password**: Your SMTP password or app password
   - **From Email**: The email address that will appear as sender

### Option 2: Environment Variables (Fallback)
If SMTP is not configured in the admin panel, the system falls back to environment variables.

Create a `.env.local` file with:

```env
# SMTP Configuration (fallback if not set in admin)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
```

**Note**: For Gmail, you need to use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password.

## Testing the Welcome Email

### 1. Test Registration Flow
```bash
# Start the development server
pnpm dev

# Navigate to the registration page
# Fill out the form and submit
```

### 2. Check Console Logs
The welcome email hook logs responses. Check your server console for:
```
console.log(res);  // Email send response
console.log(error); // Any errors
```

### 3. Verify Email Sent
- Check the registered email inbox
- Look for subject: "Welcome to our store" (or translated version)
- Email should arrive after clicking the verification link

## Common SMTP Providers

### Gmail
```
Host: smtp.gmail.com
Port: 587
Secure: false (or 465 with secure: true)
User: your-email@gmail.com
Password: App-specific password (generate from Google Account settings)
```

### SendGrid
```
Host: smtp.sendgrid.net
Port: 587
Secure: false
User: apikey
Password: Your SendGrid API key
```

### Mailgun
```
Host: smtp.mailgun.org
Port: 587
Secure: false
User: Your Mailgun SMTP username
Password: Your Mailgun SMTP password
```

### Outlook/Office365
```
Host: smtp.office365.com
Port: 587
Secure: false
User: your-email@outlook.com
Password: Your password
```

## Troubleshooting

### Welcome Email Not Sending

1. **Check SMTP Configuration**
   - Verify credentials in Admin Panel or .env.local
   - Test with a simple email client

2. **Check Verification Status**
   - Welcome email only sends AFTER email verification
   - User must click the verification link first

3. **Check Server Logs**
   - Look for errors in console
   - Check nodemailer errors

4. **Verify Hook is Active**
   ```typescript
   // In src/collections/(ecommerce)/Customers/index.ts
   hooks: {
     afterChange: [sendWelcomeEmail], // Make sure this is present
   }
   ```

5. **Test Email Sending Directly**
   - Use the `sendEmail` utility function
   - Check `src/utilities/nodemailer.ts`

### Email Going to Spam
- Configure SPF, DKIM, and DMARC records for your domain
- Use a reputable SMTP provider (SendGrid, Mailgun, etc.)
- Ensure "From Email" matches your domain

### Email Template Not Rendering
- Check `src/globals/EmailMessages/config.ts` - template setting
- Verify logo is uploaded in Email Messages global
- Check React Email component in `src/components/Emails/WelcomeEmail/`

## Customization

### Modify Welcome Email Content
1. Edit translations in `translations/en.json` (and other languages)
2. Modify template in `src/components/Emails/WelcomeEmail/variants/Default.tsx`
3. Add custom fields or styling

### Change Email Template
1. Create new template variant in `src/components/Emails/WelcomeEmail/variants/`
2. Update switch statement in `src/components/Emails/WelcomeEmail/index.tsx`
3. Add option to Email Messages global config

### Disable Welcome Email
To disable welcome emails, remove the hook:
```typescript
// In src/collections/(ecommerce)/Customers/index.ts
hooks: {
  afterOperation: [createTokenAndSendEmail],
  // afterChange: [sendWelcomeEmail], // Comment out or remove
}
```

## Next Steps

1. ✅ Configure SMTP settings in Admin Panel or .env.local
2. ✅ Test registration with a real email address
3. ✅ Click verification link in verification email
4. ✅ Check inbox for welcome email
5. ✅ Monitor server logs for any errors
6. ✅ Customize email content/styling as needed

## Support
For issues with email delivery, check:
- SMTP provider documentation
- Server console logs
- Email provider's spam/junk folder
- Network/firewall settings blocking SMTP ports
