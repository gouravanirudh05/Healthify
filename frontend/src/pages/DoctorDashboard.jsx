import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

const BACKEND_URL =
  import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:5000';

const DoctorDashboard = () => {
  const [userLocation, setUserLocation] = useState([37.7749, -122.4194]); // Default: San Francisco
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [clinicLocation, setClinicLocation] = useState([37.7749, -122.4194]);

  // Fetch user location and clinic details
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setClinicLocation([latitude, longitude]); // Assuming doctor is in the current location
          // Optionally, fetch nearby clinics or hospitals based on doctor's location
        },
        () => {
          alert("Unable to retrieve your location. Using default location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  // Dummy data for appointments and patients
  useEffect(() => {
    // setAppointments([
    //   { id: 1, patientName: "John Doe", date: "2025-01-10", time: "10:00 AM" },
    //   { id: 2, patientName: "Jane Smith", date: "2025-01-12", time: "2:00 PM" },
    // ]);
    setPatients([
      { id: 1, name: "John Doe", age: 35, gender: "Male", condition: "Flu" },
      { id: 2, name: "Jane Smith", age: 28, gender: "Female", condition: "Asthma" },
    ]);
    async function fetchData() {
      const response = await fetch(`${BACKEND_URL}/api/getAppointments`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      setAppointments(json.appointments)
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-gray-700">Doctor Dashboard</h1>
      </header>
      <main className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section: Patient Information */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold text-gray-800">Patient Information</h2>
          <p className="text-gray-600 mt-2">View your patients' medical details.</p>
          <table className="mt-4 w-full table-auto border-collapse border border-gray-300 text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Condition</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{patient.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{patient.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section: Appointments */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold text-gray-800">Appointments</h2>
          <p className="text-gray-600 mt-2">Manage your upcoming appointments.</p>
          <table className="mt-4 w-full table-auto border-collapse border border-gray-300 text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Patient Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{appointment.patientName}</td>
                  <td className="border border-gray-300 px-4 py-2">{appointment.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{appointment.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section: Map */}
        <div className="bg-white shadow rounded p-6 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800">Clinic Location</h2>
          <p className="text-gray-600 mt-2">Find your clinic location and nearby medical facilities.</p>

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
            <Marker position={clinicLocation}>
              <Popup>
                <strong>Your Clinic</strong>
              </Popup>
            </Marker>
          </MapContainer>
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

export default DoctorDashboard;
