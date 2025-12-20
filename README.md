# MDS Frontend Application

## Overview

This is a frontend application built with React and TypeScript.
The project focuses on clean architecture, maintainable code, and a solid development workflow.

## Core Features

- User list with filtering, sorting, and pagination
- Multi-language support (internationalization)
- Persistent language selection
- Clean and reusable UI components

## Internationalization (i18n)

The application supports multiple languages.
All UI text is managed through translation files to avoid hardcoded strings.
Users can switch languages using the language toggle in the header.

## Development Workflow

The project includes tooling to ensure code quality and consistency:

- **GitHub Actions CI**

  - Linting
  - Type checking
  - Production build

- **Husky Hooks**
  - `commit-msg`: enforces conventional commit messages using commitlint
  - `pre-commit`: runs ESLint before commits

## Project Structure

```text
.github/
└── workflows/
    └── pipeline.yml          # GitHub Actions CI pipeline

.husky/
├── commit-msg                # Commit message validation (commitlint)
└── pre-commit                # Pre-commit ESLint check

src/
├── components/               # Reusable UI components
├── hooks/                    # Custom React hooks
├── services/                 # API and data-fetching logic
├── i18n/                     # Translation files and language configuration
├── types/                    # Shared TypeScript types
├── constants/                # UI configuration and shared constants
├── providers/                # Application-level providers
├── App.tsx                   # Root application component
├── index.css                 # Global styles
└── main.tsx                  # Application entry point

.nvmrc                         # Node.js version definition
commitlint.config.cjs          # Commitlint configuration
tailwind.config.js             # Tailwind CSS configuration
eslint.config.js               # ESLint configuration

```

## Backend Communication & State Management

The application communicates with the backend API using **Axios**.

### API Layer

All backend requests are centralized inside the `services/` directory.
This approach keeps API logic separated from UI components and improves maintainability and scalability.

### Global State & Data Fetching

For server state management and data fetching, the application uses **TanStack Query (React Query)**.

TanStack Query is responsible for:

- Fetching data from the backend
- Caching server responses
- Handling loading and error states
- Keeping data in sync across the application

This avoids manual state handling and replaces the need for classic `fetch` logic inside components.

### Backend URL Configuration

During development, the backend server runs on a separate port.

The frontend is configured to communicate with the backend running on:
http://localhost:3001

The port was adjusted due to local development constraints on macOS.
The backend port can be changed freely depending on the local environment.

Updating the backend URL ensured stable communication between the frontend and backend during development.

All API requests are routed through this base URL to maintain consistency across the application.
