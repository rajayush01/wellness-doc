import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./NearbyDoctorsMap.css";

// Custom icons
const doctorIcon = new L.Icon({
  iconUrl: "https://img.freepik.com/premium-vector/doctor-icon-avatar-white_136162-58.jpg",
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const randomLocationIcon = new L.Icon({
  iconUrl: "https://png.pngtree.com/png-vector/20230413/ourmid/pngtree-3d-location-icon-clipart-in-transparent-background-vector-png-image_6704161.png",
  iconSize: [25, 35],
  iconAnchor: [12, 35],
});

const doctors = [
  { id: 1, name: "Dr. Alice Johnson", lat: 37.773972, lng: -122.431297, distance: "1.2 km" },
  { id: 2, name: "Dr. Bob Smith", lat: 37.7749, lng: -122.4194, distance: "2.5 km" },
  // Add more doctors here
];

const generateRandomLocations = (baseLocation, count) => {
  const [baseLat, baseLng] = baseLocation;
  const locations = [];
  for (let i = 0; i < count; i++) {
    const randomLat = baseLat + (Math.random() - 0.5) * 0.02;
    const randomLng = baseLng + (Math.random() - 0.5) * 0.02;
    locations.push({ id: i, lat: randomLat, lng: randomLng });
  }
  return locations;
};

const NearbyDoctorsMap = () => {
  const [userLocation, setUserLocation] = useState([37.773972, -122.431297]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [randomLocations, setRandomLocations] = useState([]);

  useEffect(() => {
    if (!isLoaded) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLoc = [position.coords.latitude, position.coords.longitude];
            setUserLocation(userLoc);
            setRandomLocations(generateRandomLocations(userLoc, 5)); // Generate 5 random locations
            setIsLoaded(true);
          },
          () => {
            console.error("Location access denied.");
            setRandomLocations(generateRandomLocations(userLocation, 5));
            setIsLoaded(true);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setRandomLocations(generateRandomLocations(userLocation, 5));
        setIsLoaded(true);
      }
    }
  }, [userLocation, isLoaded]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <div className="w-full lg:w-3/5 h-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg">
        {isLoaded && (
          <MapContainer center={userLocation} zoom={13} className="h-full w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={userLocation}
              icon={L.icon({
                iconUrl: "https://p7.hiclipart.com/preview/230/805/284/computer-icons-clip-art-location-icon-thumbnail.jpg",
                iconSize: [25, 35],
                iconAnchor: [12, 41],
              })}
            >
              <Popup>Your Location</Popup>
            </Marker>
            {doctors.map((doctor) => (
              <Marker key={doctor.id} position={[doctor.lat, doctor.lng]} icon={doctorIcon}>
                <Popup>{doctor.name}</Popup>
              </Marker>
            ))}
            {randomLocations.map((location) => (
              <Marker key={location.id} position={[location.lat, location.lng]} icon={randomLocationIcon}>
                <Popup>Random Location {location.id + 1}</Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
      <div className="w-full lg:w-2/5 space-y-2">
        <h2 className="text-xl font-semibold">Nearby Doctors</h2>
        {doctors.map((doctor) => (
          <div key={doctor.id} className="p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition">
            <h3 className="text-lg font-medium">{doctor.name}</h3>
            <p className="text-gray-600">Distance: {doctor.distance}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyDoctorsMap;
