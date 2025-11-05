import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { useClerk, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useContext } from "react";
import {initialInvoiceData} from "../context/AppContext.jsx";
import {AppContext} from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const Menubar = () => {
  // Define colors for easy reference
  const charcoalBlue = "#243447";
  const mintTeal = "#00A896";
  const white = "#ffffff";
  const lightText = "rgba(255, 255, 255, 0.75)";

  const { openSignIn } = useClerk();
  const { setInvoiceData, setSelectedTemplate, setInvoiceTitle } = useContext(AppContext);
  const navigate = useNavigate();
  const openLogin = () => {
    openSignIn();
  }

  const handleGenerateClick = () => {
    // reset context
    setInvoiceData(initialInvoiceData);
    setSelectedTemplate("template1");
    setInvoiceTitle("New Invoice");
    navigate("/generate");
  }


  return (
    // 1. Set background color using inline style
    // 2. Use 'navbar-dark' to automatically make the text/toggler icon light (white)
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-lg sticky-top"
      style={{ backgroundColor: charcoalBlue }}
    >
      <div className="container py-2">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Logo />
          <span
            className="fw-bolder fs-4 mx-3"
            // Logo text color set to Mint Teal accent
            style={{ letterSpacing: "-0.5px", color: white }}
          >
            QuickInvoice
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/" style={{ color: lightText }}>
                Home
              </Link>
            </li>
            <SignedIn>
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/dashboard" style={{ color: lightText }}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link fw-medium" onClick={handleGenerateClick} style={{ color: lightText, backgroundColor: 'transparent', border: 'none' }}>
                  Generate
                </button>
              </li>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <li className="nav-item">
                {/* Login/Signup button styled using inline styles */}
                <button
                  className="btn rounded-pill px-4 text-white" onClick={() => openLogin()}
                  style={{ backgroundColor: mintTeal, borderColor: mintTeal }}
                >
                  Login/Signup
                </button>
              </li>
            </SignedOut>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;