import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  age: number;
  dateOfBirth?: string;
  address: string;
  lastLogin: string;
  status?: string;
}

interface ViewDetailsModalProps {
  show: boolean;
  onClose: () => void;
  user: User | null;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({
  show,
  onClose,
  user,
}) => {
  if (!show || !user) return null;

  // Function to display role names
  const getDisplayRole = (role: string) => {
    const roleDisplayMap: { [key: string]: string } = {
      admin: "Administrator",
      lab_manager: "Lab Manager",
      lab_user: "Lab User",
      service_user: "Service User",
      normal_user: "Normal User",
    };
    return roleDisplayMap[role] || role;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title and Subtitle */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            User Information
          </h2>
          <p className="text-sm text-gray-500">View user information</p>
        </div>

        {/* Form Layout */}
        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Full Name - Full Width */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 cursor-default"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 cursor-default"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="text"
              value={user.phone}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 cursor-default"
            />
          </div>

          {/* Identify Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Identify Number *
            </label>
            <input
              type="text"
              value={user.id}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 cursor-default"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender *
            </label>
            <select
              value={user.gender}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 cursor-default"
            >
              <option>{user.gender}</option>
            </select>
          </div>

          {/* Empty div for spacing - Role will be in right column */}
          <div></div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <input
              type="text"
              value={getDisplayRole(user.role)}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 cursor-default"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age *
            </label>
            <input
              type="number"
              value={user.age}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 cursor-default"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <input
              type="text"
              value={user.dateOfBirth || ""}
              readOnly
              placeholder="DD/MM/YYYY"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 cursor-default"
            />
          </div>

          {/* Address - Full Width */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <input
              type="text"
              value={user.address || ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 cursor-default"
            />
          </div>

          {/* Cancel Button */}
          <div className="flex justify-end mt-6 sm:col-span-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
