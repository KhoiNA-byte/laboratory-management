import React, { useState } from 'react';

interface AddReagentModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (reagent: any) => void;
}

const AddReagentModal: React.FC<AddReagentModalProps> = ({
  show,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    reagentName: '',
    lotNumber: '',
    manufacturer: '',
    quantity: '',
    unit: 'Tests',
    storageCondition: '2-8°C (Refrigerated)',
    storageLocation: '',
    expiryDate: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (value: string) => {
    // Format date input for expiryDate field
    let formattedValue = value;
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Format as DD/MM/YYYY
    if (digits.length <= 2) {
      formattedValue = digits;
    } else if (digits.length <= 4) {
      formattedValue = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
      formattedValue = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    }
    setFormData((prev) => ({
      ...prev,
      expiryDate: formattedValue,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    // Reset form
    setFormData({
      reagentName: '',
      lotNumber: '',
      manufacturer: '',
      quantity: '',
      unit: 'Tests',
      storageCondition: '2-8°C (Refrigerated)',
      storageLocation: '',
      expiryDate: '',
    });
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      reagentName: '',
      lotNumber: '',
      manufacturer: '',
      quantity: '',
      unit: 'Tests',
      storageCondition: '2-8°C (Refrigerated)',
      storageLocation: '',
      expiryDate: '',
    });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add Reagent</h2>
        </div>

        {/* Reagent Information Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Reagent Information
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Enter the basic details of the reagent
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reagent Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.reagentName}
                onChange={(e) => handleInputChange('reagentName', e.target.value)}
                placeholder="e.g., CBC Reagent Kit"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lot Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.lotNumber}
                onChange={(e) => handleInputChange('lotNumber', e.target.value)}
                placeholder="e.g., LOT-2025-A123"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manufacturer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.manufacturer}
                onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                placeholder="e.g., MedTech Systems"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Quantity & Storage Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Quantity & Storage
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Specify quantity and storage requirements
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="e.g., 150"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                >
                  <option value="Tests">Tests</option>
                  <option value="Bottles">Bottles</option>
                  <option value="Boxes">Boxes</option>
                  <option value="Strips">Strips</option>
                  <option value="Vials">Vials</option>
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
                Storage Condition <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.storageCondition}
                  onChange={(e) => handleInputChange('storageCondition', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                >
                  <option value="2-8°C (Refrigerated)">2-8°C (Refrigerated)</option>
                  <option value="Room Temperature">Room Temperature</option>
                  <option value="-20°C (Frozen)">-20°C (Frozen)</option>
                  <option value="-80°C (Ultra-cold)">-80°C (Ultra-cold)</option>
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
                Storage Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.storageLocation}
                onChange={(e) => handleInputChange('storageLocation', e.target.value)}
                placeholder="e.g., Refrigerator A1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  placeholder="dd/mm/yyyy"
                  maxLength={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <svg
              className="h-4 w-4"
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
            Add Reagent
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReagentModal;

