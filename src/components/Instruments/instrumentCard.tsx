import React from 'react';
import { CLASS_NAMES, UI_TEXT } from '../../constants/instruments';
import { Instrument } from '../../store/types';

interface InstrumentCardProps {
  instrument: Instrument;
  showActionsDropdown: string | null;
  deleteLoading: string | null;
  onToggleDropdown: (instrumentId: string | null) => void;
  onViewDetails: (instrument: Instrument) => void;
  onEdit: (instrument: Instrument) => void;
  onDelete: (instrument: Instrument) => void;
  getStatusColor: (status: string) => string;
}

export const InstrumentCard: React.FC<InstrumentCardProps> = ({
  instrument,
  showActionsDropdown,
  deleteLoading,
  onToggleDropdown,
  onViewDetails,
  onEdit,
  onDelete,
  getStatusColor,
}) => {
  return (
    <div key={instrument.id} className={CLASS_NAMES.COMPONENTS.INSTRUMENT_CARD}>
      {/* Instrument Header with dropdown menu */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{instrument.name}</h3>
          <p className="text-sm text-gray-600">{instrument.model}</p>
        </div>
        <div className="relative dropdown-container">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleDropdown(showActionsDropdown === instrument.id ? null : instrument.id);
            }}
            disabled={deleteLoading === instrument.id}
            className={CLASS_NAMES.BUTTONS.DROPDOWN}
          >
            {deleteLoading === instrument.id ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
            ) : (
              // 🔹 GIỮ NGUYÊN ICON CŨ
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            )}
          </button>
          
          {/* Dropdown Menu */}
          {showActionsDropdown === instrument.id && (
            <div className={CLASS_NAMES.COMPONENTS.DROPDOWN_MENU}>
              <button 
                onClick={() => onViewDetails(instrument)}
                className={CLASS_NAMES.BUTTONS.DROPDOWN_ITEM}
              >
                {UI_TEXT.DROPDOWN_ACTIONS.VIEW_DETAILS}
              </button>
              <button 
                onClick={() => onEdit(instrument)}
                className={CLASS_NAMES.BUTTONS.DROPDOWN_ITEM}
              >
                {UI_TEXT.DROPDOWN_ACTIONS.EDIT_INSTRUMENT}
              </button>
              <button 
                onClick={() => onDelete(instrument)}
                disabled={deleteLoading === instrument.id}
                className={CLASS_NAMES.BUTTONS.DELETE}
              >
                {deleteLoading === instrument.id ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
                    <span>{UI_TEXT.DROPDOWN_ACTIONS.DELETING}</span>
                  </>
                ) : (
                  <span>{UI_TEXT.DROPDOWN_ACTIONS.DELETE_INSTRUMENT}</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Instrument Details */}
      <div className="mb-3">
        <div className="flex justify-between items-center py-1">
          <span className="text-gray-500 text-sm">Status</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(instrument.status)}`}>
            {instrument.status}
          </span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-gray-500 text-sm">Serial Number</span>
          <span className="text-gray-900 text-sm font-medium text-right">{instrument.serialNumber}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-gray-500 text-sm">Location</span>
          <span className="text-gray-900 text-sm font-medium text-right">{instrument.location}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-gray-500 text-sm">Manufacturer</span>
          <span className="text-gray-900 text-sm font-medium text-right">{instrument.manufacturer}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-gray-500 text-sm">Next Calibration</span>
          <span className="text-gray-900 text-sm font-medium text-right">{instrument.nextCalibration}</span>
        </div>
      </div>

      {/* Calibration Alert */}
      {instrument.calibrationDue && (
        <div className={CLASS_NAMES.COMPONENTS.ALERT.CALIBRATION}>
          <div className="flex items-center space-x-2">
            {/* 🔹 GIỮ NGUYÊN ICON CŨ */}
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-800 text-sm font-medium">
              {UI_TEXT.MESSAGES.CALIBRATION_DUE}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstrumentCard;