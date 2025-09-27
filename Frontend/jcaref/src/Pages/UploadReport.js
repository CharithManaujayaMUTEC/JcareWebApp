// src/Pages/UploadReport.jsx
import React, { useState, useEffect } from "react";
import NavBarPro from "../Components/NavBarPro";

const UploadReport = () => {
  const [patientId, setPatientId] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const [reportType, setReportType] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [remarks, setRemarks] = useState("");
  const [reportFile, setReportFile] = useState(null);
  const [doctorId, setDoctorId] = useState("");

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors from backend
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:8081/dashboard/getAllEmployees");
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();

        // Filter doctors only
        const doctorList = data;
        setDoctors(doctorList);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleFileChange = (e) => {
    setReportFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!patientId || !reportTitle || !reportType || !priority || !doctorId || !reportFile) {
      alert("⚠️ Please fill all required fields and select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("patientId", patientId);
    formData.append("reportTitle", reportTitle);
    formData.append("reportType", reportType);
    formData.append("priority", priority);
    formData.append("remarks", remarks);
    formData.append("doctorId", doctorId);
    formData.append("file", reportFile);

    try {
      const res = await fetch("http://localhost:8081/patientreports/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload report");
      const data = await res.json();

      console.log("✅ Report Uploaded:", data);
      alert(
        `✅ Report "${reportTitle}" (${reportType}) uploaded for patient ${patientId} and sent to Doctor ${doctorId} with priority ${priority}`
      );

      // Reset form
      setPatientId("");
      setReportTitle("");
      setReportType("");
      setPriority("Normal");
      setRemarks("");
      setDoctorId("");
      setReportFile(null);
    } catch (error) {
      console.error("❌ Upload Error:", error);
      alert("❌ Failed to upload report. Please try again.");
    }
  };

  return (
    <div>
      <NavBarPro />
      <div className="bg-gradient-to-r from-white to-purple-500 min-h-screen flex justify-center items-start py-10">
        <div className="p-8 bg-white shadow-lg rounded-2xl w-3/4 mx-auto">
          <h1 className="font-Montserrat text-4xl font-semibold text-purple-700 text-center">
            Upload Patient Report
          </h1>
          <p className="font-Montserrat text-gray-600 text-center mt-2">
            Please select the patient and upload their medical report.
          </p>

          {/* Upload Form */}
          <div className="mt-6 space-y-4">
            {/* Patient ID */}
            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                Patient ID *
              </label>
              <input
                type="text"
                placeholder="Enter Patient ID"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
            </div>

            {/* Report Title */}
            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                Report Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Blood Test Report"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
              />
            </div>

            {/* Report Type */}
            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                Report Type *
              </label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="">Select Report Type</option>
                <option value="Blood Test">Blood Test</option>
                <option value="X-Ray">X-Ray</option>
                <option value="MRI">MRI</option>
                <option value="CT Scan">CT Scan</option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                Priority *
              </label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Routine">Routine</option>
              </select>
            </div>

            {/* Assign to Doctor */}
            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                Assign to Doctor *
              </label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc, idx) => (
                  <option key={idx} value={doc.employeeId}>
                    {doc.name} ({doc.department})
                  </option>
                ))}
              </select>
            </div>

            {/* Remarks */}
            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                Remarks
              </label>
              <textarea
                placeholder="Enter additional notes or instructions"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                rows="3"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>

            {/* Report File */}
            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">
                Upload Report File *
              </label>
              <input
                type="file"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Upload Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleUpload}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              Upload Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadReport;