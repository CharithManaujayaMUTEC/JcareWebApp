import React from 'react';
import NavBar from '../Components/NavBar';
import Docs from './Images/Docs.png';
import { useState } from 'react';

const Dashboard = () => {
    const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);
  const schedule = [
    { time: "09:00 AM", event: "Team Meeting" },
    { time: "12:00 PM", event: "Lunch Break" },
    { time: "03:00 PM", event: "Project Update" }
  ];
  const notices = [
    { type: "Urgent", message: "Team Meeting" },
    { type: "Urgent", message: "Lunch Break" },
    { type: "Urgent", message: "Project Update" }
  ];
  const sampleTasks = [
    { name: "Complete project report" , description: "Complete the project report and submit it to the manager.", type: "Urgent" },
    { name: "Attend team meeting" , description: "Attend the team meeting to discuss the project progress.", type: "Urgent" },
    { name: "Review client feedback" , description: "Review the client feedback and make necessary changes to the project.", type: "Normal" }
  ];
  const patients = [
    { name: "Name1" , type: "Critical" },
    { name: "Name2" , type: "Critical" },
    { name: "Name3" , type: "Normal" }
  ];
  const [newTask, setNewTask] = useState({ name: "", description: "", type: "Normal", assignedTo: "Myself" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Task Added:", newTask);
    setNewTask({ name: "", description: "", type: "Normal", assignedTo: "Myself" });
  };

    return (
        <div>
            <div>
                <NavBar />
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
                    <h1 className="font-sans text-5xl font-semibold text-gray-800">Welcome, <br></br>Dr Name</h1>
                    <p className="font-sans text-gray-600">Glad to see you back.</p>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg text-center min-w-20">
                    <p className="text-gray-700 font-sans font-medium">Today's Date</p>
                    <p className="text-lg font-sans font-semibold text-blue-500">{formattedDate}</p>
                  </div>
                </div>
                <div className="p-5 bg-white shadow-lg rounded-2xl max-w-auto mx-auto basis-1/4">
                  <h2 className="font-sans text-2xl font-semibold text-gray-800 text-center">Today's Schedule</h2>
                  <div className="mt-4 overflow-y-auto max-h-32">
                    {schedule.length > 0 ? (
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <p className="font-sans text-lg font-medium text-gray-800">{schedule[0].time} - {schedule[0].event}</p>
                      <p className="font-sans font-light text-gray-800">Description</p>
                    </div>
                    ) : (
                          <p className="font-sans text-center text-gray-500">No events scheduled for today.</p>
                        )}
                  </div>
                </div>
                <div className="p-5 bg-white shadow-lg rounded-2xl max-w-auto mx-auto basis-1/4">
                  <h2 className="font-sans text-2xl font-semibold text-gray-800 text-center">Notices</h2>
                  <div className="mt-4 overflow-y-auto max-h-32">
                    {notices.length > 0 ? (
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <p className="font-sans text-lg font-medium text-gray-800">{notices[0].type} - {notices[0].message}</p>
                      <p className="font-sans font-light text-gray-800">Description</p>
                    </div>
                    ) : (
                      <p className="font-sans text-center text-gray-500">No Notices for today.</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className='flex justify-center px-20 pb-10 '>
              <div className=" flex justify-center gap-x-8 gap-y-4 px-4 min-h-140 w-full ">
                <div className="p-5 bg-gradient-to-r from-purple-500 to-white shadow-lg rounded-2xl px-10 w-full">
                  <h2 className="font-sans text-4xl font-semibold text-white text-left">Task List</h2>
                  <h5 className="font-sans text-l font-medium  text-left">Here is your today's Tasks</h5>
                  <div className="mt-4 overflow-y-auto max-h-140 ">
                    {sampleTasks.length > 0 ? (
                    sampleTasks.map((task, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center mb-2">
                      <p className="font-sans text-lg font-medium text-gray-800">{task.name} - </p><p className="font-sans text-lg font-light text-gray-800">{task.description}</p>
                      <p className={`text-lg font-medium ${task.type === "Urgent" ? "text-red-800" : "text-blue-800"}`}>-{task.type}</p>
                      <div className="space-x-2">
                      <button className="font-sans px-4 py-2 bg-red-500 text-white rounded-lg">Not Done</button>
                      <button className="font-sans px-4 py-2 bg-green-500 text-white rounded-lg">Done</button>
                      <button className="font-sans px-4 py-2 bg-blue-500 text-white rounded-lg">More Details</button>
                      </div>
                    </div>
                    ))
                    ) : (
                      <p className="font-sans text-center text-gray-500">No tasks available.</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className='flex justify-center px-20 pb-10 '>
              <div className=" flex justify-center gap-x-8 gap-y-4 px-4 min-h-140 w-full ">
                <div className="p-5 bg-gradient-to-r from-purple-500 to-white shadow-lg rounded-2xl px-10 w-full">
                  <h2 className="font-sans text-4xl font-semibold text-white text-left">Patients List</h2>
                  <h5 className="font-sans text-l font-medium  text-left">Here is your patients' details</h5>
                  <div className="mt-4 overflow-y-auto max-h-140 ">
                    {patients.length > 0 ? (
                    patients.map((patient, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center mb-2">
                      <p className="font-sans text-lg font-medium text-gray-800">{patient.name} - </p>
                      <p className={`text-lg font-medium ${patient.type === "Critical" ? "text-red-800" : "text-blue-800"}`}>{patient.type}</p>
                      <div className="space-x-2">
                      <button className="font-sans px-4 py-2 bg-green-500 text-white rounded-lg">Profile</button>
                      <button className="font-sans px-4 py-2 bg-blue-500 text-white rounded-lg">Take History</button>
                      </div>
                    </div>
                    ))
                    ) : (
                      <p className="font-sans text-center text-gray-500">No Patients available.</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className='flex justify-center px-20 pb-10 '>
            <div className=" flex justify-center gap-x-8 gap-y-4 px-4 min-h-140 w-full ">
              <div className="p-5 bg-gradient-to-r from-purple-500 to-white shadow-lg rounded-2xl w-full mx-auto px-10">
                <h2 className="ont-sans text-4xl font-semibold text-white text-left">Assign a Task</h2>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="flex justify-between space-x-4">
              <label className="w-1/5 font-sans text-lg font-medium text-left p-5">Task Name:</label>
              <input type="text" name="name" value={newTask.name} onChange={handleInputChange} className="w-4/5 p-2 border rounded-lg" required />
            </div>
            <div className="flex items-between space-x-4">
              <label className="w-1/5 font-sans text-lg font-medium text-left p-5">Description:</label>
              <input type="text" name="description" value={newTask.description} onChange={handleInputChange} className="w-4/5 p-2 border rounded-lg" required />
            </div>
            <div className="flex items-between space-x-4">
              <label className="w-1/5 font-sans text-lg font-medium text-left p-5">Type:</label>
              <select name="type" value={newTask.type} onChange={handleInputChange} className="w-4/5 p-2 border rounded-lg">
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div className="flex items-between space-x-4">
              <label className="w-1/5 font-sans text-lg font-medium text-left p-5">Assign To:</label>
              <select name="assignedto" value={newTask.assignedTo} onChange={handleInputChange} className="w-4/5 p-2 border rounded-lg">
                <option value="Normal">Myself</option>
                <option value="Urgent">Employer1</option>
              </select>
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">Add Task</button>
          </form>
              </div>
            </div>
            </section>
            </div>
      </div>
    );
};

export default Dashboard;