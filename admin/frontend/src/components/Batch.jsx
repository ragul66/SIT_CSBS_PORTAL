import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/SITlogo.png";

const Batch = () => {
  const [Batch, setBatch] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState({
    Name: "",
    RollNo: "",
    RegisterationNo: "",
    Emailid: "",
    Batch: "",
    year: "",
    Ph_No: "",
  });
  const [newUser, setNewUser] = useState({
    Name: "",
    RollNo: "",
    RegisterationNo: "",
    Emailid: "",
    password: "",
    Confirm_password: "",
    Batch: "",
    year: "",
    Ph_No: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const baseUrl = import.meta.env.VITE_API;

  //fetch data by batch
  useEffect(() => {
    const fetchData = async () => {
      if (Batch) {
        try {
          const response = await axios.get(`${baseUrl}/data/${Batch}`);
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [Batch]);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(data[index]);
  };

  //delete the student in the table
  const handleDelete = async (id, name, rollNo, year) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the data for ${name} (Roll No: ${rollNo}, Year: ${year})?`
    );
    if (confirmed) {
      try {
        await axios.delete(`${baseUrl}/data/${id}`);
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  //update the student details in the table
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/data/${formData.id}`, formData);
      const updatedData = [...data];
      updatedData[editingIndex] = formData;
      setData(updatedData);
      setEditingIndex(-1);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.Confirm_password) {
      alert("Passwords do not match.");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(newUser.Emailid)) {
      alert("Email must be a valid Gmail address.");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/register`, newUser);
      setData([...data, response.data]);
      setNewUser({
        Name: "",
        RollNo: "",
        RegisterationNo: "",
        Emailid: "",
        password: "",
        Confirm_password: "",
        Batch: "",
        year: "",
        Ph_No: "",
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex  font-mono">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-full">
        <div className="flex flex-row">
          <img src={logo} className="w-20 h-20  mb-4" alt="logo" />
          <h1 className="text-3xl font-bold mt-4 ml-3 text-blue-700 font-serif">
            Welcome to CSBS Admin Panel
          </h1>
        </div>
        {/* <button className="bg-green-500 text-black px-4 py-2 rounded mb-4">
          Add New Admin
        </button> */}
        <h1 className="text-2xl font-bold mb-4 font-serif">
          Filter Data by Batch
        </h1>
        <select
          value={Batch}
          onChange={(e) => setBatch(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Select Batch</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
        </select>

        {editingIndex !== -1 && (
          <form onSubmit={handleUpdate} className="mb-4">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Name"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="RollNo"
              value={formData.RollNo}
              onChange={handleChange}
              placeholder="Roll No"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="RegisterationNo"
              value={formData.RegisterationNo}
              onChange={handleChange}
              placeholder="Registration No"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="email"
              name="Emailid"
              value={formData.Emailid}
              onChange={handleChange}
              placeholder="Email ID"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="Batch"
              value={formData.Batch}
              onChange={handleChange}
              placeholder="Batch"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="Ph_No"
              value={formData.Ph_No}
              onChange={handleChange}
              placeholder="Phone No"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </form>
        )}

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          {showAddForm ? "Cancel" : "Add New User"}
        </button>
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded mb-4 ml-3"
          onClick={() => navigate(`/`)}
        >
          Enter Marks
        </button>

        {showAddForm && (
          <form onSubmit={handleAdd} className="mb-4">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <input
              type="text"
              name="Name"
              value={newUser.Name}
              onChange={handleAddChange}
              placeholder="Name"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="RollNo"
              value={newUser.RollNo}
              onChange={handleAddChange}
              placeholder="Roll No"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="RegisterationNo"
              value={newUser.RegisterationNo}
              onChange={handleAddChange}
              placeholder="Registration No"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="email"
              name="Emailid"
              value={newUser.Emailid}
              onChange={handleAddChange}
              placeholder="Email ID"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleAddChange}
              placeholder="Password"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="password"
              name="Confirm_password"
              value={newUser.Confirm_password}
              onChange={handleAddChange}
              placeholder="Confirm Password"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="Batch"
              value={newUser.Batch}
              onChange={handleAddChange}
              placeholder="Batch"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="year"
              value={newUser.year}
              onChange={handleAddChange}
              placeholder="Year"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="Ph_No"
              value={newUser.Ph_No}
              onChange={handleAddChange}
              placeholder="Phone No"
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </form>
        )}

        <div>
          {data.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Roll No</th>
                  <th className="border px-4 py-2">Registration No</th>
                  <th className="border px-4 py-2">Email ID</th>
                  <th className="border px-4 py-2">Batch</th>
                  <th className="border px-4 py-2">Year</th>
                  <th className="border px-4 py-2">Phone No</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item.Name}</td>
                    <td className="border px-4 py-2">{item.RollNo}</td>
                    <td className="border px-4 py-2">{item.RegisterationNo}</td>
                    <td className="border px-4 py-2">{item.Emailid}</td>
                    <td className="border px-4 py-2">{item.Batch}</td>
                    <td className="border px-4 py-2">{item.year}</td>
                    <td className="border px-4 py-2">{item.Ph_No}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mb-2 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(
                            item.id,
                            item.Name,
                            item.RollNo,
                            item.year
                          )
                        }
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available for the selected batch.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Batch;
