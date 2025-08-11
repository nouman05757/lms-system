import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";
import { useCourses } from "../contexts/CourseContext";
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Heart,
  Play,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export function CoursesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { courses, enrollInCourse, getEnrolledCourses } = useCourses();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const enrolledCourses = user ? getEnrolledCourses(user.id) : [];
  const enrolledCourseIds = enrolledCourses.map((course) => course.id);

  // Filter and sort
  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "all" || course.level === selectedLevel;
      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        course.status === "published"
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price":
          return a.price - b.price;
        case "newest":
          return new Date(b.updated).getTime() - new Date(a.updated).getTime();
        case "popular":
        default:
          return b.students - a.students;
      }
    });

  const categories = [...new Set(courses.map((course) => course.category))];

  const handleEnroll = (courseId: number) => {
    if (!user) {
      toast.error("Please sign in to enroll in courses");
      navigate("/signup");
      return;
    }

    if (user.role !== "student") {
      toast.error("Only students can enroll in courses");
      return;
    }

    if (enrollInCourse(courseId)) {
      toast.success("Successfully enrolled in course!");
    } else {
      toast.error("You are already enrolled in this course");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getDiscountPercentage = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              Discover Your Next Course
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Learn from industry experts and advance your career with our
              comprehensive online courses
            </p>
            <div className="flex items-center justify-center space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">500K+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span className="text-sm">{courses.length}+ Courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span className="text-sm">Expert Instructors</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48 h-12 border-gray-200">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full sm:w-48 h-12 border-gray-200">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 h-12 border-gray-200">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {filteredCourses.length}{" "}
            {filteredCourses.length === 1 ? "Course" : "Courses"}
            {searchTerm && ` for "${searchTerm}"`}
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredCourses.length} of {courses.length} courses
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedLevel("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.id);
              const discountPercentage = getDiscountPercentage(
                course.originalPrice,
                course.price
              );

              return (
                <Card
                  key={course.id}
                  className="group hover:shadow-course-card-hover transition-all duration-300 border-0 shadow-course-card bg-white rounded-xl overflow-hidden"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {course.bestseller && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-xs font-semibold px-2 py-1">
                          <Award className="h-3 w-3 mr-1" />
                          Bestseller
                        </Badge>
                      )}
                      {discountPercentage > 0 && (
                        <Badge className="bg-green-500 text-white border-0 text-xs font-semibold px-2 py-1">
                          {discountPercentage}% OFF
                        </Badge>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                      >
                        <Heart className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>

                    {isEnrolled && (
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-green-500 text-white border-0 text-xs font-medium px-2 py-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Enrolled
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium bg-blue-50 text-blue-700"
                      >
                        {course.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {course.level}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-base leading-tight">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3">
                      by {course.instructor}
                    </p>

                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {course.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({course.reviews.toLocaleString()} reviews)
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Play className="h-3 w-3" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(course.price)}
                        </span>
                        {course.originalPrice > course.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(course.originalPrice)}
                          </span>
                        )}
                      </div>

                      {isEnrolled ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-200 text-green-700 hover:bg-green-50"
                        >
                          View Course
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleEnroll(course.id)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg"
                        >
                          Enroll Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
