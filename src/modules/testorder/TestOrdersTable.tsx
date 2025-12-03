import React, { RefObject } from "react";
import { useTranslation } from "react-i18next";
import ReactDOM from "react-dom";
import { TestOrderWithUser } from "../../services/testOrderApi";

// Helper function to get badge styles
const getBadgeStyles = (type: "priority" | "status", variant: string) => {
  if (type === "priority") {
    switch (variant) {
      case "Stat":
        return "bg-red-50 text-red-800";
      case "Urgent":
        return "bg-yellow-50 text-yellow-800";
      case "Routine":
        return "bg-green-50 text-green-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  } else {
    switch (variant) {
      case "Pending":
        return "bg-yellow-50 text-yellow-800";
      case "In Progress":
        return "bg-orange-50 text-orange-700";
      case "Completed":
        return "bg-blue-50 text-blue-800";
      case "Reviewed":
        return "bg-purple-50 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }
};

interface TestOrdersTableProps {
  loading: boolean;
  error: string | null;
  currentOrders: TestOrderWithUser[];
  showActionsDropdown: string | null;
  dropdownPosition: { top: number; left: number };
  actionButtonRefs: RefObject<{ [key: string]: HTMLButtonElement | null }>;
  handleToggleDropdown: (orderNumber: string) => void;
  handleViewDetails: (orderNumber: string) => void;
  handleUpdateOrder: (orderNumber: string) => void;
  handleDeleteOrder: (orderNumber: string) => void;
}

export const TestOrdersTable: React.FC<TestOrdersTableProps> = ({
  loading,
  error,
  currentOrders,
  showActionsDropdown,
  dropdownPosition,
  actionButtonRefs,
  handleToggleDropdown,
  handleViewDetails,
  handleUpdateOrder,
  handleDeleteOrder,
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="overflow-x-auto overflow-y-visible static">
      <table className="min-w-full border-collapse border-spacing-0">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("testOrdersPage.table.orderNumber")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("testOrdersPage.table.patient")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("testOrdersPage.table.testType")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("testOrdersPage.table.priority")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("testOrdersPage.table.status")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("testOrdersPage.table.ordered")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("testOrdersPage.table.actions")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {loading ? (
            <tr className="border-t border-gray-200">
              <td
                colSpan={7}
                className="px-6 py-8 text-center whitespace-nowrap"
              >
                {t("testOrdersPage.table.loading")}
              </td>
            </tr>
          ) : error ? (
            <tr className="border-t border-gray-200">
              <td
                colSpan={7}
                className="px-6 py-8 text-center whitespace-nowrap text-red-600"
              >
                {t("testOrdersPage.table.error")}: {error}
              </td>
            </tr>
          ) : currentOrders.length === 0 ? (
            <tr className="border-t border-gray-200">
              <td
                colSpan={7}
                className="px-6 py-8 text-center whitespace-nowrap"
              >
                {t("testOrdersPage.table.noOrdersFound")}
              </td>
            </tr>
          ) : (
            currentOrders.map((order) => (
              <tr
                key={order.orderNumber}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-600">
                    {order.orderNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {order.patient}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.testType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeStyles(
                      "priority",
                      order.priority
                    )}`}
                  >
                    {order.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeStyles(
                      "status",
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.ordered}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative z-[1]">
                    <button
                      ref={(el) => {
                        if (actionButtonRefs.current) {
                          actionButtonRefs.current[order.orderNumber] = el;
                        }
                      }}
                      data-dropdown-button
                      onClick={() => handleToggleDropdown(order.orderNumber)}
                      className="text-gray-400 bg-transparent border-none cursor-pointer hover:text-gray-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>

                    {showActionsDropdown === order.orderNumber &&
                      ReactDOM.createPortal(
                        <div
                          style={{
                            position: "fixed",
                            top: `${dropdownPosition.top}px`,
                            left: `${dropdownPosition.left}px`,
                          }}
                          className="w-48 bg-white rounded-md shadow-xl z-[9999] border border-gray-200"
                          data-dropdown-menu
                        >
                          <div className="py-1">
                            <button
                              onClick={() =>
                                handleViewDetails(order.orderNumber)
                              }
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 bg-transparent border-none text-left cursor-pointer hover:bg-gray-50"
                            >
                              <svg
                                className="w-4 h-4 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              {t("testOrdersPage.table.viewDetails")}
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateOrder(order.orderNumber)
                              }
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 bg-transparent border-none text-left cursor-pointer hover:bg-gray-50"
                            >
                              <svg
                                className="w-4 h-4 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              {t("testOrdersPage.table.updateTestOrder")}
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteOrder(order.orderNumber)
                              }
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 bg-transparent border-none text-left cursor-pointer hover:bg-gray-50"
                            >
                              <svg
                                className="w-4 h-4 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              {t("testOrdersPage.table.deleteTestOrder")}
                            </button>
                          </div>
                        </div>,
                        document.body
                      )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
