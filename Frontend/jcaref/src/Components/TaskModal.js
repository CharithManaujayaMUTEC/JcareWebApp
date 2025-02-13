import React from 'react';

const TaskModal = ({ onClose }) => {
  const sampleTasks = [
    { name: "Complete project report" , description: "Complete the project report and submit it to the manager.", type: "Urgent", dueDate: "12/12/2021", status: "In Progress" },
    { name: "Attend team meeting" , description: "Attend the team meeting to discuss the project progress.", type: "Urgent", dueDate: "12/12/2021", status: "Pending" },
    { name: "Review client feedback" , description: "Review the client feedback and make necessary changes to the project.", type: "Normal",  dueDate: "12/12/2021", status: "Completed" },
  ];
  if (!sampleTasks) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Task Details</h2>

        <div className="mb-4">
          <label className="block font-medium">Task Title:</label>
          <p className="border p-2 bg-gray-100">{sampleTasks.name}</p>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Description:</label>
          <p className="border p-2 bg-gray-100">{sampleTasks.description}</p>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Due Date:</label>
          <p className="border p-2 bg-gray-100">{sampleTasks.dueDate}</p>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Status:</label>
          <p className="border p-2 bg-gray-100">{sampleTasks.status}</p>
        </div>

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
