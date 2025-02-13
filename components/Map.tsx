import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { SandwichSpot } from "@/types";

interface MapProps {
  spots: SandwichSpot[];
}

function Map({ spots }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: "weekly",
      libraries: ["places"]
    });

    async function initMap() {
      try {
        const google = await loader.load();
        const geocoder = new google.maps.Geocoder();
        const bounds = new google.maps.LatLngBounds();

        if (!mapRef.current) return;
        const map = new google.maps.Map(mapRef.current, {
          zoom: 12,
          center: { lat: -33.8688, lng: 151.2195 }, // Default center
        });

        // Create markers for all spots
        for (const spot of spots) {
          const results = await geocoder.geocode({ address: spot.address });
          if (results.results.length > 0) {
            const position = results.results[0].geometry.location;
            bounds.extend(position);

            const marker = new google.maps.Marker({
              map,
              position,
              title: spot.name,
            });

            // Optional: Add info windows
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div>
                  <h3>${spot.name}</h3>
                  <p>${spot.address}</p>
                  ${spot.rating ? `<p>Rating: ${spot.rating}/10</p>` : ''}
                </div>
              `
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });
          }
        }

        // Fit map to show all markers
        map.fitBounds(bounds);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    }

    if (spots.length > 0) {
      initMap();
    }
  }, [spots]);

  return <div style={{ height: "400px" }} ref={mapRef} />;
}

export default Map; 