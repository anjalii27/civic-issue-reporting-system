
🌆 CivicSense – Smart Civic Issue Reporting System
CivicSense is a full‑stack web application that allows citizens to report civic issues (like road damage, garbage, water leakage, street light problems), and enables admins/officers to manage, track, verify, and resolve these issues through an intuitive dashboard.
This project demonstrates a real‑world issue reporting workflow with image upload, duplicate issue handling, status tracking, officer assignment, and role‑based access.

✨ Features Overview
🧑‍💼 Citizen Features
Report an issue with Title, Description, Category, Location, Image upload

View issue details

Track progress with a status timeline

Delete their own reported issues

Duplicate issue detection (same location + category)

🛡️ Admin Features
View all reported issues

Filter issues by status or category

Assign officers to issues

Add new officers & admins

Update issue status

View how many users reported the same issue (duplicate count)

👮 Officer Features
View issues assigned to them

Update status (Verified → In Progress → Resolved)

🔧 Additional Functionalities
Image upload using Multer

Error handling + validation

Secure JWT-based authentication

Duplicate issue merging logic

Responsive UI using Chakra UI

🧰 Tech Stack
Frontend
React

Chakra UI

React Router

Fetch API

Backend
Node.js

Express.js

MongoDB (Mongoose)

Multer (image upload)

JWT Authentication

📁 Project Structure
CivicSense/
│── client/        # Frontend (React)
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── utils/
│       └── ...
│
│── server/        # Backend (Express + MongoDB)
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── uploads/
│   └── server.js
│
└── README.md
🔧 Installation & Setup
1. Clone the Project
git clone https://github.com/your-username/your-repo.git
cd your-repo
🌐 Backend Setup
cd server
npm install
Create .env:

MONGO_URI=your-mongodb-url
JWT_SECRET=your-secret-key
Run backend:

npm run dev
Backend runs at: http://localhost:5000

💻 Frontend Setup
cd client
npm install
npm run dev
Frontend runs at: http://localhost:5173 (or similar)

🔁 Duplicate Issue Handling
If a user reports an issue with the same category + same location:

System does NOT create a new issue

Instead, it increments duplicateCount

Admin sees: "Reported by X users"

This keeps the database clean and avoids repeated issues.
