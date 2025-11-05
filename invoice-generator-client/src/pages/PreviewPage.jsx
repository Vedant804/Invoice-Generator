import { useRef, useContext } from 'react';
import { AppContext } from "../context/AppContext.jsx";
import { templates } from "../assets/assets.js"
import InvoicePreview from '../components/InvoicePreview.jsx';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { saveInvoice } from '../service/InvoiceService.js'; // Update the path based on your file structure
import { Loader2 } from "lucide-react";
import html2canvas from 'html2canvas';
import { uploadInvoiceThumbnail } from '../service/cloudinaryService.js';
import { deleteInvoice } from '../service/InvoiceService.js';
import { generatePdfFromElement } from '../utils/pdfUtils.js';
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from 'react';

const PreviewPage = () => {
  const previewRef = useRef();
  const { selectedTemplate, invoiceData, setSelectedTemplate, baseURL } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
  const { getToken } = useAuth();
  const { user } = useUser();


  const handleSaveAndExit = async () => {
    try {
      setLoading(true);
      // TODO: create thumbnail url
      // ...inside your async handler function:
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
        scrollY: -window.scrollY,
      });

      const imageData = canvas.toDataURL("image/png"); // Converts canvas to a base64 PNG
      const thumbnailUrl = await uploadInvoiceThumbnail(imageData); // Uploads to Cloudinary or elsewhere
      const payload = {
        ...invoiceData,
        clerkId: user.id,
        thumbnailUrl,
        template: selectedTemplate,
      }
      const token = await getToken();
      const response = await saveInvoice(baseURL, payload, token);
      if (response.status === 200) {
        toast.success("Successfully saved invoice.");
        navigate("/dashboard");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save invoice", error.message);
    } finally {
      setLoading(false);
    }
  }
  const handleDelete = async () => {

    try {
      const token = await getToken();
      const response = await deleteInvoice(baseURL, invoiceData.id, token);
      if (response.status === 204) {
        toast.success("Invoice deleted successfully.");
        navigate("/dashboard");
      } else {
        toast.error("Unable to delete invoice.");
      }
    } catch (error) {
      toast.error("Failed to delete invoice", error.message);
    }
  }

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;

    try {
      setDownloading(true);
      await generatePdfFromElement(
        previewRef.current,
        `invoice_${Date.now()}.pdf`
      );
    } catch (error) {
      toast.error("Failed to generate invoice", error.message);
    } finally {
      setDownloading(false);
    }
  }
  useEffect(() => {
    if (!invoiceData || !invoiceData.items?.length) {
      toast.error("Invoice data is empty.");
      navigate("/dashboard");
    }
  }, [invoiceData, navigate]);






  return (
    <div className=" previewpage container-fluid d-flex flex-column p-3 min-vh-100">
      {/* Action buttons */}
      <div className="d-flex flex-column align-items-center mb-4 gap-3">
        {/* List of template buttons */}
        <div className="d-flex gap-2 flex-wrap justify-content-center">
          {templates.map(({ id, label }) => (
            <button
              key={id}
              style={{ minWidth: "100px", height: "38px" }}
              onClick={() => setSelectedTemplate(id)}
              className={`btn btn-sm rounded-pill p-2 ${selectedTemplate === id ? 'btn-warning' : 'btn-outline-secondary'}`}>
              {label}
            </button>
          ))}
        </div>
        {/* List of action buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <button className="btn btn-primary d-flex align-items-center justify-content-center" onClick={handleSaveAndExit} disabled={loading}>
            {loading && <Loader2 className="me-2 spin-animation" size={18} />}
            {loading ? "Saving..." : "Save And Exit"}
          </button>
          {invoiceData.id && <button className="btn btn-danger" onClick={handleDelete}>
            Delete Invoice
          </button>}
          <button className="btn btn-secondary">
            Back to Dashboard
          </button>
          <button className="btn btn-success d-flex align-items-center justify-content-center" disabled={loading} onClick={handleDownloadPdf}>
            {downloading && (
              <Loader2 className="me-2 spin-animation" size={18} />
            )}
            {downloading ? "Downloading..." : "Download PDF"}

          </button>

        </div>
      </div>
      {/* Display the invoice preview */}
      <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light.py-3">
        <div ref={previewRef} className="invoice-preview">
          <InvoicePreview invoiceData={invoiceData} template={selectedTemplate} />
        </div>
      </div>
    </div>
  )
};

export default PreviewPage;
