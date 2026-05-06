import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './addmember.css';
import { toast } from "react-toastify";

function AddMember() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");     // 🔥 NEW (actual role)
  const [password, setPassword] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= ADD MEMBER =================
  const addMember = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!name || !email || !password || !job) {
      return toast.error("All fields required ⚠️");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:4000/api/user",
        {
          name,
          email,
          password,
          role: "member",   // 🔥 FIXED (system role)
          job               // 🔥 actual job role
        }
      );

      if (res.data.msg === "success") {
        toast.success("Member Added ✅");
        getMembers();

        // reset form
        setName("");
        setEmail("");
        setPassword("");
        setJob("");
      } 
      else if (res.data.msg === "exist") {
        toast.error("Email already exists ❌");
      } 
      else {
        toast.error("Something went wrong ❌");
      }

    } catch (err) {
      console.log(err);
      toast.error("Server Error ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= GET MEMBERS =================
  const getMembers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/user");

      if (res.data.msg === "success") {
        setMembers(res.data.users);
      }

    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch users ❌");
    }
  };

  // ================= LOAD =================
  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div className="member-container">
      <div className="member-card">

        <h2>Add Team Member</h2>

        <form className="member-form" onSubmit={addMember}>
          <div className="form-grid">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* 🔥 JOB ROLE */}
            <select
              value={job}
              onChange={(e) => setJob(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Software Tester">Software Tester</option>
              <option value="Counselor">Counselor</option>
            </select>

          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Member"}
          </button>
        </form>

        <h3>Member List</h3>

        <table className="member-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
            </tr>
          </thead>

          <tbody>
            {members?.length > 0 ? (
              members.map((m) => (
                <tr key={m._id}>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.job}</td> {/* 🔥 show job */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No members found</td>
              </tr>
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default AddMember;