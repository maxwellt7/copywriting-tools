# 🎯 Copywriting Mastery - Whop App

A professional AI-powered copywriting tool built for the Whop Apps Platform. Generate breakthrough advertising copy and compelling VSL scripts using AI models trained on legendary copywriting principles.

## Features

### 🛠️ AI-Powered Tools
- **Eugene Schwartz Pro**: Master copywriter for breakthrough advertising and sales copy
- **5-Minute VSL Script**: Generate compelling Video Sales Letter scripts optimized for conversions

### ⚡ Key Capabilities
- Real-time AI copy generation
- Customizable context (audience, product, tone, word count)
- Beautiful, modern UI with dark mode
- Mobile-responsive design
- Example prompts for quick start
- Copy-to-clipboard functionality

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Provider**: Poe API (OpenAI SDK)
- **Platform**: Whop Apps
- **Deployment**: Vercel

## Whop App Details

- **App ID**: `app_pvfSv9pFw8uGPQ`
- **Company ID**: `biz_0GmrZxDZsZLJvE`
- **Installation URL**: https://whop.com/apps/app_pvfSv9pFw8uGPQ/install/
- **Agent User**: `copywritingmasterys-agent` (`user_LKsqH69wbaCNT`)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager
- Poe API key
- Whop OAuth credentials

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
# Poe API
POE_API_KEY=your_poe_api_key

# Whop API
WHOP_API_KEY=your_whop_api_key

# Whop OAuth
NEXT_PUBLIC_WHOP_CLIENT_ID=app_pvfSv9pFw8uGPQ
WHOP_CLIENT_SECRET=your_whop_client_secret

# Whop App Details
NEXT_PUBLIC_WHOP_APP_ID=app_pvfSv9pFw8uGPQ
NEXT_PUBLIC_WHOP_COMPANY_ID=biz_0GmrZxDZsZLJvE

# Whop Agent User
NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_LKsqH69wbaCNT

# App URLs
NEXT_PUBLIC_APP_URL=https://copywriting-mastery-app.vercel.app
NEXT_PUBLIC_INSTALLATION_URL=https://whop.com/apps/app_pvfSv9pFw8uGPQ/install/
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
copywriting-mastery-app/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # AI generation endpoint
│   ├── tools/
│   │   └── [toolId]/
│   │       └── page.tsx           # Individual tool interface
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Dashboard/home page
│   └── globals.css                # Global styles
├── lib/
│   ├── constants.ts               # Shared constants
│   ├── poe-client.ts              # Poe API integration (server-only)
│   ├── whop-sdk.ts                # Whop SDK utilities (server-only)
│   └── types.ts                   # TypeScript types and tool definitions
├── .env.local                     # Environment variables (gitignored)
└── README.md                      # This file
```

## API Endpoints

### POST /api/generate
Generate copy using AI models.

**Request Body:**
```json
{
  "model": "EugeneSchwartzZPRO" | "5MVSLScript",
  "prompt": "Your prompt here",
  "context": {
    "audience": "optional target audience",
    "product": "optional product/service",
    "tone": "optional tone (professional, casual, etc.)",
    "wordCount": 500
  }
}
```

**Response:**
```json
{
  "success": true,
  "output": "Generated copy...",
  "metadata": {
    "userId": "user_id",
    "model": "EugeneSchwartzZPRO",
    "timestamp": "2025-10-21T..."
  }
}
```

## Whop Integration

### Authentication
The app uses Whop's authentication system via headers:
- `x-whop-user-id`: User ID
- `x-whop-username`: Username
- `x-whop-email`: User email

In development mode, test credentials are used automatically.

### Monetization
Recommended pricing model: **$29/month per seat**
- Access to all copywriting tools
- Unlimited generations
- Priority support

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

**Production URL**: https://copywriting-mastery-app.vercel.app

### Whop App Store

**Installation Link**: https://whop.com/apps/app_pvfSv9pFw8uGPQ/install/

## Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `POE_API_KEY` | Poe API key for AI generation | Yes |
| `WHOP_API_KEY` | Whop API key | Yes |
| `NEXT_PUBLIC_WHOP_CLIENT_ID` | Whop OAuth client ID | Yes |
| `WHOP_CLIENT_SECRET` | Whop OAuth client secret | Yes |
| `NEXT_PUBLIC_WHOP_APP_ID` | Whop App ID | Yes |
| `NEXT_PUBLIC_WHOP_COMPANY_ID` | Whop Company ID | Yes |
| `NEXT_PUBLIC_WHOP_AGENT_USER_ID` | Agent user ID for testing | Dev only |
| `NEXT_PUBLIC_APP_URL` | App URL (for production) | No |
| `NEXT_PUBLIC_INSTALLATION_URL` | Whop installation URL | No |

## Security

- ✅ API keys stored securely in environment variables (server-only)
- ✅ User authentication via Whop SDK
- ✅ Input validation using Zod
- ✅ `server-only` modules prevent client-side API exposure
- ✅ CORS configuration for Whop embedding

## Support

For issues or questions:
- GitHub: https://github.com/maxwellt7/copywriting-tools
- Whop Installation: https://whop.com/apps/app_pvfSv9pFw8uGPQ/install/

## License

Proprietary - All rights reserved

## Credits

Built for the Whop Apps Platform
- AI Models: Poe API (EugeneSchwartzZPRO, 5MVSLScript)
- Framework: Next.js by Vercel
- Styling: Tailwind CSS

---

Made with ❤️ for copywriters and marketers
