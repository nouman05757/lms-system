import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Course, Enrollment, User, CourseContextType } from "../types";
import {
  initialCourses,
  initialEnrollments,
  initialUsers,
} from "../data/mockData";
import { useAuth } from "./AuthContext";

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
};

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [enrollments, setEnrollments] =
    useState<Enrollment[]>(initialEnrollments);
  const [users] = useState<User[]>(initialUsers);
  const { user } = useAuth();

  const enrollInCourse = (courseId: number): boolean => {
    if (!user || user.role !== "student") return false;

    // Check if already enrolled
    const existingEnrollment = enrollments.find(
      (e) => e.studentId === user.id && e.courseId === courseId
    );

    if (existingEnrollment) return false;

    const newEnrollment: Enrollment = {
      id: Date.now().toString(),
      studentId: user.id,
      courseId,
      enrolledDate: new Date().toISOString().split("T")[0],
      progress: 0,
      completedLessons: 0,
      timeSpent: "0 hours",
      lastAccessed: new Date().toISOString().split("T")[0],
    };

    setEnrollments((prev) => [...prev, newEnrollment]);

    // Update course student count
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? { ...course, students: course.students + 1 }
          : course
      )
    );

    return true;
  };

  const getEnrolledCourses = (studentId: string): Course[] => {
    const studentEnrollments = enrollments.filter(
      (e) => e.studentId === studentId
    );
    return studentEnrollments
      .map((enrollment) => {
        const course = courses.find((c) => c.id === enrollment.courseId);
        return course!;
      })
      .filter(Boolean);
  };

  const getStudentsInCourse = (
    courseId: number
  ): { student: User; enrollment: Enrollment }[] => {
    const courseEnrollments = enrollments.filter(
      (e) => e.courseId === courseId
    );
    return courseEnrollments
      .map((enrollment) => {
        const student = users.find((u) => u.id === enrollment.studentId);
        return { student: student!, enrollment };
      })
      .filter((item) => item.student);
  };

  const updateCourse = (courseId: number, courseData: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, ...courseData } : c))
    );
  };

  const deleteCourse = (courseId: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
  };

  const createCourse = (courseData: Omit<Course, "id">) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now(),
      students: 0,
      reviews: 0,
      rating: 0,
      updated: new Date().toISOString().split("T")[0],
      status: "under_review",
    };
    setCourses((prev) => [...prev, newCourse]);
  };

  const value: CourseContextType = {
    courses,
    enrollments,
    enrollInCourse,
    getEnrolledCourses,
    getStudentsInCourse,
    updateCourse,
    deleteCourse,
    createCourse,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};
