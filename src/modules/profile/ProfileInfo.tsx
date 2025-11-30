// ProfileInfo.tsx
"use client";
import { useTranslation } from "react-i18next";
import {
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  Shield,
  Edit,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function ProfileInfo() {
  const { t } = useTranslation("common");
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return (
      <div className="bg-gray-50 rounded-3xl shadow-lg border border-gray-200 p-12 h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 mx-auto">
            ?
          </div>
          <p className="text-2xl text-gray-500 font-medium">
            No user data available
          </p>
        </div>
      </div>
    );
  }

  const getAvatarFromName = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      {/* Left Sidebar - Profile Card */}
      <div className="xl:col-span-1">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 sticky top-8">
          <div className="text-center">
            {/* Avatar */}
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg mx-auto">
                {getAvatarFromName(user.name || "User")}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {user.name}
            </h2>
            <p className="text-gray-600 mb-1 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              {user.role}
            </p>

            {/* Status Badge */}
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full ${
                user.status === "active"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              } text-sm font-semibold mb-6`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  user.status === "active" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              {user.status === "active" ? "Active" : "Inactive"}
            </div>

            {/* Edit Button */}
            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="xl:col-span-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Personal Information
              </h3>
            </div>

            <div className="space-y-6">
              {/* Age & Gender */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-gray-700 font-medium">Age / Gender</span>
                <span className="text-gray-900 font-semibold text-lg">
                  {user.age} years - {user.gender}
                </span>
              </div>

              {/* Last Login */}
              {user.lastLogin && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Last Login</span>
                  <span className="text-gray-900 font-semibold text-sm text-right">
                    {formatDate(user.lastLogin)}
                  </span>
                </div>
              )}

              {/* Role */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-gray-700 font-medium">Role</span>
                <span className="text-gray-900 font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-2xl">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Contact Information
              </h3>
            </div>

            <div className="space-y-6">
              {/* Phone */}
              <div className="p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600 font-medium">
                    Phone
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-900 pl-8">
                  {user.phone}
                </p>
              </div>

              {/* Email */}
              <div className="p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600 font-medium">
                    Email
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-900 pl-8">
                  {user.email}
                </p>
              </div>

              {/* Address */}
              <div className="p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm text-gray-600 font-medium">
                    Address
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-900 pl-8 leading-relaxed">
                  {user.address}
                </p>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 rounded-2xl">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Account Details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Info */}
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  User Information
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">User ID</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {user.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {user.status === "active" ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Additional Information
                </h4>
                <div className="text-center py-4">
                  <p className="text-gray-500">
                    No additional information available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
