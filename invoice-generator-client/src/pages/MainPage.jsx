import React, { useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import InvoiceForm from '../components/InvoiceForm.jsx'; // 2. FIX: Added InvoiceForm Import
import TemplateGrid from '../components/TemplateGrid.jsx';

const MainPage = () => {
    const [isEditingTitle,setIsEditingTitle]=useState(false);
    const navigate= useNavigate();
    const { invoiceTitle, setInvoiceTitle, invoiceData, setInvoiceData, setSelectedTemplate } = useContext(AppContext);
    const handleTemplateClick = (templateId) => {
    const hasInvalidItem = invoiceData.items.some(
        (item) => !item.qty || !item.amount
    );
    if (hasInvalidItem) {
        toast.error("Please enter quantity and amount for all items.");
        return;
    }

    setSelectedTemplate(templateId);
    navigate('/preview');   
}


    const handleTitleChange = (e) => {
        const newTitle=(e.target.value);
        setInvoiceTitle(newTitle);
        setInvoiceData(prev=>({
            ...prev,
            title: newTitle
        }));
    }

    const handleTitleEdit = () => {
        setIsEditingTitle(true);
    }

     const handleTitleBlur = () => {
        setIsEditingTitle(false); // 1. FIX: Added logic to exit edit mode
     }

    return (
        <div className="mainpage container-fluid bg-light min-vh-100 py-4">
            <div className="container">

                {/* Title bar */}
                <div className="bg-white border rounded shadow-sm p-3 mb-4">
                    <div className="d-flex align-items-center">
                        {isEditingTitle ? (
                            <input
                                type="text"
                                className="form-control me-2"
                                autoFocus
                                value={invoiceTitle}
                                onChange={handleTitleChange}
                                onBlur={handleTitleBlur} // This saves and exits edit mode
                                // OPTIONAL: Add onKeyDown to save on Enter key press
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleTitleBlur();
                                }}
                            />
                            ):(
                            <>
                            <h5 className="mb-0 me-2">{invoiceTitle}</h5>
                            <button
                                className="btn btn-sm p-0 border-0 bg-transparent"
                                onClick={handleTitleEdit}
                            >
                                <Pencil className="text-primary" size={20}/>
                            </button>
                            </>
                            )
                        }
                    </div>
                </div>

                <div className="row g-4 align-items-stretch">
                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-4 w-100">
                            <InvoiceForm/>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-4 w-100">
                            <TemplateGrid onTemplateClick={handleTemplateClick}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default MainPage;