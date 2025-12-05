'use client';
import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  
  // 1. User & Roles
  const [users, setUsers] = useState([{ id: 1, name: "Admin User", email: "admin@law.com", role: "Super Admin", status: "Active" }]);
  const [roles, setRoles] = useState([{ id: 1, name: "Attorney", desc: "Legal Staff" }]);
  const [clients, setClients] = useState([{ id: 1, name: "Ramesh Kumar", email: "ramesh@gmail.com", phone: "9876543210", address: "Delhi, India" }]);

  // 2. Case Management
  const [caseTypes, setCaseTypes] = useState([{ id: 1, name: "Criminal Law" }, { id: 2, name: "Civil Law" }]);
  const [attorneys, setAttorneys] = useState([{ id: 1, name: "Adv. Amit", email: "amit@law.com", phone: "9988776655", caseType: "Criminal Law", image: "https://via.placeholder.com/50", experience: "5 Years", price: "$500" }]);
  const [ourCases, setOurCases] = useState([{ id: 1, title: "Property Dispute", client: "Ramesh", attorney: "Adv. Amit", status: "Ongoing" }]);
  
  // --- MISSING PART ADDED HERE (Case Studies) ---
  const [caseStudies, setCaseStudies] = useState([
    { id: 1, title: "Corporate Fraud", description: "Successfully defended a large corporate fraud case.", img: "https://via.placeholder.com/50", thumb: "https://via.placeholder.com/50" }
  ]);

  const [caseDocuments, setCaseDocuments] = useState([{ id: 1, title: "FIR Copy", case: "Property Dispute", date: "2024-12-01" }]);
  const [courtrooms, setCourtrooms] = useState([{ id: 1, name: "Room 302", judge: "Justice Sharma", location: "High Court" }]);
  
  // 3. Task & Schedule
  const [tasks, setTasks] = useState([{ id: 1, title: "Draft Bail Plea", assignTo: "Adv. Amit", priority: "High", dueDate: "2024-12-20", status: "Pending" }]);
  const [timesheets, setTimesheets] = useState([{ id: 1, lawyer: "Adv. Amit", case: "Property Dispute", date: "2024-12-10", hours: "2", desc: "Hearing" }]);
  const [lawyerAvailability, setLawyerAvailability] = useState([{ id: 1, name: "Adv. Amit", date: "2024-12-15", slot: "10:00 AM - 02:00 PM" }]);

  // 4. Finance
  const [expenses, setExpenses] = useState([{ id: 1, title: "Travel", amount: "500", date: "2024-12-12", status: "Approved" }]);
  const [paymentMethods, setPaymentMethods] = useState([{ id: 1, name: "PayPal", type: "Online" }]);
  const [paymentList, setPaymentList] = useState([{ id: 1, name: "Ramesh", amount: "5000", method: "Cash", status: "Paid" }]);
  const [transactions, setTransactions] = useState([{ id: 1, txnId: "TXN123", amount: "5000", type: "Credit", date: "2024-12-01" }]);

  // 5. Content & CMS
  const [blogs, setBlogs] = useState([{ id: 1, title: "Legal Rights", category: "General", tags: "Law", isPublished: true, isPopular: false, img: "https://via.placeholder.com/50" }]);
  const [categories, setCategories] = useState([{ id: 1, name: "General Law" }]);
  const [tags, setTags] = useState([{ id: 1, name: "Legal" }, { id: 2, name: "Tips" }]);
  const [faqs, setFaqs] = useState([{ id: 1, question: "How to apply for bail?", answer: "Contact an attorney..." }]);
  const [testimonials, setTestimonials] = useState([{ id: 1, name: "John Doe", msg: "Great service!", rating: 5 }]);
  const [media, setMedia] = useState([{ id: 1, name: "banner.jpg", url: "https://via.placeholder.com/150" }]);

  // 6. Communication
  const [contacts, setContacts] = useState([{ id: 1, name: "Rahul", email: "rahul@test.com", msg: "Need consultation" }]);
  const [newsletters, setNewsletters] = useState([{ id: 1, email: "subscriber@test.com" }]);
  const [messages, setMessages] = useState([{ id: 1, sender: "Client A", subject: "Query", msg: "Hello...", status: "Unread" }]);

  // 7. Settings
  const [pageSettings, setPageSettings] = useState({ heroTitle: "Welcome to Lawstick" });
  const [services, setServices] = useState([{ id: 1, name: "Consultation", description: "Legal advice", icon: "bi-chat" }]);
  const [languages, setLanguages] = useState([{ id: 1, name: "English", code: "en", status: "Active" }]);

  return (
    <GlobalContext.Provider value={{
      // Users
      users, setUsers, roles, setRoles, clients, setClients,
      // Case
      caseTypes, setCaseTypes, attorneys, setAttorneys, ourCases, setOurCases, 
      caseStudies, setCaseStudies, // <--- YE ZAROORI HAI
      caseDocuments, setCaseDocuments, courtrooms, setCourtrooms,
      // Tasks
      tasks, setTasks, timesheets, setTimesheets, lawyerAvailability, setLawyerAvailability,
      // Finance
      expenses, setExpenses, paymentMethods, setPaymentMethods, paymentList, setPaymentList, transactions, setTransactions,
      // Content
      blogs, setBlogs, categories, setCategories, tags, setTags, faqs, setFaqs, testimonials, setTestimonials, media, setMedia,
      // Comm
      contacts, setContacts, newsletters, setNewsletters, messages, setMessages,
      // Settings
      pageSettings, setPageSettings, services, setServices, languages, setLanguages
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalContext);