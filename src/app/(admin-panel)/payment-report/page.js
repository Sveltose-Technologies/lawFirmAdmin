'use client';
import React, { useState } from 'react';
import { Card, CardBody, Table, Button, Input, Badge } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentReport = () => {
  const GOLD = "#eebb5d";
  // Mock Data
  const [reports, setReports] = useState([
    { id: 1, invoice: "#INV-001", client: "Ramesh", amount: "$500", date: "2024-12-01", status: "Paid" },
    { id: 2, invoice: "#INV-002", client: "Suresh", amount: "$200", date: "2024-12-02", status: "Pending" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePrint = () => {
    window.print();
    toast.info("Printing Report...", {theme:"colored"});
  };

  const filtered = reports.filter(r => r.client.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Payment Report</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-between mb-4">
            <Input placeholder="Search Client..." className="rounded-pill" style={{maxWidth:'300px'}} onChange={e=>setSearchTerm(e.target.value)} />
            <Button onClick={handlePrint} className="btn-secondary"><i className="bi bi-printer me-2"></i>Print Report</Button>
        </div>
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Invoice</th><th>Client</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead><tbody>
            {filtered.map(item => (
                <tr key={item.id}>
                    <td>{item.invoice}</td><td>{item.client}</td><td className="fw-bold">{item.amount}</td><td>{item.date}</td>
                    <td><Badge color={item.status==='Paid'?'success':'warning'}>{item.status}</Badge></td>
                </tr>
            ))}
        </tbody></Table>
      </CardBody></Card>
    </div>
  );
};
export default PaymentReport;