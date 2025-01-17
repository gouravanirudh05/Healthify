import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import axios from "axios";

const ScheduleAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [agoraDetails, setAgoraDetails] = useState(null); // For Agora meeting details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const generateAgoraToken = async (channelName) => {
    try {
      const response = await axios.post("http://localhost:5000/api/generate-token", { channelName });
      return response.data;
    } catch (error) {
      console.error("Error generating Agora token:", error);
      throw error;
    }
  };

  const handleScheduleAppointment = async () => {
    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      alert("Please fill in all the fields.");
      return;
    }

    const appointment = {
      doctorId: selectedDoctor._id,
      doctorName: selectedDoctor.name,
      date: appointmentDate,
      time: appointmentTime,
    };

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      });

      const data = await response.json();
      setSuccessMessage("Appointment scheduled successfully!");

      // Create Agora meeting room
      const channelName = `appointment-${data._id}`;
      const agoraData = await generateAgoraToken(channelName);

      setAgoraDetails({ channelName: agoraData.channelName, token: agoraData.token });
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      alert("An error occurred while scheduling the appointment.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-gray-700">Schedule Appointment</h1>
      </header>
      <main className="p-8">
        {/* Doctor Selection */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold text-gray-800">Select a Doctor</h2>
          <select
            value={selectedDoctor ? selectedDoctor._id : ""}
            onChange={(e) => {
              const selectedDoc = doctors.find((doc) => doc._id === e.target.value);
              setSelectedDoctor(selectedDoc);
            }}
            className="mt-4 p-2 border rounded"
          >
            <option value="" disabled>Select a Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
        </div>

        {/* Date and Time Selection */}
        {selectedDoctor && (
          <div className="bg-white shadow rounded p-6 mt-6">
            <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className="border rounded p-2 mr-2" />
            <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className="border rounded p-2" />
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-between items-center">
          <button onClick={handleScheduleAppointment} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Schedule Appointment
          </button>
          <button onClick={() => navigate("/")} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
            Go Back
          </button>
        </div>

        {/* Success Message */}
        {successMessage && <div className="mt-6 text-green-600"><strong>{successMessage}</strong></div>}

        {/* Agora Meeting */}
        {agoraDetails && (
          <div className="mt-8">
            <h3 className="text-xl text-gray-800">Agora Meeting</h3>
            <iframe
              src={`https://web.agora.io/${agoraDetails.channelName}?token=${agoraDetails.token}`}
              title="Agora Meeting"
              className="w-full h-96 border rounded"
            ></iframe>
          </div>
        )}
      </main>
    </div>
  );
};

export default ScheduleAppointment;
