# 🏥 MediQueue - Expert Tutor Booking Platform

A modern, full-stack tutor booking web application designed to connect students with verified educators worldwide. MediQueue simplifies online learning by providing seamless tutor discovery, booking, and session management.

**🌐 Live Site:** [https://mediqueue-client-mu.vercel.app/](https://mediqueue-client-mu.vercel.app/)

---

## ✨ Key Features

- **🔐 Secure Authentication**: Email/password and Google OAuth integration with JWT token-based security. Protected routes ensure only authenticated users can book sessions.

- **📚 Smart Tutor Discovery**: Browse available tutors with advanced search and date-range filtering. Explore detailed tutor profiles including hourly rates, specializations, experience, and real-time slot availability.

- **📅 Intelligent Booking System**: One-click session booking with automatic slot management. Session date validation prevents past-date bookings, while automatic slot decrement ensures accurate availability tracking.

- **👨‍🏫 Instructor Dashboard**: Tutors can create profiles, manage availability, set hourly rates, and monitor their bookings. Real-time updates on session management with edit and delete capabilities.

- **🎨 Dark & Light Mode**: Fully responsive theme toggle that applies across the entire application, enhancing user experience and reducing eye strain.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, Tailwind CSS |
| **Authentication** | Better Auth (JWT + Google OAuth) |
| **Database** | MongoDB |
| **UI Components** | HeroUI, Lucide Icons, React Icons |
| **Notifications** | React Hot Toast |
| **Image Carousel** | Swiper.js |

---

## 📋 Core Pages & Routes

### Public Pages
- **Home** (`/`) - Banner carousel, featured tutors, statistics, testimonials
- **Tutors** (`/tutors`) - Full tutor directory with search and date filtering
- **Tutor Details** (`/tutors/[id]`) - Individual tutor profile with booking modal
- **Login** (`/login`) - Email/password and Google authentication
- **Register** (`/register`) - User signup with password validation

### Protected Pages (Login Required)
- **Add Tutors** (`/add-tutors`) - Create tutor profiles with detailed information
- **My Tutors** (`/my-tutors`) - Manage created tutors (edit/delete)
- **My Booked Sessions** (`/booked-sessions`) - View and cancel booked sessions
- **Profile** (`/profile`) - User account management

---

## 🎯 Main Functionalities

### 1. User Authentication
- ✅ Email/password login and registration with password strength validation
- ✅ Google OAuth social login
- ✅ JWT token storage and verification
- ✅ Session persistence on page reload
- ✅ Protected private routes with automatic redirects

### 2. Tutor Management
- ✅ Create detailed tutor profiles with photo upload
- ✅ Manage availability (days, time slots)
- ✅ Set pricing and total session slots
- ✅ Update and delete tutor information
- ✅ View all created tutors in table format

### 3. Booking System
- ✅ Book sessions with auto-filled student and tutor information
- ✅ Automatic slot availability tracking and decrement
- ✅ Session date validation (prevent bookings before session start date)
- ✅ Block bookings when slots are fully booked
- ✅ Cancel bookings with confirmation modal

### 4. Search & Filter
- ✅ Search tutors by name with case-insensitive regex search
- ✅ Filter by date range (session start and end dates)
- ✅ Real-time results update

### 5. User Interface
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark/Light theme toggle with persistent preference
- ✅ Loading spinners for data fetching states
- ✅ Toast notifications for all CRUD operations
- ✅ 404 error page for invalid routes
- ✅ Image carousel banner with auto-play
- ✅ Dynamic page titles based on current route

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account
- Google OAuth credentials (for social login)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd mediqueue-client
npm install
```

2. **Set up environment variables** (create `.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=<your-mongodb-connection-string>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_SECRET=<your-google-client-secret>
```

3. **Run development server:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
```bash
npm run build
npm start
```

---

## 📦 Backend Integration

This project connects to a Node.js/Express backend API that:
- Manages MongoDB data for tutors and bookings
- Handles JWT token verification
- Implements CORS for cross-origin requests
- Provides `/tutors/:id` endpoint for detailed tutor data

**Backend repository:** [mediqueue-server](https://github.com/joti14/mediqueue-server.git)

---

## 🎨 Design Highlights

- **Consistent Styling**: Brand colors (#004ac6), typography, and spacing applied uniformly
- **Professional Cards**: Equal height/width tutor cards with hover effects
- **Smooth Animations**: Page transitions and interactive elements
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Mobile-First**: Responsive grid layouts and touch-friendly interfaces

---

## 🔒 Security Features

- JWT token-based authentication
- Protected API endpoints with token verification
- Secure Google OAuth implementation
- Password validation on registration
- CORS configuration for safe cross-origin requests

---

## 👨‍💻 Author

Created as a comprehensive full-stack web development project demonstrating modern Next.js practices, MongoDB integration, and real-world application architecture.


