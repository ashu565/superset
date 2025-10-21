## Agents Guide

Actionable rules for repo agents—keep diffs minimal, safe, token-efficient.

### Purpose & Scope

- Audience: automated coding agents working within this repository.
- Goal: small, correct diffs aligned with the project's architecture.
- Non-goals: editing generated artifacts, lockfiles, or `node_modules`.

### Repo Map

- Monorepo managed by Bun workspaces and Turbo (see root `package.json`).
- Apps: `apps/*` (currently empty - apps to be added)
- Packages:
  - `packages/ui` - Shared UI components (shadcn/ui + custom components)
  - `packages/db` - Drizzle ORM database schema
  - `packages/utility` - Shared utility functions
  - `packages/constants` - Shared constants
  - `packages/scripts` - CLI scripts for setup/tooling
- Tooling: `tooling/typescript` - TypeScript configurations

### Stack & Runtimes

- Package manager: Bun only — use Bun for all installs and scripts; do not use npm, yarn, or pnpm.
- Build system: Turbo
- Database: Drizzle ORM
- UI: TailwindCSS v4 + shadcn/ui components in `packages/ui`

### Agent Priorities

- Correctness first: minimal scope and targeted edits.
- Prefer local patterns and existing abstractions; avoid one-off frameworks.
- Do not modify build outputs, generated files, or lockfiles.
- Use Bun for all scripts; do not introduce npm/yarn.
- Avoid running the local dev server in automation contexts.
- Respect type safety.

### Styling & UI

- TailwindCSS v4-first styling with design tokens in `packages/ui/tokens.ts`.
- All UI components live in `packages/ui/` as a shared package:
  - shadcn/ui components: `packages/ui/src/components/*.tsx`
  - Custom components: `ai-elements`, `color-picker`, `icons`
  - Configuration: `packages/ui/components.json`
  - Styles: `packages/ui/src/globals.css`
- Import components via `@superset/ui` package exports:
  - Components: `@superset/ui/button`, `@superset/ui/input`, etc.
  - Icons: `@superset/ui/icons`
  - Color picker: `@superset/ui/color-picker`
  - AI elements: `@superset/ui/ai-elements`
  - Utils: `@superset/ui/utils`
  - Hooks: `@superset/ui/hooks`
- Adding new shadcn components: Run `npx shadcn@latest add <component>` in `packages/ui/`
- Path aliases in `packages/ui`: `@/*` maps to `./src/*`

### Database

- Schema defined in `packages/db/src/`.
- Use Drizzle ORM for all database operations.
- Commands:
  - `bun run db:push` - Apply schema changes to local dev
  - `bun run db:seed` - Seed database
  - `bun run db:migrate` - Run migrations
  - `bun run db:studio` - Open Drizzle Studio
  - DO NOT run `db:gen` - reserved for maintainers

### Context Discipline (for Agents)

- Search narrowly with ripgrep; open only files you need.
- Read small sections; avoid `node_modules`, large assets.
- Propose minimal diffs aligned with existing conventions; avoid wide refactors.

### Common Commands

- `bun dev` - Run all dev servers (via Turbo)
- `bun test` - Run all tests
- `bun build` - Build all packages
- `bun run typecheck` - Type check all packages (via Turbo)
- `bun run lint` - Check code quality with Biome (format + lint, read-only)
- `bun run lint:fix` - Fix code quality issues with Biome (format + lint, with writes)
- `bun run format` - Format code with Biome (write mode)
- `bun run format:check` - Check code formatting with Biome (read-only)
- `bun run clean` - Clean root node_modules
- `bun run clean:workspaces` - Clean all workspace node_modules

### Linting & Formatting

- This monorepo uses Biome for both formatting and linting
- Biome runs at the **root level** (not per-package) for speed and consistency
- `biome check` = runs both formatter AND linter
- `biome format` = runs formatter only
- Workflow:
  - `bun run lint` - Check for issues (no changes)
  - `bun run lint:fix` - Fix all auto-fixable issues
  - `bun run format` - Format code only
  - `bun run format:check` - Check formatting only (useful for CI)

### Notes

- Unit tests can be run with `bun test`
- Run type checking with `bun run typecheck`
- DO NOT use TypeScript `any` type unless absolutely necessary
- Follow existing code patterns and conventions
