import React, { useState, useEffect } from 'react';
import NavBarPro from '../Components/NavBarPro';
import TaskModal from '../Components/TaskModal';
import HistoryModal from '../Components/HistoryModal';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString(undefined, options);

  const employeeid = localStorage.getItem("employeeid");
  const name = localStorage.getItem("name");
  const department = localStorage.getItem("department");
  const role = localStorage.getItem("role");

  const [schedule, setSchedule] = useState([]);
  const [notices, setNotices] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [patients, setPatients] = useState([]);
  const [employees, setEmployees] = useState([]); // NEW: employee list

  const [newTask, setNewTask] = useState({
    taskName: "",
    taskDescription: "",
    taskPriority: "Normal",
    taskAssignedToID: "",
    taskDate: "",
    taskTime: "",
    taskAssignedByID: employeeid,
    taskPatientID: "",
  });

  const [newNotice, setNewNotice] = useState({
    noticeFrom: employeeid,
    noticeTo: "",
    notice: "",
  });

  // Inside Dashboard.jsx

// State for goods requests
const [goodsRequests, setGoodsRequests] = useState([]);

// State for leaves
const [leaveRequests, setLeaveRequests] = useState([]);
const [newLeave, setNewLeave] = useState({
  employeeId: employeeid,
  fromDate: "",
  toDate: "",
  reason: "",
});

// State for attendance
const [attendanceData, setAttendanceData] = useState([]);

const [attendanceRecords, setAttendanceRecords] = useState([]);

// Fetch leave requests + attendance
useEffect(() => {
  const fetchLeaves = async () => {
    try {
      const res = await fetch(`${BASE_URL}/dashboard/getLeaveRequests`);
      if (!res.ok) throw new Error("Failed to fetch leave requests");
      const data = await res.json();
      setLeaveRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await fetch(`${BASE_URL}/dashboard/getAttendance?employeeId=${employeeid}`);
      if (!res.ok) throw new Error("Failed to fetch attendance");
      const data = await res.json();
      // Expecting: { present: X, absent: Y, leave: Z }
      setAttendanceData([
        { name: "Present", value: data.present || 0 },
        { name: "Absent", value: data.absent || 0 },
        { name: "Leave", value: data.leave || 0 },
      ]);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  fetchLeaves();
  fetchAttendance();
}, [employeeid]);

useEffect(() => {
  const fetchDetailedAttendance = async () => {
    try {
      const res = await fetch(`${BASE_URL}/dashboard/getAttendanceRecords?employeeId=${employeeid}`);
      const data = await res.json();
      setAttendanceRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };
  fetchDetailedAttendance();
}, [employeeid]);

// Submit leave request
const handleLeaveSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${BASE_URL}/dashboard/requestLeave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLeave),
    });

    if (!res.ok) throw new Error("Failed to request leave");
    alert("Leave request submitted!");

    setNewLeave({ employeeId: employeeid, fromDate: "", toDate: "", reason: "" });

    const updatedLeaves = await fetch(`${BASE_URL}/dashboard/getLeaveRequests`).then(r => r.json());
    setLeaveRequests(Array.isArray(updatedLeaves) ? updatedLeaves : []);
  } catch (error) {
    console.error(error);
    alert("Error submitting leave request!");
  }
};

// Approve/Reject leave
const handleLeaveAction = async (leaveId, action) => {
  try {
    const res = await fetch(`${BASE_URL}/dashboard/updateLeaveRequest/${action}?leaveId=${leaveId}`, {
      method: "POST"
    });

    if (!res.ok) throw new Error("Failed to update leave request");
    alert(`Leave ${action === "approve" ? "approved" : "rejected"} successfully!`);

    const updatedLeaves = await fetch(`${BASE_URL}/dashboard/getLeaveRequests`).then(r => r.json());
    setLeaveRequests(Array.isArray(updatedLeaves) ? updatedLeaves : []);
  } catch (error) {
    console.error(error);
    alert("Error updating leave request!");
  }
};

// Fetch goods requests (pending approval)
useEffect(() => {
  const fetchGoodsRequests = async () => {
    try {
      const res = await fetch(`${BASE_URL}/goodsrequests/getGoodsRequests`);
      if (!res.ok) throw new Error("Failed to fetch goods requests");
      const data = await res.json();
      setGoodsRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching goods requests:", error);
    }
  };

  fetchGoodsRequests();
}, []);

// Handle approve/reject
const handleRequestAction = async (requestId, action) => {
  try {
    const res = await fetch(`${BASE_URL}/goodsrequests/updateGoodsRequest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestId,
        status: action === "approve" ? "Approved" : "Rejected",
      }),
    });

    if (!res.ok) throw new Error("Failed to update goods request");
    alert(`Request ${action === "approve" ? "approved" : "rejected"} successfully!`);

    // Refresh list after action
    const updatedRequests = await fetch(`${BASE_URL}/goodsrequests/getGoodsRequests`).then(r => r.json());
    setGoodsRequests(Array.isArray(updatedRequests) ? updatedRequests : []);
  } catch (error) {
    console.error(error);
    alert("Error updating goods request!");
  }
};

  // Fetch dashboard and employees data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const urls = [
          `${BASE_URL}/dashboard/getSchedule?employeeId=${employeeid}`,
          `${BASE_URL}/dashboard/getNotices?employeeId=${employeeid}`,
          `${BASE_URL}/dashboard/getTasks?employeeId=${employeeid}`,
          `${BASE_URL}/dashboard/todaysPatients?employeeId=${employeeid}`,
        ];

        const responses = await Promise.all(urls.map(url => fetch(url)));
        for (const res of responses) if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await Promise.all(responses.map(res => res.json()));

        setSchedule(Array.isArray(data[0]) ? data[0] : [data[0]]);
        setNotices(Array.isArray(data[1]) ? data[1] : [data[1]]);
        setTasks(Array.isArray(data[2]) ? data[2] : [data[2]]);
        setPatients(Array.isArray(data[3]) ? data[3].filter(p => p !== null) : []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${BASE_URL}/dashboard/getAllEmployees`);
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchDashboardData();
    fetchEmployees();
  }, [employeeid]);

  // Handle input changes
  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  const handleNoticeChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  // Add task
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/dashboard/addTask`, {
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
        taskAssignedToID: "",
        taskDate: "",
        taskTime: "",
        taskAssignedByID: employeeid,
        taskPatientID: "",
      });

      const updatedTasks = await fetch(`${BASE_URL}/dashboard/getTasks?employeeId=${employeeid}`).then(res => res.json());
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
      alert("Error adding task!");
    }
  };

  // Add notice
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/dashboard/addNotice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotice),
      });
      if (!response.ok) throw new Error("Failed to add notice");

      alert("Notice added successfully!");
      setNewNotice({ noticeFrom: employeeid, noticeTo: "", notice: "" });

      const updatedNotices = await fetch(`${BASE_URL}/dashboard/getNotices?employeeId=${employeeid}`).then(res => res.json());
      setNotices(updatedNotices);
    } catch (error) {
      console.error(error);
      alert("Error adding notice!");
    }
  };

  // Toggle task status
  const toggleTaskStatus = async (task) => {
    const endpoint = task.taskStatus === "done"
      ? `${BASE_URL}/dashboard/taskNotDone?taskId=${task.taskId}`
      : `${BASE_URL}/dashboard/taskDone?taskId=${task.taskId}`;

    try {
      const response = await fetch(endpoint, { method: "POST" });
      if (!response.ok) throw new Error("Failed to update task status");

      const updatedTasks = await fetch(`${BASE_URL}/dashboard/getTasks?employeeId=${employeeid}`).then(res => res.json());
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
      alert("Error updating task status!");
    }
  };

  return (
    <div>
      <NavBarPro />
      <div className="bg-gradient-to-r from-white to-purple-500 min-h-screen flex flex-col items-center">
  
        {/* Welcome Section */}
        <section className="flex flex-col lg:flex-row gap-6 p-6 lg:p-10 w-full max-w-7xl mx-auto">
  {/* Welcome Card */}
  <div className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-6 flex-shrink-0 w-full lg:w-2/5 min-w-0">

    {/* Profile Section */}
    <div className="flex flex-col items-center gap-4 min-w-0">
      <img
        src="/Images/Docs.png"
        className="w-24 h-24 rounded-full border-4 border-blue-500 flex-shrink-0"
      />
      <div className="text-center overflow-hidden">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
          Welcome, <br />{role}. {name}
        </h1>
        <p className="text-lg text-gray-600">Glad to see you back.</p>
      </div>
    </div>

    {/* Small Date Box */}
    <div className="mt-4 p-2 bg-gray-100 rounded-lg text-center">
      <p className="text-gray-700 font-medium text-sm lg:text-base">Today's Date</p>
      <p className="text-blue-500 font-semibold text-lg lg:text-xl">{formattedDate}</p>
    </div>
  </div>

  {/* Schedule Card */}
  <div className="bg-white shadow-lg rounded-2xl p-5 flex-1 overflow-y-auto min-w-0 max-h-[32rem]">
    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">Today's Schedule</h2>
    <div className="space-y-2">
      {schedule?.length > 0 ? schedule.map((task, index) => (
        <div key={index} className="p-4 bg-gray-100 rounded-lg">
          <p className="text-lg font-medium text-gray-800">{task.taskTime} - {task.taskName}</p>
          <p className="text-gray-800">{task.taskStatus ? `Status: ${task.taskStatus}` : "Status: Pending"}</p>
          <p className="text-gray-600">Priority: {task.taskPriority}</p>
        </div>
      )) : (
        <p className="text-center text-gray-500">No events scheduled for today.</p>
      )}
    </div>
  </div>

  {/* Notices Card */}
  <div className="bg-white shadow-lg rounded-2xl p-5 flex-1 overflow-y-auto min-w-0 max-h-[32rem] flex flex-col">
    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">Notices</h2>
    <div className="space-y-2 overflow-y-auto flex-1">
      {notices.length > 0 ? notices.map((notice, index) => (
        <div key={index} className="p-4 bg-gray-100 rounded-lg">
          <p className="text-lg font-medium text-gray-800">{notice.notice}</p>
          <p className="text-sm text-gray-600">
            From: {notice.noticeFrom} | To: {notice.noticeTo} | Date: {notice.noticeDate} | Time: {notice.noticeTime}
          </p>
        </div>
      )) : <p className="text-center text-gray-500">No Notices for today.</p>}
    </div>

    {/* Add Notice Form */}
    <form onSubmit={handleNoticeSubmit} className="mt-4 space-y-2">
      <input type="text" name="noticeFrom" placeholder="From" value={newNotice.noticeFrom} onChange={handleNoticeChange} className="w-full p-2 border rounded-lg" required />
      <select name="noticeTo" value={newNotice.noticeTo} onChange={handleNoticeChange} className="w-full p-2 border rounded-lg" required>
        <option value="">Select Employee</option>
        {employees.map((emp, idx) => (
          <option key={idx} value={emp.employeeId || emp.id || emp.key}>{emp.name || emp.value}</option>
        ))}
      </select>
      <input type="text" name="notice" placeholder="Message" value={newNotice.notice} onChange={handleNoticeChange} className="w-full p-2 border rounded-lg" required />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">Add Notice</button>
    </form>
  </div>
</section>
  
        {/* Task List */}
        <section className='flex flex-col lg:flex-row justify-center gap-6 p-6 w-full max-w-7xl'>
          <div className="bg-gradient-to-r from-purple-500 to-white shadow-lg rounded-2xl p-6 w-full overflow-y-auto max-h-140">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white">Task List</h2>
            <h5 className="text-white">Here is your today's Tasks</h5>
            <div className="mt-4 space-y-2">
              {tasks.length > 0 ? tasks.map((task, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
                  <div>
                    <p className="text-lg font-medium text-gray-800">{task.taskName}</p>
                    <p className="text-gray-800">{task.taskDescription}</p>
                  </div>
                  <p className={`text-lg font-medium ${task.taskPriority === "Urgent" ? "text-red-800" : "text-blue-800"}`}>{task.taskPriority}</p>
                  <div className="flex flex-col lg:flex-row gap-2 mt-2 lg:mt-0">
                    <button onClick={() => toggleTaskStatus(task)} className={`px-4 py-2 text-white rounded-lg ${task.taskStatus === "done" ? "bg-red-500" : "bg-green-500"}`}>
                      {task.taskStatus === "done" ? "Mark as Not Done" : "Mark as Done"}
                    </button>
                    <button onClick={() => { setSelectedTask(task); setIsTaskModalOpen(true); }} className="px-4 py-2 bg-blue-500 text-white rounded-lg">More Details</button>
                  </div>
                </div>
              )) : <p className="text-center text-gray-500">No tasks available.</p>}
            </div>
          </div>
        </section>
  
        {/* Patients List */}
        <section className='flex flex-col lg:flex-row justify-center gap-6 p-6 w-full max-w-7xl'>
          <div className="bg-gradient-to-r from-purple-500 to-white shadow-lg rounded-2xl p-6 w-full overflow-y-auto max-h-140">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white">Patients List</h2>
            <h5 className="text-white">Here is your patients' details</h5>
            <div className="mt-4 space-y-2">
              {patients.length > 0 ? patients.map((patient, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
                  <div>
                    <p className="text-lg font-medium text-gray-800">{patient.patientname}</p>
                    <p className={`text-lg font-medium ${patient.patientstatus === "Critical" ? "text-red-800" : "text-blue-800"}`}>{patient.patientstatus}</p>
                  </div>
                  <div className="flex gap-2 mt-2 lg:mt-0">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg">Profile</button>
                    <button onClick={() => setIsHistoryModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Take History</button>
                  </div>
                </div>
              )) : <p className="text-center text-gray-500">No Patients available.</p>}
            </div>
          </div>
        </section>
  
        {/* Assign Task Form */}
        <section className='flex flex-col lg:flex-row justify-center gap-6 p-6 w-full max-w-7xl'>
          <div className="bg-gradient-to-r from-purple-500 to-white shadow-lg rounded-2xl p-6 w-full overflow-y-auto max-h-140">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white">Assign a Task</h2>
            <form onSubmit={handleTaskSubmit} className="mt-4 space-y-4">
              <input type="text" name="taskName" value={newTask.taskName} onChange={handleTaskInputChange} placeholder="Task Name" className="w-full p-2 border rounded-lg" required />
              <input type="text" name="taskDescription" value={newTask.taskDescription} onChange={handleTaskInputChange} placeholder="Description" className="w-full p-2 border rounded-lg" required />
              <select name="taskPriority" value={newTask.taskPriority} onChange={handleTaskInputChange} className="w-full p-2 border rounded-lg">
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
              <select name="taskAssignedToID" value={newTask.taskAssignedToID} onChange={handleTaskInputChange} className="w-full p-2 border rounded-lg" required>
                <option value="">Assign to Employee</option>
                {employees.map((emp, idx) => (
                  <option key={idx} value={emp.employeeId || emp.id || emp.key}>{emp.name || emp.value}</option>
                ))}
              </select>
              <input type="date" name="taskDate" value={newTask.taskDate} onChange={handleTaskInputChange} className="w-full p-2 border rounded-lg" required />
              <input type="time" name="taskTime" value={newTask.taskTime} onChange={handleTaskInputChange} className="w-full p-2 border rounded-lg" required />
              <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">Add Task</button>
            </form>
          </div>
        </section>
  
        {/* Goods Requests Approval Section */}
<section className="flex flex-col lg:flex-row justify-center gap-6 p-6 w-full max-w-7xl">
  <div className="bg-gradient-to-r from-purple-500 to-white shadow-lg rounded-2xl p-6 w-full overflow-y-auto max-h-140">
    <h2 className="text-3xl lg:text-4xl font-semibold text-white">Goods Requests</h2>
    <h5 className="text-white">Approve or reject requests from staff</h5>
    <div className="mt-4 space-y-4">
      {goodsRequests.length > 0 ? (
        goodsRequests.map((req, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg flex flex-col gap-2">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <p className="text-lg font-medium text-gray-800">
                Requested by: {req.requesterName} ({req.employeeId}) | Department: {req.department}
              </p>
              <p className={`text-sm font-semibold mt-1 lg:mt-0 ${
                req.status === "Approved" ? "text-green-600" :
                req.status === "Rejected" ? "text-red-600" : "text-yellow-600"
              }`}>
                {req.status || "Pending"}
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Priority: {req.priority} | Remarks: {req.remarks || "None"}
            </p>
            {req.dateSubmitted && (
              <p className="text-sm text-gray-500">
                Submitted on: {new Date(req.dateSubmitted).toLocaleString()}
              </p>
            )}
            {req.items?.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-700 border-collapse">
                  <thead>
                    <tr>
                      <th className="px-2 py-1 border-b">Item Name</th>
                      <th className="px-2 py-1 border-b">Quantity</th>
                      <th className="px-2 py-1 border-b">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {req.items.map((item, i) => (
                      <tr key={i}>
                        <td className="px-2 py-1 border-b">{item.itemName}</td>
                        <td className="px-2 py-1 border-b">{item.quantity}</td>
                        <td className="px-2 py-1 border-b">{item.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex flex-col lg:flex-row gap-2 mt-2">
              <button onClick={() => handleRequestAction(req.requestId, "approve")} className="px-4 py-2 bg-green-500 text-white rounded-lg">Approve</button>
              <button onClick={() => handleRequestAction(req.requestId, "reject")} className="px-4 py-2 bg-red-500 text-white rounded-lg">Reject</button>
            </div>
          </div>
        ))
      ) : <p className="text-center text-gray-500">No pending requests.</p>}
    </div>
  </div>
</section>

{/* Leave Management Section */}
<section className="flex flex-col lg:flex-row justify-center gap-6 p-6 w-full max-w-7xl">
  <div className="bg-gradient-to-r from-purple-500 to-white shadow-lg rounded-2xl p-6 w-full overflow-y-auto max-h-140">
    <h2 className="text-3xl lg:text-4xl font-semibold text-white">Leave Management</h2>
    
    {/* Request Leave Form */}
    <form onSubmit={handleLeaveSubmit} className="mt-4 space-y-2">
      <input type="date" name="fromDate" value={newLeave.fromDate} onChange={(e) => setNewLeave({ ...newLeave, fromDate: e.target.value })} className="w-full p-2 border rounded-lg" required />
      <input type="date" name="toDate" value={newLeave.toDate} onChange={(e) => setNewLeave({ ...newLeave, toDate: e.target.value })} className="w-full p-2 border rounded-lg" required />
      <input type="text" name="reason" value={newLeave.reason} onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })} placeholder="Reason" className="w-full p-2 border rounded-lg" required />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">Request Leave</button>
    </form>

    {/* Pending Leave Requests */}
    <div className="mt-6 space-y-2">
      <h3 className="text-2xl text-gray-800">Pending Requests</h3>
      {leaveRequests.length > 0 ? leaveRequests.map((leave, index) => (
        <div key={index} className="p-4 bg-gray-100 rounded-lg flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
          <div>
            <p className="text-lg font-medium text-gray-800">{leave.employeeName} ({leave.employeeId})</p>
            <p className="text-sm text-gray-600">From: {leave.fromDate} To: {leave.toDate}</p>
            <p className="text-sm text-gray-600">Reason: {leave.reason}</p>
          </div>
          <div className="flex gap-2 mt-2 lg:mt-0">
            <button onClick={() => handleLeaveAction(leave.leaveId, "approve")} className="px-4 py-2 bg-green-500 text-white rounded-lg">Approve</button>
            <button onClick={() => handleLeaveAction(leave.leaveId, "reject")} className="px-4 py-2 bg-red-500 text-white rounded-lg">Reject</button>
          </div>
        </div>
      )) : <p className="text-center text-gray-500">No pending leave requests.</p>}
    </div>
  </div>
</section>

{/* Attendance Pie Chart Section */}
<section className="flex flex-col justify-center gap-6 p-6 w-full max-w-7xl">
  <div className="bg-white shadow-lg rounded-2xl p-6 w-full overflow-x-auto text-center">
    <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800">Attendance Overview</h2>
    <div className="flex justify-center mt-4 overflow-x-auto">
      <PieChart width={300} height={250}>
        <Pie data={attendanceData} cx={150} cy={125} innerRadius={50} outerRadius={90} paddingAngle={5} dataKey="value">
          {attendanceData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={["#22c55e", "#ef4444", "#3b82f6"][index % 3]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>

    {/* Detailed Attendance Table */}
    <div className="mt-6 overflow-x-auto">
      <h3 className="text-2xl text-gray-800 mb-2">Daily Attendance Details</h3>
      {attendanceRecords.length > 0 ? (
        <table className="w-full text-left text-sm text-gray-700 border-collapse">
          <thead>
            <tr>
              <th className="px-2 py-1 border-b">Date</th>
              <th className="px-2 py-1 border-b">Check-in</th>
              <th className="px-2 py-1 border-b">Check-out</th>
              <th className="px-2 py-1 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((rec, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="px-2 py-1 border-b">{rec.date}</td>
                <td className="px-2 py-1 border-b">{rec.checkInTime || "-"}</td>
                <td className="px-2 py-1 border-b">{rec.checkOutTime || "-"}</td>
                <td className={`px-2 py-1 border-b font-semibold ${
                  rec.status === "Present" ? "text-green-600" :
                  rec.status === "Absent" ? "text-red-600" :
                  "text-blue-600"
                }`}>{rec.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p className="text-gray-500 mt-2">No attendance records found.</p>}
    </div>
  </div>
</section>
      </div>
  
      {isTaskModalOpen && selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setIsTaskModalOpen(false)} />
      )}
      {isHistoryModalOpen && <HistoryModal onClose={() => setIsHistoryModalOpen(false)} />}
    </div>
  );
  
};

export default Dashboard;