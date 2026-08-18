# LeagueMatchups Monorepo

## System Architecture

```mermaid
flowchart TD
    User([User Browser]) -->|HTTPS / UI| FE[Frontend - SvelteKit]
    FE -->|REST API / JSON| BE[Backend - NestJS]
    BE -->|Mongoose Driver| DB[(Database - MongoDB)]
    Shared[Shared Library] -.->|Imports Types| FE
    Shared -.->|Imports Types| BE