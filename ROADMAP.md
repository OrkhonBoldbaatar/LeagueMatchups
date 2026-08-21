# LeagueMatchups - The True Enterprise Master Plan

## Step 1: The Walking Skeleton (Infrastructure & CI/CD)
- **Init:** Setup pnpm monorepo, SvelteKit (frontend), NestJS (backend), and Turborepo. *(Done)*
- **Version Control:** Git init, GitHub push, and Shared folder linking. *(Done)*
- **Frontend Pipeline:** Deploy the empty SvelteKit frontend to Vercel.
- **Backend Pipeline:** Deploy the empty NestJS backend to Render.
- **CI Setup:** Configure GitHub Actions to run linters and test suites on every pull request.

## Step 1.5: Render Wake-up & Posture System (Permanent Utility)
- **Backend (Jest TDD):**
  - Write Jest unit tests in `app.controller.spec.ts` (mocking Discord webhook requests with spies). *(Next)*
  - Implement `app.service.ts` and `app.controller.ts` webhook endpoint to make tests pass. *(Done)*
- **Frontend (UI & Playwright Verification):**
  - Implement button in SvelteKit with `isLoading` disabled states and visual feedback. *(In Progress)*
  - Setup Playwright in the frontend workspace.
  - Write Playwright E2E test verifying the button locks, prevents spam-clicks, and recovers on response. (Test-After)

## Step 2: The Mock API (Backend Matchup Service)
- **Data Contract:** Define TypeScript types/DTOs for champion matchup data (e.g., Ahri vs. Irelia) in the shared package.
- **Backend (Jest TDD):**
  - Write Jest tests defining expected matchup endpoints, status codes, and payload structures.
  - Implement NestJS Matchup Controller & Service to serve data and satisfy the tests.
- **Verification:** Configure Swagger UI / OpenAPI docs and verify manually.

## Step 3: Component-Driven UI & Frontend Unit Testing
- **Storybook:** Install and configure Storybook for isolated component development.
- **UI Components:** Build Matchup Cards, Search Bar, and Champion Select components.
- **Frontend Unit Tests (Vitest TDD):** Write Vitest unit tests *before* writing client-side sorting, stat calculations, and filtering logic files.

## Step 4: Full-Stack Integration & E2E Testing
- **Environment Config:** Set up environment variables for local (`localhost:3000`) and production (Render).
- **Data Wiring:** Connect SvelteKit data loaders to the NestJS API.
- **Frontend E2E Tests (Playwright):** Write Playwright tests verifying the complete flow: searching a champion, loading the matchup card, and interacting with UI.

## Step 5: Database, Authentication & User Actions
- **Database:** Connect MongoDB with Mongoose/Prisma to replace mock data.
- **Auth (Jest TDD):**
  - Write Jest tests for JWT issuance, password hashing, and route protection.
  - Implement authentication controllers, guards, and services.
- **User Features (Jest TDD + Playwright UI):**
  - Jest tests & backend implementation for submitting tips and upvoting/downvoting.
  - SvelteKit UI components implementation (Test-After via Playwright).
- **Integration Tests (Playwright):** End-to-end tests for user registration, login, and tip submission.
- **Production Secrets:** Store MongoDB URI and JWT secrets in Vercel and Render dashboards.