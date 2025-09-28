import React, { useState, useEffect } from "react";
import NavBarPro from "../Components/NavBarPro";
import FooterSection from "../Components/FooterSection";

const GoodsRequest = () => {
  const [requesterName, setRequesterName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [remarks, setRemarks] = useState("");
  const [items, setItems] = useState([{ itemName: "", quantity: 1, category: "" }]);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const [inventory, setInventory] = useState([]); // 🔹 fetched inventory

  // Fetch available inventory on mount
  useEffect(() => {
    fetch(`${BASE_URL}/goodsrequests/inventory/all`)
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error("Failed to fetch inventory:", err));
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addNewItem = () => {
    setItems([...items, { itemName: "", quantity: 1, category: "" }]);
  };

  const handleSubmit = async () => {
    if (!requesterName || !employeeId || !department || items.some(item => !item.itemName || !item.quantity || !item.category)) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }

    const requestData = {
      requesterName,
      employeeId,
      department,
      priority,
      remarks,
      items,
    };

    console.log("📌 Request Data:", requestData);

    try {
      const res = await fetch(`${BASE_URL}/goodsrequests/requestGoods`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) throw new Error("Failed to submit request");

      const result = await res.text();
      alert(`✅ ${result}`);

      // Reset form
      setRequesterName("");
      setEmployeeId("");
      setDepartment("");
      setPriority("Normal");
      setRemarks("");
      setItems([{ itemName: "", quantity: 1, category: "" }]);

    } catch (error) {
      console.error("Error submitting request:", error);
      alert("❌ Failed to submit request. Check console for details.");
    }
  };

  return (
    <div>
      <NavBarPro />
      <div className="bg-gradient-to-r from-white to-purple-500 min-h-screen flex justify-center items-start py-10">
        <div className="p-8 bg-white shadow-lg rounded-2xl w-3/4 mx-auto">
          <h1 className="font-Montserrat text-4xl font-semibold text-purple-700 text-center">
            Store Goods Request
          </h1>
          <p className="font-Montserrat text-gray-600 text-center mt-2">
            Request medicines or hospital accessories from the store.
          </p>

          {/* Requester Info */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">Employee ID *</label>
              <input
                type="text"
                placeholder="Enter your employee ID"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">Requester Name *</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">Department *</label>
              <input
                type="text"
                placeholder="Enter department"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
          </div>

          {/* Items Section */}
          <div className="mt-6">
            <h3 className="font-Montserrat text-lg font-semibold text-gray-700 mb-2">Requested Items *</h3>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-lg bg-gray-50"
                >
                  <div>
                    <label className="block font-Montserrat text-gray-700 mb-1">Item Name *</label>
                    <select
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, "itemName", e.target.value)}
                    >
                      <option value="">Select Item</option>
                      {inventory.map((inv) => (
                        <option key={inv.itemId} value={inv.itemName}>
                          {inv.itemName} (Available: {inv.quantity})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-Montserrat text-gray-700 mb-1">Quantity *</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-Montserrat text-gray-700 mb-1">Category *</label>
                    <select
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      value={item.category}
                      onChange={(e) => handleItemChange(index, "category", e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-right">
              <button
                onClick={addNewItem}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                + Add Another Item
              </button>
            </div>
          </div>

          {/* Priority & Remarks */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">Priority *</label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block font-Montserrat text-gray-700 mb-1 text-left">Remarks</label>
              <textarea
                placeholder="Additional instructions"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                rows="3"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default GoodsRequest;