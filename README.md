# Civic Issue Reporting System
Initial setup.
🌆 CivicSense : Smart Civic Issue Reporting and Resolution System
CivicSense is a full‑stack web application that allows citizens to report civic issues (like road damage, garbage, water leakage, street light problems), and enables admins/officers to manage, track and resolve these issues through an intuitive dashboard.
This project demonstrates a real‑world issue reporting workflow with image upload, duplicate issue handling, status tracking, officer assignment, and role‑based access.

🚀 Features
👤 Citizen Features
Create an account & log in

Report a new civic issue with:
Title
Description
Category
Location
Image upload

View issue details
Track progress with a status timeline
Delete their own reported issues
Duplicate issue detection

🛡 Admin Features
View all issues reported by citizens
Filter issues by status or category
Assign officers to issues
Add new officers
Add new admins
Update issue status
See how many users reported the same issue (duplicate count)

👮 Officer Features
View issues assigned to them
Update issue status (Verified → In Progress → Resolved)

🖼 Additional Functionalities
Image upload for issues using Multer
Error handling and validation
Secure role‑based access using JWT
Duplicate issue merging logic
Responsive UI using Chakra UI

🧰 Tech Stack
Frontend:
React
Chakra UI
React Router
Fetch API

Backend:
Node.js
Express.js
MongoDB (Mongoose)
Multer (image uploads)
JWT Authentication

📁 Project Structure
CivicSense/
│
├── client/               # Frontend (React)
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── ...
│
├── server/               # Backend (Express + MongoDB)
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── uploads/
│   └── server.js
│
└── README.md

🛠 Installation & Setup
1. Clone the Project
git clone https://github.com/your-username/your-repo.git
cd your-repo

⚙ Backend Setup
cd server
npm install

Create a .env file in /server:
MONGO_URI=your-mongodb-url
JWT_SECRET=your-secret-key

Start Backend:
npm run dev
Backend runs at:
👉 http://localhost:5000

💻 Frontend Setup
cd client
npm install
npm run dev
Frontend runs at:
👉 http://localhost:5173 (or similar)

🔄 Duplicate Issue Handling
If a user reports an issue in the same category & same location:
System does NOT create a new issue
Instead, it increments duplicateCount
Admin sees “Reported by X users”
Keeps the database clean & gives priority to repeated issues

🔐 Role‑Based Access
Citizen → Report & delete own issues
Admin → Manage issues, assign officers, add officers/admins
Officer → Update issue status
Access control handled via middleware + JWT.

🧪 Future Improvements
Google Maps location selection
Email notifications
Real-time updates using WebSockets

📄 License
This project is created for educational purposes as part of a mini‑project submission.