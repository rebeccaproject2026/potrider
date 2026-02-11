import { useState } from "react";
import { X, Plus } from "lucide-react";
import Drawer from "../../../components/common/Drawer";

const COMPLAINTS_DATA = [
  {
    id: 1,
    complaint: "David was late for 3 orders in a row in last 5 hours",
    complaintBy: "John Doe - Chillin Cheetah",
    time: "09:30 PM - 20 Aug, 2025",
  },
  {
    id: 2,
    complaint: "He always late in delivery near pickering areas and I got many negative reviews for his deliveries.",
    complaintBy: "Frank Nava - Micro Zoomiez",
    time: "07:30 PM - 19 Aug, 2025",
  },
];

const ComplaintsDrawer = ({ isOpen, onClose, driverName }) => {
  const [isAddingComplaint, setIsAddingComplaint] = useState(false);
  const [complaintText, setComplaintText] = useState("");

  const handleSubmitComplaint = () => {
    console.log("Submitting complaint:", complaintText);
    setComplaintText("");
    setIsAddingComplaint(false);
  };

  const handleCancel = () => {
    setComplaintText("");
    setIsAddingComplaint(false);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} width="w-[450px]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-black">
            Complaints for {driverName || "Driver"}
          </h2>
          <p className="text-sm text-[#424143]">Driver From Potrider</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-4">
          {/* Complaints List */}
          {COMPLAINTS_DATA.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white border border-gray-200 rounded-sm p-4"
            >
              <h3 className="text-sm font-normal text-black mb-3">
                {complaint.complaint}
              </h3>
              <div className="text-sm text-[#212121] space-y-1">
                <p>Complaint by</p>
                <p>{complaint.complaintBy}</p>
                <p>{complaint.time}</p>
              </div>
            </div>
          ))}

          {/* Add Complaint Section */}
          {!isAddingComplaint ? (
            <button
              type="button"
              onClick={() => setIsAddingComplaint(true)}
              className="w-full flex text-sm items-center cursor-pointer justify-center gap-2 bg-[#FF9800] text-white font-semibold py-3 px-4 rounded-sm hover:bg-[#F57C00] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Your Complaint
            </button>
          ) : (
            <>
              {/* Add Complaint Form */}
              <textarea
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                placeholder="Type here..."
                className="w-full h-48 px-4 py-3 text-sm border border-gray-300 rounded-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9800] resize-none"
              />

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full py-2 cursor-pointer bg-[#F44336] text-white font-semibold text-sm rounded-sm hover:bg-[#E53935] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitComplaint}
                  className="w-full py-2 cursor-pointer bg-[#FF9800] text-white font-semibold text-sm rounded-sm hover:bg-[#F57C00] transition-colors"
                >
                  Submit Complaint
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default ComplaintsDrawer;
