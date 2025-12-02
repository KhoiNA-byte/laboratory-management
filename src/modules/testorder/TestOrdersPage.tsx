import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
// Redux actions
import {
  fetchTestOrdersRequest,
  deleteTestOrderRequest,
} from "../../store/slices/testOrderSlice";
// Components
import { TestOrderSummaryCards } from "./TestOrderSummaryCards";
import { TestOrdersTable } from "./TestOrdersTable";
import { TestOrdersSearchBar } from "./TestOrdersSearchBar";
import { TestOrdersTabs } from "./TestOrdersTabs";

export const TestOrdersPage = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get data from Redux store
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    testOrdersWithUser: testOrders,
    loading,
    error,
  } = useSelector((state: RootState) => state.testOrders);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showActionsDropdown, setShowActionsDropdown] = useState<string | null>(
    null
  );
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const actionButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>(
    {}
  );

  //Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const orderPerPage = 4;

  // Fetch test orders from Redux Saga
  useEffect(() => {
    if (user) {
      const userRole = user.role || "";
      const userId = user.id || "";

      console.log("Dispatching fetchTestOrdersRequest with:", {
        userRole,
        userId,
      });

      // Dispatch action to trigger saga
      dispatch(fetchTestOrdersRequest({ userRole, userId }));
    }
  }, [user, dispatch]);

  const handleViewDetails = (orderNumber: string) => {
    console.log("View Details clicked for:", orderNumber);
    navigate(`/admin/test-orders/${orderNumber}`);
  };

  const handleUpdateOrder = (orderNumber: string) => {
    console.log("Update order:", orderNumber);
    setShowActionsDropdown(null);
    navigate(`/admin/test-orders/${orderNumber}/edit`);
  };

  const handleDeleteOrder = async (orderNumber: string) => {
    // Confirm deletion
    const confirmDelete = window.confirm(
      t("testOrdersPage.table.confirmDelete", { orderNumber })
    );

    if (!confirmDelete) {
      setShowActionsDropdown(null);
      return;
    }

    // Dispatch delete action to saga
    console.log("Dispatching deleteTestOrderRequest for:", orderNumber);
    dispatch(deleteTestOrderRequest(orderNumber));
    setShowActionsDropdown(null);
  };

  const handleToggleDropdown = (orderNumber: string) => {
    if (showActionsDropdown === orderNumber) {
      setShowActionsDropdown(null);
    } else {
      const button = actionButtonRefs.current[orderNumber];
      if (button) {
        const rect = button.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 5,
          left: rect.right - 192, // 192px = 12rem (dropdown width)
        });
      }
      setShowActionsDropdown(orderNumber);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showActionsDropdown) {
        const target = event.target as HTMLElement;
        const isInsideDropdown = target.closest("[data-dropdown-menu]");
        const isInsideButton = target.closest("[data-dropdown-button]");

        if (!isInsideDropdown && !isInsideButton) {
          setShowActionsDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showActionsDropdown]);

  const handleNewOrder = () => {
    navigate("/admin/test-orders/new");
  };

  const filteredOrders = testOrders.filter((order) => {
    // Filter by active tab
    const matchesTab = activeTab === "all" || order.status === activeTab;

    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.testType.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / orderPerPage);
  const startIndex = (currentPage - 1) * orderPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + orderPerPage
  );

  //Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  // Calculate counts for summary cards
  const statusCounts = {
    pending: testOrders.filter((order) => order.status === "Pending").length,
    inProgress: testOrders.filter((order) => order.status === "In Progress")
      .length,
    completed: testOrders.filter((order) => order.status === "Completed")
      .length,
    reviewed: testOrders.filter((order) => order.status === "Reviewed").length,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Summary Cards */}
      <TestOrderSummaryCards statusCounts={statusCounts} />

      {/* All Test Orders Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-visible relative">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t("testOrdersPage.allOrders.title")}
              </h3>
              <p className="text-sm text-gray-500">
                {t("testOrdersPage.allOrders.subtitle")}
              </p>
            </div>
            <button
              onClick={handleNewOrder}
              className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg border-none transition-colors duration-200 flex items-center gap-2 cursor-pointer hover:bg-blue-700"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {t("testOrdersPage.filters.newOrder")}
            </button>
          </div>

          <div className="flex flex-row justify-between items-center">
            {/* Tabs */}
            <TestOrdersTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Search Bar */}
            <TestOrdersSearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </div>

        {/* Test Orders Table */}
        <TestOrdersTable
          loading={loading}
          error={error}
          currentOrders={currentOrders}
          showActionsDropdown={showActionsDropdown}
          dropdownPosition={dropdownPosition}
          actionButtonRefs={actionButtonRefs}
          handleToggleDropdown={handleToggleDropdown}
          handleViewDetails={handleViewDetails}
          handleUpdateOrder={handleUpdateOrder}
          handleDeleteOrder={handleDeleteOrder}
        />
      </div>
      {/* Pagination Controls */}
      {filteredOrders.length > 0 && (
        <div className="flex justify-center items-center mt-0 mb-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 disabled:cursor-not-allowed"
          >
            {t("common.previous")}
          </button>
          <span className="text-sm text-gray-600">
            {t("common.page", { current: currentPage, total: totalPages })}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 disabled:cursor-not-allowed"
          >
            {t("common.next")}
          </button>
        </div>
      )}
    </div>
  );
};
