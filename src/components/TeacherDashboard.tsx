import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCourses } from "../contexts/CourseContext";
import { useAuth } from "../contexts/AuthContext";
import {
  BookOpen,
  Users,
  TrendingUp,
  DollarSign,
  Star,
  Eye,
  Award,
  Plus,
  BarChart3,
  Target,
  MessageCircle,
  AlertCircle,
  BookPlus,
} from "lucide-react";

interface Course {
  title: string;
  description: string;
  category: string;
  students: number | string;
  revenue: number | string;
  progress: number | string;
  lessons: number | string;
  image: File | null;
  file: File | null;
  announcement: string;
}

export function TeacherDashboard() {
  const { user } = useAuth();
  const { courses, getStudentsInCourse } = useCourses();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) return null;

  // Filter courses by instructor
  const myCourses = courses.filter((course) => course.instructorId === user.id);

  // Calculate stats
  const totalStudents = myCourses.reduce(
    (sum, course) => sum + course.students,
    0
  );
  const totalRevenue = myCourses.reduce(
    (sum, course) => sum + course.price * course.students,
    0
  );
  const averageRating =
    myCourses.length > 0
      ? (
          myCourses.reduce((sum, course) => sum + course.rating, 0) /
          myCourses.length
        ).toFixed(1)
      : "0.0";
  const publishedCourses = myCourses.filter(
    (course) => course.status === "published"
  ).length;

  const recentStudents = myCourses
    .flatMap((course) =>
      getStudentsInCourse(course.id).map(({ student, enrollment }) => ({
        ...student,
        courseName: course.title,
        progress: enrollment.progress,
        lastAccessed: enrollment.lastAccessed,
        enrolledDate: enrollment.enrolledDate,
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
    )
    .slice(0, 10);

  const courseStats = myCourses.map((course) => {
    const students = getStudentsInCourse(course.id);
    const avgProgress =
      students.length > 0
        ? Math.round(
            students.reduce((sum, s) => sum + s.enrollment.progress, 0) /
              students.length
          )
        : 0;

    return {
      ...course,
      enrolledStudents: students.length,
      avgProgress,
      revenue: course.price * students.length,
    };
  });

  const notifications = [
    {
      type: "new_student",
      message: 'John Doe enrolled in "Complete Web Development Bootcamp"',
      time: "2 hours ago",
      icon: Users,
      color: "text-blue-600",
    },
    {
      type: "review",
      message: 'New 5-star review on "UI/UX Design Masterclass"',
      time: "5 hours ago",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      type: "milestone",
      message: "Your course reached 1000 students!",
      time: "1 day ago",
      icon: Target,
      color: "text-green-600",
    },
    {
      type: "question",
      message: "3 new student questions in Q&A section",
      time: "2 days ago",
      icon: MessageCircle,
      color: "text-purple-600",
    },
  ];

  // Handle navigation to create course page
  const handleNavigateToCreateCourse = () => {
    navigate('/create-course');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome, {user.name}! 👨‍🏫
                </h1>
                <p className="text-blue-100 text-lg">
                  Manage your courses and track student progress
                </p>
              </div>
              <div className="hidden sm:block">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-course-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    My Courses
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myCourses.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-course-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalStudents.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-course-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Average Rating
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {averageRating}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-course-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${totalRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card className="shadow-course-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                      Recent Student Activity
                    </CardTitle>
                    <CardDescription>
                      Latest enrollments and progress updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentStudents.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No students yet
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Students will appear here when they enroll in your
                          courses!
                        </p>
                        <Button 
                          onClick={handleNavigateToCreateCourse}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create New Course
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentStudents.slice(0, 5).map((student, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {student.name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {student.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {student.courseName}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <div className="flex items-center space-x-2">
                                  <Progress
                                    value={student.progress}
                                    className="w-16"
                                  />
                                  <span className="text-xs text-gray-600">
                                    {student.progress}%
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500">
                                  Last active:{" "}
                                  {new Date(
                                    student.lastAccessed
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Notifications */}
              <Card className="shadow-course-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map((notification, index) => {
                      const Icon = notification.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <Icon
                            className={`h-4 w-4 mt-1 ${notification.color}`}
                          />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Courses */}
            <Card className="shadow-course-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  Top Performing Courses
                </CardTitle>
                <CardDescription>
                  Your most successful courses by enrollment and rating
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courseStats
                    .sort((a, b) => b.students - a.students)
                    .slice(0, 3)
                    .map((course) => (
                      <Card
                        key={course.id}
                        className="group hover:shadow-course-card-hover transition-all duration-300 border-0 shadow-course-card"
                      >
                        <div className="relative">
                          <ImageWithFallback
                            src={course.image}
                            alt={course.title}
                            className="w-full h-32 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                          />
                          <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            {course.rating}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                            {course.title}
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Students:</span>
                              <span className="font-medium">
                                {course.students}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Revenue:</span>
                              <span className="font-medium">
                                ${course.revenue.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">
                                Avg Progress:
                              </span>
                              <span className="font-medium">
                                {course.avgProgress}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Manage Your Courses
                </h3>
                <p className="text-gray-600">
                  Create, edit, and monitor your course performance
                </p>
              </div>
              <Button 
                onClick={handleNavigateToCreateCourse}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                <BookPlus className="h-4 w-4 mr-2" />
                Create New Course
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {myCourses.map((course) => {
                const students = getStudentsInCourse(course.id);
                const avgProgress =
                  students.length > 0
                    ? Math.round(
                        students.reduce(
                          (sum, s) => sum + s.enrollment.progress,
                          0
                        ) / students.length
                      )
                    : 0;

                return (
                  <Card
                    key={course.id}
                    className="group hover:shadow-course-card-hover transition-all duration-300 border-0 shadow-course-card"
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge
                        className={`absolute top-3 right-3 ${
                          course.status === "published"
                            ? "bg-green-500"
                            : course.status === "under_review"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        } text-white`}
                      >
                        {course.status === "published"
                          ? "Published"
                          : course.status === "under_review"
                          ? "Under Review"
                          : "Rejected"}
                      </Badge>
                      {course.bestseller && (
                        <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                          <Award className="h-3 w-3 mr-1" />
                          Bestseller
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          {course.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {course.rating}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Students:</span>
                            <div className="font-medium">{course.students}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Revenue:</span>
                            <div className="font-medium">
                              $
                              {(
                                course.price * course.students
                              ).toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">
                              Avg Progress
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {avgProgress}%
                            </span>
                          </div>
                          <Progress value={avgProgress} />
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{course.lessons} lessons</span>
                          <span>${course.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                        >
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card className="shadow-course-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-600" />
                  Student Management
                </CardTitle>
                <CardDescription>
                  Monitor student progress and engagement across all your
                  courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentStudents.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No students enrolled yet
                    </h3>
                    <p className="text-gray-500">
                      Students will appear here when they enroll in your
                      courses.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentStudents.map((student, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-lg border border-gray-100"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {student.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {student.email}
                              </p>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {student.status}
                            </Badge>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-700 mb-1">
                              Course: {student.courseName}
                            </p>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Progress
                                  value={student.progress}
                                  className="w-24"
                                />
                                <span className="text-sm text-gray-600">
                                  {student.progress}%
                                </span>
                              </div>
                              <span className="text-sm text-gray-500">
                                Enrolled:{" "}
                                {new Date(
                                  student.enrolledDate
                                ).toLocaleDateString()}
                              </span>
                              <span className="text-sm text-gray-500">
                                Last active:{" "}
                                {new Date(
                                  student.lastAccessed
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Course Performance */}
              <Card className="shadow-course-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                    Course Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseStats.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">
                            {course.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {course.students} students
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            ${course.revenue.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">
                            {course.avgProgress}% avg progress
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Revenue */}
              <Card className="shadow-course-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                    Revenue Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        ${totalRevenue.toLocaleString()}
                      </div>
                      <p className="text-green-700 text-sm">Total Revenue</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">
                          {publishedCourses}
                        </div>
                        <p className="text-blue-700 text-sm">
                          Published Courses
                        </p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">
                          {averageRating}
                        </div>
                        <p className="text-purple-700 text-sm">Avg Rating</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}