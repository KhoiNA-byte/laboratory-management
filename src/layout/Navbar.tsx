// src/components/Navbar.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { logoutRequest } from "../store/slices/authSlice";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";

type RouteMeta = {
  titleKey: string;
  subtitleKey: string;
  fallbackTitle: string;
  fallbackSubtitle: string;
};

const ROUTE_META: Record<string, RouteMeta> = {
  "/admin/dashboard": {
    titleKey: "pages.dashboard.title",
    subtitleKey: "pages.dashboard.subtitle",
    fallbackTitle: "Dashboard",
    fallbackSubtitle: "Overview of laboratory operations and statistics",
  },
  "/admin/my-test-results": {
    titleKey: "pages.myTestResults.title",
    subtitleKey: "pages.myTestResults.subtitle",
    fallbackTitle: "Test Results",
    fallbackSubtitle: "Your laboratory test history and results",
  },
  "/admin/test-orders": {
    titleKey: "pages.testOrders.title",
    subtitleKey: "pages.testOrders.subtitle",
    fallbackTitle: "Test Orders",
    fallbackSubtitle: "Manage laboratory test orders",
  },
  "/admin/test-orders/new": {
    titleKey: "pages.newTestOrder.title",
    subtitleKey: "pages.newTestOrder.subtitle",
    fallbackTitle: "New Test Order",
    fallbackSubtitle: "Create a new test order",
  },
  "/admin/users": {
    titleKey: "pages.users.title",
    subtitleKey: "pages.users.subtitle",
    fallbackTitle: "Users Management",
    fallbackSubtitle: "Manage system users and their access permissions",
  },
  "/admin/roles": {
    titleKey: "pages.roles.title",
    subtitleKey: "pages.roles.subtitle",
    fallbackTitle: "Roles Management",
    fallbackSubtitle: "Manage user roles and permissions",
  },
  "/admin/patients": {
    titleKey: "pages.patients.title",
    subtitleKey: "pages.patients.subtitle",
    fallbackTitle: "Patient Records",
    fallbackSubtitle: "Manage patient medical records and information",
  },
  "/admin/instruments": {
    titleKey: "pages.instruments.title",
    subtitleKey: "pages.instruments.subtitle",
    fallbackTitle: "Instruments",
    fallbackSubtitle: "Manage laboratory instruments and equipment",
  },
  "/admin/warehouse": {
    titleKey: "pages.warehouse.title",
    subtitleKey: "pages.warehouse.subtitle",
    fallbackTitle: "Warehouse",
    fallbackSubtitle: "Manage reagents and laboratory supplies",
  },
  "/admin/monitoring": {
    titleKey: "pages.monitoring.title",
    subtitleKey: "pages.monitoring.subtitle",
    fallbackTitle: "System Monitoring",
    fallbackSubtitle: "Monitor system health, event logs, and performance metrics",
  },
  "/admin/reports": {
    titleKey: "pages.reports.title",
    subtitleKey: "pages.reports.subtitle",
    fallbackTitle: "Reports",
    fallbackSubtitle: "Generate and export laboratory reports",
  },
  "/admin/profile": {
    titleKey: "pages.profile.title",
    subtitleKey: "pages.profile.subtitle",
    fallbackTitle: "Profile",
    fallbackSubtitle: "View and manage information",
  },
  "/admin/settings": {
    titleKey: "pages.settings.title",
    subtitleKey: "pages.settings.subtitle",
    fallbackTitle: "Settings",
    fallbackSubtitle: "Manage settings and configurations",
  },
  "/admin/audit-logs": {
    titleKey: "pages.auditLogs.title",
    subtitleKey: "pages.auditLogs.subtitle",
    fallbackTitle: "Audit Logs",
    fallbackSubtitle: "Review security and activity logs",
  },
  "/admin/flagging-rules": {
    titleKey: "pages.flaggingRules.title",
    subtitleKey: "pages.flaggingRules.subtitle",
    fallbackTitle: "Flagging Rules",
    fallbackSubtitle: "Configure instrument flagging rules",
  },
};

export interface NavbarProps {
  title?: string;
  subtitle?: string;
}

export const Navbar = ({
  title: propTitle,
  subtitle: propSubtitle,
}: NavbarProps) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { t } = useTranslation("common");
  const meta = ROUTE_META[location.pathname];

  const title =
    propTitle ??
    (meta ? t(meta.titleKey, { defaultValue: meta.fallbackTitle }) : "Default Title");
  const subtitle =
    propSubtitle ??
    (meta ? t(meta.subtitleKey, { defaultValue: meta.fallbackSubtitle }) : "");

  const handleLogout = () => dispatch(logoutRequest());

  return (
    <div className="bg-white">
      
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-1">{subtitle}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <BellIcon className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
