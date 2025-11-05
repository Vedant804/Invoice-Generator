import { Link } from "react-router-dom";
import "./LandingPage.css";
import { assets } from "../../assets/assets.js";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <img src={assets.logo} alt="QuickInvoice Logo" className="landing-logo" />

        <h1 className="landing-title">Welcome to <span>QuickInvoice</span></h1>
        <p className="landing-subtitle">
          Create, customize, and manage your invoices easily with our fast and intuitive platform.
        </p>

        <div className="landing-buttons">
          <Link to="/generate" className="btn btn-primary px-4 py-2 rounded-pill">
            Generate Invoice
          </Link>
          <Link to="/dashboard" className="btn btn-outline-primary px-4 py-2 rounded-pill ms-3">
            View Dashboard
          </Link>
        </div>
      </div>

      <div className="landing-footer">
        <p>© {new Date().getFullYear()} QuickInvoice. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;
