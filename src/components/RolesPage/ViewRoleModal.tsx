import React from "react";

interface RoleInfo {
  id: string;
  name: string;
  code?: string;
  description?: string;
  permissions: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface ViewRoleModalProps {
  show: boolean;
  onClose: () => void;
  role: RoleInfo | null;
}

const labelForPermission: Record<string, string> = {
  users: "Users",
  roles: "Roles",
  patients: "Patients",
  tests: "Tests",
  instruments: "Instruments",
  warehouse: "Warehouse",
  monitoring: "Monitoring",
  reports: "Reports",
  settings: "Settings",
  audit: "Audit",
  dashboard: "Dashboard",
};

const ViewRoleModal: React.FC<ViewRoleModalProps> = ({ show, onClose, role }) => {
  if (!show || !role) return null;

  const code = role.code || role.name.replace(/[^a-zA-Z0-9]+/g, "_").toUpperCase();
  const created = role.createdAt || "";
  const updated = role.updatedAt || "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Role Information</h2>
          <p className="text-sm text-gray-500">Detailed information for the selected role</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Role Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
            <input
              type="text"
              readOnly
              value={role.name}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 cursor-default"
            />
          </div>

          {/* Role Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role Code</label>
            <input
              type="text"
              readOnly
              value={code}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 cursor-default"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              readOnly
              value={role.description || ""}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 cursor-default"
            />
          </div>

          {/* Privileges */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Privileges</label>
            <div className="border border-gray-300 rounded-lg p-3 flex flex-wrap gap-2">
              {role.permissions.map((p) => (
                <span key={p} className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {labelForPermission[p] || p}
                </span>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Created At</p>
              <p className="text-sm text-gray-900 font-medium">{created}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Last Updated</p>
              <p className="text-sm text-gray-900 font-medium">{updated}</p>
            </div>
          </div>

          {/* Close */}
          <div className="flex justify-end mt-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRoleModal;


