import React from "react";
import { useTranslation } from "react-i18next";

type OrderStatus = "pending" | "inProgress" | "completed";
type Order = {
    name: string;
    test: string;
    status: OrderStatus;
    time: string;
};

type AlertType = "critical" | "warning" | "info";
type Alert = {
    title: string;
    description: string;
    time: string;
    type: AlertType;
};

export const DashboardPage = () => {
    const { t } = useTranslation("common");

    const statsCards = [
        {
            label: t("dashboardPage.stats.totalPatients.label"),
            value: "2,847",
            change: t("dashboardPage.stats.totalPatients.change"),
            changeClass: "text-green-600",
            icon: (
                <svg
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                </svg>
            ),
        },
        {
            label: t("dashboardPage.stats.pendingTests.label"),
            value: "47",
            change: t("dashboardPage.stats.pendingTests.change"),
            changeClass: "text-red-600",
            icon: (
                <svg
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                </svg>
            ),
        },
        {
            label: t("dashboardPage.stats.activeInstruments.label"),
            value: "12/15",
            change: t("dashboardPage.stats.activeInstruments.change"),
            changeClass: "text-gray-500",
            icon: (
                <svg
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                </svg>
            ),
        },
        {
            label: t("dashboardPage.stats.alerts.label"),
            value: "5",
            change: t("dashboardPage.stats.alerts.change"),
            changeClass: "text-gray-500",
            icon: (
                <svg
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
        },
    ];

    const recentOrders = t("dashboardPage.recentOrders.items", {
        returnObjects: true,
    }) as Order[];
    const orderStatuses = t("dashboardPage.recentOrders.statuses", {
        returnObjects: true,
    }) as Record<OrderStatus, string>;
    const systemAlerts = t("dashboardPage.systemAlerts.items", {
        returnObjects: true,
    }) as Alert[];

    const statusColors: Record<OrderStatus, string> = {
        pending: "bg-gray-100 text-gray-800",
        inProgress: "bg-blue-100 text-blue-800",
        completed: "bg-blue-600 text-white",
    };

    const alertColors: Record<AlertType, string> = {
        critical: "text-red-600",
        warning: "text-yellow-600",
        info: "text-blue-600",
    };

    const renderAlertIcon = (type: AlertType) => {
        if (type === "info") {
            return (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            );
        }

        return (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
        );
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsCards.map((stat, index) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">
                                    {stat.label}
                                </p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                <p className={`text-sm mt-1 ${stat.changeClass}`}>{stat.change}</p>
                            </div>
                            <div className="w-12 h-12 flex items-center justify-center">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Test Orders */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {t("dashboardPage.recentOrders.title")}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {t("dashboardPage.recentOrders.subtitle")}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {recentOrders.map((order, index) => (
                            <div
                                key={`${order.name}-${index}`}
                                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg
                                        className="h-4 w-4 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{order.name}</p>
                                    <p className="text-sm text-gray-600">{order.test}</p>
                                </div>
                                <div className="text-right">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                                    >
                                        {orderStatuses[order.status]}
                                    </span>
                                    <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Alerts */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {t("dashboardPage.systemAlerts.title")}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {t("dashboardPage.systemAlerts.subtitle")}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {systemAlerts.map((alert, index) => (
                            <div
                                key={`${alert.title}-${index}`}
                                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <svg
                                        className={`h-4 w-4 ${alertColors[alert.type]}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {renderAlertIcon(alert.type)}
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{alert.title}</p>
                                    <p className="text-sm text-gray-600">{alert.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
