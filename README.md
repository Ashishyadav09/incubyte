# Sweet Shop Management System

A full-stack Sweet Shop Management System built with React, TypeScript, and TDD principles. This project demonstrates API development, database management, frontend implementation, testing, and modern development workflows.

## 🍬 Features

### User Features
- **User Registration & Login** - Secure authentication with JWT tokens
- **Browse Sweets** - View all available sweets with beautiful card layouts
- **Search & Filter** - Find sweets by name, category, or price range
- **Purchase Sweets** - Buy your favorite treats with quantity tracking

### Admin Features
- **Inventory Management** - Full CRUD operations for sweets
- **Stock Control** - Restock products and track inventory levels
- **Dashboard Analytics** - View total products, stock levels, and inventory value

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose (optional, for containerized deployment)
- PostgreSQL (for backend)

### Frontend Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Full Stack with Docker

```bash
# Start everything with one command
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build

# Stop all services
docker-compose down
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 🧪 Testing

### Frontend Tests (Vitest + React Testing Library)

```bash
# Run all frontend tests
npx vitest

# Run tests in watch mode
npx vitest --watch

# Run tests with coverage
npx vitest --coverage
```

**Test Coverage:**
- `AuthContext.test.tsx` - Login, register, logout, admin role assignment
- `SweetsContext.test.tsx` - Filtering, CRUD operations, purchase, restock
- `SweetCard.test.tsx` - Rendering, stock status, purchase button states
- `AuthForm.test.tsx` - Login/register forms, input handling
- `SweetFilters.test.tsx` - Search and category filtering

### Backend Tests (Jest)

```bash
cd backend

# Install test dependencies
npm install --save-dev jest supertest

# Run backend tests
npm test
```

**Test Coverage:**
- Health check endpoint
- Authentication endpoints (register, login)
- Sweets CRUD operations
- Input validation and error handling

## 📁 Project Structure

```
sweet-shop/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── layout/         # Header, Footer, Layout
│   │   ├── sweets/         # Sweet cards, filters, dialogs
│   │   └── ui/             # Shadcn UI components
│   ├── context/            # React Context providers
│   ├── lib/                # Utilities and mock data
│   ├── pages/              # Page components
│   ├── test/               # Test utilities and setup
│   └── types/              # TypeScript definitions
├── backend/                # Node.js/Express API
│   ├── src/
│   │   ├── index.js        # Main API server
│   │   └── index.test.js   # Backend API tests
│   ├── init.sql            # Database initialization
│   └── Dockerfile          # Backend container
├── public/                 # Static assets
├── vitest.config.ts       # Frontend test configuration
├── Dockerfile             # Frontend Docker config
├── docker-compose.yml     # Multi-service orchestration
├── vercel.json            # Vercel deployment config
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sweets (Protected)
- `POST /api/sweets` - Add new sweet
- `GET /api/sweets` - List all sweets
- `GET /api/sweets/search` - Search sweets
- `PUT /api/sweets/:id` - Update sweet
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)

### Inventory (Protected)
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (Admin only)

## 🎨 Design System

The application uses a custom design system with:
- **Colors**: Warm rose/pink primary, mint accent, cream backgrounds
- **Typography**: Playfair Display for headings, Poppins for body
- **Components**: Custom Shadcn UI variants for buttons, cards, badges

## 📦 Deployment

### Vercel (Frontend Only)

My App: incubyte-4odsp128e-ashishyadav09s-projects.vercel.app

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. The `vercel.json` is already configured for SPA routing

### Docker Deployment (Full Stack)

The included `docker-compose.yml` sets up:
- **Frontend** - Nginx serving the Vite/React build
- **Backend** - Node.js/Express API
- **PostgreSQL** - Database with automatic initialization

```bash
# One command to run everything
docker-compose up --build
```

## 🤖 My AI Usage

This project was developed with AI assistance:

### Tools Used
- **Lovable AI** - For initial project scaffolding and component generation

### How AI Was Used
- Generated initial component structure and design system
- Created TypeScript interfaces and type definitions
- Helped with React Context patterns for state management
- Assisted in writing responsive Tailwind CSS styles

### Reflection
AI tools significantly accelerated development by handling boilerplate code and suggesting patterns. Human oversight was essential for ensuring business logic correctness and making architectural decisions.

## 📄 License

MIT License - feel free to use this project as a template!

---

Made by Ashish Yadav for sweet lovers everywhere
