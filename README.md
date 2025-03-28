# LMSOfficial

LMSOfficial is a modern Learning Management System (LMS) built using Next.js 13 with the App Router. It offers dynamic features like course management, user authentication, and seamless video playback, making it a robust platform for creating and managing online courses.

## Features

- **Dynamic Course Management**:
  - Add, edit, and delete courses with customizable titles, descriptions, and images.
  - Drag-and-drop functionality for organizing course chapters.

- **User Authentication**:
  - Secure login and registration system.
  - Role-based access to manage content.

- **Video Integration**:
  - Seamless video upload and playback powered by Mux.
  - Preview free chapters before purchasing a course.

- **Search and Filter**:
  - Filter courses by category.
  - Search functionality for quick course discovery.

- **Responsive UI**:
  - Built with Tailwind CSS for a fully responsive design.
  - Modular and reusable components.

- **Database Integration**:
  - Powered by NeonDB using PostgreSQL.
  - Prisma ORM for efficient database queries and management.

- **Payment Integration**:
  - Integrated with Stripe for secure course purchases.

- **Progress Tracking**:
  - Track user progress for purchased courses.

## Tech Stack

- **Frontend**: Next.js 13, React, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma
- **Database**: NeonDB (PostgreSQL)
- **Video Streaming**: Mux
- **Payment Gateway**: Stripe
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL Database (NeonDB recommended)
- Stripe account for payments
- Mux account for video management

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lmsofficial.git
   cd lmsofficial
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file with the following variables:
   ```env
   DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database_name>"
   NEXT_PUBLIC_STRIPE_KEY=<your-stripe-public-key>
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   MUX_TOKEN_ID=<your-mux-token-id>
   MUX_TOKEN_SECRET=<your-mux-token-secret>
   ```

4. Set up the Prisma schema:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Usage

- **Admin Features**:
  - Create and manage courses and chapters.
  - Upload videos for course content.

- **User Features**:
  - Register and log in to access courses.
  - Purchase courses using Stripe.
  - Track progress and complete courses.

## Project Structure

```
├── (auth)
│   ├── (routes)
│   │   ├── sign-in
│   │   │   ├── [[...sign-in]]
│   │   │   │   ├── page.tsx
│   │   ├── sign-up
│   │   │   ├── [[...sign-up]]
│   │   │   │   ├── page.tsx
│   ├── layout.tsx
├── (course)
│   ├── courses
│   │   ├── [courseId]
│   │   │   ├── chapters
│   │   │   │   ├── [chapterId]
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── _components
│   │   │   │   │   │   ├── course-enroll-button.tsx
│   │   │   │   │   │   ├── course-progress-button.tsx
│   │   │   │   │   │   ├── video-player.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── _components
│   │   │   │   ├── course-mobile-sidebar.tsx
│   │   │   │   ├── course-navbar.tsx
│   │   │   │   ├── course-sidebar-item.tsx
│   │   │   │   ├── course-sidebar.tsx
├── (dashboard)
│   ├── (routes)
│   │   ├── (root)
│   │   │   ├── page.tsx
│   │   │   ├── _components
│   │   │   │   ├── info-card.tsx
│   │   ├── search
│   │   │   ├── page.tsx
│   │   │   ├── _components
│   │   │   │   ├── categories.tsx
│   │   │   │   ├── category-item.tsx
│   │   ├── teacher
│   │   │   ├── analytics
│   │   │   │   ├── page.tsx
│   │   │   │   ├── _components
│   │   │   │   │   ├── chart.tsx
│   │   │   │   │   ├── data-card.tsx
│   │   │   ├── courses
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [courseId]
│   │   │   │   │   ├── chapters
│   │   │   │   │   │   ├── [chapterId]
│   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   ├── _components
│   │   │   │   │   │   │   │   ├── chapter-access-form.tsx
│   │   │   │   │   │   │   │   ├── chapter-actions.tsx
│   │   │   │   │   │   │   │   ├── chapter-description-form.tsx
│   │   │   │   │   │   │   │   ├── chapter-title-form.tsx
│   │   │   │   │   │   │   │   ├── chapter-video-form.tsx
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── _components
│   │   │   │   │   │   ├── actions.tsx
│   │   │   │   │   │   ├── attachment-form.tsx
│   │   │   │   │   │   ├── category-form.tsx
│   │   │   │   │   │   ├── chapters-form.tsx
│   │   │   │   │   │   ├── chapters-list.tsx
│   │   │   │   │   │   ├── description-form.tsx
│   │   │   │   │   │   ├── image-form.tsx
│   │   │   │   │   │   ├── price-form.tsx
│   │   │   │   │   │   ├── title-form.tsx
│   │   │   │   ├── _components
│   │   │   │   │   ├── columns.tsx
│   │   │   │   │   ├── data-table.tsx
│   │   │   ├── create
│   │   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   ├── layout.tsx
│   ├── _components
│   │   ├── logo.tsx
│   │   ├── mobiles-sidebar.tsx
│   │   ├── navbar.tsx
│   │   ├── sidebar-item.tsx
│   │   ├── sidebar-routes.tsx
│   │   ├── sidebar.tsx
├── api
│   ├── courses
│   │   ├── route.ts
│   │   ├── [courseId]
│   │   │   ├── attachments
│   │   │   │   ├── route.ts
│   │   │   │   ├── [attachmentId]
│   │   │   │   │   ├── route.ts
│   │   │   ├── chapters
│   │   │   │   ├── reorder
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── route.ts
│   │   │   │   ├── [chapterId]
│   │   │   │   │   ├── progress
│   │   │   │   │   │   ├── route.ts
│   │   │   │   │   ├── publish
│   │   │   │   │   │   ├── route.ts
│   │   │   │   │   ├── route.ts
│   │   │   │   │   ├── unpublish
│   │   │   │   │   │   ├── route.ts
│   │   │   ├── checkout
│   │   │   │   ├── route.ts
│   │   │   ├── publish
│   │   │   │   ├── route.ts
│   │   │   ├── route.ts
│   │   │   ├── unpublish
│   │   │   │   ├── route.ts
│   ├── uploadthing
│   │   ├── core.ts
│   │   ├── route.ts
│   ├── webhook
│   │   ├── route.ts
├── favicon.ico
├── globals.css
├── layout.tsx

```

## Deployment

LMSOfficial is designed for deployment on platforms like Vercel. Follow these steps:

1. Push the project to a GitHub repository.
2. Connect the repository to Vercel.
3. Set environment variables in the Vercel dashboard.
4. Deploy the project.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [NeonDB](https://neon.tech/)
- [Mux](https://mux.com/)
- [Stripe](https://stripe.com/)

