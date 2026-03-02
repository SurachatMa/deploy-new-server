# Deploy New Server Flow - Frontend Task

This is a modern web application built for the "Deploy New Server" technical assessment. It features a responsive, premium UI for selecting server specifications, simulating network requests, calculating estimated costs in real-time, and managing a global cart state.

## 🚀 Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
*   **Component Library**: [Ant Design](https://ant.design/) (Optimized with `@ant-design/nextjs-registry` for Next.js SSR)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with LocalStorage Persistence)
*   **Language**: TypeScript
*   **Testing**: [Jest](https://jestjs.io/) + [ts-jest](https://kulshekhar.github.io/ts-jest/)

## ✨ Key Features & Task Completions

*   **Task 1**: Next.js App Router setup with Ant Design properly resolving server components and Tailwind CSS working uniformly across the app.
*   **Task 2**:
    *   Responsive two-column "Deploy new Server" dashboard interface.
    *   Smooth dynamic rendering of SKUs filtering based on `Virtual Machine` or `Dedicated Server` selection.
    *   No-decimal custom Input logic for Add-ons (RAM & Storage).
    *   Real-time pricing calculations via `usePriceEstimation` custom hook.
    *   Unit Tests (100% Passing) on all mathematical logic built with Jest (`usePriceEstimation.test.ts`).
*   **Task 3 (Real-World Resilience)**:
    *   **Simulated API Latency**: Implemented `useServerData` hook to simulate loading the `data.json` over a 1 to 3 seconds delayed Promise, mocking a real backend.
    *   **Loading UI**: Antd Skeleton loaders smoothly fill the screen while the network resolves.
    *   **Error Handling (Edge Case)**: Graceful UI fallback with `<Result />` component and a "Try Again" reload action button for when data fetching fails.
    *   **Global Cart Persistence**: Utilizing Zustand with its `persist` middleware, selected server SKUs are added to a top-right Cart icon. Cart contents endure browser reloads.

## 📦 Local Installation & Setup

Follow these steps to run the project locally on your machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (LTS recommended) and [pnpm](https://pnpm.io/) installed.

```bash
npm install -g pnpm
```

### 1. Install Dependencies

Open your terminal, navigate to the project root directory, and install the required packages:

```bash
pnpm install
```

### 2. Run the Development Server

Start the local Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Run Unit Tests

To run the Jest test suite to verify the pricing estimation logic:

```bash
pnpm test
```

Or to run in watch mode:

```bash
pnpm test --watch
```

---

## 🏗️ Architecture Design Details (Task 3 Addendum)

### The API Simulation (`useServerData`)
Instead of directly importing `data.json` into the React component, I created an asynchronous hook.
*   **Why?** This accurately reflects how a Next.js Client Component interacts with an external microservice or database.
*   **Resilience**: Real networks fail. The hook includes a `try/catch` structure with an error state, and the UI gracefully handles failures via Skeleton loaders during loading and an Error Fallback state with a retry button when fetching fails.

### State Management (`Zustand`)
*   **Why Zustand?** It avoids the boilerplate complexity of Redux while eliminating the frequent re-rendering issues inherent in React's native Context API.
*   **Persistence Strategy**: The cart relies on `zustand/middleware` -> `persist`. This persists cart data inside the window's `localStorage`. This ensures users do not lose their customized, un-purchased server configurations if they close the tab.
