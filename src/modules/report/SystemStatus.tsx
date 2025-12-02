// components/ReportDashboard/SystemStatus.tsx
import React from "react";

const SystemStatus: React.FC = () => {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        System Status
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 border border-gray-200 rounded-lg">
          <div className="text-2xl font-bold text-green-600">✓</div>
          <div className="text-sm text-gray-600 mt-2">Users API</div>
          <div className="text-xs text-gray-500">Operational</div>
        </div>
        <div className="text-center p-4 border border-gray-200 rounded-lg">
          <div className="text-2xl font-bold text-green-600">✓</div>
          <div className="text-sm text-gray-600 mt-2">Orders API</div>
          <div className="text-xs text-gray-500">Operational</div>
        </div>
        <div className="text-center p-4 border border-gray-200 rounded-lg">
          <div className="text-2xl font-bold text-green-600">✓</div>
          <div className="text-sm text-gray-600 mt-2">Instruments API</div>
          <div className="text-xs text-gray-500">Operational</div>
        </div>
        <div className="text-center p-4 border border-gray-200 rounded-lg">
          <div className="text-2xl font-bold text-green-600">✓</div>
          <div className="text-sm text-gray-600 mt-2">Reports API</div>
          <div className="text-xs text-gray-500">Operational</div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
