import axios from 'axios';
import React, { useState, useEffect } from 'react';

function AssignTask() {

  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("");

  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);

  // GET PROJECTS
  const getProjects = async () => {
    const res = await axios.get("https://task-management-software-jmsc.onrender.com/api/project");
    if (res.data.msg === "success") setProjects(res.data.projects);
  };

  // GET MEMBERS
  const getMembers = async () => {
    const res = await axios.get("https://task-management-software-jmsc.onrender.com/api/user");
    if (res.data.msg === "success") setMembers(res.data.users);
  };

  // GET TASKS
  const getTasks = async () => {
    const res = await axios.get("https://task-management-software-jmsc.onrender.com/api/task");
    if (res.data.msg === "success") setTasks(res.data.tasks);
  };

  // ADD TASK
  const addTask = async (e) => {
    e.preventDefault();

    const res = await axios.post("https://task-management-software-jmsc.onrender.com/api/task", {
      title,
      projectId,
      assignedTo,
      status
    });

    if (res.data.msg === "success") {
      alert("Task Assigned ✅");
      getTasks();

      setTitle("");
      setProjectId("");
      setAssignedTo("");
      setStatus("");
    }
  };

  useEffect(() => {
    getProjects();
    getMembers();
    getTasks();
  }, []);

  return (
    <div className="container mt-4">

      {/* CARD */}
      <div className="card shadow-lg border-0">
        <div className="card-body">

          <h3 className="text-center mb-4">Assign Task</h3>

          {/* FORM */}
          <form onSubmit={addTask}>
            <div className="row g-3 ">

              {/* TASK TITLE */}
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* PROJECT */}
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  required
                >
                  <option value="">Select Project</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* MEMBER */}
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  required
                >
                  <option value="">Select Member</option>
                  {members.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name} ({m.role})
                    </option>
                  ))}
                </select>
              </div>

              

              {/* BUTTON */}
              <div className="col-12">
                <button className="btn btn-primary w-100">
                  Assign Task
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>

      {/* TABLE */}
      <div className="card mt-4 shadow-sm">
        <div className="card-body">

          <h4 className="mb-3">Task List</h4>

          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">

              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Project</th>
                  <th>Member</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((t) => (
                  <tr key={t._id}>
                    <td>{t.title}</td>
                    <td>{t.projectId?.title}</td>
                    <td>{t.assignedTo?.name}</td>
                    <td>
                      <span className={`badge 
                        ${t.status === "Completed" ? "bg-success" :
                          t.status === "In Progress" ? "bg-warning text-dark" :
                          "bg-secondary"}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>

    </div>
  );
}

export default AssignTask;