// src/App.jsx
import { Routes, Route } from "react-router-dom";
import OfficerDashboard from "./pages/OfficerDashboard";

// Components & Sections
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import WhyChooseUs from "./sections/WhyChooseUs";
import Footer from "./sections/Footer";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ReportIssue from "./pages/ReportIssue";
import IssueDetails from "./pages/IssueDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <WhyChooseUs />
              <Footer />
            </>
          }
        />

        {/* Contact Page */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Issue Reporting */}
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="/issue/:id" element={<IssueDetails />} />

        {/* Dashboards */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/officer-dashboard" element={<OfficerDashboard />} />

      </Routes>
    </>
  );
}

export default App;
