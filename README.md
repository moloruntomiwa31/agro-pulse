# AgroPulse 🌾

**AgroPulse** is a high-fidelity, AI-powered agricultural intelligence and marketplace platform designed to bridge the gap between farmers and bulk buyers. By combining real-time market data with predictive analytics, AgroPulse empowers farmers to optimize their harvest cycles and provides buyers with data-driven supply chain visibility.

---

## 🚀 Key Features

### 1. AI Predictive Intelligence
*   **Demand Forecasting**: Predicts regional demand spikes for specific produce types (e.g., "24% demand spike expected for Tomatoes next week").
*   **Buyer Return Prediction**: Analyzes buyer restock patterns to predict when they will likely return for their next purchase, allowing farmers to prepare stock in advance.
*   **Early Harvest Recommendations**: AI-driven operational advice that suggests optimal harvest windows to capture premium market pricing.

### 2. Farmer Pro Dashboard
*   **Operational Overview**: Real-time tracking of pending, in-transit, and delivered orders.
*   **Dynamic Inventory**: A robust produce management system that synchronizes directly with the public marketplace.
*   **Trust Scoring**: A reliability metric for farmers based on delivery performance and buyer feedback.

### 3. Integrated Marketplace
*   **Discovery Engine**: Advanced filtering by category, availability, and harvest date.
*   **Product Insights**: Buyers can view detailed produce information including organic certifications and AI-generated supply stability scores.

### 4. Seamless Logistics & Payments
*   **Escrow Settlements**: Secure payment tracking where funds are held in escrow until delivery is confirmed.
*   **Role-Based Access**: Dedicated workflows for Buyers (Retailers/Wholesalers) and Sellers (Farmers/Aggregators).

---

## 🛠 Tech Stack

*   **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
*   **State Management**: Zustand (Toast Store, Auth Store, Inventory Store)
*   **Icons**: Lucide React
*   **API Layer**: Custom `apiRequest` utility with robust error parsing and TanStack Query (React Query) for data fetching/mutations.
*   **Theming**: Custom Brutalist-Dark design language with ambient glows and glassmorphism.

---

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router (Dashboard, Marketplace, Auth)
├── components/           # Reusable UI components
│   ├── farmer/           # Farmer-specific widgets (KPIs, Charts, Tables)
│   ├── marketplace/      # Buyer-facing product cards and filters
│   └── shared/           # Global components (TopBar, Sidebar, EmptyStates)
├── hooks/                # Custom React hooks (useAuth, useProduce, usePrediction)
├── lib/                  # Utility functions and API clients
├── public/               # Static assets and images
├── types/                # TypeScript interface definitions
└── README.md             # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or pnpm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/agro-pulse.git
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```

---

## 🛡 Security & Reliability
*   **JWT Authentication**: Secure token-based auth flow.
*   **Defensive UI**: Robust error handling that safely stringifies API error objects to prevent runtime crashes.
*   **Loading States**: Skeleton loaders and spinners integrated across all AI and data-heavy components.

---

## 📈 Impact Potential
AgroPulse aims to reduce post-harvest waste by 15-20% through better demand matching and improve farmer revenue by providing the intelligence needed to time harvests for peak market value.
