import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { getAllInvoices } from "../service/InvoiceService";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { formatDate } from "../utils/formatInvoiceData";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";


const Dashboard = () => {
    const [invoices, setInvoices] = useState([]);
    const { baseURL, setInvoiceData, setSelectedTemplate, setInvoiceTitle, initialInvoiceData } = useContext(AppContext);
    const navigate = useNavigate();
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const token = await getToken();
                const response = await getAllInvoices(baseURL, token);
                setInvoices(response.data);
            } catch (error) {
                toast.error('Failed to load the invoices', error);
            }
        };

        fetchInvoices();
    }, [baseURL]);
    const handleViewClick = (invoice) => {
        setInvoiceData(invoice);
        setSelectedTemplate(invoice.template || "template1");
        setInvoiceTitle(invoice.title || "New Invoice");
        navigate('/preview');
    }
    const handleCreateNew = () => {
        // Reset to initial state from context
        setInvoiceTitle("New Invoice");
        setSelectedTemplate("template1");
        setInvoiceData(initialInvoiceData);
        navigate('/generate');
    }


    return (
        <div className="container py-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                {/* Create New Invoice card */}
                <div className="col">
                    <div onClick={handleCreateNew} className="card h-100 d-flex justify-content-center align-items-center border border-2 border-light shadow-sm cursor-pointer" style={{ minHeight: '270px' }}>
                        <Plus size={48} />
                        <p className="mt-3 fw-med">Create New Invoice</p>
                    </div>
                </div>

                {/* Render the existing invoices */}
                {invoices.map((invoice, idx) => (
                    <div className="col" key={idx}>
                        <div className="card h-100 shadow-sm cursor-pointer" style={{ minHeight: '270px' }} onClick={() => handleViewClick(invoice)}>
                            {invoice.thumbnailUrl && (
                                <img
                                    src={invoice.thumbnailUrl}
                                    alt="Invoice thumbnail"
                                    className="card-img-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            )}
                            {/* You can add more invoice details here */}
                            <div className="card-body">
                                <h6 className="card-title mb-1">{invoice.title}</h6>
                                <small className="text-muted">
                                    Last Updated: {formatDate(invoice.createdAt)}
                                </small>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </div>

    )
}
export default Dashboard;