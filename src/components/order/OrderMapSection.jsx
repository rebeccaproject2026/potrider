import React from 'react';

const OrderMapSection = ({ orderData }) => {
  return (
    <div className="w-full">
      <div className="bg-gray-100 rounded-xl h-[400px] flex items-center justify-center border border-gray-200">
        <div className="text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="text-sm font-medium">Map View</p>
          <p className="text-xs text-gray-400 mt-1">Google Maps Integration</p>
          <p className="text-xs text-blue-600 mt-2">Map is visible!</p>
        </div>
      </div>
    </div>
  );
};

export default OrderMapSection;
