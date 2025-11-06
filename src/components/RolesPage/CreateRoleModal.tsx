import React, { useMemo } from "react";

interface CreateRoleModalProps {
  show: boolean;
  onClose: () => void;
  formData: {
    name: string;
    code: string;
    description: string;
    privileges: string[];
  };
  setFormData: (data: CreateRoleModalProps["formData"]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ALL_PRIVILEGES = [
  "create",
  "read",
  "update",
  "delete",
  "manage_users",
  "manage_roles",
  "view_reports",
  "export_data",
];

const LABELS: Record<string, string> = {
  create: "Create",
  read: "Read",
  update: "Update",
  delete: "Delete",
  manage_users: "Manage Users",
  manage_roles: "Manage Roles",
  view_reports: "View Reports",
  export_data: "Export Data",
};

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({
  show,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) => {
  const isValid = useMemo(() => {
    return formData.name.trim().length > 0 && formData.code.trim().length > 0;
  }, [formData]);

  if (!show) return null;

  const togglePrivilege = (key: string) => {
    const exists = formData.privileges.includes(key);
    const updated = exists
      ? formData.privileges.filter((p) => p !== key)
      : [...formData.privileges, key];
    setFormData({ ...formData, privileges: updated });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-1">Create New Role</h2>
        <p className="text-sm text-gray-500 mb-6">Fill in the required information to create a new role</p>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
          {/* Role Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter role name"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role Code *</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="Enter role code (e.g., ADMIN)"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role Description *</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter role description"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Privileges */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Privileges *</label>
            <div className="border border-gray-300 rounded-lg p-4 space-y-2">
              {ALL_PRIVILEGES.map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm text-gray-800">
                  <input
                    type="checkbox"
                    checked={formData.privileges.includes(p)}
                    onChange={() => togglePrivilege(p)}
                    className="h-4 w-4"
                  />
                  {LABELS[p]}
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">Default: Read-only if no privileges are selected</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Cancel</button>
            <button type="submit" disabled={!isValid} className={`px-4 py-2 rounded-lg text-white ${isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}>
              Create Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoleModal;
export { CreateRoleModal };


