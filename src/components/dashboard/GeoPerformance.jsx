import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const GeoPerformance = ({ defaultQuery = "" }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [useHeatMap] = useState(true);

    /* ---------- INIT MAP ---------- */
    useEffect(() => {
        if (mapRef.current) return;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            zoom: 17,
            center: [-79.3832, 43.6532],
            style: {
                version: 8,
                sources: {
                    mapbox: {
                        type: "raster",
                        tiles: [
                            `https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/{z}/{x}/{y}?access_token=${mapboxgl.accessToken}`,
                        ],
                        tileSize: 256,
                    },
                },
                layers: [
                    {
                        id: "mapbox",
                        type: "raster",
                        source: "mapbox",
                        paint: { "raster-opacity": 0.8 },
                    },
                ],
            },
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
        mapRef.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

        return () => mapRef.current?.remove();
    }, []);

    /* ---------- CLEAR HEATMAP ---------- */
    const clearVisualization = () => {
        const map = mapRef.current;
        if (!map) return;

        if (map.getLayer("heatmap")) map.removeLayer("heatmap");
        if (map.getSource("heatmap")) map.removeSource("heatmap");
    };

    /* ---------- FETCH & DRAW ---------- */
    useEffect(() => {
        if (!defaultQuery || !mapRef.current) return;

        const fetchData = async () => {
            setLoading(true);
            clearVisualization();

            try {
                const { data } = await axios.get(
                    `/api/v1/dashboard/geo-performance${defaultQuery}`
                );

                if (!data?.status) return;

                const bounds = new mapboxgl.LngLatBounds();
                let useBounds = false;

                const features = data.data.flatMap(area =>
                    area.points
                        .filter(p => p.coordinates?.length)
                        .map(point => {
                            const [lng, lat] = point.coordinates;
                            bounds.extend([lng, lat]);
                            useBounds = true;

                            return {
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: [lng, lat],
                                },
                                properties: { weight: 1 },
                            };
                        })
                );

                if (useHeatMap && features.length) {
                    mapRef.current.addSource("heatmap", {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features,
                        },
                    });

                    mapRef.current.addLayer({
                        id: "heatmap",
                        type: "heatmap",
                        source: "heatmap",
                        maxzoom: 15,
                        paint: {
                            "heatmap-weight": [
                                "interpolate",
                                ["linear"],
                                ["get", "weight"],
                                0, 0,
                                1, 1,
                            ],
                            "heatmap-intensity": [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                0, 1,
                                15, 3,
                            ],
                            "heatmap-color": [
                                "interpolate",
                                ["linear"],
                                ["heatmap-density"],
                                0, "rgba(0,0,255,0)",
                                0.3, "rgba(0,0,255,0.5)",
                                0.7, "rgba(0,0,255,0.8)",
                                1, "rgba(0,0,255,1)",
                            ],
                            "heatmap-radius": [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                0, 2,
                                15, 20,
                            ],
                            "heatmap-opacity": [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                7, 1,
                                15, 0,
                            ],
                        },
                    });
                }

                if (useBounds) {
                    mapRef.current.fitBounds(bounds, { padding: 50 });
                }
            } catch (err) {
                console.error("Geo Performance error", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [defaultQuery, useHeatMap]);

    return (
        <div className="bg-white rounded-sm shadow p-4 h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-800">GEO Performance</h2>
                <button
                    onClick={() => console.log("View All GEO Performance")}
                    className="text-[var(--color-primary)] hover:text-green-600 text-xs font-semibold bg-[#D4FFDA] py-1.5 px-4 rounded-2xl items-center justify-center"
                >
                    View All
                </button>
            </div>

            {/* Map */}
            <div className="relative">
                <div
                    ref={mapContainerRef}
                    className="w-full h-[350px] rounded-sm overflow-hidden"
                />

                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-sm">
                        <div className="text-gray-600">Loading...</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeoPerformance;
