# LeagueMatchups Dev Notes

## Step 1: Monorepo Initialization

```powershell
mkdir LeagueMatchups
cd LeagueMatchups
pnpm init
New-Item -ItemType File -Name "pnpm-workspace.yaml"
```

**pnpm-workspace.yaml contents:**
```yaml
packages:
  - "frontend"
  - "backend"
  - "shared"
```

## Step 2: App Generation & Turborepo Setup

```powershell
pnpm dlx @nestjs/cli new backend --package-manager pnpm
pnpm create svelte@latest frontend

pnpm add turbo -w -D
pnpm approve-builds
pnpm install
```

**turbo.json contents (Create in root):**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".svelte-kit/**"]
    }
  }
}
```

**package.json Updates:**
* Change `backend/package.json` start:dev script to: `"dev": "nest start --watch"`
* Update Master `package.json` scripts:
```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build"
  }
}
```

## Step 3: Git Setup & Initial Push

```powershell
New-Item -ItemType File -Name ".gitignore"
```

**.gitignore contents (Root):**
```text
node_modules
.env
.turbo
.idea/
```

```powershell
git init
Remove-Item -Recurse -Force backend\.git -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force frontend\.git -ErrorAction SilentlyContinue

git add .
git commit -m "Initial setup: Svelte, NestJS, and Turborepo"

git remote add origin [https://github.com/YOUR_USERNAME/league-matchups.git](https://github.com/YOUR_USERNAME/league-matchups.git)
git branch -M main
git push -u origin main
```

## Step 4: Shared Folder Integration

```powershell
git fetch origin
git checkout 4-make-shared-folder
```

**shared/package.json contents:**
```json
{
  "name": "@leaguematchups/shared",
  "version": "1.0.0",
  "main": "index.ts",
  "types": "index.ts"
}
```

**shared/index.ts contents:**
```typescript
export const IS_SHARED_WORKING = "Hello from the shared folder!";
```

**Workspace Linking:**
* `frontend/package.json`: Add `"@leaguematchups/shared": "workspace:*"`
* `backend/package.json`: Add `"@leaguematchups/shared": "workspace:*"`
* Run `pnpm install`

**Test & Commit:**
```powershell
// Test in backend/src/app.service.ts by importing IS_SHARED_WORKING
git checkout -b setup/shared-module-integration
git add .
git commit -m "Link shared folder and test in backend"
git push -u origin setup/shared-module-integration

// After GitHub merge:
git checkout main
git pull
```

## Step 5: System Architecture & Database Design

```powershell
git fetch
git checkout 6-create-system-architecture-diagramm
New-Item -ItemType File -Name "README.md"
```

* Mapped out the full System Architecture (SvelteKit -> NestJS -> MongoDB) using a Mermaid flowchart in README.md.
* Created Backend Data Models (UML Class Diagram) to define the database schema.
* Established a bidirectional cascade relationship (using Composition `*--`) where Matchup relies on Champion for both Player and Enemy IDs.

**Planned Champion JSON:**
```json
{
  "championID": "uuid-for-ahri",
  "championName": "Ahri",
  "championPosition": "Top",
  "championPlaystyle": "Ranged Mage/Assassin",
  "overallWinrate": 50.5,
  "championURL": "[https://example.com/images/ahri.png](https://example.com/images/ahri.png)"
}
```

**Planned Matchup JSON:**
```json
{
  "matchupID": "some-unique-uuid",
  "playerChampionID": "uuid-for-ahri",
  "enemyChampionID": "uuid-for-irelia",
  "matchupWinrate": 52.5,
  "matchupTips": "Hold your charm until she dashes to a low-health minion."
}
```

## Step 6: Production Deployments & CI/CD Setup (The "Walking Skeleton")

### Backend Deployment (Render - Free Tier)
Deployed the empty NestJS backend to establish a live API URL before building features.

*   **Platform:** Render (Web Service)
*   **Region:** Frankfurt (EU)
*   **Root Directory:** *(Left completely blank so Render reads the entire monorepo and `pnpm-workspace.yaml`)*
*   **Build Command:**
    ```bash
    pnpm install && pnpm turbo run build --filter=backend
    ```
    *(Installs root dependencies, then uses Turborepo to only compile the backend into the `dist` folder).*
*   **Start Command:**
    ```bash
    node backend/dist/main.js
    ```
    *(Runs the compiled TypeScript file for NestJS).*
*   **Live Backend URL:** `https://leaguematchups.onrender.com/`
*   **Result:** Verified the `shared` folder successfully printed "Hello from the shared folder!" in the browser.

### Frontend Deployment (Vercel)
Deployed the empty SvelteKit frontend and connected it to the live backend URL.

*   **Platform:** Vercel
*   **Framework Preset:** SvelteKit (Auto-detected)
*   **Root Directory:** `frontend`
*   **Environment Variables:**
    *   `PUBLIC_API_URL` = `https://leaguematchups.onrender.com`
*   **Result:** The frontend build successfully passed, establishing an automated CI/CD pipeline for both frontend and backend on every push to `main`.

## Step 7: The Full-Stack Sandbox (Posture Check & Webhook)

### Backend: Discord Webhook
Created a test endpoint to ping a Discord channel to verify full-stack communication and CORS.

*   **`backend/src/app.service.ts`:** Implemented `postureCheck()` using the native `fetch` API to send a POST request with a JSON payload to a Discord webhook URL.
*   **`backend/src/app.controller.ts`:** Created a `@Post('posture')` endpoint to expose the service function to the frontend.

### Frontend: The Wake-Up Button
Built a UI button to trigger the backend endpoint.

*   **`frontend/src/routes/+page.svelte`:** Added a button that executes a `fetch` request to the backend `/posture` route.
*   **State Management:** Implemented an `isLoading` boolean state. When clicked, the button disables itself and changes text to "Sending..." to prevent spam while waiting for the server's response.

### Testing Setup: The `nodenext` TypeScript Fix
**The Problem:** The Jest test file (`app.controller.spec.ts`) showed red syntax errors for global Jest variables like `describe`, `it`, and `expect`.
**The Cause:** The `backend/tsconfig.json` uses `"moduleResolution": "nodenext"`. This strict mode mimics modern Node.js and prevents TypeScript from automatically loading global types from the `node_modules` folder (like `@types/jest`) unless explicitly imported.
**The Fix:** Added a `"types"` array to explicitly force the TypeScript compiler to load the Jest and Node dictionaries into the global scope.

**backend/tsconfig.json Updates:**
```json
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "types": ["jest", "node"]
    // ... remaining settings
  }
}