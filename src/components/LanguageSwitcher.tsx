import React from "react";
import { useTranslation } from "react-i18next";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "vi", label: "Tiếng Việt" },
];

export interface LanguageSwitcherProps {
  className?: string;
  variant?: "floating" | "inline";
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
  variant = "floating",
}) => {
  const { i18n } = useTranslation();

  const handleSwitch = (lng: string) => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  };

  const containerClasses =
    variant === "floating"
      ? "fixed bottom-6 right-6 z-50 shadow-lg border border-gray-200 rounded-full px-4 py-2 bg-white"
      : "inline-flex border border-gray-200 rounded-full px-3 py-1 bg-white";

  return (
    <div
      className={`${containerClasses} flex items-center space-x-2 ${className}`}
    >
      <GlobeAltIcon className="h-5 w-5 text-gray-500" />
      <div className="flex items-center space-x-1">
        {SUPPORTED_LANGUAGES.map(({ code, label }) => {
          const isActive = i18n.language === code;

          return (
            <button
              key={code}
              onClick={() => handleSwitch(code)}
              className={`text-sm font-medium px-2 py-1 rounded-full transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              aria-pressed={isActive}
              aria-label={`Switch to ${label}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSwitcher;

