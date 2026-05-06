import axios from "axios";
import React, { useEffect, useState } from "react";

function MyTask() {

  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
console.log("User from localStorage:", user);
  const getMyTasks = async () => {
    const res = await axios.get(
      `https://task-management-software-jmsc.onrender.com/api/task/user/${user._id}`
    );

    if (res.data.msg === "success") {
      setTasks(res.data.tasks);
    }
  };

  useEffect(() => {
    getMyTasks();
  }, []);

  return (
    <div className="container mt-4">

      <h3>Welcome {user.name} 👋</h3>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Task</th>
            <th>Project</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>{t.projectId?.title}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default MyTask;