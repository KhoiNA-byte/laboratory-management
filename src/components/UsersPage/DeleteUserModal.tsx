import React from "react";

interface DeleteUserModalProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  userName: string;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ show, onCancel, onConfirm, userName }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-2">Delete User Account</h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete the user account for <span className="font-medium text-gray-900">{userName}</span>? This
          action cannot be undone and will permanently remove the user from the system.
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Delete User</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;


