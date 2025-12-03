import React from "react";
import { useTranslation } from "react-i18next";

interface TestOrdersTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TestOrdersTabs: React.FC<TestOrdersTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { t } = useTranslation("common");

  const tabs = [
    { key: "all", label: t("testOrdersPage.filters.allOrders") },
    { key: "Pending", label: t("testOrdersPage.filters.pending") },
    { key: "In Progress", label: t("testOrdersPage.filters.inProgress") },
    { key: "Completed", label: t("testOrdersPage.filters.completed") },
    { key: "Reviewed", label: t("testOrdersPage.filters.reviewed") },
  ];

  return (
    <div className="flex gap-8 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`pb-2 text-sm font-medium border-t-0 border-l-0 border-r-0 border-b-2 bg-transparent cursor-pointer transition-all duration-200 ${
            activeTab === tab.key
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
