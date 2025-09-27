import React from 'react';

const TaskModal = ({ task, onClose, refreshTasks }) => {

  const toggleTaskStatus = async () => {
    try {
      const url = task.taskStatus === "done"
        ? `http://localhost:8081/dashboard/taskNotDone?taskId=${task.taskId}`
        : `http://localhost:8081/dashboard/taskDone?taskId=${task.taskId}`;
      const response = await fetch(url, { method: "POST" });
      if (!response.ok) throw new Error("Failed to update task status");

      refreshTasks(); // Refresh tasks in dashboard
      onClose(); // Close modal
    } catch (error) {
      console.error(error);
      alert("Error updating task status!");
    }
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Task Details</h2>

        <div className="mb-4">
          <label className="block font-medium">Task Title:</label>
          <p className="border p-2 bg-gray-100">{task.taskName}</p>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Description:</label>
          <p className="border p-2 bg-gray-100">{task.taskDescription}</p>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Due Date:</label>
          <p className="border p-2 bg-gray-100">{task.taskDate} {task.taskTime}</p>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Status:</label>
          <p className="border p-2 bg-gray-100">{task.taskStatus || "Pending"}</p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={toggleTaskStatus}
            className={`px-4 py-2 rounded text-white ${task.taskStatus === "done" ? "bg-red-500" : "bg-green-500"}`}
          >
            {task.taskStatus === "done" ? "Mark as Not Done" : "Mark as Done"}
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
