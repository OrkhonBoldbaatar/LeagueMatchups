# The Master Plan

## Step 1: Infrastructure
- **Git Task:** Push local monorepo to GitHub via IDE.
- **DevOps Task:** Deploy frontend to Vercel.
- **Doc Task:** Write the Root `README.md` (Architecture & Schema).

## Step 2: The Mock API (Backend + Shared)
- **Test Task (TDD):** Write a Jest test for a mock endpoint.
- **Code Task:** Create the shared type and NestJS endpoint to pass the test.
- **Doc Task:** Implement Swagger for the backend API documentation.

## Step 3: The UI Components (Frontend Isolation)
- **Doc Task:** Install and configure Storybook.
- **Test Task (TDD):** Write Vitest tests for your UI components.
- **Code Task:** Build the Svelte components in Storybook until they pass the tests.

## Step 4: The UI Integration (Frontend Assembly)
- **Code Task:** Assemble the Storybook components onto the actual SvelteKit pages and fetch the backend mock data.
- **Test Task:** Write a Playwright End-to-End test to simulate a user navigating the site.

## Step 5: The Database
- **Database Task:** Set up MongoDB and swap the mock data in the backend for real database queries.