'use client';
import React, { useState } from 'react';
import { Card, CardBody, Table, Button, Input, Badge } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogReport = () => {
  const GOLD = "#eebb5d";
  const [logs, setLogs] = useState([
    { id: 1, user: "Admin", action: "Deleted User 'Ravi'", ip: "192.168.1.5", time: "10:30 AM", type: "Critical" },
    { id: 2, user: "Adv. Amit", action: "Uploaded Case File", ip: "192.168.1.12", time: "11:15 AM", type: "Normal" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = logs.filter(l => l.user.toLowerCase().includes(searchTerm.toLowerCase()) || l.action.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDelete = (id) => { setLogs(logs.filter(l => l.id !== id)); toast.success("Log record deleted!", {theme:"colored"}); };
  const clearAll = () => { if(confirm("Clear All Logs?")) { setLogs([]); toast.warn("All logs cleared!", {theme:"colored"}); } };

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>System Logs</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <div className="d-flex justify-content-between mb-4">
            <Input placeholder="Search logs..." className="rounded-pill" style={{maxWidth:'300px'}} onChange={e=>setSearchTerm(e.target.value)} />
            <Button onClick={clearAll} className="btn-danger text-white border-0">Clear All</Button>
        </div>
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Time</th><th>User</th><th>Action</th><th>IP Address</th><th>Type</th><th className="text-end">Action</th></tr></thead><tbody>
            {filtered.map(item => (
                <tr key={item.id}>
                    <td>{item.time}</td><td className="fw-bold">{item.user}</td><td>{item.action}</td><td>{item.ip}</td>
                    <td><Badge color={item.type==='Critical'?'danger':'info'}>{item.type}</Badge></td>
                    <td className="text-end"><button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger"><i className="bi bi-trash"></i></button></td>
                </tr>
            ))}
        </tbody></Table>
      </CardBody></Card>
    </div>
  );
};
export default LogReport;