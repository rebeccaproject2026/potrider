import React, { useState } from 'react';
import InfoBox from './InfoBox';
import OrderMapSection from './OrderMapSection';
import { getDeliveryBadgeIcon } from '../../utils/orderUtils';
import { CircleCheckBig, CircleQuestionMark, PackageCheck, RotateCw, Truck } from 'lucide-react';

const OrderStatusCard = ({
  orderData,
  showMap = false,
  showActions = true,
  showPaymentSummary = true,
  type = 'PENDING', // 'pending' | 'delivered' | 'cancelled' | 'inprogress'
}) => {
  // Initialize map visibility based on showMap prop and type
  const [isMapVisible, setIsMapVisible] = useState(showMap && type === 'inprogress');
  // Get color scheme based on type
  const getTypeColors = () => {
    const colors = {
      pending: {
        icon: 'bg-blue-500',
        text: 'text-blue-600',
        bg: 'bg-blue-100',
        dot: 'bg-[#0066FF]',
      },
      delivered: {
        icon: 'bg-green-500',
        text: 'text-green-600',
        bg: 'bg-green-100',
        dot: 'bg-[#00B159]',
      },
      cancelled: {
        icon: 'bg-red-500',
        text: 'text-red-600',
        bg: 'bg-red-100',
        dot: 'bg-[#F44336]',
      },
      inprogress: {
        icon: 'bg-orange-500',
        text: 'text-orange-600',
        bg: 'bg-orange-100',
        dot: 'bg-[#ff9800]',
      },
    };
    return colors[type] || colors.pending;
  };

  const colors = getTypeColors();

  // Get action buttons based on type
  const getActionButtons = () => {
    if (!showActions) return null;

    const buttons = {
      pending: (
        <>
          <button className="px-3 py-2.5 bg-[#FF9800] text-white rounded-sm text-[14px] font-medium  transition-colors cursor-pointer flex items-center gap-1">
            <CircleQuestionMark className='w-4 h-4' />
            Complaint
          </button>
          <button className="px-3 py-2.5 bg-[#F44336] text-white rounded-sm text-[14px] font-medium hover:bg-red-600 transition-colors cursor-pointer">
            Cancel Order
          </button>
          <button className="px-3 py-2.5 bg-[#E3EEFF] text-[#0066FF] rounded-sm text-[14px] font-medium  transition-colors cursor-pointer flex items-center gap-1">
            Edit Order
          </button>
        </>
      ),
      delivered: (
        <>
          <button className="px-3 py-2.5 bg-[#FF9800] text-white rounded-sm text-[14px] font-medium  transition-colors cursor-pointer flex items-center gap-1">
            <CircleQuestionMark className='w-4 h-4' />
            Complaint
          </button>
          <button className="px-3 py-2.5 bg-(--color-secondary) text-white rounded-sm text-[14px] font-medium hover:bg-blue-600 transition-colors cursor-pointer flex items-center gap-1">
            <RotateCw className='w-4 h-4' />
            Reorder
          </button>
        </>
      ),
      cancelled: (
        <>
          <button className="px-3 py-2.5 bg-[#FF9800] text-white rounded-sm text-[14px] font-medium  transition-colors cursor-pointer flex items-center gap-1">
            <CircleQuestionMark className='w-4 h-4' />
            Complaint
          </button>
          <button className="px-3 py-2.5 bg-(--color-secondary) text-white rounded-sm text-[14px] font-medium hover:bg-blue-600 transition-colors cursor-pointer flex items-center gap-1">
            <RotateCw className='w-4 h-4' />
            Reorder
          </button>
        </>
      ),
      inprogress: (
        <>
          <button className="px-3 py-2.5 bg-[#FF9800] text-white rounded-sm text-[14px] font-medium  transition-colors cursor-pointer flex items-center gap-1">
            <CircleQuestionMark className='w-4 h-4' />
            Complaint
          </button>
          <button className="px-3 py-2.5 bg-[#F44336] text-white rounded-sm text-[14px] font-medium hover:bg-red-600 transition-colors cursor-pointer">
            Cancel Order
          </button>
          <button className="px-3 py-2.5 bg-[#E3EEFF] text-[#0066FF] rounded-sm text-[14px] font-medium  transition-colors cursor-pointer">
            Edit Order
          </button>
        </>
      ),
    };
    return buttons[type];
  };

  // Get column header based on type
  const getDateColumnHeader = () => {
    if (type === 'delivered') return 'Delivered At';
    if (type === 'cancelled') return 'Cancelled At';
    if (type === 'inprogress') return 'Delivery Date';
    return 'Delivery ETA';
  };

  // Get timeline end icon
  // const getTimelineEndIcon = () => {
  //   if (type === 'delivered') {
  //     return (
  //       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
  //         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  //       </svg>
  //     );
  //   }
  //   if (type === 'cancelled') {
  //     return (
  //       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
  //         <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  //       </svg>
  //     );
  //   }
  //   return null;
  // };

  // Get timeline end text
  const getTimelineEndText = () => {
    if (type === 'delivered') return 'Delivered';
    if (type === 'cancelled') return 'Cancelled by Client';
    if (type === 'inprogress') return 'Approximate Arrival';
    return 'Approximate Arrival';
  };

  // Get status badge text
  const getStatusText = () => {
    if (type === 'delivered') return 'Delivered';
    if (type === 'cancelled') return 'Cancelled by Client';
    if (type === 'inprogress') return 'Order In-progress';
    return 'Rescheduled';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-4 mb-3 shadow-sm">
      {/* Header with Address and Action Buttons */}
      <div className="flex justify-between items-center mb-2 pb-1">
        <div className="flex items-center gap-2 flex-1">
          <img
            src={getDeliveryBadgeIcon(type)}
            width="36"
            height="36"
            alt="Delivery Status"
            className="shrink-0"
          />
          <span className="text-[14.5px] font-semibold text-[#3E3834]">
            {orderData?.address || '123 Main Street, Toronto, ON M5J 2N8'}
          </span>
        </div>
        <div className="flex gap-2 shrink-0">
          {getActionButtons()}
        </div>
      </div>

      {/* Cancellation Message (only for cancelled) */}
      {type === 'cancelled' && (
        <div className="bg-red-50 border-l-4 border-red-500 p-2.5 mb-3 rounded text-red-800 text-[13px]">
          This order has been cancelled because {orderData?.cancelReason || 'the requested item is out of stock'}.
        </div>
      )}

      {/* Order Details Table */}
      <div className="mb-3 overflow-hidden rounded-sm border border-[#F0F1F3]">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="divide-x divide-gray-200 border-b border-[#F0F1F3]">
              <th className="text-left py-3 px-4 text-[12.5px] font-semibold text-[#3E3834]">Order ID</th>
              <th className="text-left py-3 px-4 text-[12.5px] font-semibold text-[#3E3834]">Driver</th>
              <th className="text-left py-3 px-4 text-[12.5px] font-semibold text-[#3E3834]">Order Amount</th>
              <th className="text-left py-3 px-4 text-[12.5px] font-semibold text-[#3E3834]">Order Quantity</th>
              <th className="text-left py-3 px-4 text-[12.5px] font-semibold text-[#3E3834]">Order Created</th>
              <th className="text-left py-3 px-4 text-[12.5px] font-semibold text-[#3E3834]">{getDateColumnHeader()}</th>
              {type === 'inprogress' && (
                <th className="text-left py-3 px-4 text-[12.5px] font-semibold text-[#3E3834]">Delivery ETA</th>
              )}
              <th className="text-left py-3 px-4 text-[12.5px] font-semibold text-[#3E3834]">Order status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F1F3]">
            <tr className="divide-x divide-[#F0F1F3] text-[13.5px] font-medium">
              <td className="py-3.5 px-4 text-[13.5px] text-blue-600 font-semibold cursor-pointer hover:underline">
                {orderData?.orderId || '302011'}
              </td>
              <td className="py-3.5 px-4  text-blue-600 font-semibold cursor-pointer hover:underline">
                {orderData?.driver || 'Bob Johnson'}
              </td>
              <td className="py-3.5 px-4   text-[#212121]">
                ${orderData?.orderAmount || '1325.26'}
              </td>
              <td className="py-3.5 px-4  text-[#212121]">
                {orderData?.orderQuantity || '10 Items'}
              </td>
              <td className="py-3.5 px-4  text-[#212121]">
                {orderData?.orderCreated || '5 Mar 2024'}
                <br />
                <span className="text-[#212121]-400 text-[11px]">{orderData?.orderCreatedTime || '10:30 pm'}</span>
              </td>
              <td className="py-3.5 px-4  text-[#212121]">
                {type === 'delivered' && (orderData?.deliveredAt || '11:30pm, 12 Dec 2024')}
                {type === 'cancelled' && (orderData?.cancelledAt || '11:30pm, 14 Jan 2025')}
                {type === 'inprogress' && (orderData?.deliveryDate || '15 Jan 2025 Today')}
                {type === 'pending' && (
                  <>
                    Approximate Arrival
                    <br />
                    <span className="text-[#212121] text-[12px] mt-1">{orderData?.eta || '11:30pm, Today'}</span>
                  </>
                )}
              </td>
              {type === 'inprogress' && (
                <td className="py-2.5 px-2 text-[13px] text-[#212121]">
                  Approximate Arrival
                  <br />
                  <span className="text-[#212121] text-[12px]">{orderData?.eta || '11:30 pm'}</span>
                </td>
              )}
              <td className="py-2.5 px-2">
                <span className={`inline-block px-2 py-0.5 rounded text-[13.5px] font-semibold ${colors.text}`}>
                  {getStatusText()}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Summary Boxes */}
      {showPaymentSummary && (
        <div className="grid grid-cols-4 gap-3 mb-3">
          <InfoBox label="Sold Quantity" value={orderData?.soldQuantity || '2.36g'} />
          <InfoBox label="Received Amount" value={`$${orderData?.receivedAmount || '1025.35'}`} />
          <InfoBox label="Unpaid Collection" value={`$${orderData?.unpaidCollection || '1025.35'}`} />
          <InfoBox label="Paid Collection" value={`$${orderData?.paidCollection || '25.35'}`} />
        </div>
      )}

      {/* Timeline Section */}
      <div className="relative mt-4">
        <div className="flex items-start justify-between relative">
          {/* Left Side - Vertical Layout */}
          <div className="flex flex-col items-start relative z-10">
            {/* Icon */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${colors.dot} shadow-md mt-1`}>
              <PackageCheck className='text-white w-6 h-6' />
            </div>

            {/* Title */}
            <div className="text-base font-semibold text-[#1E1E1E] mt-3">
              Delivery Started
            </div>

            {/* Date/Time */}
            <div className="text-[13px] font-medium text-gray-600 mt-1">
              {orderData?.deliveryStarted || '12/14/2024 at 06:53 pm'}
            </div>

            {/* Show/Hide Map Link */}
            {type === 'inprogress' && (
              <button
                onClick={() => setIsMapVisible(!isMapVisible)}
                className="text-blue-600 cursor-pointer underline text-[14px] font-medium mt-3"
              >
                {isMapVisible ? 'Hide Map' : 'Show Map'}
              </button>
            )}
          </div>

          {/* Dotted Line - Horizontal Center */}
          <div
            className="absolute left-6 right-6 top-6 h-0.5 z-0"
            style={{
              backgroundImage: 'repeating-linear-gradient(to right, #d1d5db 0, #d1d5db 6px, transparent 6px, transparent 12px)'
            }}
          ></div>

          {/* ETA Markers (only for inprogress) */}
          {type === 'inprogress' && (
            <>
              {/* ETA 7 Min Marker */}
              <div className="absolute left-1/3 top-4 flex flex-col items-center z-10">
                <div className="w-4 h-4 rounded-full bg-[#FF9800] shadow-md flex items-center justify-center">
                </div>
                <div className="text-[11px] font-semibold text-gray-700 mt-1.5">ETA 7 Min</div>
              </div>

              {/* ETA 3 Min Marker */}
              <div className="absolute right-1/3 top-4 flex flex-col items-center z-10">
                <div className="w-4 h-4 rounded-full bg-[#FF9800] shadow-md flex items-center justify-center">
                </div>
                <div className="text-[11px] font-semibold text-gray-700 mt-1.5">ETA 3 Min</div>
              </div>
            </>
          )}

          {/* Right Side - Vertical Layout */}
          <div className="flex flex-col items-end text-right relative z-10">
            {/* Icon */}
            <div className={`w-10 h-10 mt-1 rounded-full flex items-center justify-center shrink-0 ${colors.dot} shadow-md`}>
              {type === 'delivered' ? (
                <CircleCheckBig className='w-5 h-5 text-white' />
              ) : type === 'cancelled' ? (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <CircleCheckBig className='h-5 w-5 text-white' />
              )}
            </div>

            {/* Title */}
            <div className="text-base font-semibold text-[#1E1E1E] mt-3">
              {getTimelineEndText()}
            </div>

            {/* Date/Time */}
            <div className="text-[13px] font-medium text-gray-600 mt-1">
              {type === 'delivered' && (orderData?.deliveredTime || '12/14/2024, 08:12 PM')}
              {type === 'cancelled' && (orderData?.cancelledTime || '12/14/2024, 08:12 PM')}
              {(type === 'inprogress' || type === 'pending') && (orderData?.approximateArrival || '12/14/2024, 08:12 PM')}
            </div>
          </div>
        </div>

        {/* Map Section - Only show for inprogress and when visible */}
        {type === 'inprogress' && isMapVisible && (
          <div className="mt-5">
            <OrderMapSection orderData={orderData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusCard;
