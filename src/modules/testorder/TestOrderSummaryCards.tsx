import React from "react";
import { useTranslation } from "react-i18next";

interface StatusCounts {
  pending: number;
  inProgress: number;
  completed: number;
  reviewed: number;
}

interface TestOrderSummaryCardsProps {
  statusCounts: StatusCounts;
}

export const TestOrderSummaryCards: React.FC<TestOrderSummaryCardsProps> = ({
  statusCounts,
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Pending Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              {t("testOrdersPage.summaryCards.pending")}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {statusCounts.pending}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {t("testOrdersPage.summaryCards.pendingSubtitle")}
            </p>
          </div>
          <div className="w-12 h-12 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* In Progress Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              {t("testOrdersPage.summaryCards.inProgress")}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {statusCounts.inProgress}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {t("testOrdersPage.summaryCards.inProgressSubtitle")}
            </p>
          </div>
          <div className="w-12 h-12 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-500"
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
          </div>
        </div>
      </div>

      {/* Completed Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              {t("testOrdersPage.summaryCards.completed")}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {statusCounts.completed}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {t("testOrdersPage.summaryCards.completedSubtitle")}
            </p>
          </div>
          <div className="w-12 h-12 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Reviewed Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              {t("testOrdersPage.summaryCards.reviewed")}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {statusCounts.reviewed}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {t("testOrdersPage.summaryCards.reviewedSubtitle")}
            </p>
          </div>
          <div className="w-12 h-12 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
