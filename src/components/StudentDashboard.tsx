import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";
import { useCourses } from "../contexts/CourseContext";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Star,
  Play,
  Calendar,
  Target,
  Users,
  CheckCircle,
  BarChart3,
  Zap,
  Trophy,
  Brain,
} from "lucide-react";

export function StudentDashboard() {
  const { user } = useAuth();
  const { getEnrolledCourses, enrollments } = useCourses();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) return null;

  const enrolledCourses = getEnrolledCourses(user.id);
  const userEnrollments = enrollments.filter((e) => e.studentId === user.id);

  // Calculate stats
  const totalProgress =
    userEnrollments.length > 0
      ? Math.round(
          userEnrollments.reduce((sum, e) => sum + e.progress, 0) /
            userEnrollments.length
        )
      : 0;

  const completedCourses = userEnrollments.filter(
    (e) => e.progress === 100
  ).length;
  const totalLessons = userEnrollments.reduce(
    (sum, e) => sum + e.completedLessons,
    0
  );
  const totalTimeSpent = userEnrollments.reduce((sum, e) => {
    const hours = parseInt(e.timeSpent.split(" ")[0]) || 0;
    return sum + hours;
  }, 0);

  const achievements = [
    {
      id: 1,
      title: "First Course Completed",
      description: "Complete your first course",
      unlocked: completedCourses >= 1,
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 2,
      title: "Dedicated Learner",
      description: "Spend 20+ hours learning",
      unlocked: totalTimeSpent >= 20,
      icon: Brain,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Course Collector",
      description: "Enroll in 3+ courses",
      unlocked: enrolledCourses.length >= 3,
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 4,
      title: "Overachiever",
      description: "Complete 5+ courses",
      unlocked: completedCourses >= 5,
      icon: Award,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const recentActivity = userEnrollments
    .sort(
      (a, b) =>
        new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
    )
    .slice(0, 5);

  const upcomingDeadlines = [
    {
      course: "Complete Web Development Bootcamp",
      task: "Final Project",
      due: "2025-01-25",
    },
    {
      course: "UI/UX Design Masterclass",
      task: "Design Portfolio",
      due: "2025-01-28",
    },
    {
      course: "Data Science with Python",
      task: "Data Analysis Assignment",
      due: "2025-02-02",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-blue-100 text-lg">
                  Ready to continue your learning journey?
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
                    Enrolled Courses
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {enrolledCourses.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-course-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {completedCourses}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-course-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Average Progress
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalProgress}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-course-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Time Learned
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalTimeSpent}h
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
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Continue Learning */}
              <div className="lg:col-span-2">
                <Card className="shadow-course-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Play className="h-5 w-5 mr-2 text-blue-600" />
                      Continue Learning
                    </CardTitle>
                    <CardDescription>
                      Pick up where you left off
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userEnrollments.length === 0 ? (
                      <div className="text-center py-8">
                        <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No courses yet
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Start your learning journey by enrolling in a course!
                        </p>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                          Browse Courses
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userEnrollments
                          .filter((e) => e.progress < 100)
                          .sort(
                            (a, b) =>
                              new Date(b.lastAccessed).getTime() -
                              new Date(a.lastAccessed).getTime()
                          )
                          .slice(0, 3)
                          .map((enrollment) => {
                            const course = enrolledCourses.find(
                              (c) => c.id === enrollment.courseId
                            );
                            if (!course) return null;

                            return (
                              <div
                                key={enrollment.id}
                                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100"
                              >
                                <ImageWithFallback
                                  src={course.image}
                                  alt={course.title}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900 mb-1">
                                    {course.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 mb-2">
                                    by {course.instructor}
                                  </p>
                                  <div className="flex items-center space-x-4">
                                    <Progress
                                      value={enrollment.progress}
                                      className="flex-1"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                      {enrollment.progress}%
                                    </span>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                                >
                                  Continue
                                </Button>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Deadlines */}
              <Card className="shadow-course-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-red-600" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingDeadlines.map((deadline, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {deadline.task}
                          </p>
                          <p className="text-xs text-gray-600 mb-1">
                            {deadline.course}
                          </p>
                          <p className="text-xs text-red-600">
                            Due: {new Date(deadline.due).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Achievements */}
            <Card className="shadow-course-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  Recent Achievements
                </CardTitle>
                <CardDescription>Your latest accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {achievements.slice(0, 4).map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border-2 ${
                          achievement.unlocked
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${
                            achievement.unlocked
                              ? achievement.color
                              : "from-gray-400 to-gray-500"
                          } rounded-xl flex items-center justify-center mb-3`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h4
                          className={`font-medium mb-1 ${
                            achievement.unlocked
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {achievement.title}
                        </h4>
                        <p
                          className={`text-sm ${
                            achievement.unlocked
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          {achievement.description}
                        </p>
                        {achievement.unlocked && (
                          <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card className="shadow-course-card border-0">
              <CardHeader>
                <CardTitle>My Enrolled Courses</CardTitle>
                <CardDescription>
                  Track your progress across all enrolled courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No courses enrolled
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Start learning by enrolling in your first course!
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                      Browse Courses
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {enrolledCourses.map((course) => {
                      const enrollment = userEnrollments.find(
                        (e) => e.courseId === course.id
                      );
                      if (!enrollment) return null;

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
                            {enrollment.progress === 100 && (
                              <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completed
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
                            <p className="text-sm text-gray-600 mb-4">
                              by {course.instructor}
                            </p>

                            <div className="space-y-3">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-gray-600">
                                    Progress
                                  </span>
                                  <span className="text-sm font-medium text-gray-900">
                                    {enrollment.progress}%
                                  </span>
                                </div>
                                <Progress value={enrollment.progress} />
                              </div>

                              <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>
                                  {enrollment.completedLessons} /{" "}
                                  {course.lessons} lessons
                                </span>
                                <span>{enrollment.timeSpent}</span>
                              </div>

                              {enrollment.grade && (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-50 text-green-700"
                                >
                                  Grade: {enrollment.grade}
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <span className="text-sm text-gray-500">
                                Last accessed:{" "}
                                {new Date(
                                  enrollment.lastAccessed
                                ).toLocaleDateString()}
                              </span>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                              >
                                {enrollment.progress === 100
                                  ? "Review"
                                  : "Continue"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card className="shadow-course-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                  Achievements & Badges
                </CardTitle>
                <CardDescription>
                  Your learning milestones and accomplishments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <Card
                        key={achievement.id}
                        className={`group transition-all duration-300 border-2 ${
                          achievement.unlocked
                            ? "border-green-200 bg-green-50 hover:shadow-course-card-hover"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <CardContent className="p-6 text-center">
                          <div
                            className={`w-16 h-16 bg-gradient-to-br ${
                              achievement.unlocked
                                ? achievement.color
                                : "from-gray-400 to-gray-500"
                            } rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                              achievement.unlocked
                                ? "group-hover:scale-110"
                                : ""
                            } transition-transform duration-300`}
                          >
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <h3
                            className={`font-semibold mb-2 ${
                              achievement.unlocked
                                ? "text-gray-900"
                                : "text-gray-500"
                            }`}
                          >
                            {achievement.title}
                          </h3>
                          <p
                            className={`text-sm mb-4 ${
                              achievement.unlocked
                                ? "text-gray-600"
                                : "text-gray-400"
                            }`}
                          >
                            {achievement.description}
                          </p>
                          {achievement.unlocked ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Unlocked
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-gray-500 border-gray-300"
                            >
                              Locked
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="shadow-course-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Learning Activity
                </CardTitle>
                <CardDescription>
                  Your recent learning sessions and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No activity yet
                    </h3>
                    <p className="text-gray-500">
                      Start learning to see your activity here!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((enrollment) => {
                      const course = enrolledCourses.find(
                        (c) => c.id === enrollment.courseId
                      );
                      if (!course) return null;

                      return (
                        <div
                          key={enrollment.id}
                          className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">
                              Continued studying {course.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{enrollment.progress}% complete</span>
                              <span>{enrollment.timeSpent} total</span>
                              <span>
                                {new Date(
                                  enrollment.lastAccessed
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            {enrollment.grade && (
                              <Badge
                                variant="secondary"
                                className="mt-2 bg-green-50 text-green-700"
                              >
                                Current Grade: {enrollment.grade}
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
