import React, { useState, useEffect } from 'react';
import NavBarPro from '../Components/NavBarPro';
import Docs from './Images/Docs.png';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import HistoryModal from '../Components/HistoryModal';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PatientProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patient, setPatient] = useState(null);
  const [lastHistory, setLastHistory] = useState(null);
  const [metrics, setMetrics] = useState({});
  const [selectedMetric, setSelectedMetric] = useState("Blood Pressure");

const patientId = localStorage.getItem("patientid") || "EMP004";

  useEffect(() => {
    // Fetch patient details
    fetch(`http://localhost:8081/dashboard/patientProfile/getPatientDetails?patientId=${patientid}`) 
      .then(response => response.json())
      .then(data => setPatient(data))
      .catch(error => console.error("Error fetching patient details:", error)); 

    // Fetch last history
    fetch(`http://localhost:8080/patientProfile/getPatientLastHistory?patientId=${patientid}`) 
      .then(response => response.json())
      .then(data => setLastHistory(data))
      .catch(error => console.error("Error fetching last history:", error));

    // Fetch vital metrics over time
    fetch(`http://localhost:8080/patientProfile/getParameterVariation?patientId=${patientid}`) 
      .then(response => response.json())
      .then(data => setMetrics(data))
      .catch(error => console.error("Error fetching vital metrics:", error));
  }, []);

  const historyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: `${selectedMetric}`,
        data: metrics[selectedMetric] || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
      <NavBarPro />
      <div className="bg-gradient-to-r from-white to-blue-500 min-h-screen justify-center items-center">
        <section className="flex justify-center p-10 px-20">
          <div className="flex justify-between w-full gap-x-8 gap-y-4 min-h-40">
            <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-4 w-full pl-20 py-10 bg-white shadow-lg rounded-2xl min-h-40">
              <img src={Docs} className="w-20 h-20 rounded-full border-4 border-blue-500" alt="Profile" />
              <h2 className="text-4xl col-span-3 font-semibold text-gray-800 text-left mb-4">
                General Details - {patient.name} - Patient No {patient.patientId}
              </h2>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Name:</strong> {patient.name}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Age:</strong> {patient.age}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Gender:</strong> {patient.gender}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Medical History:</strong> {patient.medicalHistory}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Date Admitted:</strong> {patient.dateAdmitted}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Date Discharged:</strong> {patient.dateDischarged}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Current Status:</strong> {patient.currentStatus}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Doctor in Charge:</strong> {patient.attendingPhysician}</p>
            </div>
          </div>
        </section>

        <section className="flex justify-center px-20 pb-10">
          <div className="flex justify-between w-full gap-x-8 gap-y-4 min-h-40">
            <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-5 w-full pl-20 py-10 bg-white shadow-lg rounded-2xl min-h-40">
              <h2 className="text-4xl col-span-3 font-semibold text-gray-800 text-left mb-4">Last History Taken</h2>
              <p className="text-lg text-gray-700 text-left pb-2"><strong>Date & Time:</strong> {lastHistory.datenTime}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Blood Pressure:</strong> {lastHistory.bloodPressure}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Temperature:</strong> {lastHistory.temperature}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Pulse Rate:</strong> {lastHistory.pulseRate}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Respiratory Rate:</strong> {lastHistory.respiratoryRate}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Diagnosis:</strong> {lastHistory.diagnosis}</p>
              <div className="col-span-4 flex justify-end pt-5 pr-10">
                <button onClick={() => setIsModalOpen(true)} className="py-3 px-10 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">Take History</button>
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center px-20 pb-10">
          <div className="flex justify-between w-full gap-x-8 gap-y-4 min-h-40">
            <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-8 w-full pl-20 py-10 bg-white shadow-lg rounded-2xl min-h-40">
              <h2 className="text-4xl col-span-3 font-semibold text-gray-800 text-left mb-4">Variation of Vitals Over Time</h2>
              <div className="flex justify-center mb-4 col-span-1">
                <select className="px-2 py-2 border rounded-lg shadow-md" value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
                  {Object.keys(metrics).map((metric) => (
                    <option key={metric} value={metric}>{metric}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center row-span-7 col-span-4 pr-5">
                <Line data={historyData} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {isModalOpen && <HistoryModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default PatientProfile;