📌Team Task Manager (Full-Stack)

A full-stack web application where users can create projects, assign tasks, and track progress with role-based access (Admin & Member).

🚀 Features
🔐 Authentication
Signup / Login system
Role-based access (Admin / Member)
📁 Project Management
Create and manage projects
Track project status (Pending, In Progress, Completed)
📋 Task Management
Assign tasks to members
View all tasks (Admin)
Members can view only their assigned tasks
🔄 Task Status Update
Members can update task status
Admin can track progress in real-time
📊 Dashboard
Total tasks
Completed tasks
Pending tasks
In Progress tasks
Overdue tasks (optional)
🛠️ Tech Stack
Frontend
React.js
Bootstrap
Axios
Backend
Node.js
Express.js
Database
MongoDB (Atlas)
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/task-manager.git
cd task-manager
2️⃣ Backend Setup
cd backend
npm install
Create .env file
MONGO_URI=your_mongodb_atlas_connection_string
PORT=4000
Run server
npm start
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🔗 API Endpoints
👤 User
POST /api/user → Create user
POST /api/user/login → Login
GET /api/user → Get all members
📁 Project
POST /api/project → Create project
GET /api/project → Get all projects
📋 Task
POST /api/task → Assign task
GET /api/task → Get all tasks
GET /api/task/user/:id → Get user tasks
PUT /api/task/:id → Update task status
🔐 Role-Based Access
👨‍💼 Admin
Create projects
Add members
Assign tasks
View all tasks
👨‍💻 Member
Login
View assigned tasks
Update task status
✅ Validations
Required fields validation
Email format validation
Duplicate email check
Status validation
Role-based access control
🌐 Database

This project uses MongoDB Atlas (Cloud Database).

📸 Screenshots (Optional)

Add screenshots here (Dashboard, Assign Task, Login, etc.)

🚀 Future Improvements
Real-time updates (Socket.io)
Notifications system
Task deadlines & reminders
Charts & analytics dashboard
👨‍💻 Author

Rohit Kumar

⭐ Support

If you like this project, give it a ⭐ on GitHub!

📦 Project Status

✅ Completed (Core Features)
🚀 Ready for Deployment
