import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditInstrumentModal from '../../components/Instruments/EditInstrumentModal';

interface Instrument {
  id: string;
  name: string;
  model: string;
  status: 'Active' | 'Maintenance' | 'Inactive';
  serialNumber: string;
  location: string;
  manufacturer: string;
  nextCalibration: string;
  calibrationDue: boolean;
}

const InstrumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showActionsDropdown, setShowActionsDropdown] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showActionsDropdown && !target.closest('.dropdown-container')) {
        setShowActionsDropdown(null);
      }
    };

    if (showActionsDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActionsDropdown]);

  // Mock data exactly as shown in the figma
  const instruments: Instrument[] = [
    {
      id: '1',
      name: 'Hematology Analyzer',
      model: 'HA-5000',
      status: 'Active',
      serialNumber: 'HA5000-2024-001',
      location: 'Lab Room A',
      manufacturer: 'MedTech Systems',
      nextCalibration: '01/04/2025',
      calibrationDue: true
    },
    {
      id: '2',
      name: 'Chemistry Analyzer',
      model: 'CA-3800',
      status: 'Active',
      serialNumber: 'CA3800-2024-002',
      location: 'Lab Room B',
      manufacturer: 'BioLab Inc',
      nextCalibration: '15/03/2025',
      calibrationDue: true
    },
    {
      id: '3',
      name: 'Immunoassay Analyzer',
      model: 'IA-2500',
      status: 'Maintenance',
      serialNumber: 'IA2500-2024-003',
      location: 'Lab Room C',
      manufacturer: 'DiagnoSys',
      nextCalibration: '20/02/2025',
      calibrationDue: true
    },
    {
      id: '4',
      name: 'Coagulation Analyzer',
      model: 'CO-1800',
      status: 'Active',
      serialNumber: 'CO1800-2024-004',
      location: 'Lab Room A',
      manufacturer: 'MedTech Systems',
      nextCalibration: '28/03/2025',
      calibrationDue: true
    },
    {
      id: '5',
      name: 'Urinalysis Analyzer',
      model: 'UA-1200',
      status: 'Inactive',
      serialNumber: 'UA1200-2024-005',
      location: 'Storage Room',
      manufacturer: 'BioLab Inc',
      nextCalibration: '15/01/2025',
      calibrationDue: true
    }
  ];

  const filteredInstruments = instruments.filter(instrument =>
    instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instrument.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instrument.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (instrumentId: string) => {
    console.log('View Details clicked for:', instrumentId);
    setShowActionsDropdown(null);
    navigate(`/admin/instruments/${instrumentId}`);
  };

  const handleUpdateQuantity = (instrumentId: string) => {
    console.log('Update Quantity clicked for:', instrumentId);
    setShowActionsDropdown(null);
    // Here you would typically show a modal or navigate to update quantity page
    const newQuantity = prompt('Enter new quantity:');
    if (newQuantity !== null) {
      console.log('Updating quantity for instrument:', instrumentId, 'to:', newQuantity);
      // Here you would make an API call to update the quantity
    }
  };

  const handleMoveLocation = (instrumentId: string) => {
    console.log('Move location clicked for:', instrumentId);
    setShowActionsDropdown(null);
    // Here you would typically show a modal or navigate to move location page
    const newLocation = prompt('Enter new location:');
    if (newLocation !== null) {
      console.log('Moving instrument:', instrumentId, 'to location:', newLocation);
      // Here you would make an API call to update the location
    }
  };

  const handleDeleteInstrument = (instrumentId: string) => {
    console.log('Delete instrument clicked for:', instrumentId);
    setShowActionsDropdown(null);
    // Here you would typically show a confirmation dialog
    if (window.confirm('Are you sure you want to delete this instrument?')) {
      // Here you would make an API call to delete the instrument
      console.log('Deleting instrument:', instrumentId);
    }
  };

  const handleEditInstrument = (instrument: Instrument) => {
    setSelectedInstrument(instrument);
    setShowEditModal(true);
    setShowActionsDropdown(null);
  };

  const handleSaveInstrument = (updatedInstrument: Instrument) => {
    console.log('Saving instrument:', updatedInstrument);
    // Here you would make an API call to update the instrument
    // For now, we'll just update the local state if needed
    setShowEditModal(false);
    setSelectedInstrument(null);
  };

  const handleAddInstrument = () => {
    navigate('/admin/instruments/new');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalInstruments = instruments.length;
  const activeInstruments = instruments.filter(i => i.status === 'Active').length;
  const maintenanceInstruments = instruments.filter(i => i.status === 'Maintenance').length;
  const calibrationDue = instruments.filter(i => i.calibrationDue).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Instruments Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Instruments</p>
              <p className="text-3xl font-bold text-gray-900">{totalInstruments}</p>
              <p className="text-sm text-gray-500 mt-1">All equipment</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active</p>
              <p className="text-3xl font-bold text-gray-900">{activeInstruments}</p>
              <p className="text-sm text-gray-500 mt-1">Operational</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Maintenance Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Maintenance</p>
              <p className="text-3xl font-bold text-gray-900">{maintenanceInstruments}</p>
              <p className="text-sm text-gray-500 mt-1">Under service</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Calibration Due Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Calibration Due</p>
              <p className="text-3xl font-bold text-gray-900">{calibrationDue}</p>
              <p className="text-sm text-gray-500 mt-1">Within 7 days</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* All Instruments Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">All Instruments</h3>
              <p className="text-sm text-gray-600">View and manage laboratory equipment</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                + Sync-up
              </button>
              <button
                onClick={handleAddInstrument}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                + Add Instrument
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex justify-end">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search instruments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Instruments Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstruments.map((instrument) => (
              <div key={instrument.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow relative">
                {/* Calibration Due Banner */}
                {instrument.calibrationDue && (
                  <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-xs font-medium py-1 px-3 rounded-t-lg text-center">
                    Calibration due soon
                  </div>
                )}

                <div className={`p-4 ${instrument.calibrationDue ? 'pt-8' : ''}`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{instrument.name}</h4>
                        <p className="text-sm text-gray-500">{instrument.model}</p>
                      </div>
                    </div>
                    <div className="relative dropdown-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Dropdown clicked for instrument:', instrument.id);
                          setShowActionsDropdown(showActionsDropdown === instrument.id ? null : instrument.id);
                        }}
                        className="text-gray-400 hover:text-gray-600 p-1"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>

                      {console.log('Current dropdown state:', showActionsDropdown, 'Instrument ID:', instrument.id)}
                      {showActionsDropdown === instrument.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => handleViewDetails(instrument.id)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View Details
                            </button>
                            <button
                              onClick={() => handleEditInstrument(instrument)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => handleUpdateQuantity(instrument.id)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Update Quantity
                            </button>
                            <button
                              onClick={() => handleMoveLocation(instrument.id)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Move location
                            </button>
                            <button
                              onClick={() => handleDeleteInstrument(instrument.id)}
                              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete Reagent
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(instrument.status)}`}>
                        {instrument.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Serial Number:</span>
                      <span className="text-sm text-gray-900">{instrument.serialNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm text-gray-900">{instrument.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Manufacturer:</span>
                      <span className="text-sm text-gray-900">{instrument.manufacturer}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Next Calibration:</span>
                      <span className="text-sm text-gray-900">{instrument.nextCalibration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Instrument Modal */}
      <EditInstrumentModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedInstrument(null);
        }}
        onSave={handleSaveInstrument}
        instrument={selectedInstrument}
      />
    </div>
  );
};

export default InstrumentsPage;