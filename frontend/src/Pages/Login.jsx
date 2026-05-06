import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {

  const navigate = useNavigate();

  // ✅ state for form
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // ✅ login function
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://task-management-software-jmsc.onrender.com/api/user/login",
        form
      );

      if (res.data.msg === "success") {
          toast.success("Login Successful ");
          localStorage.setItem("user", JSON.stringify(res.data.user));
        if (res.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/member");
        }

      } else {
        toast.error("Invalid email or password ");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100" style={{ maxWidth: "900px" }}>
        
        {/* Left */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center bg-primary text-white p-5 rounded-start">
          <h2 className="fw-bold">Welcome Back 👋</h2>
          <p className="mt-3">
            Login to access your dashboard.
          </p>
        </div>

        {/* Right */}
        <div className="col-md-6 bg-white p-5 shadow rounded-end">
          <h3 className="text-center mb-4 fw-bold">Login</h3>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            <label>Email</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <label>Password</label>
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleLogin}
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
}

export default Login;