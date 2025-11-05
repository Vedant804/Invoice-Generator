import { createContext, useState } from "react"; // 1. Added useState
export const AppContext = createContext();
export const initialInvoiceData = () => ({
    title: "New Invoice",
    billing: { name: "", phone: "", address: "" },
    shipping: { name: "", phone: "", address: "" },
    invoice: { number: "", date: "", dueDate: "" },
    account: { name: "", number: "", ifsccode: "" },
    company: { name: "", number: "", address: "" },
    tax: 0,
    notes: "",
    items: [
        { name: "", qty: "", amount: "", description: "", total: 0 },
    ],
    logo: ""
});

// 2. Define the Context Provider component
export const AppContextProvider = ({ children }) => {
    const [invoiceTitle,setInvoiceTitle]=useState("New Invoice");
    const [invoiceData, setInvoiceData] = useState(initialInvoiceData());
    const [selectedTemplate, setSelectedTemplate] = useState("template1");
    const baseURL="http://localhost:8080/api"
    const contextValue={
        invoiceTitle,setInvoiceTitle,
        invoiceData, setInvoiceData,
        selectedTemplate, setSelectedTemplate,
        initialInvoiceData,
        baseURL
    }
  return (
    // 3. Provide the 'value' to the consumers
    <AppContext.Provider value={contextValue}> {/* 2. Removed extra object braces */}
      {children}
    </AppContext.Provider>
  );
};