import { useRef, useEffect } from "react";
import { X, Eye, Handshake } from "lucide-react";
import Drawer from "../../../components/common/Drawer";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

if (typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== "undefined") {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
}

const AreaCodesDrawer = ({ isOpen, onClose, driver, onViewMoreDetails, onHire }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !mapContainerRef.current || mapRef.current) return;
    const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    if (!token) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-79.3832, 43.6532],
      zoom: 14,
    });

    mapRef.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [isOpen]);

  const hasMapToken =
    typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== "undefined" &&
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} width="w-[460px]" className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold text-black">
            {driver?.driverName || "Driver"}
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
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {/* Areas of Delivery */}
          <div>
            <h3 className="text-md font-semibold text-black mb-3">
              Areas of Delivery
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-3 py-2 bg-[#0066FF] text-white text-[13px] font-normal rounded-full">
                M2N 3X1
              </span>
              <span className="px-3 py-2 bg-[#E8F1FF] text-[#5A5A5A] text-[13px] font-normal rounded-full">
                M2N 3X2
              </span>
              <span className="px-3 py-2 bg-[#E8F1FF] text-[#5A5A5A] text-[13px] font-normal rounded-full">
                M3N 3X0
              </span>
              <span className="px-3 py-2 bg-[#E8F1FF] text-[#5A5A5A] text-[13px] font-normal rounded-full">
                Z2N 4X0
              </span>
              <span className="px-3 py-2 bg-[#E8F1FF] text-[#5A5A5A] text-[13px] font-normal rounded-full">
                M2N 3X2
              </span>
              <span className="px-3 py-2 bg-[#E8F1FF] text-[#5A5A5A] text-[13px] font-normal rounded-full">
                Z2N 4X0
              </span>
              <span className="px-3 py-2 bg-[#E8F1FF] text-[#5A5A5A] text-[13px] font-normal rounded-full">
                M2N 3X2
              </span>
            </div>
          </div>

          {/* Map */}
          <div className="w-full h-75 rounded-sm overflow-hidden bg-[#EEF1F4] shadow-lg">
            {hasMapToken ? (
              <div ref={mapContainerRef} className="w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                Map preview
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                onViewMoreDetails?.(driver);
                onClose();
              }}
              className="flex items-center justify-center cursor-pointer gap-1 text-sm bg-[#0066FF] text-white font-medium py-2.5 px-4 rounded-sm capitalize hover:bg-[#0052CC] transition-colors"
            >
              <Eye className="w-5 h-5" />
              View More Details
            </button>
            <button
              type="button"
              onClick={() => {
                onHire?.(driver);
                onClose();
              }}
              className="flex items-center justify-center cursor-pointer gap-1 text-sm bg-[#109F22] text-white font-medium py-2.5 px-4 rounded-sm capitalize hover:bg-[#0D8A1D] transition-colors"
            >
              <Handshake className="w-5 h-5" />
              Hire Now
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AreaCodesDrawer;
