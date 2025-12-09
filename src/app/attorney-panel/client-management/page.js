'use client';
import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button, Input, Label, Nav, NavItem, NavLink, TabContent, TabPane, Badge } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientManagement() {
  const GOLD = "#eebb5d";
  const [activeTab, setActiveTab] = useState('1');

  // Dummy Data for Clients
  const [clients, setClients] = useState([
    { id: 1, name: "Rahul Sharma", clientId: "CL-101", phone: "9876543210", type: "Civil", title: "Property Dispute", date: "12 Dec 2024", status: "Active" },
    { id: 2, name: "Priya Verma", clientId: "CL-102", phone: "9898989898", type: "Criminal", title: "Fraud Case", date: "15 Dec 2024", status: "Pending" }
  ]);

  // State for Lead Form
  const [leads, setLeads] = useState([]);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', type: 'Civil' });

  // --- ACTIONS ---
  const handleDelete = (id) => {
    if(confirm("Are you sure you want to remove this client?")) {
      setClients(clients.filter(c => c.id !== id));
      toast.error("Client Removed", { theme: "colored" });
    }
  };

  const handleAddLead = () => {
    if(!leadForm.name || !leadForm.phone) return toast.warning("Please fill required fields");
    const newLead = { ...leadForm, id: Date.now(), status: "New" };
    setLeads([...leads, newLead]);
    setLeadForm({ name: '', phone: '', type: 'Civil' }); // Reset Form
    toast.success("Lead Added Successfully!", { theme: "colored" });
  };

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <h3 className="mb-4 fw-bold" style={{ color: GOLD }}>Client Management</h3>

      <Nav tabs className="mb-3 border-bottom-0">
        <NavItem>
          <NavLink className={activeTab === '1' ? 'fw-bold border shadow-sm' : ''} 
                   style={{ backgroundColor: activeTab === '1' ? GOLD : '#fff', color: activeTab === '1' ? '#fff' : '#333', cursor:'pointer', borderRadius: '5px 5px 0 0' }}
                   onClick={() => setActiveTab('1')}>
            Clients List
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab === '2' ? 'fw-bold border shadow-sm ms-2' : 'ms-2'} 
                   style={{ backgroundColor: activeTab === '2' ? GOLD : '#fff', color: activeTab === '2' ? '#fff' : '#333', cursor:'pointer', borderRadius: '5px 5px 0 0' }}
                   onClick={() => setActiveTab('2')}>
            Lead Management
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        
        {/* --- TAB 1: CLIENTS --- */}
        <TabPane tabId="1">
            <Card className="border-0 shadow-sm">
                <CardBody>
                    <Table responsive hover className="align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Client ID</th>
                                <th>Phone</th>
                                <th>Case Type</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Proof of Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.id}>
                                    <td className="fw-bold">{client.name}</td>
                                    <td>{client.clientId}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.type}</td>
                                    <td>{client.date}</td>
                                    <td><Badge style={{backgroundColor: client.status === 'Active' ? 'green' : '#ffc107', color: '#fff'}}>{client.status}</Badge></td>
                                    <td>
                                        <a href="#" style={{ color: GOLD, textDecoration: 'none' }} onClick={(e)=> {e.preventDefault(); toast.info("Viewing Document...")}}>
                                            <i className="bi bi-eye me-1"></i> View Doc
                                        </a>
                                    </td>
                                    <td>
                                        <Button size="sm" className="me-1 border-0" style={{backgroundColor: GOLD}} onClick={()=> toast.info("Edit Functionality")}>
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                        <Button size="sm" color="danger" onClick={() => handleDelete(client.id)}>
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {clients.length === 0 && <tr><td colSpan="8" className="text-center p-3">No Clients Found</td></tr>}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </TabPane>

        {/* --- TAB 2: LEADS --- */}
        <TabPane tabId="2">
            <Row>
                <Col md="5">
                    <Card className="border-0 shadow-sm mb-3">
                        <CardBody>
                            <h5 className="fw-bold mb-3">Enter New Lead</h5>
                            <Row>
                                <Col md="12" className="mb-3">
                                    <Label>Client Name</Label>
                                    <Input value={leadForm.name} onChange={(e)=> setLeadForm({...leadForm, name: e.target.value})} />
                                </Col>
                                <Col md="12" className="mb-3">
                                    <Label>Phone Number</Label>
                                    <Input type="tel" value={leadForm.phone} onChange={(e)=> setLeadForm({...leadForm, phone: e.target.value})} />
                                </Col>
                                <Col md="12" className="mb-3">
                                    <Label>Case Type</Label>
                                    <Input type="select" value={leadForm.type} onChange={(e)=> setLeadForm({...leadForm, type: e.target.value})}>
                                        <option>Civil</option>
                                        <option>Criminal</option>
                                        <option>Corporate</option>
                                    </Input>
                                </Col>
                                <Col md="12">
                                    <Button className="w-100 border-0" style={{backgroundColor: GOLD}} onClick={handleAddLead}>Add Lead</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="7">
                     <Card className="border-0 shadow-sm">
                        <CardBody>
                            <h5 className="fw-bold mb-3">Recent Leads</h5>
                            <Table responsive size="sm">
                                <thead><tr><th>Name</th><th>Phone</th><th>Type</th><th>Status</th></tr></thead>
                                <tbody>
                                    {leads.map((l, i) => (
                                        <tr key={i}>
                                            <td>{l.name}</td>
                                            <td>{l.phone}</td>
                                            <td>{l.type}</td>
                                            <td><Badge color="secondary">New</Badge></td>
                                        </tr>
                                    ))}
                                    {leads.length === 0 && <tr><td colSpan="4" className="text-center text-muted">No new leads yet.</td></tr>}
                                </tbody>
                            </Table>
                        </CardBody>
                     </Card>
                </Col>
            </Row>
        </TabPane>

      </TabContent>
    </div>
  );
}