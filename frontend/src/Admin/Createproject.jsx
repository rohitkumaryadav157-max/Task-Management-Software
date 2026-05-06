import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './createproject.css';
import { toast } from "react-toastify";
function AddProject() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [projects, setProjects] = useState([]);

  // ADD PROJECT
  const addProject = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://task-management-software-jmsc.onrender.com/api/project",
      { title, description, status }
    );

    if (res.data.msg === "success") {
      toast.success("Project Added ✅");

      getProjects(); // refresh table

      // reset form
      setTitle("");
      setDescription("");
      setStatus("");
    }

  } catch (err) {
    toast.error("Error ❌");
  }
};

  // GET PROJECTS
  const getProjects = async () => {
  try {
    const res = await axios.get(
      "https://task-management-software-jmsc.onrender.com/api/project"
    );

    if (res.data.msg === "success") {
      setProjects(res.data.projects);
    }

  } catch (err) {
    console.log(err);
  }
};



  // LOAD DATA
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div className="project-container">
        <div className="project-card">
          <h2>Create Project</h2>

          <form className="project-form" onSubmit={addProject}>
            <div className="form-grid">

              <input
                type="text"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

            </div>

            <button  className="submit-btn" >
              Add Project
            </button>
          </form>

          <h3>Project List</h3>

          <table className="project-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
    {projects.map((p) => (
      <tr key={p._id}>
        <td>{p.title}</td>
        <td>{p.description}</td>
        <td>{p.status}</td>
      </tr>
    ))}
  </tbody>
          </table>

        </div>
      </div>
    </>
  );
}

export default AddProject;