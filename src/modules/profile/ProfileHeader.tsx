"use client";

import { useTranslation } from "react-i18next";
import { ChevronLeft, Search, Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileHeader() {
  const { t } = useTranslation("common");

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
        <div className="flex items-center space-x-6">
          <Link
            to="/admin/dashboard"
            className="p-3 bg-gray-100 hover:bg-blue-100 rounded-xl transition-all duration-200 group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t("profilePage.header.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              {t("profilePage.header.subtitle")}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden xl:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t("profilePage.header.searchPlaceholder")}
              className="pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 transition-all"
            />
          </div>

          <button className="relative p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
            <Bell className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
            <Settings className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
