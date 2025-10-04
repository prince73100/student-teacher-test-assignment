import React, { useState } from "react";
import {
  User,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  BookOpen,
  Users,
  Calendar,
  Clock,
  FileText,
  Plus,
  Send,
  GraduationCap,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../hook/context/useContext";
import { Link, useNavigate } from "react-router-dom";
import { useServices } from "../hook/useServices";
import { useEffect } from "react";
import useAuth from "../hook/useAuth";

export default function Homepage() {
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const { userInfo } = useAuth();
  console.log(userInfo)
  const { handleCreateAssignMent, getAllAssignment } = useServices()
  const [assignments, setAssignments] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const priorityLevels = [
    { value: "low", label: "Low Priority", color: "text-green-600" },
    { value: "medium", label: "Medium Priority", color: "text-yellow-600" },
    { value: "high", label: "High Priority", color: "text-red-600" },
  ];

  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Art",
  ];

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const res = await handleCreateAssignMent(data)
      console.log(res)
      const newAssignment = res?.data?.assignment;
      setAssignments([newAssignment, ...assignments]);
      reset();
      setShowAssignmentForm(false);
      alert("Assignment created successfully!");
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const [userRole, setUserRole] = useState("student"); // Default role for demo
  const [userName] = useState("John Doe");
  const [userEmail] = useState("john.doe@school.edu");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { accessToken, setAccessToken } = useAppContext();
    const navigation=  useNavigate()
  const handleSignOut = () => {
    localStorage.clear()
    setAccessToken(null)
     navigation('/sign-in')
  };

  const navigationItems = [
    { name: "Dashboard", href: "#", active: true },
    { name: "Assignments", href: "#" },
    { name: "Calendar", href: "#" },
    ...(userRole === "teacher" ? [{ name: "Students", href: "#" }] : []),
    { name: "Messages", href: "#" },
  ];

  useEffect(() => {
    const fetch_all_assignMent = async () => {
      const res = await getAllAssignment();
      setAssignments(res?.data?.assignments)
      console.log(res)
    }
    fetch_all_assignMent()
  }, [])


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${userRole === "teacher" ? "bg-indigo-100" : "bg-green-100"
                    }`}
                >
                  <GraduationCap
                    className={`w-6 h-6 ${userRole === "teacher"
                      ? "text-indigo-600"
                      : "text-green-600"
                      }`}
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-800">
                    EduConnect
                  </h1>
                </div>
              </div>

              <nav className="hidden lg:flex space-x-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${item.active
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {/* Profile Dropdown */}
              {accessToken ? (
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${userRole === "teacher"
                        ? "bg-indigo-500"
                        : "bg-green-500"
                        }`}
                    >
                      {userInfo?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-700">
                        {userInfo?.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {userInfo?.role}
                      </p>
                    </div>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {userInfo?.name}
                        </p>
                        <p className="text-sm text-gray-500">{userInfo?.email}</p>
                        <p className="text-xs text-gray-400 capitalize mt-1">
                          {userInfo?.role} Account
                        </p>
                      </div>

                      <div className="py-2">
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <User className="w-4 h-4 mr-3" />
                          My Profile
                        </a>
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Settings
                        </a>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/sign-in"
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors`}
                >
                  SignIn
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${item.active
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* Mobile Role Switcher */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide px-4 mb-2">
                  Switch Role
                </p>
                <div className="flex space-x-2 px-4">
                  <button
                    onClick={() => setUserRole("student")}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${userRole === "student"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    Student
                  </button>
                  <button
                    onClick={() => setUserRole("teacher")}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${userRole === "teacher"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    Teacher
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <BookOpen className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Assignment Management
                <span className="block text-indigo-600 mt-2">Made Simple</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Streamline your classroom workflow with our comprehensive
                assignment management system. Create, distribute, and track
                assignments effortlessly while keeping students engaged and
                organized.
              </p>
            </div>

            {userInfo?.role === "teacher" && <div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={() => setShowAssignmentForm(true)}
                  className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Assignment
                </button>
                <button className="inline-flex items-center px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200">
                  View All Assignments
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <Users className="w-8 h-8 text-blue-600 mb-4 mx-auto" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">156</h3>
                  <p className="text-gray-600">Active Students</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <FileText className="w-8 h-8 text-green-600 mb-4 mx-auto" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">24</h3>
                  <p className="text-gray-600">Active Assignments</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <CheckCircle className="w-8 h-8 text-purple-600 mb-4 mx-auto" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">89%</h3>
                  <p className="text-gray-600">Completion Rate</p>
                </div>
              </div>
            </div>}
          </div>
        </section>

        {/* Assignment Form Modal */}
        {showAssignmentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-center">
                <h2 className="text-2xl font-bold text-white">
                  Create New Assignment
                </h2>
                <p className="text-indigo-100 mt-2">
                  Fill in the details to assign a new task
                </p>
              </div>

              <div className="p-8">
                <div className="space-y-6">
                  {/* Assignment Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assignment Title *
                    </label>
                    <input
                      {...register("title", {
                        required: "Assignment title is required",
                        minLength: {
                          value: 3,
                          message: "Title must be at least 3 characters",
                        },
                      })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Enter assignment title"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title.message?.toString()}
                      </p>
                    )}
                  </div>
                  {/* Subject and Priority */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        {...register("subject", {
                          required: "Subject is required",
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      >
                        <option value="">Select Subject</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.subject.message?.toString()}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level *
                      </label>
                      <select
                        {...register("level", {
                          required: "Priority is required",
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      >
                        <option value="">Select Priority</option>
                        {priorityLevels.map((priority) => (
                          <option key={priority.value} value={priority.value}>
                            {priority.label}
                          </option>
                        ))}
                      </select>
                      {errors.priority && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.priority.message?.toString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assignment Description *
                    </label>
                    <textarea
                      {...register("description", {
                        required: "Description is required",
                        minLength: {
                          value: 10,
                          message: "Description must be at least 10 characters",
                        },
                      })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                      placeholder="Describe the assignment requirements and instructions..."
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description.message?.toString()}
                      </p>
                    )}
                  </div>

                  {/* Due Date and Student Count */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Due Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...register("dueDate", {
                            required: "Due date is required",
                          })}
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        />
                      </div>
                      {errors.dueDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.dueDate.message?.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting}
                      className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="w-5 h-5 mr-2" />
                          Create Assignment
                        </div>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAssignmentForm(false)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Assignments */}
        {userInfo?.role === "student" && <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Recent Assignments
              </h2>
              <button className="text-indigo-600 hover:text-indigo-500 font-medium">
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {assignment.title}
                    </h3>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          assignment?.level
                        )}`}
                      >
                        {assignment.level}
                      </span>
                    </div> <br />

                  </div>
                  <h3 className="pb-5 text-sm text-gray-900 truncate">
                    {assignment?.description}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Due: <span className="ml-2 font-bold">{assignment.dueDate?.split("T")[0]}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {assignment.role} students
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>}
      </main>

      {/* Click outside to close dropdowns */}
      {isProfileDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
}
