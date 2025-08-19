# Deployment Guide - Asistente de Gestión de Bodega Cervecera

## Overview

This application is configured to deploy on Netlify with a PostgreSQL serverless database (beta). The setup includes:

- ⚡ **Frontend**: React + TypeScript + Vite
- 🗄️ **Database**: Netlify PostgreSQL (serverless)
- 🚀 **Functions**: Netlify Functions for API endpoints
- 🤖 **AI**: Google Gemini for chat assistance

## Prerequisites

1. **GitHub Account**: Your code should be pushed to a GitHub repository
2. **Netlify Account**: Create a free account at [netlify.com](https://netlify.com)
3. **Google Gemini API Key**: Get one from [Google AI Studio](https://ai.google.dev/)

## Deployment Steps

### 1. Prepare Your Repository

```bash
# Install dependencies
npm install

# Test the build locally
npm run build
```

### 2. Deploy to Netlify

1. **Connect Repository**:

   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub account and select this repository

2. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

### 3. Set Up PostgreSQL Database

1. **Enable Netlify Database** (Beta):

   - In your Netlify site dashboard, go to **"Databases"**
   - Click **"Create a new database"**
   - Select **PostgreSQL**
   - Choose a database name (e.g., `brewery-tanks`)
   - Copy the provided `DATABASE_URL`

2. **Database will be automatically initialized** with the tanks table and sample data on first deployment.

### 4. Configure Environment Variables

In your Netlify site dashboard:

1. Go to **Site settings** > **Environment variables**
2. Add these variables:

```
DATABASE_URL=postgresql://your_netlify_provided_url
API_KEY=your_google_gemini_api_key
```

**Important**:

- The `DATABASE_URL` will be provided by Netlify when you create the database
- Get your `API_KEY` from [Google AI Studio](https://ai.google.dev/)

### 5. Deploy

1. **Trigger Deploy**:

   - Push any change to your main branch, or
   - Go to **Deploys** tab and click **"Trigger deploy"**

2. **Monitor Deployment**:
   - Check the build logs for any errors
   - The functions will be automatically deployed to `/.netlify/functions/`

### 6. Verify Deployment

1. **Check Database Connection**:

   - Visit your deployed site
   - Tank data should load from the PostgreSQL database
   - If you see loading states or errors, check the function logs

2. **Test AI Chat**:
   - Open the chat assistant
   - Ask questions about the tanks
   - Verify responses are generated using current tank data

## File Structure

```
├── netlify/
│   └── functions/
│       ├── db.ts          # Database utilities and initialization
│       └── tanks.ts       # Tank CRUD API endpoints
├── services/
│   ├── tankService.ts     # Frontend API client
│   └── geminiService.ts   # AI chat service
├── components/
│   ├── TankGrid.tsx       # Updated to use API
│   └── ChatAssistant.tsx  # Updated to use real-time data
├── netlify.toml           # Netlify configuration
└── env.example            # Environment variables template
```

## API Endpoints

Once deployed, these endpoints will be available:

- `GET /.netlify/functions/tanks` - Get all tanks
- `POST /.netlify/functions/tanks` - Create new tank
- `PUT /.netlify/functions/tanks` - Update existing tank
- `DELETE /.netlify/functions/tanks?id=TANK_ID` - Delete tank

## Troubleshooting

### Database Issues

- Check that `DATABASE_URL` is correctly set in environment variables
- Verify the database was created successfully in Netlify dashboard
- Look at function logs for database connection errors

### API Issues

- Ensure functions are deploying correctly (check build logs)
- Verify CORS headers are working for your domain
- Check network requests in browser developer tools

### AI Chat Issues

- Verify `API_KEY` is set correctly
- Check Google Gemini API quotas and limits
- Monitor function logs for API call errors

## Local Development

For local development:

1. Copy `env.example` to `.env`
2. Fill in your database URL and API key
3. Run `npm run dev`

Note: You'll need to set up a local PostgreSQL instance or use the Netlify database URL for local development.

## Security Notes

- Environment variables are automatically encrypted by Netlify
- Database credentials are managed by Netlify
- API keys are never exposed to the frontend
- All API calls go through Netlify Functions for security

## Monitoring

Monitor your application through:

- **Netlify Dashboard**: Build status, function logs, analytics
- **Database Metrics**: Query performance and usage
- **Google AI Studio**: API usage and quotas

## Support

If you encounter issues:

1. Check the Netlify function logs
2. Verify all environment variables are set
3. Test API endpoints directly
4. Review the database connection in Netlify dashboard
