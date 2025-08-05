export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  joinDate?: string;
  lastLogin?: string;
  status?: 'active' | 'suspended';
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorId: string;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  lessons: number;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  level: string;
  description: string;
  bestseller: boolean;
  updated: string;
  status: 'published' | 'under_review' | 'rejected';
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: number;
  enrolledDate: string;
  progress: number;
  completedLessons: number;
  timeSpent: string;
  lastAccessed: string;
  grade?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: string) => Promise<boolean>;
  updateUser: (userId: string, userData: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  createUser: (userData: Omit<User, 'id'>) => void;
}

export interface CourseContextType {
  courses: Course[];
  enrollments: Enrollment[];
  enrollInCourse: (courseId: number) => boolean;
  getEnrolledCourses: (studentId: string) => Course[];
  getStudentsInCourse: (courseId: number) => { student: User; enrollment: Enrollment }[];
  updateCourse: (courseId: number, courseData: Partial<Course>) => void;
  deleteCourse: (courseId: number) => void;
  createCourse: (courseData: Omit<Course, 'id'>) => void;
}