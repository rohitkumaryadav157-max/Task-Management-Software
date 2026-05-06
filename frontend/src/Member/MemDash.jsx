import React, { useEffect, useState } from "react";
import axios from "axios";

function MemDash() {
    const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    progress: 0,
    completed: 0,
    overdue: 0
  });

  const userName = "Rohit"; // later replace with logged-in user

  const getUserTasks = async () => {
    try {
      const res = await axios.get("https://task-management-software-jmsc.onrender.com/api/task");

      if (res.data.msg === "success") {
        const tasks = res.data.tasks.filter(
          (t) => t.assignedTo === userName
        );

        const total = tasks.length;
        const pending = tasks.filter(t => t.status === "Pending").length;
        const progress = tasks.filter(t => t.status === "In Progress").length;
        const completed = tasks.filter(t => t.status === "Completed").length;

        const today = new Date();
        const overdue = tasks.filter(t =>
          t.dueDate && new Date(t.dueDate) < today && t.status !== "Completed"
        ).length;

        setStats({ total, pending, progress, completed, overdue });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserTasks();
  }, []);

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4 fw-bold">Employee Dashboard</h2>
        <h1>Welcome {user.name}</h1>
      <div className="row g-4">

        {/* Total */}
        <div className="col-md-4 col-lg-2">
          <div className="card text-center shadow"
            style={{ background: "#007bff", color: "#fff", borderRadius: "10px" }}>
            <div className="card-body">
              <h6>📌 Total</h6>
              <h3>{stats.total}</h3>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="col-md-4 col-lg-2">
          <div className="card text-center shadow"
            style={{ background: "#ffc107", borderRadius: "10px" }}>
            <div className="card-body">
              <h6>⏳ Pending</h6>
              <h3>{stats.pending}</h3>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="col-md-4 col-lg-2">
          <div className="card text-center shadow"
            style={{ background: "#17a2b8", color: "#fff", borderRadius: "10px" }}>
            <div className="card-body">
              <h6>🚧 Progress</h6>
              <h3>{stats.progress}</h3>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="col-md-4 col-lg-2">
          <div className="card text-center shadow"
            style={{ background: "#28a745", color: "#fff", borderRadius: "10px" }}>
            <div className="card-body">
              <h6>✅ Completed</h6>
              <h3>{stats.completed}</h3>
            </div>
          </div>
        </div>

        {/* Overdue */}
        <div className="col-md-4 col-lg-2">
          <div className="card text-center shadow"
            style={{ background: "#dc3545", color: "#fff", borderRadius: "10px" }}>
            <div className="card-body">
              <h6>⚠️ Overdue</h6>
              <h3>{stats.overdue}</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MemDash;