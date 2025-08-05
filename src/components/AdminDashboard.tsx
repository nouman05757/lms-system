import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Alert, AlertDescription } from "./ui/alert";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";
import { useCourses } from "../contexts/CourseContext";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Eye,
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  BookPlus,
  Settings,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

export function AdminDashboard() {
  const { user, updateUser, deleteUser, createUser } = useAuth();
  const { courses, updateCourse, deleteCourse, createCourse, enrollments } =
    useCourses();

  const [editingUser, setEditingUser] = useState<any>(null);
  const [editingCourse, setCourseEditing] = useState<any>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "student",
    status: "active",
  });

  const [courseFormData, setCourseFormData] = useState({
    title: "",
    instructor: "",
    instructorId: "",
    category: "",
    level: "Beginner",
    price: "",
    originalPrice: "",
    duration: "",
    lessons: "",
    description: "",
    image: "",
  });

  // Filter users
  const filteredUsers = users.filter((userItem) => {
    const matchesSearch =
      userItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userItem.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      userFilter === "all" ||
      userItem.role === userFilter ||
      userItem.status === userFilter;
    return matchesSearch && matchesFilter;
  });

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      courseFilter === "all" ||
      course.category === courseFilter ||
      course.status === courseFilter;
    return matchesSearch && matchesFilter;
  });

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, userFormData);
      setEditingUser(null);
    } else {
      createUser(userFormData);
    }
    setUserFormData({ name: "", email: "", role: "student", status: "active" });
    setShowUserForm(false);
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const courseData = {
      ...courseFormData,
      price: parseFloat(courseFormData.price),
      originalPrice: parseFloat(courseFormData.originalPrice),
      lessons: parseInt(courseFormData.lessons),
      bestseller: false,
    };

    if (editingCourse) {
      updateCourse(editingCourse.id, courseData);
      setCourseEditing(null);
    } else {
      createCourse(courseData);
    }
    setCourseFormData({
      title: "",
      instructor: "",
      instructorId: "",
      category: "",
      level: "Beginner",
      price: "",
      originalPrice: "",
      duration: "",
      lessons: "",
      description: "",
      image: "",
    });
    setShowCourseForm(false);
  };

  const startEditUser = (user: any) => {
    setEditingUser(user);
    setUserFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setShowUserForm(true);
  };

  const startEditCourse = (course: any) => {
    setCourseEditing(course);
    setCourseFormData({
      title: course.title,
      instructor: course.instructor,
      instructorId: course.instructorId,
      category: course.category,
      level: course.level,
      price: course.price.toString(),
      originalPrice: course.originalPrice.toString(),
      duration: course.duration,
      lessons: course.lessons.toString(),
      description: course.description,
      image: course.image,
    });
    setShowCourseForm(true);
  };

  const handleDeleteUser = (userToDelete: any) => {
    // Prevent admin from deleting themselves
    if (user && userToDelete.id === user.id) {
      alert("You cannot delete your own account.");
      return;
    }
    setUserToDelete(userToDelete);
    setShowDeleteDialog(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      try {
        deleteUser(userToDelete.id);
        console.log("User deleted successfully:", userToDelete.name);
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
      setUserToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  const totalStudents = users.filter((u) => u.role === "student").length;
  const totalTeachers = users.filter((u) => u.role === "teacher").length;
  const totalEnrollments = enrollments.length;
  const totalRevenue = courses.reduce(
    (sum, course) => sum + course.price * course.students,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage users, courses, and platform analytics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalStudents}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Teachers
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalTeachers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Courses
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {courses.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
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

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-1 max-w-md items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="student">Students</SelectItem>
                    <SelectItem value="teacher">Teachers</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setShowUserForm(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((tableUser) => (
                    <TableRow key={tableUser.id}>
                      <TableCell>{tableUser.name}</TableCell>
                      <TableCell>{tableUser.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            tableUser.role === "admin" ? "default" : "secondary"
                          }
                        >
                          {tableUser.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            tableUser.status === "active"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {tableUser.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(tableUser.joinDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEditUser(tableUser)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteUser(tableUser)}
                            disabled={user?.id === tableUser.id}
                            title={
                              user?.id === tableUser.id
                                ? "Cannot delete your own account"
                                : "Delete user"
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-1 max-w-md items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Programming">Programming</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setShowCourseForm(true)}>
                <BookPlus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card
                  key={course.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant={
                          course.status === "published"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {course.status}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      by {course.instructor}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>{course.category}</span>
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          ${course.price}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEditCourse(course)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteCourse(course.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Enrollments Tab */}
          <TabsContent value="enrollments" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-1 max-w-md items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search enrollments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Student Enrollments</CardTitle>
                <CardDescription>
                  Track all student course enrollments and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enrollments.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-lg text-gray-600">
                      No enrollments found
                    </p>
                    <p className="text-gray-500">
                      Students will appear here when they enroll in courses.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Enrolled Date</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Completed Lessons</TableHead>
                        <TableHead>Time Spent</TableHead>
                        <TableHead>Last Accessed</TableHead>
                        <TableHead>Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrollments
                        .filter((enrollment) => {
                          const student = users.find(
                            (u) => u.id === enrollment.studentId
                          );
                          const course = courses.find(
                            (c) => c.id === enrollment.courseId
                          );
                          const searchLower = searchTerm.toLowerCase();

                          return (
                            student?.name.toLowerCase().includes(searchLower) ||
                            student?.email
                              .toLowerCase()
                              .includes(searchLower) ||
                            course?.title.toLowerCase().includes(searchLower) ||
                            course?.instructor
                              .toLowerCase()
                              .includes(searchLower)
                          );
                        })
                        .map((enrollment) => {
                          const student = users.find(
                            (u) => u.id === enrollment.studentId
                          );
                          const course = courses.find(
                            (c) => c.id === enrollment.courseId
                          );

                          if (!student || !course) return null;

                          return (
                            <TableRow key={enrollment.id}>
                              <TableCell>
                                <div>
                                  <div>{student.name}</div>
                                  <div className="text-sm text-gray-500">
                                    {student.email}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">
                                    {course.title}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {course.category}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{course.instructor}</TableCell>
                              <TableCell>
                                {new Date(
                                  enrollment.enrolledDate
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                                    <div
                                      className="h-2 bg-blue-600 rounded-full"
                                      style={{
                                        width: `${enrollment.progress}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-600">
                                    {enrollment.progress}%
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span>
                                  {enrollment.completedLessons} /{" "}
                                  {course.lessons}
                                </span>
                              </TableCell>
                              <TableCell>{enrollment.timeSpent}</TableCell>
                              <TableCell>
                                {new Date(
                                  enrollment.lastAccessed
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {enrollment.grade ? (
                                  <Badge variant="secondary">
                                    {enrollment.grade}
                                  </Badge>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Enrollment Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Total Enrollments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{enrollments.length}</div>
                  <p className="text-sm text-gray-600">
                    Active student enrollments
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Average Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {enrollments.length > 0
                      ? Math.round(
                          enrollments.reduce((sum, e) => sum + e.progress, 0) /
                            enrollments.length
                        )
                      : 0}
                    %
                  </div>
                  <p className="text-sm text-gray-600">
                    Across all enrollments
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Active This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {
                      enrollments.filter((e) => {
                        const lastAccessed = new Date(e.lastAccessed);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return lastAccessed > weekAgo;
                      }).length
                    }
                  </div>
                  <p className="text-sm text-gray-600">
                    Students active in last 7 days
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Programming", "Design", "Business", "Marketing"].map(
                      (category) => {
                        const categoryCount = courses.filter(
                          (c) => c.category === category
                        ).length;
                        const percentage =
                          (categoryCount / courses.length) * 100;
                        return (
                          <div
                            key={category}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-600">
                              {category}
                            </span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full">
                                <div
                                  className="h-2 bg-blue-600 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-900">
                                {categoryCount}
                              </span>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses
                      .filter((course) =>
                        enrollments.some((e) => e.courseId === course.id)
                      )
                      .sort((a, b) => {
                        const aEnrollments = enrollments.filter(
                          (e) => e.courseId === a.id
                        ).length;
                        const bEnrollments = enrollments.filter(
                          (e) => e.courseId === b.id
                        ).length;
                        return bEnrollments - aEnrollments;
                      })
                      .slice(0, 5)
                      .map((course) => {
                        const courseEnrollments = enrollments.filter(
                          (e) => e.courseId === course.id
                        );
                        return (
                          <div
                            key={course.id}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {course.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                by {course.instructor}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">
                                {courseEnrollments.length}
                              </p>
                              <p className="text-xs text-gray-500">enrolled</p>
                            </div>
                          </div>
                        );
                      })}
                    {courses.filter((course) =>
                      enrollments.some((e) => e.courseId === course.id)
                    ).length === 0 && (
                      <p className="text-sm text-gray-500">
                        No enrollments yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Enrollment Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Enrollment Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrollments
                    .sort(
                      (a, b) =>
                        new Date(b.lastAccessed).getTime() -
                        new Date(a.lastAccessed).getTime()
                    )
                    .slice(0, 10)
                    .map((enrollment) => {
                      const student = users.find(
                        (u) => u.id === enrollment.studentId
                      );
                      const course = courses.find(
                        (c) => c.id === enrollment.courseId
                      );
                      if (!student || !course) return null;

                      return (
                        <div
                          key={enrollment.id}
                          className="flex items-start space-x-3"
                        >
                          <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">
                                {student.name}
                              </span>{" "}
                              accessed{" "}
                              <span className="font-medium">
                                {course.title}
                              </span>
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <p className="text-xs text-gray-500">
                                {enrollment.progress}% complete
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(
                                  enrollment.lastAccessed
                                ).toLocaleDateString()}
                              </p>
                              {enrollment.grade && (
                                <Badge variant="secondary" className="text-xs">
                                  {enrollment.grade}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {enrollments.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No enrollment activity yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>
                  Configure platform-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    Platform settings and configurations will be available here
                    for customizing the LMS behavior.
                  </AlertDescription>
                </Alert>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Default Course Duration</Label>
                    <Input placeholder="e.g., 30 hours" />
                  </div>
                  <div>
                    <Label>Maximum Students per Course</Label>
                    <Input placeholder="e.g., 1000" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* User Form Modal */}
        {showUserForm && (
          <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingUser ? "Edit User" : "Add New User"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUserSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={userFormData.name}
                    onChange={(e) =>
                      setUserFormData({ ...userFormData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userFormData.email}
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={userFormData.role}
                    onValueChange={(value) =>
                      setUserFormData({ ...userFormData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={userFormData.status}
                    onValueChange={(value) =>
                      setUserFormData({ ...userFormData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowUserForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingUser ? "Update User" : "Create User"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete User Confirmation Dialog */}
        {showDeleteDialog && (
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete user "{userToDelete?.name}"?
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDeleteUser}>
                  Delete User
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Course Form Modal */}
        {showCourseForm && (
          <Dialog open={showCourseForm} onOpenChange={setShowCourseForm}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingCourse ? "Edit Course" : "Add New Course"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCourseSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      value={courseFormData.title}
                      onChange={(e) =>
                        setCourseFormData({
                          ...courseFormData,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input
                      id="instructor"
                      value={courseFormData.instructor}
                      onChange={(e) =>
                        setCourseFormData({
                          ...courseFormData,
                          instructor: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={courseFormData.category}
                      onValueChange={(value) =>
                        setCourseFormData({
                          ...courseFormData,
                          category: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Programming">Programming</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Photography">Photography</SelectItem>
                        <SelectItem value="Music">Music</SelectItem>
                        <SelectItem value="Language">Language</SelectItem>
                        <SelectItem value="Health & Fitness">
                          Health & Fitness
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="level">Level</Label>
                    <Select
                      value={courseFormData.level}
                      onValueChange={(value) =>
                        setCourseFormData({ ...courseFormData, level: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={courseFormData.price}
                      onChange={(e) =>
                        setCourseFormData({
                          ...courseFormData,
                          price: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      value={courseFormData.originalPrice}
                      onChange={(e) =>
                        setCourseFormData({
                          ...courseFormData,
                          originalPrice: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 42 hours"
                      value={courseFormData.duration}
                      onChange={(e) =>
                        setCourseFormData({
                          ...courseFormData,
                          duration: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lessons">Number of Lessons</Label>
                    <Input
                      id="lessons"
                      type="number"
                      value={courseFormData.lessons}
                      onChange={(e) =>
                        setCourseFormData({
                          ...courseFormData,
                          lessons: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={courseFormData.description}
                    onChange={(e) =>
                      setCourseFormData({
                        ...courseFormData,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://..."
                    value={courseFormData.image}
                    onChange={(e) =>
                      setCourseFormData({
                        ...courseFormData,
                        image: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCourseForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingCourse ? "Update Course" : "Create Course"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
