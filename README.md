# 🏛️ Cosmic Arch Studio

> **Modern Architectural Design Platform** - Transform your space with innovative architectural design solutions

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Strapi](https://img.shields.io/badge/Strapi-5.15.0-2F2E8B?style=for-the-badge&logo=strapi)](https://strapi.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

---

## 🌟 Overview

Cosmic Arch Studio is a cutting-edge architectural design platform that combines modern web technologies with elegant design principles. Built with Next.js 14, Strapi CMS, and PostgreSQL, it offers a seamless experience for showcasing architectural projects, managing content, and connecting with clients.

### ✨ Key Features

- **🎨 Modern Design System** - Beautiful, responsive UI with smooth animations
- **📱 Mobile-First Approach** - Optimized for all devices and screen sizes
- **⚡ Performance Optimized** - Fast loading times with Next.js optimization
- **🔧 Headless CMS** - Flexible content management with Strapi
- **🎯 SEO Optimized** - Built-in SEO features for better visibility
- **🚀 Docker Ready** - Easy deployment with Docker Compose
- **📊 Analytics Ready** - Built-in tracking and analytics capabilities

---

## 🏗️ Architecture

```
Cosmic Arch Studio/
├── 🎨 frontend/          # Next.js 14 React application
│   ├── app/             # App Router structure
│   ├── components/      # Reusable UI components
│   ├── lib/            # Utility functions and API
│   └── public/         # Static assets
├── 🔧 backend/          # Strapi CMS backend
│   ├── src/            # Strapi source code
│   ├── config/         # Configuration files
│   └── database/       # Database migrations
└── 🐳 docker-compose.yml # Container orchestration
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (>= 18.0.0)
- **npm** (>= 6.0.0)
- **Docker** & **Docker Compose**
- **PostgreSQL** (or use Docker)

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cosmic-arch-studio.git
   cd cosmic-arch-studio
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend (Strapi): http://localhost:1337
   - Database: localhost:5432

### Option 2: Local Development

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run develop
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Database Setup**
   - Install PostgreSQL
   - Create a database named `strapi`
   - Update environment variables in `backend/.env`

---

## 🛠️ Technology Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[GSAP](https://greensock.com/gsap/)** - Professional animation library

### Backend
- **[Strapi](https://strapi.io/)** - Headless CMS
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Redis](https://redis.io/)** - Caching layer
- **[Cloudinary](https://cloudinary.com/)** - Image management

### DevOps
- **[Docker](https://www.docker.com/)** - Containerization
- **[Docker Compose](https://docs.docker.com/compose/)** - Multi-container orchestration

---

## 📁 Project Structure

### Frontend (`/frontend`)
```
app/
├── components/          # Page-specific components
├── actions/            # Server actions
├── services/           # API services
├── utils/              # Utility functions
├── context/            # React context providers
├── globals.css         # Global styles
├── layout.tsx          # Root layout
└── page.tsx            # Home page
```

### Backend (`/backend`)
```
src/
├── api/               # API routes and controllers
├── components/        # Strapi components
├── content-types/     # Content type definitions
├── extensions/        # Strapi extensions
└── middlewares/       # Custom middlewares
```

---

## 🎨 Design System

The project uses a comprehensive design system built with:

- **Color Palette**: Neutral tones with accent colors
- **Typography**: Inter font family for modern readability
- **Components**: Reusable UI components with Radix UI primitives
- **Animations**: Smooth transitions with Framer Motion and GSAP
- **Responsive**: Mobile-first design approach

---

## 🔧 Configuration

### Environment Variables

Create `.env` files in both `frontend/` and `backend/` directories:

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Backend (.env)**
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USER=strapi
DATABASE_PASSWORD=strapi-password
```

---

## 📊 API Documentation

The backend provides a RESTful API with the following endpoints:

- `GET /api/projects` - Fetch all projects
- `GET /api/services` - Fetch all services
- `GET /api/reviews` - Fetch client reviews
- `GET /api/stats` - Fetch statistics
- `GET /api/marquee` - Fetch marquee images

### Authentication
- Admin panel: `/admin`
- API tokens for external access

---

## 🚀 Deployment

### Production Build

1. **Build the applications**
   ```bash
   # Frontend
   cd frontend
   npm run build
   
   # Backend
   cd backend
   npm run build
   ```

2. **Deploy with Docker**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Environment Setup
- Set production environment variables
- Configure database connections
- Set up SSL certificates
- Configure CDN for static assets
-


## 🙏 Acknowledgments

- **Strapi Team** - For the amazing headless CMS
- **Vercel** - For Next.js and deployment platform
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer** - For the motion library
- **Radix UI** - For accessible component primitives

---

<div align="center">

**Made with ❤️ by the Sujay Arun Panda**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/cosmic-arch-studio?style=social)](https://github.com/yourusername/cosmic-arch-studio)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/cosmic-arch-studio?style=social)](https://github.com/yourusername/cosmic-arch-studio)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/cosmic-arch-studio)](https://github.com/yourusername/cosmic-arch-studio/issues)

</div> 
