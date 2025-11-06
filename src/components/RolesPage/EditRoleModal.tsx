import React, { useMemo } from "react";

interface RoleData {
  id: string;
  name: string;
  code: string;
  description: string;
  permissions: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface EditRoleModalProps {
  show: boolean;
  onClose: () => void;
  role: RoleData | null;
  onSubmit: (role: RoleData) => void;
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

const PRIVILEGE_LABELS: Record<string, string> = {
  create: "Create",
  read: "Read",
  update: "Update",
  delete: "Delete",
  manage_users: "Manage Users",
  manage_roles: "Manage Roles",
  view_reports: "View Reports",
  export_data: "Export Data",
};

// Map permissions to privileges (simplified mapping)
const mapPermissionsToPrivileges = (permissions: string[]): string[] => {
  const privilegeMap: Record<string, string> = {
    users: "manage_users",
    roles: "manage_roles",
    reports: "view_reports",
  };
  
  const mapped: string[] = [];
  permissions.forEach((perm) => {
    if (privilegeMap[perm]) {
      mapped.push(privilegeMap[perm]);
    } else {
      // Default privileges for common permissions
      mapped.push("read", "create", "update", "delete");
    }
  });
  
  // Remove duplicates and ensure we have at least read
  const unique = Array.from(new Set(mapped));
  if (!unique.includes("read")) {
    unique.push("read");
  }
  return unique;
};

// Map privileges back to permissions (simplified)
const mapPrivilegesToPermissions = (privileges: string[]): string[] => {
  // This is a simplified mapping - adjust based on your actual logic
  return privileges.length > 0 ? ["users", "roles", "patients"] : [];
};

const EditRoleModal: React.FC<EditRoleModalProps> = ({
  show,
  onClose,
  role,
  onSubmit,
}) => {
  const [form, setForm] = React.useState<{
    name: string;
    code: string;
    description: string;
    privileges: string[];
  } | null>(null);

  React.useEffect(() => {
    if (role) {
      setForm({
        name: role.name,
        code: role.code,
        description: role.description,
        privileges: mapPermissionsToPrivileges(role.permissions),
      });
    }
  }, [role]);

  const valid = useMemo(
    () => !!form && form.name.trim().length > 0 && form.description.trim().length > 0,
    [form]
  );

  if (!show || !form || !role) return null;

  const togglePrivilege = (privilege: string) => {
    const exists = form.privileges.includes(privilege);
    const updated = exists
      ? form.privileges.filter((p) => p !== privilege)
      : [...form.privileges, privilege];
    setForm({ ...form, privileges: updated });
  };

  const handleSubmit = () => {
    if (valid) {
      onSubmit({
        ...role,
        name: form.name,
        description: form.description,
        permissions: mapPrivilegesToPermissions(form.privileges),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
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

        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Update Role Information
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Modify the role information below
        </p>

        <div className="grid grid-cols-1 gap-4">
          {/* Role Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Code - Read Only */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Code
            </label>
            <input
              type="text"
              value={form.code}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-600 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-500">
              Role code cannot be changed
            </p>
          </div>

          {/* Role Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Description *
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Privileges */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Privileges *
            </label>
            <div className="border border-gray-300 rounded-lg p-4 space-y-2">
              {ALL_PRIVILEGES.map((privilege) => (
                <label
                  key={privilege}
                  className="flex items-center gap-2 text-sm text-gray-800"
                >
                  <input
                    type="checkbox"
                    checked={form.privileges.includes(privilege)}
                    onChange={() => togglePrivilege(privilege)}
                    className="h-4 w-4"
                  />
                  {PRIVILEGE_LABELS[privilege]}
                </label>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              disabled={!valid}
              onClick={handleSubmit}
              className={`px-4 py-2 rounded-lg text-white ${
                valid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Update Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoleModal;


