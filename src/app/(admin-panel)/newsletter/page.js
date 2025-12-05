'use client';
import React, { useState, useEffect } from "react";
import { Card, CardBody, Table, Input, Row, Col } from "reactstrap";
import { useGlobalData } from '../../../context/GlobalContext';

// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Newsletter = () => {
  const { newsletters = [], setNewsletters } = useGlobalData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => setFilteredData((newsletters || []).filter(i => i.email.toLowerCase().includes(searchTerm.toLowerCase()))), [searchTerm, newsletters]);

  const handleDelete = (id) => { 
    if(confirm("Are you sure you want to delete this subscriber?")) {
        setNewsletters(newsletters.filter(i => i.id !== id));
        // --- GREEN TOAST DELETE ---
        toast.success("Subscriber deleted successfully!", {
            theme: "colored",
            position: "top-right"
        });
    }
  };

  const goldColor = "#eebb5d";

  return (
    <div className="p-3 bg-light min-vh-100 font-sans">
      
      {/* --- 2. TOAST CONTAINER --- */}
      <ToastContainer />

      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{color: goldColor}}>Newsletter</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="mb-4"><Input type="text" placeholder="Search..." className="rounded-pill border-secondary-subtle" style={{maxWidth:'300px'}} onChange={e=>setSearchTerm(e.target.value)}/></div>
        <div className="table-responsive"><Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>#</th><th>EMAIL</th><th className="text-end">ACTION</th></tr></thead><tbody>
            {filteredData.map((item, index) => (
                <tr key={item.id}><td className="p-3">{index+1}</td><td className="p-3">{item.email}</td><td className="p-3 text-end"><button onClick={()=>handleDelete(item.id)} className="btn btn-sm rounded-circle border-danger text-danger"><i className="bi bi-trash"></i></button></td></tr>
            ))}
        </tbody></Table></div>
      </CardBody></Card>
    </div>
  );
};
export default Newsletter;