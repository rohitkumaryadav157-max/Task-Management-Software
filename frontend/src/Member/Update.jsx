import axios from "axios";
import React, { useEffect, useState } from "react";

function MyTask() {

  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // GET TASKS
  const getMyTasks = async () => {
    const res = await axios.get(
      `https://task-management-software-jmsc.onrender.com/api/task/user/${user._id}`
    );

    if (res.data.msg === "success") {
      setTasks(res.data.tasks);
    }
  };

  // CLICK UPDATE BUTTON
  const startEdit = (task) => {
    setEditId(task._id);
    setNewStatus(task.status || "Pending");
  };

  // SAVE STATUS
  const updateStatus = async () => {
    await axios.put(
      `https://task-management-software-jmsc.onrender.com/api/task/${editId}`,
      { status: newStatus }
    );

    setEditId(null);
    getMyTasks();
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
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t._id}>

              <td>{t.title}</td>
              <td>{t.projectId?.title}</td>

              {/* STATUS */}
              <td>
                {editId === t._id ? (
                  <select
                    className="form-select"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Overdue</option>
                  </select>
                ) : (
                  <span className={`badge 
                    ${t.status === "Completed" ? "bg-success" :
                        t.status === "Overdue" ? "bg-danger" :
                      t.status === "In Progress" ? "bg-warning text-dark" :
                      "bg-secondary"}`}>
                    {t.status || "Pending"}
                  </span>
                )}
              </td>

              {/* ACTION */}
              <td>
                {editId === t._id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={updateStatus}
                    >
                      Save
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => startEdit(t)}
                  >
                    Update
                  </button>
                )}
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default MyTask;