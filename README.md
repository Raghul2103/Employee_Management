# Employee Management Dashboard (MERN Stack)

A production-ready Employee Management Dashboard featuring JWT authentication, employee CRUD, paginated listings, search filters, and visual analytics dashboards. Built using React, Node.js, Express, MongoDB, and Tailwind CSS.

---

## 🌟 Key Features

- **JWT Authentication**: User registration and login with secure token storage.
- **Custom Axios Client**: Custom fetch client with request headers injection and automated token-expiration logout.
- **Protected Routes**: Shielded dashboard paths redirecting unauthorized requests.
- **Staff Directory**:
  - Full CRUD operations (Add, Edit, Delete).
  - Search (name and email matching) with **500ms debouncing**.
  - Dropdown filters for Department and Status (supports combined queries).
  - **Server-Side Pagination** with index buttons and forward/backward control.
- **Visual Analytics**: Interactive Recharts graphs displaying department distribution, status ratios, and onboarding timelines.
- **Full Responsiveness**: Adaptive layouts using custom grid and drawer components, optimized for mobile, tablet, and desktop screens.

---

## 💻 Setup and Installation

Follow these steps to run the application locally:

### 1. Prerequisites
Ensure you have **Node.js** (v16 or higher) and a running instance of **MongoDB** (local or remote MongoDB Atlas cluster).

### 2. Backend Configuration
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Create or configure your `.env` file (already configured in workspace):
   ```env
   PORT=5050
   MONGO_URI=your_mongodb_connection_uri
   JWT_SECRET=supersecretkey12345
   NODE_ENV=development
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   The backend will run on **`http://localhost:5050`**.

### 3. Frontend Configuration
1. Navigate to the `frontend/` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The React client will spin up on **`http://localhost:5173`** (or next available port).

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new user account.
- `POST /api/auth/login` - Verify credentials and return signed JWT.

### Employees (Protected)
- `GET /api/employees` - List employees with paginated parameters, search query, and filters.
- `POST /api/employees` - Create a new employee record.
- `GET /api/employees/:id` - Fetch single employee details.
- `PUT /api/employees/:id` - Update employee details.
- `DELETE /api/employees/:id` - Delete employee record.

### Analytics (Protected)
- `GET /api/analytics` - Return cards metrics and data sets for Bar, Pie, and Line charts.

---

## 📱 Responsive Layout Details
- **Desktop screens (>768px)**: Fixed persistent sidebar with sticky header toolbar.
- **Mobile/Tablet screens (<768px)**: Sidebar transitions to a collapsible slide-out drawer (toggled via header hamburger menu). Form fields stack vertically into responsive columns. Tables are scrollable horizontally to prevent page layouts from breaking on narrow screens.
