import React from 'react';

const InfoBox = ({ label, value, className = '' }) => {
  return (
    <div className={`border border-[#E3EEFF] rounded-sm p-2 ${className}`}>
      <div className="text-[11px] font-medium text-gray-500 mb-1">{label}</div>
      <div className="text-[14px] font-semibold text-gray-800">{value}</div>
    </div>
  );
};

export default InfoBox;
