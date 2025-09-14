import React, { useState, useEffect } from 'react';
import NavBarPro from '../Components/NavBarPro';
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [fetchedData, setFetchedData] = useState(null); 

  const patientid = localStorage.getItem("patientid") || "PAT1001";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          `http://localhost:8081/patientProfile/getPatientDetails?patientId=${patientid}`,
          `http://localhost:8081/patientProfile/getPatientLastHistory?patientId=${patientid}`,
        ];

        const responses = await Promise.all(urls.map((url) => fetch(url)));

        for (const res of responses) {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await Promise.all(responses.map((res) => res.json()));

        const mappedPatient = {
          name: data[0][0],
          email: data[0][1],
          phone: data[0][2],
          address: data[0][3],
          dob: data[0][4],
          gender: data[0][5],
          bloodGroup: data[0][6],
          height: data[0][7],
          weight: data[0][8],
          allergies: data[0][9],
          medications: data[0][10],
          diseases: data[0][11],
          insuranceId: data[0][12],
          status: data[0][13],
          department: data[0][14]
        };

        const mappedHistory = {
          dateTime: data[1][0],
          bloodPressure: data[1][1],
          temperature: data[1][2],
          pulseRate: data[1][3],
          respiratoryRate: data[1][4],
          diagnosis: data[1][5]
        };

        setPatient(mappedPatient);
        setLastHistory(mappedHistory);

        console.log("Mapped Patient:", mappedPatient);
        console.log("Mapped Last History:", mappedHistory);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [patientid]);

  const formatDateForUrl = (date) => {
    return date.toISOString().split('T')[0]; 
  };

  const handleFetchParameterData = async () => {
    try {
      const formattedStartDate = formatDateForUrl(startDate);
      const formattedEndDate = formatDateForUrl(endDate);

      const url = `http://localhost:8081/patientProfile/getParameterVariation?patientId=${patientid}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&parameter=${selectedMetric}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      setFetchedData(data); 

    } catch (error) {
      console.error("Error fetching parameter data:", error);
    }
  };

  const historyData = {
    labels: fetchedData ? fetchedData.map((item, index) => {
      return new Date(startDate.getTime() + index * 86400000).toISOString().split('T')[0]; 
    }) : [], 
    datasets: [
      {
        label: `${selectedMetric}`,
        data: fetchedData ? fetchedData.map(item => parseFloat(item)) : [], 
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };
  

  if (!patient || !lastHistory.length === 0) {
    return <div>Loading... Check console logs.</div>;
  }

  return (
    <div>
      <NavBarPro />
      <div className="bg-gradient-to-r from-white to-blue-500 min-h-screen justify-center items-center">
        <section className="flex justify-center p-10 px-20">
          <div className="flex justify-between w-full gap-x-8 gap-y-4 min-h-40">
            <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-4 w-full pl-20 py-10 bg-white shadow-lg rounded-2xl min-h-40">
              <img src="/Images/Docs.png" className="w-20 h-20 rounded-full border-4 border-blue-500" alt="Profile" />
              <h2 className="text-4xl col-span-3 font-semibold text-gray-800 text-left mb-4">
                General Details - {patient.name} - Patient No {patientid}
              </h2>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Name:</strong> {patient.name}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Email:</strong> {patient.email}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Phone:</strong> {patient.phone}</p>
              <p className="text-lg text-gray-700 text-left pt-5 pr-5"><strong>Address:</strong> {patient.address}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Date of Birth:</strong> {patient.dob}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Gender:</strong> {patient.gender}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Blood Group:</strong> {patient.bloodGroup}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Height:</strong> {patient.height} cm</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Weight:</strong> {patient.weight} kg</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Allergies:</strong> {patient.allergies}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Medications:</strong> {patient.medications}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Diseases:</strong> {patient.diseases}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Insurance ID:</strong> {patient.insuranceId}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Status:</strong> {patient.status}</p>
              <p className="text-lg text-gray-700 text-left pt-5"><strong>Department:</strong> {patient.department}</p>
            </div>
          </div>
        </section>

        <section className="flex justify-center px-20 pb-10">
          <div className="flex justify-between w-full gap-x-8 gap-y-4 min-h-40">
            <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-5 w-full pl-20 py-10 bg-white shadow-lg rounded-2xl min-h-40">
              <h2 className="text-4xl col-span-3 font-semibold text-gray-800 text-left mb-4">Last History Taken</h2>
              <p className="text-lg text-gray-700 text-left pb-2 pr-5"><strong>Date & Time:</strong> {lastHistory.dateTime}</p>
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
              <h2 className="text-4xl col-span-4 font-semibold text-gray-800 text-left mb-4">
                Variation of Vitals Over Time
              </h2>

              <div className="flex items-center gap-4 mb-4 col-span-4">
                <div>
                  <label className="block font-medium font-Montserrat text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate.toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                    className="px-2 py-2 border rounded-lg shadow-md"
                    max={endDate.toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block font-medium font-Montserrat text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate.toISOString().split('T')[0]}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                    className="px-2 py-2 border rounded-lg shadow-md"
                    min={startDate.toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block font-medium font-Montserrat text-gray-700 mb-1">Parameter</label>
                  <select
                    className="px-2 py-2 border rounded-lg shadow-md"
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                  >
                    <option value="bloodPressure">Blood Pressure</option>
                    <option value="temperature">Temperature</option>
                    <option value="pulseRate">Pulse Rate</option>
                    <option value="respiratoryRate">Respiratory Rate</option>
                  </select>
                </div>
                <div className="ml-auto pr-40">
                <button
                  onClick={handleFetchParameterData}
                  className="py-2 px-6 bg-blue-500 text-white font-bold font-Montserrat rounded-lg hover:bg-blue-600"
                >
                  Fetch Data
                </button>
                </div>
              </div>

              <div className="flex justify-center row-span-6 col-span-4 pr-5">
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
