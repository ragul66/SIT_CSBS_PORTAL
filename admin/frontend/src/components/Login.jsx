// src/AdminPanel.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [staffid, setStaffId] = useState("");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const baseUrl = import.meta.env.VITE_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    try {
      const response = await axios.get(`${baseUrl}/adlogin`);
      const data = response.data;

      if (data.length === 0) {
        setMessage("No admin data found.");
        return;
      }

      const admin = data.find((admin) => admin.staffid === staffid);

      if (admin && admin.password === password) {
        navigate("/batch");
      } else {
        setMessage("Invalid credentials.");
      }
    } catch (error) {
      setMessage("Error logging in. Please try again later.");
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-serif lg:p-0 md:p-0 p-4 shadow-lg">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Welcome to CSBS Admin Panel
        </h1>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Staff ID</label>
            <input
              type="text"
              value={staffid}
              onChange={(e) => setStaffId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Designation</label>
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Select designation</option>
              <option value="admin">HOD/CSBS</option>
              <option value="manager">AP/CSBS</option>
              <option value="staff">TA/CSBS</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
