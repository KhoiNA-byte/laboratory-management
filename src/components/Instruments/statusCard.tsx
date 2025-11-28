import React from 'react';
import { CLASS_NAMES, UI_TEXT } from '../../constants/instruments';

interface StatusCardProps {
  title: string;
  value: number;
  className?: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({ 
  title, 
  value, 
  className = "" 
}) => {
  return (
    <div className={`${CLASS_NAMES.COMPONENTS.STATUS_CARD} ${className}`}>
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className="text-xl font-semibold text-gray-900">{value}</div>
    </div>
  );
};

export const StatusCardsGrid: React.FC<{
  total: number;
  active: number;
  maintenance: number;
  calibrationDue: number;
}> = ({ total, active, maintenance, calibrationDue }) => {
  return (
    <div className={CLASS_NAMES.LAYOUT.CARD_GRID}>
      <StatusCard title={UI_TEXT.STATUS_CARDS.TOTAL} value={total} />
      <StatusCard title={UI_TEXT.STATUS_CARDS.ACTIVE} value={active} />
      <StatusCard title={UI_TEXT.STATUS_CARDS.MAINTENANCE} value={maintenance} />
      <StatusCard title={UI_TEXT.STATUS_CARDS.CALIBRATION_DUE} value={calibrationDue} />
    </div>
  );
};