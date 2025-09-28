import React, { useState, useEffect } from "react";
import NavBarAdmin from "../Components/NavBarAdmin";
import FooterSection from "../Components/FooterSection";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [roles] = useState(["Admin", "Manager", "Employee"]); // predefined roles
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${BASE_URL}/admin/getAllEmployees`);
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, [BASE_URL]);

  // Update role/permissions
  const handleRoleUpdate = async () => {
    if (!selectedEmployeeId || !selectedRole) {
      alert("Select an employee and a role!");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/admin/updateRole`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: selectedEmployeeId, role: selectedRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");
      alert("Role updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating role!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-purple-500">
      <NavBarAdmin />

      <div className="p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Manage Employees</h1>

        {/* Employee List */}
        <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 mb-8 overflow-x-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Employees</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse text-sm md:text-base text-gray-700">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b px-2 py-2">Employee ID</th>
                  <th className="border-b px-2 py-2">Name</th>
                  <th className="border-b px-2 py-2">Department</th>
                  <th className="border-b px-2 py-2">Role</th>
                  <th className="border-b px-2 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.employeeId} className="hover:bg-gray-50">
                      <td className="border-b px-2 py-2">{emp.employeeId}</td>
                      <td className="border-b px-2 py-2">{emp.name}</td>
                      <td className="border-b px-2 py-2">{emp.department}</td>
                      <td className="border-b px-2 py-2">{emp.role}</td>
                      <td className="border-b px-2 py-2">
                        {emp.active ? "Active" : "Inactive"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role/Permission Assignment */}
        <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Assign Role / Permissions
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              className="border p-2 rounded-lg flex-1"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.employeeId} value={emp.employeeId}>
                  {emp.name} ({emp.employeeId})
                </option>
              ))}
            </select>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border p-2 rounded-lg flex-1"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <button
              onClick={handleRoleUpdate}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Update Role
            </button>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default AdminDashboard;