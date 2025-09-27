// src/Pages/VisitorSchedule.jsx
import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";

const VisitorSchedule = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]); // Store booked slots for chosen date
  const [visitor, setVisitor] = useState({
    name: "",
    phone: "",
    email: "",
    nic: "",
    membs: "",
    nicsfam: "",
    patient: "",
    purpose: "",
  });

  const timeSlots = [
    "09:00 AM - 09:30 AM",
    "09:30 AM - 10:00 AM",
    "10:00 AM - 10:30 AM",
    "10:30 AM - 11:00 AM",
    "11:00 AM - 11:30 AM",
    "02:00 PM - 02:30 PM",
    "02:30 PM - 03:00 PM",
    "03:00 PM - 03:30 PM",
  ];

  // Fetch booked slots for patient + date
  useEffect(() => {
    if (visitor.patient && selectedDate) {
      fetch(
        `http://localhost:8081/patientvisit/patient/${visitor.patient}?date=${selectedDate}`
      )
        .then((res) => res.json())
        .then((data) => {
          const slots = data.map((visit) => visit.visitTime);
          console.log("⏳ Booked Slots:", slots);
          setBookedSlots(slots);
        })
        .catch((err) => console.error("❌ Error fetching slots:", err));
    }
  }, [selectedDate, visitor.patient]);

  const handleConfirm = async () => {
    if (
      !selectedDate ||
      !selectedSlot ||
      !visitor.name ||
      !visitor.phone ||
      !visitor.nic ||
      !visitor.patient
    ) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }

    const bookingData = {
      patientId: visitor.patient,
      visitDate: selectedDate,
      visitTime: selectedSlot,
      visitorNic: visitor.nic,
      reasonForVisit: visitor.purpose,
      notes: `Name: ${visitor.name}, Phone: ${visitor.phone}, Email: ${
        visitor.email || "N/A"
      }, Members: ${visitor.membs || 0}, Family NICs: ${
        visitor.nicsfam || "N/A"
      }`,
    };

    try {
      const response = await fetch("http://localhost:8081/patientvisit/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert(
          `✅ Visitor ${visitor.name} booked for ${selectedDate} at ${selectedSlot}`
        );
        setSelectedSlot("");
        setBookedSlots((prev) => [...prev, selectedSlot]); // block slot immediately
      } else {
        alert("❌ Failed to save booking. Please try again.");
      }
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("❌ Server error while saving booking.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="bg-gradient-to-r from-white to-purple-500 min-h-screen flex justify-center items-start py-10">
        <div className="p-8 bg-white shadow-lg rounded-2xl w-3/4 mx-auto">
          <h1 className="font-Montserrat text-4xl font-semibold text-purple-700 text-center">
            Schedule a Visitor Slot
          </h1>
          <p className="font-Montserrat text-gray-600 text-center mt-2">
            Please fill in visitor details and choose a date/time.
          </p>

          {/* Visitor Details Form */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                Visitor Name *
              </label>
              <input
                type="text"
                placeholder="Enter visitor name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={visitor.name}
                onChange={(e) => setVisitor({ ...visitor, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                Phone *
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={visitor.phone}
                onChange={(e) =>
                  setVisitor({ ...visitor, phone: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                Email Address
              </label>
              <input
                type="text"
                placeholder="Enter email address"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={visitor.email}
                onChange={(e) =>
                  setVisitor({ ...visitor, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                NIC *
              </label>
              <input
                type="text"
                placeholder="Enter National Identity Card Number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={visitor.nic}
                onChange={(e) => setVisitor({ ...visitor, nic: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                No of Accompliances
              </label>
              <input
                type="text"
                placeholder="Enter Number of family members/friends accompanied with"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={visitor.membs}
                onChange={(e) =>
                  setVisitor({ ...visitor, membs: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                Their NICs
              </label>
              <input
                type="text"
                placeholder="Enter their National Identity Card Numbers(only adults)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={visitor.nicsfam}
                onChange={(e) =>
                  setVisitor({ ...visitor, nicsfam: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                Patient No *
              </label>
              <input
                type="text"
                placeholder="Enter the Patient Number you are visiting"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={visitor.patient}
                onChange={(e) =>
                  setVisitor({ ...visitor, patient: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-Montserrat text-gray-700 mb-2 text-left">
                Purpose of Visit
              </label>
              <textarea
                placeholder="Reason for visit"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 text-left"
                rows="2"
                value={visitor.purpose}
                onChange={(e) =>
                  setVisitor({ ...visitor, purpose: e.target.value })
                }
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="mt-6">
            <label className="block font-Montserrat text-gray-700 mb-2">
              Select Date *
            </label>
            <input
              type="date"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {/* Time Slots */}
          <div className="mt-6">
            <h3 className="font-Montserrat text-lg font-semibold text-gray-700 mb-2">
              Available Time Slots *
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {timeSlots.map((slot, idx) => {
                const isBooked = bookedSlots.includes(slot);
                return (
                  <button
                    key={idx}
                    disabled={isBooked}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-lg border text-sm font-Montserrat transition-colors ${
                      isBooked
                        ? "bg-red-300 text-white cursor-not-allowed"
                        : selectedSlot === slot
                        ? "bg-purple-600 text-white border-purple-700"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Confirm Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleConfirm}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorSchedule;