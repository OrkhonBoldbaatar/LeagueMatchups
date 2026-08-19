# LeagueMatchups - The True Enterprise Master Plan

## Step 1: The "Walking Skeleton" (Infrastructure & CI/CD)
- **Init:** Setup pnpm monorepo, SvelteKit (frontend), NestJS (backend), and Turborepo. *(Done)*
- **Version Control:** Git init, GitHub push, and Shared folder linking. *(Done)*
- **Frontend Pipeline:** Deploy the empty SvelteKit frontend to Vercel to establish Continuous Deployment.
- **Backend Pipeline:** Deploy the empty NestJS backend to Render to establish Continuous Deployment.

## Step 2: The Mock API (Backend First)
- Create a mockup of the data (Ahri vs. Irelia stats and tips).
- Build the NestJS Controller and Service to serve that mock data.
- Write Jest Unit Tests to verify the endpoints work.
- Test the endpoints manually using Swagger UI.

## Step 3: Component-Driven UI (Storybook)
- Install and configure Storybook in the frontend.
- Build the UI components (Matchup Cards, Search Bar, Champion Select) completely in isolation.
- Ensure components look perfect before hooking them up to any data.

## Step 4: Frontend Integration
- Set up Environment Variables so the frontend knows how to talk to `localhost:3000` (for you) and the live `Render` URL (for the internet).
- Connect SvelteKit to the NestJS Mock API.
- Render the Storybook components on the actual pages using the mock data.

## Step 5: Database & User Accounts (The Real Deal)
- **Database:** Set up MongoDB and swap the mock data for real database queries.
- **Auth:** Build a JWT login system so users can create accounts.
- **Features:** Allow logged-in users to submit and upvote/downvote matchup tips.
- **Security:** Add the final production passwords (MongoDB URI, JWT Secrets) to the Vercel and Render dashboards.