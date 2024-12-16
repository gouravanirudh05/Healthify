import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Hero = () => {
  const [userLocation, setUserLocation] = useState([37.7749, -122.4194]); // Default: San Francisco
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    // Get user location from the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          fetchNearbyHospitals(latitude, longitude); // Fetch nearby hospitals
        },
        () => {
          alert("Unable to retrieve your location. Using default location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const fetchNearbyHospitals = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=hospitals&limit=10&addressdetails=1&viewbox=${
          lng - 0.1
        },${lat + 0.1},${lng + 0.1},${lat - 0.1}`
      );

      const data = await response.json();
      const hospitals = data.map((hospital) => ({
        name: hospital.display_name,
        lat: parseFloat(hospital.lat),
        lng: parseFloat(hospital.lon),
      }));

      setHospitals(hospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Healthcare Simplified
        </h1>
        <p className="text-gray-600 mt-4">Access your health data anytime, anywhere.</p>
        <button className="bg-blue-500 text-white px-6 py-3 mt-6 rounded hover:bg-blue-600">
          Get Started
        </button>

        {/* Map */}
        <MapContainer
          center={userLocation} // Dynamically update center
          zoom={13}
          className="w-full h-96 mt-8"
          key={userLocation} // Force re-render on user location change
        >
          {/* OpenStreetMap Tiles */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Markers */}
          <UpdateMapCenter center={userLocation} />
          <Marker position={userLocation}>
            <Popup>
              <strong>Your Location</strong>
            </Popup>
          </Marker>
          {hospitals.map((hospital, index) => (
            <Marker key={index} position={[hospital.lat, hospital.lng]}>
              <Popup>
                <strong>{hospital.name}</strong>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* List of Hospitals */}
        <ul
          id="placesList"
          className="mt-6 text-left list-disc mx-auto w-3/4 text-gray-700"
        >
          {hospitals.map((hospital, index) => (
            <li key={index}>
              <strong>{hospital.name}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// Custom Component to Dynamically Update Map Center
const UpdateMapCenter = ({ center }) => {
  const map = useMap();
  map.setView(center); // Dynamically update the map's view
  return null;
};

export default Hero;
