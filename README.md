# EduPlatform - Learning Management System

A comprehensive Learning Management System (LMS) built with React, JavaScript, and Tailwind CSS. The platform supports role-based dashboards for students, teachers, and administrators with full course management capabilities.

## Features

### 🎓 For Students

- Course enrollment and progress tracking
- Interactive dashboards with learning analytics
- Quiz participation and results
- Downloadable certificates
- Course announcements and notifications

### 👨‍🏫 For Teachers

- Course creation and management (CRUD operations)
- Lesson and quiz management
- Student progress tracking
- Certificate generation
- Announcement system

### 👨‍💼 For Administrators

- User management (students and teachers)
- Course and category management
- Content moderation
- Platform analytics
- System-wide announcements

### 🔐 Authentication System

- Secure login and signup
- Role-based access control
- User profile management
- Session management

## Tech Stack

- **Frontend Framework**: React 18 with JavaScript (ES6+)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Custom components with Radix UI primitives
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Charts**: Recharts
- **Form Handling**: React Hook Form
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd eduplatform
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials

Use these credentials to test different user roles:

**Student Account:**

- Email: `student@test.com`
- Password: `password`

**Teacher Account:**

- Email: `teacher@test.com`
- Password: `password`

**Admin Account:**

- Email: `admin@test.com`
- Password: `password`

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # UI library components
│   ├── figma/           # Image components
│   └── ...              # Page components
├── lib/                # Utility functions
├── styles/             # Global styles and CSS
└── App.tsx             # Main application component
```

## Key Files

- `src/App.tsx` - Main application with routing, contexts, and state management
- `src/main.tsx` - Application entry point
- `src/components/Navigation.tsx` - Navigation bar with authentication
- `src/styles/globals.css` - Global CSS with Tailwind configuration
- `vite.config.ts` - Vite build configuration

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features Implementation

### Role-Based Dashboards

The application uses React Context for authentication and role management, automatically routing users to appropriate dashboards based on their role.

### Course Management

- Complete CRUD operations for courses
- Course enrollment system
- Progress tracking and analytics
- Certificate generation

### Responsive Design

Built with Tailwind CSS for a mobile-first, responsive design that works across all devices.

### Modern UI/UX

- Clean, professional design similar to modern learning platforms
- Intuitive navigation and user flows
- Accessible components with proper ARIA labels
- Loading states and error handling

## Data Structure

The application uses mock data for demonstration:

### Users

- Students, teachers, and admins with different permissions
- Profile information and activity tracking

### Courses

- 16+ diverse courses across multiple categories
- Course metadata (pricing, ratings, duration, etc.)
- Instructor assignments

### Enrollments

- Student course enrollments
- Progress tracking
- Grade management

## Customization

### Styling

The project uses Tailwind CSS v4.0 with custom CSS variables defined in `src/styles/globals.css`. You can customize:

- Color schemes
- Typography
- Spacing
- Border radius
- Component styles

### Adding New Features

1. Create components in `src/components/`
2. Update state management in `App.tsx`
3. Add new routes as needed
4. Update mock data for testing

### Environment Setup

This project is configured for JavaScript development:

- No TypeScript compilation needed
- Fast development with Vite
- Hot module replacement
- Modern JavaScript (ES6+) features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Support

For support or questions, please create an issue in the repository.

---

**Note**: This is a demo application with mock data. For production use, replace the mock data with real API calls and implement proper authentication and authorization.
