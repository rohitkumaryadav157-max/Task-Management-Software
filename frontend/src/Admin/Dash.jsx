import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dash.css";

function Dash() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  // Fetch tasks and calculate stats
  const getDashboardData = async () => {
    try {
      const res = await axios.get("https://task-management-software-jmsc.onrender.com/api/task");

      if (res.data.msg === "success") {
        const tasks = res.data.tasks;

        const total = tasks.length;
        const completed = tasks.filter(t => t.status === "Completed").length;
        const pending = tasks.filter(t => t.status === "Pending").length;

        // Example overdue logic (if you add dueDate in backend)
        const today = new Date();
        const overdue = tasks.filter(t => 
          t.dueDate && new Date(t.dueDate) < today && t.status !== "Completed"
        ).length;

        setStats({ total, completed, pending, overdue });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="mb-4 text-center fw-bolder">Admin Dashboard</h2>

      <div className="dashboard-cards">

        <div className="card total">
          <h3>Total Tasks</h3>
          <p>{stats.total}</p>
        </div>

        <div className="card completed">
          <h3>✅ Completed</h3>
          <p>{stats.completed}</p>
        </div>

        <div className="card pending">
          <h3>⏳ Pending</h3>
          <p>{stats.pending}</p>
        </div>

        <div className="card overdue">
          <h3>⚠️ Overdue</h3>
          <p>{stats.overdue}</p>
        </div>

      </div>
    </div>
  );
}

export default Dash;