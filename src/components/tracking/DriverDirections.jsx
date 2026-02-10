import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// Configure Mapbox token if available
if (
  typeof import.meta !== "undefined" &&
  import.meta.env?.VITE_MAPBOX_ACCESS_TOKEN
) {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
}

const DriverDirections = ({ mapId, driver, destinations = [] }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  const hasToken =
    typeof import.meta !== "undefined" &&
    !!import.meta.env?.VITE_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (!containerRef.current || mapRef.current || !hasToken) return;

    const center =
      driver?.lat && driver?.lng
        ? [driver.lng, driver.lat]
        : [-79.3832, 43.6532]; // fallback: Toronto

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center,
      zoom: 15,
    });

    mapRef.current = map;

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: true }),
      "top-right",
    );

    map.on("load", () => {
      // Driver marker (blue)
      new mapboxgl.Marker({ color: "#1D4ED8" }).setLngLat(center).addTo(map);

      // Use provided destinations or fall back to two demo points
      const points =
        destinations && destinations.length
          ? destinations
          : [
              { lng: center[0] - 0.01, lat: center[1] },
              { lng: center[0] + 0.008, lat: center[1] + 0.004 },
            ];

      // Red destination markers
      points.forEach((p) => {
        new mapboxgl.Marker({ color: "#EF4444" })
          .setLngLat([p.lng, p.lat])
          .addTo(map);
      });

      // Simple line from driver through all points
      const coords = [center, ...points.map((p) => [p.lng, p.lat])];

      map.addSource("driver-route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coords,
          },
        },
      });

      map.addLayer({
        id: "driver-route-line",
        type: "line",
        source: "driver-route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#1D4ED8",
          "line-width": 4,
        },
      });

      const bounds = new mapboxgl.LngLatBounds();
      coords.forEach((c) => bounds.extend(c));
      map.fitBounds(bounds, { padding: 40, maxZoom: 16 });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapId, driver, destinations, hasToken]);

  if (!hasToken) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-[11px] text-gray-600">
        Map disabled – set VITE_MAPBOX_ACCESS_TOKEN
      </div>
    );
  }

  return <div id={mapId} ref={containerRef} className="w-full h-full" />;
};

export default DriverDirections;
