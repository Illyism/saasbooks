# SaaSBooks

> Accounting & Financial Insights for SaaS Businesses powered by Stripe and Mercury

[![Stars](https://img.shields.io/github/stars/illyism/saasbooks?style=social)](https://github.com/illyism/saasbooks)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## What It Does

SaaSBooks connects directly to your Stripe and Mercury accounts to:

- **Import and categorize** transactions automatically
- **Calculate SaaS metrics** like MRR, customer acquisition cost, and burn rate
- **Generate visualizations** that show your business health at a glance
- **Prepare exports** for your accountant or tax software
- **Store everything locally** as simple JSON files you can version control

## Setup

### 1. Local Development

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env

# Push database schema
bunx prisma db push

# Start development server
bun dev
```

### 2. Google Drive Integration

SaaSBooks uses Google Drive to store your uploaded files (invoices, receipts, CSV exports). Here's how to set it up:

1. **Create a Google Cloud Project**

   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the [Google Drive API](https://console.cloud.google.com/marketplace/product/google/drive.googleapis.com) for your project

2. **Create OAuth Credentials**

   - Go to "[Credentials](https://console.cloud.google.com/auth/overview)" in API & Services
   - Click **"Create OAuth client"**
   - Choose **"Web application"**
   - Add Authorized JavaScript origins:
     - Development: `http://localhost:3000`
     - Production: `https://saasbooks.org`
   - Add authorized redirect URI:
     - Development: `http://localhost:3000/auth/google/callback`
     - Production: `https://saasbooks.org/auth/google/callback`
   - Save your Client ID and Client Secret
   - Go to "[Scopes](https://console.cloud.google.com/auth/scopes)" in API & Services
   - Click "ADD OR REMOVE SCOPES"
   - Add the following scopes:
     - `https://www.googleapis.com/auth/drive.file` (Allows access to files and folders created by the app)

3. **Update Environment Variables**

```bash
# In your .env file
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:3000/auth/google/callback"
```

When users connect their Google Drive:

1. They'll be prompted to sign in with Google
2. They'll need to authorize the app
3. A dedicated folder will be created in their Drive
4. All uploads will be stored in this folder

## Why Open Source?

SaaSBooks is 100% free and open source. We believe financial tools should be:

1. **Transparent** - You should know exactly how your financial data is processed
2. **Customizable** - Every SaaS business has unique needs
3. **Accessible** - Financial clarity should be available to all SaaS businesses, not just those who can afford $300/month tools

## Supporting SaaSBooks

This project is sponsored by the community. If you find it valuable:

- **GitHub Sponsors** - Support ongoing development
- **Share with other founders** - Help us grow
- **Contribute code or documentation** - PRs welcome!

## Help Improve Our Data Categorization

We need anonymized Stripe/Mercury exports to improve our auto-categorization system. [Learn how to contribute data safely](https://github.com/Illyism/saasbooks/issues/1).

## Need More Advanced Accounting?

SaaSBooks focuses on financial clarity for founders, not comprehensive accounting.

When you're ready for formal accounting software, we recommend:

- [QuickBooks Online](https://go.il.ly/quickbooks) - Best for US-based businesses
- [Xero](https://go.il.ly/xero) - Great international support

_Note: These are affiliate links that help support SaaSBooks development._

## License

MIT License

[SaaSBooks](https://saasbooks.org) is released under the MIT License, which is a permissive open source license that allows you to:

- Use the software for any purpose
- Modify the software as needed
- Distribute the software and your modifications
- Use the software commercially

The only requirement is that you include the original copyright notice and license disclaimer in any copy of the software or substantial portion of it.

See the [LICENSE](LICENSE) file for the full legal text.
