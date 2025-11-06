import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewTestOrderPage: React.FC = () => {
  const navigate = useNavigate();

  // Form state - initially empty for new order
  const [formData, setFormData] = useState({
    patient: "",
    mrn: "",
    priority: "Routine",
    orderedBy: "",
    testType: "",
    status: "Pending",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Creating new test order:", formData);
    // Here you would typically make an API call to create the test order
    navigate("/admin/test-orders");
  };

  const handleCancel = () => {
    navigate("/admin/test-orders");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">
              Test Order Information
            </h1>
            <p className="text-sm text-gray-600 mt-1">Add the test order details</p>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient
                  </label>
                  <div className="relative">
                    <select
                      value={formData.patient ? `${formData.patient} (${formData.mrn || "MRN-2024-001"})` : ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          const match = value.match(/^(.+?)\s*\((.+?)\)$/);
                          if (match) {
                            setFormData({
                              ...formData,
                              patient: match[1].trim(),
                              mrn: match[2].trim(),
                            });
                          } else {
                            handleInputChange("patient", value);
                          }
                        } else {
                          setFormData({ ...formData, patient: "", mrn: "" });
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                    >
                      <option value="">Select a patient</option>
                      <option value="John Doe (MRN-2024-001)">
                        John Doe (MRN-2024-001)
                      </option>
                      <option value="Jane Smith (MRN-2024-002)">
                        Jane Smith (MRN-2024-002)
                      </option>
                      <option value="Robert Johnson (MRN-2024-003)">
                        Robert Johnson (MRN-2024-003)
                      </option>
                      <option value="Emily Williams (MRN-2024-004)">
                        Emily Williams (MRN-2024-004)
                      </option>
                      <option value="Michael Brown (MRN-2024-005)">
                        Michael Brown (MRN-2024-005)
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <div className="relative">
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        handleInputChange("priority", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                    >
                      <option value="Routine">Routine</option>
                      <option value="Urgent">Urgent</option>
                      <option value="Stat">Stat</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ordered By
                  </label>
                  <input
                    type="text"
                    value={formData.orderedBy}
                    onChange={(e) =>
                      handleInputChange("orderedBy", e.target.value)
                    }
                    placeholder="Enter doctor's name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Test Type
                  </label>
                  <div className="relative">
                    <select
                      value={formData.testType}
                      onChange={(e) =>
                        handleInputChange("testType", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                    >
                      <option value="">Select test type</option>
                      <option value="Complete Blood Count (CBC)">
                        Complete Blood Count (CBC)
                      </option>
                      <option value="Lipid Panel">Lipid Panel</option>
                      <option value="Thyroid Function Test">
                        Thyroid Function Test
                      </option>
                      <option value="Liver Function Test">
                        Liver Function Test
                      </option>
                      <option value="Kidney Function Test">
                        Kidney Function Test
                      </option>
                      <option value="Glucose Test">Glucose Test</option>
                      <option value="Hemoglobin A1C">Hemoglobin A1C</option>
                      <option value="Basic Metabolic Panel">
                        Basic Metabolic Panel
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Reviewed">Reviewed</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes - Full Width */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
                placeholder="Enter any additional notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTestOrderPage;
