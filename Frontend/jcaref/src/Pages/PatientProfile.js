import React from 'react';
import NavBarPro from '../Components/NavBarPro';
import Docs from './Images/Docs.png';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useState } from 'react';
import HistoryModal from '../Components/HistoryModal';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PatientProfile = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const patient = {
    name: "John Doe",
    age: 45,
    gender: "Male",
    medicalHistory: "Hypertension, Diabetes",
    patientId: 123456,
    dateAdmitted: "12/12/2021",
    dateDischarged: "12/12/2021",
    currentStatus: "Stable",
    attendingPhysician: "Dr. Jane Doe",
    roomNo: 101,
    bedNo: 1,
    contact: 1234567890,
    address: "1234 Main St, City, Country",
    nextOfKin: "Jane Doe",
    nextOfKinContact: 1234567890,
    nextOfKinAddress: "1234 Main St, City, Country",  

    };
    const lastHistory = {
      datenTime: "12/12/2021 12:00",
      bloodPressure: "120/80",
      temperature: "37",
      pulseRate: "80",
      respiratoryRate: "20",
      oxygenSaturation: "98",
      weight: "70",
      height: "170",
      bmi: "24.22",
      allergies: "None",
      medications: "Paracetamol",
      symptoms: "Headache",
      diagnosis: "Migraine",
   };
   const metrics = {
    "Blood Pressure": [120, 122, 118, 121, 125, 119, 124],
    "Temperature": [36.5, 36.7, 37, 37.2, 36.9, 37.1, 36.8],
    "Pulse Rate": [75, 78, 80, 79, 81, 77, 76]
    };

  const [selectedMetric, setSelectedMetric] = useState("Blood Pressure");

  const historyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: `${selectedMetric}`,
        data: metrics[selectedMetric],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
    };
    return (
        <div>
            <div>
                <NavBarPro />
            </div>
            <div className="bg-gradient-to-r from-white to-blue-500 min-h-screen justify-center items-center">
            <section className='flex justify-center p-10 px-20 '>
              <div className=" flex justify-between w-full gap-x-8 gap-y-4 min-h-40">
                <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-4 w-full pl-20 py-10 bg-white shadow-lg rounded-2xl min-h-40 ">
                  <img
                  src={Docs}
                  className="w-20 h-20 rounded-full border-4 border-blue-500"
                  />
                  <h2 className="text-4xl col-span-3 font-semibold text-gray-800 text-left mb-4">General Details - {patient.name} - Patient No </h2> 
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Name:</strong> {patient.name}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Age:</strong> {patient.age}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Patient ID:</strong> {patient.patientId}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Gender:</strong> {patient.gender}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Medical History:</strong> {patient.medicalHistory}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Date Admitted:</strong> {patient.dateAdmitted}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Date of Discharged:</strong> {patient.dateDischarged}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Current Status:</strong> {patient.currentStatus}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Doctor in Charge:</strong> {patient.attendingPhysician}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Room No:</strong> {patient.roomNo}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Guardian:</strong> {patient.nextOfKin}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Contact Emergency:</strong> {patient.nextOfKinContact}</p>
                     
                </div>
              </div>
            </section>
            <section className='flex justify-center px-20 pb-10 '>
              <div className=" flex justify-between w-full gap-x-8 gap-y-4 min-h-40 ">
              <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-5 w-full pl-20 py-10 bg-white shadow-lg rounded-2xl min-h-40 ">
                  <h2 className="text-4xl col-span-3 font-semibold text-gray-800 text-left mb-4">Last History Taken</h2>
                  <p className="text-lg text-gray-700 text-left pb-2"><strong>Date & Time:</strong> {lastHistory.datenTime}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Blood Pressure:</strong> {lastHistory.bloodPressure}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Temperature:</strong> {lastHistory.temperature}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Pulse Rate:</strong> {lastHistory.pulseRate}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Respiratory Rate:</strong> {lastHistory.respiratoryRate}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Oxygen Saturation:</strong> {lastHistory.oxygenSaturation}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Weight:</strong> {lastHistory.weight}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Height:</strong> {lastHistory.height}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>BMI:</strong> {lastHistory.bmi}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Allergies:</strong> {lastHistory.allergies}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Medications:</strong> {lastHistory.medications}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Symptoms:</strong> {lastHistory.symptoms}</p>
                  <p className="text-lg text-gray-700 text-left pt-5"><strong>Diagnosis:</strong> {lastHistory.diagnosis}</p>
                  <div className="col-span-4 flex justify-end pt-5 pr-10">
                  <button onClick={() => setIsModalOpen(true)} className="py-3 px-10 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">Take History</button>
                  </div>
                </div>
              </div>
            </section>
            <section className='flex justify-center px-20 pb-10 '>
              <div className=" flex justify-between w-full gap-x-8 gap-y-4 min-h-40 ">
                
              <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-8 w-full pl-20 py-10 bg-white shadow-lg rounded-2xl min-h-40 ">
              <h2 className="text-4xl col-span-3 font-semibold text-gray-800 text-left mb-4">Variation of Viatls Over Time</h2>
              <div className="flex justify-center mb-4 col-span-1">
              <select
                className="px-2 py-2 border rounded-lg shadow-md "
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
              {Object.keys(metrics).map((metric) => (
                <option key={metric} value={metric}>{metric}</option>
              ))}
              </select>
              </div>
              <div className="flex justify-center row-span-7 col-span-4 pr-5">
              <Line data={historyData}/> 
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