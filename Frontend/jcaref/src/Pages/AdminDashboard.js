import React, { useState, useEffect } from "react";
import NavBarPro from "../Components/NavBarAdmin";
import NavBarAdmin from "../Components/NavBarAdmin";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState(["Admin", "Manager", "Employee"]); // predefined roles
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:8081/admin/getAllEmployees");
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, []);

  // Update role/permissions
  const handleRoleUpdate = async () => {
    if (!selectedEmployeeId || !selectedRole) {
      alert("Select an employee and a role!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8081/admin/updateRole`, {
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
    <div>
      <NavBarAdmin />
      <div className="bg-gradient-to-r from-white to-purple-500 min-h-screen justify-center items-center">
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">Manage Employees</h1>

      {/* Employee List */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Employees</h2>
        <table className="w-full text-left border-collapse text-sm text-gray-700">
          <thead>
            <tr>
              <th className="border-b px-2 py-1">Employee ID</th>
              <th className="border-b px-2 py-1">Name</th>
              <th className="border-b px-2 py-1">Department</th>
              <th className="border-b px-2 py-1">Role</th>
              <th className="border-b px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.employeeId} className="hover:bg-gray-100">
                  <td className="border-b px-2 py-1">{emp.employeeId}</td>
                  <td className="border-b px-2 py-1">{emp.name}</td>
                  <td className="border-b px-2 py-1">{emp.department}</td>
                  <td className="border-b px-2 py-1">{emp.role}</td>
                  <td className="border-b px-2 py-1">{emp.active ? "Active" : "Inactive"}</td>
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

      {/* Role/Permission Assignment */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Assign Role / Permissions</h2>
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
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Update Role
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AdminDashboard;