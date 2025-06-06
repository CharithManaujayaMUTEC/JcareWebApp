import React, { useState } from 'react';

const HistoryModal = ({ onClose }) => {
  const [metrics, setMetrics] = useState([{ name: '', value: '' }]);
  const [recordingPerson, setRecordingPerson] = useState('');
  const [patientId, setPatientId] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [temperature, setTemperature] = useState('');
  const [otherRemarks, setOtherRemarks] = useState('');

  const addMetricField = () => {
    setMetrics([...metrics, { name: '', value: '' }]);
  };

  const updateMetric = (index, field, value) => {
    const updatedMetrics = [...metrics];
    updatedMetrics[index][field] = value;
    setMetrics(updatedMetrics);
  };

  const handleSave = async () => {
    const historyData = {
      recordingPerson,
      patientId,
      bloodPressure,
      temperature,
      otherRemarks,
      metrics,
    };

    try {
      const response = await fetch('http://localhost:8081/patientProfile/takeHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(historyData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      alert('History saved successfully');
      onClose(); 
    } catch (error) {
      console.error('Error saving history:', error);
      alert('Error saving history. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-124">
        <h2 className="text-xl font-semibold mb-4">Record Patient History</h2>

        <label className="block font-medium text-left">Recording Person:</label>
        <input
          className="w-full border p-2 mb-4"
          placeholder="Enter your name..."
          value={recordingPerson}
          onChange={(e) => setRecordingPerson(e.target.value)}
        />

        <label className="block font-medium text-left">Patient No:</label>
        <input
          className="w-full border p-2 mb-4"
          placeholder="Enter patient's ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />

        <label className="block font-medium text-left">Blood Pressure:</label>
        <input
          className="w-full border p-2 mb-4"
          placeholder="Enter blood pressure"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
        />

        <label className="block font-medium text-left">Temperature:</label>
        <input
          className="w-full border p-2 mb-4"
          placeholder="Enter temperature"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />

        <label className="block font-medium text-left">Other Remarks:</label>
        <input
          className="w-full border p-2 mb-4"
          placeholder="Enter Other Remarks"
          value={otherRemarks}
          onChange={(e) => setOtherRemarks(e.target.value)}
        />

        <h3 className="block font-medium text-left">Additional Metrics</h3>
        <div className="max-h-20 overflow-y-auto">
          {metrics.map((metric, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                className="flex-1 border p-2"
                placeholder="Metric Name"
                value={metric.name}
                onChange={(e) => updateMetric(index, 'name', e.target.value)}
              />
              <input
                className="flex-1 border p-2"
                placeholder="Value"
                value={metric.value}
                onChange={(e) => updateMetric(index, 'value', e.target.value)}
              />
            </div>
          ))}
        </div>
        <button
          className="w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 mb-4"
          onClick={addMetricField}
        >
          + Add Another Metric
        </button>

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
