# 🧾 Invoice Generator (React.js + Spring Boot + Clerk + MongoDB)

A **full-stack Invoice Generator web application** that allows users to create, customize, and manage invoices effortlessly.  
It features user authentication via Clerk, multiple professional invoice templates, and PDF export functionality.

---

## 🚀 Features

- 🧠 **Full-Stack Architecture:** React.js frontend integrated with Spring Boot backend and MongoDB database.  
- 🔐 **Clerk Authentication:** Secure login & registration for users using Clerk.  
- 🧾 **Invoice Management:** Create, edit, and delete invoices with customer and seller details.  
- 🎨 **Multiple Templates:** Choose from 4 unique and dynamic invoice templates.  
- 📦 **Download as PDF:** Export generated invoices as professional PDFs using jsPDF and html2canvas.  
- ☁️ **Persistent Storage:** All invoice data securely stored in MongoDB.  
- ⚡ **Real-Time Calculations:** Auto-calculation of subtotal, tax (GST), and total amount.  
- 🏦 **Company Details:** Add account details, IFSC, branch, and remarks on invoices.

---

## 🧠 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js, HTML, CSS, jsPDF, html2canvas |
| **Backend** | Spring Boot (Java), REST APIs |
| **Database** | MongoDB |
| **Authentication** | Clerk |
| **Tools / IDEs** | VS Code, IntelliJ IDEA, Git, GitHub |

---

## 🧩 Project Structure

```
Invoice-Generator/
├── invoice-generator-client/   # Vite + React Frontend
│   ├── src/
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│
├── invoicegeneratorapi/        # Spring Boot Backend
│   ├── src/
│   ├── pom.xml
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🖥️ Clone the Repository
```bash
git clone https://github.com/Vedant804/Invoice-Generator.git
cd Invoice-Generator
```

### 🖥️ Frontend (Vite + React.js)
1. Open terminal and navigate to the frontend folder:
   ```bash
   cd invoice-generator-client
   ```
2. Navigate to the React client folder:
   ```bash
   npm install
   ```
3. Add environment variables:
   Create a .env file inside the invoice-generator-client directory
   ```bash
   touch .env
   ```
4. Add the following keys inside .env:
   ```bash
   VITE_CLERK_PUBLISHABLE_KEY=pk_live_*************
   VITE_API_BASE_URL=http://localhost:8080
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. The Vite React app will start at:
   ```bash
   http://localhost:5173
   ```
   
> 🏗️ The backend API was bootstrapped using [Spring Initializr](https://start.spring.io/), 
> with dependencies for Spring Web, Spring Data MongoDB, and Lombok.

### 🖥️ Setup Backend (Spring Boot + MongoDB)

1. Navigate to the backend folder:
   ```bash
   cd ../invoicegeneratorapi
   ```
2. Configure MongoDB Connection (Compass - Local)
- Make sure your MongoDB Compass server is running locally.
- In src/main/resources/application.properties, add your MongoDB URI:
  ```bash
  spring.data.mongodb.uri=mongodb://localhost:27017/invoiceDB
  ```
- This connects Spring Boot to your local MongoDB Compass database.
  
3. Run the Spring Boot Server
- If using Maven:
  ```bash
  mvn spring-boot:run
  ```
- Or open the project in IntelliJ IDEA and run InvoicegeneratorapiApplication.java
  
4. The backend will start at:
   ```bash
   http://localhost:8080
   ```

   ---

## 🧾 Common Commands

| Purpose | Command |
|----------|----------|
| Clone Repository | `git clone <repo-url>` |
| Install Frontend Dependencies | `npm install` |
| Start Vite Dev Server | `npm run dev` |
| Run Backend Server | `mvn spring-boot:run` |
| Clean Maven Build | `mvn clean install` |

---

## 👨‍💻 Developer

**👤 Vedant Joshi**  
💼 B.E. Artificial Intelligence & Machine Learning  
🔗 [LinkedIn](https://www.linkedin.com/in/vedantjoshi) • [GitHub](https://github.com/Vedant804)

---

## 🪪 License
This project is open-source and available under the **MIT License**.
