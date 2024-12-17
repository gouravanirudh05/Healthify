import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Dashboard = () => {
  const [userLocation, setUserLocation] = useState([37.7749, -122.4194]); // Default: San Francisco
  const [hospitals, setHospitals] = useState([]);
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiInput, setBmiInput] = useState({ weight: "", height: "" });

  // Fetch user location on component mount
  useEffect(() => {
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

  // Function to fetch nearby hospitals
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
        phone: "Not Available", // Placeholder for phone number
      }));

      setHospitals(hospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  // BMI Calculation Logic
  const calculateBMI = () => {
    const { weight, height } = bmiInput;

    if (!weight || !height) {
      alert("Please enter both weight (kg) and height (cm).");
      return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    let status = "";
    if (bmi < 18.5) status = "Underweight";
    else if (bmi >= 18.5 && bmi < 24.9) status = "Normal weight";
    else if (bmi >= 25 && bmi < 29.9) status = "Overweight";
    else status = "Obesity";

    setBmiResult({ bmi, status });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
      </header>
      <main className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section: Health Reports */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold text-gray-800">Health Reports</h2>
          <p className="text-gray-600 mt-2">View your detailed health history.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Reports
          </button>
        </div>

        {/* Section: Appointments */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold text-gray-800">Appointments</h2>
          <p className="text-gray-600 mt-2">Manage your upcoming appointments.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Schedule Now
          </button>
        </div>

        {/* Section: BMI Calculator */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold text-gray-800">BMI Calculator</h2>
          <p className="text-gray-600 mt-2">Check your Body Mass Index.</p>
          <div className="mt-4">
            <input
              type="number"
              placeholder="Weight (kg)"
              className="border rounded p-2 mr-2"
              value={bmiInput.weight}
              onChange={(e) =>
                setBmiInput({ ...bmiInput, weight: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Height (cm)"
              className="border rounded p-2"
              value={bmiInput.height}
              onChange={(e) =>
                setBmiInput({ ...bmiInput, height: e.target.value })
              }
            />
            <button
              onClick={calculateBMI}
              className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Calculate
            </button>
          </div>
          {bmiResult && (
            <div className="mt-4 text-gray-700">
              <p>
                <strong>Your BMI:</strong> {bmiResult.bmi}
              </p>
              <p>
                <strong>Status:</strong> {bmiResult.status}
              </p>
            </div>
          )}
        </div>

        {/* Section: Map */}
        <div className="bg-white shadow rounded p-6 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800">Nearby Hospitals</h2>
          <p className="text-gray-600 mt-2">
            Find hospitals near your current location.
          </p>

          <MapContainer
            center={userLocation}
            zoom={13}
            className="w-full h-96 mt-4"
            key={userLocation}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
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

          {/* Organized List of Hospitals */}
          <table className="mt-6 w-full table-auto border-collapse border border-gray-300 text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {hospital.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {hospital.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

// Custom Component to Dynamically Update Map Center
const UpdateMapCenter = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

export default Dashboard;
