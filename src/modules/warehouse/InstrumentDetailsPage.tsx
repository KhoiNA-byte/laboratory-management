import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InstrumentDetailsPage: React.FC = () => {
    const { instrumentId } = useParams<{ instrumentId: string }>();
    const navigate = useNavigate();

    // Mock data - in real app, this would come from API
    const instrumentData = {
        name: "Hematology Analyzer",
        model: "HA-5000",
        serialNumber: "HA5000-2024-001",
        manufacturer: "MedTech Systems",
        status: "Active",
        location: "Lab Room A",
        nextCalibration: "01/04/2025",
        lastMaintenance: "15/12/2024",
        installationDate: "01/01/2024",
        warrantyExpiry: "01/01/2026",
        specifications: {
            throughput: "60 samples/hour",
            sampleVolume: "20μL",
            temperature: "37°C ± 0.1°C",
            powerConsumption: "500W"
        },
        maintenanceHistory: [
            { date: "15/12/2024", type: "Routine Maintenance", technician: "John Smith", notes: "Cleaned and calibrated" },
            { date: "01/11/2024", type: "Calibration", technician: "Jane Doe", notes: "Full system calibration" },
            { date: "15/09/2024", type: "Repair", technician: "Mike Johnson", notes: "Replaced sensor module" }
        ]
    };

    const handleClose = () => {
        navigate(-1); // Go back to previous page
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Maintenance':
                return 'bg-yellow-100 text-yellow-800';
            case 'Inactive':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Instrument Details</h1>
                        <p className="text-gray-600 mt-1">View detailed information about the instrument</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Instrument Name</label>
                                <input
                                    type="text"
                                    value={instrumentData.name}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                                <input
                                    type="text"
                                    value={instrumentData.model}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                                <input
                                    type="text"
                                    value={instrumentData.serialNumber}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                                <input
                                    type="text"
                                    value={instrumentData.manufacturer}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <div className="flex items-center">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(instrumentData.status)}`}>
                                        {instrumentData.status}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    value={instrumentData.location}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Next Calibration</label>
                                <input
                                    type="text"
                                    value={instrumentData.nextCalibration}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Maintenance</label>
                                <input
                                    type="text"
                                    value={instrumentData.lastMaintenance}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Installation Date</label>
                                <input
                                    type="text"
                                    value={instrumentData.installationDate}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Expiry</label>
                                <input
                                    type="text"
                                    value={instrumentData.warrantyExpiry}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Specifications Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Throughput</label>
                                <input
                                    type="text"
                                    value={instrumentData.specifications.throughput}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sample Volume</label>
                                <input
                                    type="text"
                                    value={instrumentData.specifications.sampleVolume}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
                                <input
                                    type="text"
                                    value={instrumentData.specifications.temperature}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Power Consumption</label>
                                <input
                                    type="text"
                                    value={instrumentData.specifications.powerConsumption}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Maintenance History Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance History</h3>
                        <div className="space-y-3">
                            {instrumentData.maintenanceHistory.map((entry, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900">{entry.type}</span>
                                        <span className="text-sm text-gray-500">{entry.date}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-1">Technician: {entry.technician}</div>
                                    <div className="text-sm text-gray-600">{entry.notes}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Close
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Edit Instrument
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstrumentDetailsPage;
