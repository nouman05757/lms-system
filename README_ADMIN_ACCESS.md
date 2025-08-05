# How to Access the Admin Panel

## Quick Access Instructions

### Method 1: Direct Login
1. **Go to the Login Page**: Navigate to `/login` or click "Login" in the navigation
2. **Use Admin Credentials**:
   - **Email**: `admin@test.com`
   - **Password**: `password`
3. **Click Login**: You'll be automatically redirected to `/dashboard` and see the Admin Dashboard

### Method 2: Sign Up as Admin
1. **Go to the Signup Page**: Navigate to `/signup` or click "Sign Up" in the navigation
2. **Fill out the form**:
   - **Name**: Any name you prefer
   - **Email**: Use a new email address
   - **Password**: Any password
   - **Role**: Select "Admin" from the dropdown
3. **Click Sign Up**: You'll be automatically logged in and redirected to the Admin Dashboard

## Admin Panel Features

Once logged in as admin, you'll have access to:

### 📊 Dashboard Overview
- **Statistics Cards**: Total students, teachers, courses, and revenue
- **Platform Analytics**: Real-time data about your LMS platform

### 👥 User Management
- **View All Users**: Students, teachers, and admins with filtering and search
- **Add New Users**: Create new accounts with any role
- **Edit Users**: Modify user information, role, and status
- **Delete Users**: Remove users from the platform
- **User Status Control**: Activate or suspend user accounts

### 📚 Course Management  
- **View All Courses**: Complete course catalog with search and filtering
- **Add New Courses**: Create courses with full details
- **Edit Courses**: Modify course information, pricing, and content
- **Delete Courses**: Remove courses from the platform
- **Course Status**: Approve/reject courses (published, under review, rejected)

### 📈 Analytics
- **Popular Categories**: Visual breakdown of course categories
- **Recent Activity**: Timeline of platform activities
- **Enrollment Statistics**: Track student enrollments and progress

### ⚙️ Settings
- **Platform Configuration**: Customize platform-wide settings
- **Course Defaults**: Set default parameters for new courses
- **System Preferences**: Configure various platform behaviors

## Demo Credentials

```
Email: admin@test.com
Password: password
```

## Troubleshooting

### If Admin Dashboard Doesn't Load:
1. **Check Console**: Open browser dev tools and check for any JavaScript errors
2. **Verify User Role**: Make sure you're logged in with role "admin"
3. **Clear Browser Cache**: Refresh the page or clear browser cache
4. **Check Network Tab**: Ensure all resources are loading correctly

### Navigation Issues:
- The admin panel is accessible at `/dashboard` route
- Make sure you're logged in before accessing `/dashboard`
- Check that the Navigation component shows "Admin Dashboard" option

## Admin Panel Layout

```
Admin Dashboard
├── Stats Cards (Students, Teachers, Courses, Revenue)
├── Tabs Navigation
│   ├── Users Tab
│   │   ├── User Search & Filter
│   │   ├── Add User Button
│   │   └── Users Table (with edit/delete actions)
│   ├── Courses Tab  
│   │   ├── Course Search & Filter
│   │   ├── Add Course Button
│   │   └── Courses Grid (with edit/delete actions)
│   ├── Analytics Tab
│   │   ├── Popular Categories Chart
│   │   └── Recent Activity Feed
│   └── Settings Tab
│       └── Platform Configuration Options
```

The admin panel is fully functional with CRUD operations for both users and courses, comprehensive filtering and search capabilities, and real-time analytics.