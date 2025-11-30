import React from "react";
import { useTranslation } from "react-i18next";

interface TestOrdersSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const TestOrdersSearchBar: React.FC<TestOrdersSearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex justify-end mb-4">
      <div className="relative w-64">
        <input
          type="text"
          placeholder={t("testOrdersPage.filters.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
        />
        <div className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
