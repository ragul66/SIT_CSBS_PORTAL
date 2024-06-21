//admin register

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    staffid: "",
    emailid: "",
    password: "",
    confirmpassword: "",
    designation: "",
    Ph_No: "",
  });

  const [message, setMessage] = useState("");
  const baseUrl = import.meta.env.VITE_API;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/adregister`, formData);
      navigate("/");
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response?.data || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 lg:p-0 md:p-0 p-4 font-serif">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Welcome to CSBS Admin Panel
        </h1>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Staff ID</label>
            <input
              type="text"
              name="staffid"
              s
              value={formData.staffid}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email ID</label>
            <input
              type="email"
              name="emailid"
              value={formData.emailid}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Select designation</option>
              <option value="HOD/CSBS">HOD/CSBS</option>
              <option value="AP/CSBS">AP/CSBS</option>
              <option value="TA/CSBS">TA/CSBS</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="Ph_No"
              value={formData.Ph_No}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     staffid: "",
//     emailid: "",
//     password: "",
//     confirmpassword: "",
//     designation: "",
//     Ph_No: "",
//     image: null,
//   });

//   const [message, setMessage] = useState(""); // State for general message
//   const [error, setError] = useState(null); // State for specific error message
//   const baseUrl = import.meta.env.VITE_API;

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmpassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     const data = new FormData();
//     for (const key in formData) {
//       data.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.post(`${baseUrl}/adregister`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       navigate("/");
//       setMessage("Registration successful");
//     } catch (error) {
//       if (error.response) {
//         setError(error.response.data); // Set specific error message from server
//       } else {
//         setError("Registration failed"); // Fallback generic error message
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 lg:p-0 md:p-0 p-4 font-serif">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
//           Welcome to CSBS Admin Panel
//         </h1>
//         {error && (
//           <p className="mb-4 text-center text-red-500">
//             Error: {typeof error === "object" ? JSON.stringify(error) : error}
//           </p>
//         )}
//         {message && (
//           <p className="mb-4 text-center text-green-500">{message}</p>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Staff ID</label>
//             <input
//               type="text"
//               name="staffid"
//               s
//               value={formData.staffid}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email ID</label>
//             <input
//               type="email"
//               name="emailid"
//               value={formData.emailid}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmpassword"
//               value={formData.confirmpassword}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Designation</label>
//             <select
//               name="designation"
//               value={formData.designation}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//             >
//               <option value="">Select designation</option>
//               <option value="HOD/CSBS">HOD/CSBS</option>
//               <option value="AP/CSBS">AP/CSBS</option>
//               <option value="TA/CSBS">TA/CSBS</option>
//             </select>
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700">Phone Number</label>
//             <input
//               type="text"
//               name="Ph_No"
//               value={formData.Ph_No}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           {/* Profile Picture input */}
//           <div className="mb-6">
//             <label className="block text-gray-700">Profile Picture</label>
//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
