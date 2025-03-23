import React from 'react';
import NavBarPro from '../Components/NavBarPro';
import Docs from './Images/Docs.png';
import { useState } from 'react';
import TaskModal from '../Components/TaskModal';
import HistoryModal from '../Components/HistoryModal';
import { useEffect } from 'react';




const Dashboard = () => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString(undefined, options);

  // Employee ID (retrieve from local storage or context)
  const employeeid = localStorage.getItem("employeeid") || "EMP004";

  // State for fetched data
  const [schedule, setSchedule] = useState([]);
  const [notices, setNotices] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          `http://localhost:8081/dashboard/getSchedule?employeeId=${employeeid}`,
          `http://localhost:8081/dashboard/getNotices?employeeId=${employeeid}`,
          `http://localhost:8081/dashboard/getTasks?employeeId=${employeeid}`,
          `http://localhost:8081/dashboard/todaysPatients?employeeId=${employeeid}`,
        ];
        const responses = await Promise.all(urls.map((url) => fetch(url)));

        for (const res of responses) {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await Promise.all(responses.map((res) => res.json()));

        setSchedule(Array.isArray(data[0]) ? data[0] : [data[0]]);
        setNotices(Array.isArray(data[1]) ? data[1] : [data[1]]);
        setTasks(Array.isArray(data[2]) ? data[2] : [data[2]]);
        setPatients(Array.isArray(data[3]) ? data[3].filter(patient => patient !== null) : []);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [employeeid]);

  const [newTask, setNewTask] = useState({
    taskName: "",
    taskDescription: "",
    taskPriority: "Normal",
    taskAssignedToID: "Myself",
    taskDate: "",
    taskTime: "",
    taskAssignedByID: employeeid,
    taskPatientID: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeid) {
      alert("Employee ID is missing.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/dashboard/addTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) throw new Error("Failed to add task");

      alert("Task added successfully!");
      setNewTask({
        taskName: "",
        taskDescription: "",
        taskPriority: "Normal",
        taskAssignedToID: "Myself",
        taskDate: "",
        taskTime: "",
        taskAssignedByID: employeeid,
        taskPatientID: "",
      });
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Error adding task!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };


    return (
        <div>
            <div>
                <NavBarPro />
            </div>
            <div className="bg-gradient-to-r from-white to-purple-500 min-h-screen justify-center items-center">
            <section className='flex justify-center p-10 px-20 '>
              <div className=" flex justify-between  gap-x-8 gap-y-4 min-h-40">
                <div className="flex items-center basis-2/4 px-10 bg-white shadow-lg rounded-2xl min-h-40 ">
                  <img
                  src={Docs}
                  className="w-20 h-20 rounded-full border-4 border-blue-500"
                  />
                  <div className=" ml-4 p-6 text-start">
                    <h1 className="font-Montserrat text-5xl font-semibold text-gray-800">Welcome, <br></br>Dr Name</h1>
                    <p className="font-Montserrat text-gray-600">Glad to see you back.</p>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg text-center min-w-20">
                    <p className="text-gray-700 font-Montserrat font-medium">Today's Date</p>
                    <p className="text-lg font-Montserrat font-semibold text-blue-500">{formattedDate}</p>
                  </div>
                </div>
                <div className="p-5 bg-white shadow-lg rounded-2xl max-w-auto mx-auto basis-1/4">
                  <h2 className="font-Montserrat text-2xl font-semibold text-gray-800 text-center">Today's Schedule</h2>
                  <div className="mt-4 overflow-y-auto max-h-32">
                    {schedule.length > 0 ? (
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <p className="font-Montserrat text-lg font-medium text-gray-800">{schedule[0].tasktime} - {schedule[0].taskname}</p>
                      <p className="font-Montserrat font-light text-gray-800">Description</p>
                    </div>
                    ) : (
                          <p className="font-Montserrat text-center text-gray-500">No events scheduled for today.</p>
                        )}
                  </div>
                </div>
                <div className="p-5 bg-white shadow-lg rounded-2xl max-w-auto mx-auto basis-1/4">
                  <h2 className="font-Montserrat text-2xl font-semibold text-gray-800 text-center">Notices</h2>
                  <div className="mt-4 overflow-y-auto max-h-32">
                    {notices.length > 0 ? (
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <p className="font-Montserrat text-lg font-medium text-gray-800">{notices[0].type} - {notices[0].message}</p>
                      <p className="font-Montserrat font-light text-gray-800">Description</p>
                    </div>
                    ) : (
                      <p className="font-Montserrat text-center text-gray-500">No Notices for today.</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className='flex justify-center px-20 pb-10 '>
              <div className=" flex justify-center gap-x-8 gap-y-4 px-4 min-h-140 w-full ">
                <div className="p-5 bg-gradient-to-r from-purple-500 to-white shadow-lg rounded-2xl px-10 w-full">
                  <h2 className="font-Montserrat text-4xl font-semibold text-white text-left">Task List</h2>
                  <h5 className="font-Montserrat text-l font-medium  text-left">Here is your today's Tasks</h5>
                  <div className="mt-4 overflow-y-auto max-h-140 ">
                    {tasks.length > 0 ? (
                    tasks.map((tasks, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center mb-2">
                      <p className="font-Montserrat text-lg font-medium text-gray-800">{tasks.taskName} - </p><p className="font-Montserrat text-lg font-light text-gray-800">{tasks.taskDescription}</p>
                      <p className={`text-lg font-medium ${tasks.taskPriority === "Urgent" ? "text-red-800" : "text-blue-800"}`}>-{tasks.taskPriority}</p>
                      <div className="space-x-2">
                      <button className="font-Montserrat px-4 py-2 bg-red-500 text-white rounded-lg">Not Done</button>
                      <button className="font-Montserrat px-4 py-2 bg-green-500 text-white rounded-lg">Done</button>
                      <button onClick={() => setIsTaskModalOpen(true)} className="font-Montserrat px-4 py-2 bg-blue-500 text-white rounded-lg">More Details</button>
                      </div>
                    </div>
                    ))
                    ) : (
                      <p className="font-Montserrat text-center text-gray-500">No tasks available.</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className='flex justify-center px-20 pb-10 '>
              <div className=" flex justify-center gap-x-8 gap-y-4 px-4 min-h-140 w-full ">
                <div className="p-5 bg-gradient-to-r from-purple-500 to-white shadow-lg rounded-2xl px-10 w-full">
                  <h2 className="font-Montserrat text-4xl font-semibold text-white text-left">Patients List</h2>
                  <h5 className="font-Montserrat text-l font-medium  text-left">Here is your patients' details</h5>
                  <div className="mt-4 overflow-y-auto max-h-140 ">
                    {patients.length > 0 ? (
                    patients.map((patients, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center mb-2">
                      <p className="font-Montserrat text-lg font-medium text-gray-800">{patients.patientname} - </p>
                      <p className={`text-lg font-medium ${patients.patientstatus === "Critical" ? "text-red-800" : "text-blue-800"}`}>{patients.patientstatus}</p>
                      <div className="space-x-2">
                      <button className="font-Montserrat px-4 py-2 bg-green-500 text-white rounded-lg">Profile</button>
                      <button onClick={() => setIsHistoryModalOpen(true)} className="font-Montserrat px-4 py-2 bg-blue-500 text-white rounded-lg">Take History</button>
                      </div>
                    </div>
                    ))
                    ) : (
                      <p className="font-Montserrat text-center text-gray-500">No Patients available.</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className='flex justify-center px-20 pb-10 '>
            <div className=" flex justify-center gap-x-8 gap-y-4 px-4 min-h-140 w-full ">
              <div className="p-5 bg-gradient-to-r from-purple-500 to-white shadow-lg rounded-2xl w-full mx-auto px-10">
                <h2 className="ont-Montserrat text-4xl font-semibold text-white text-left">Assign a Task</h2>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
  <div className="flex justify-between space-x-4">
    <label className="w-1/5 h-4px font-Montserrat text-lg font-medium text-left p-5">Task Name:</label>
    <input 
      type="text" 
      name="taskName" 
      value={newTask.taskName} 
      onChange={handleInputChange} 
      className="w-4/5 p-2 h-4px border rounded-lg" 
      required 
    />
  </div>
  <div className="flex items-between space-x-4">
    <label className="w-1/5 font-Montserrat text-lg font-medium text-left p-5">Description:</label>
    <input 
      type="text" 
      name="taskDescription" 
      value={newTask.taskDescription} 
      onChange={handleInputChange} 
      className="w-4/5 p-2 border rounded-lg" 
      required 
    />
  </div>
  <div className="flex items-between space-x-4">
    <label className="w-1/5 font-Montserrat text-lg font-medium text-left p-5">Type:</label>
    <select 
      name="taskPriority" 
      value={newTask.taskPriority} 
      onChange={handleInputChange} 
      className="w-4/5 p-2 border rounded-lg"
    >
      <option value="Normal">Normal</option>
      <option value="Urgent">Urgent</option>
    </select>
  </div>
  <div className="flex items-between space-x-4">
    <label className="w-1/5 font-Montserrat text-lg font-medium text-left p-5">Assign To:</label>
    <select 
      name="taskAssignedToID" 
      value={newTask.taskAssignedToID} 
      onChange={handleInputChange} 
      className="w-4/5 p-2 border rounded-lg"
    >
      <option value="Myself">EMP004</option>
      <option value="Employer1">Employer1</option>
    </select>
  </div>
  <div className="flex justify-between space-x-4">
    <label className="w-1/5 font-Montserrat text-lg font-medium text-left p-5">Set a Date:</label>
    <input 
      type="date" 
      name="taskDate" 
      value={newTask.taskDate} 
      onChange={handleInputChange} 
      className="w-4/5 p-2 border rounded-lg" 
      required 
    />
  </div>
  <div className="flex justify-between space-x-4">
    <label className="w-1/5 font-Montserrat text-lg font-medium text-left p-5">Set a Time:</label>
    <input 
      type="time" 
      name="taskTime" 
      value={newTask.taskTime} 
      onChange={handleInputChange} 
      className="w-4/5 p-2 border rounded-lg" 
      required 
    />
  </div>
  <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">Add Task</button>
</form>

              </div>
            </div>
            </section>
            </div>
            {isTaskModalOpen && <TaskModal onClose={() => setIsTaskModalOpen(false)} />}
            {isHistoryModalOpen && <HistoryModal onClose={() => setIsHistoryModalOpen(false)} />}
      </div>
    );
};

export default Dashboard;