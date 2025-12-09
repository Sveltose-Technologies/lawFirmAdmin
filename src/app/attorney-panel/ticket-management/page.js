'use client';
import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Table, Button, Input, Label, Badge, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TicketManagement() {
  const GOLD = "#eebb5d";
  const [activeTab, setActiveTab] = useState('1');

  // Tickets State
  const [tickets, setTickets] = useState([
    { id: 101, title: "Upload Error", category: "Technical", note: "Pending Review", status: "In Progress" },
    { id: 102, title: "Billing Issue", category: "Billing", note: "Resolved", status: "Closed" }
  ]);

  const [form, setForm] = useState({ title: '', category: 'Technical', desc: '' });

  const handleCreateTicket = () => {
    if(!form.title || !form.desc) return toast.error("Please fill all details", {theme: "colored"});
    
    const newTicket = {
        id: Math.floor(Math.random() * 1000),
        title: form.title,
        category: form.category,
        note: "Submitted just now",
        status: "Open"
    };

    setTickets([newTicket, ...tickets]);
    toast.success("Ticket Created Successfully!", {theme: "colored"});
    setForm({ title: '', category: 'Technical', desc: '' });
    setActiveTab('2'); // Switch to history tab
  };

  const handleDelete = (id) => {
      setTickets(tickets.filter(t => t.id !== id));
      toast.info("Ticket Deleted", {theme: "colored"});
  };

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <h3 className="mb-4 fw-bold" style={{ color: GOLD }}>Ticket Management</h3>

      <Nav tabs className="mb-3 border-bottom-0">
        <NavItem>
            <NavLink className={activeTab === '1' ? 'fw-bold border shadow-sm' : ''} 
                    style={{ backgroundColor: activeTab === '1' ? GOLD : '#fff', color: activeTab === '1' ? '#fff' : '#333', cursor:'pointer', borderRadius: '5px 5px 0 0' }}
                    onClick={() => setActiveTab('1')}>
            Create Ticket
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink className={activeTab === '2' ? 'fw-bold border shadow-sm ms-2' : 'ms-2'} 
                    style={{ backgroundColor: activeTab === '2' ? GOLD : '#fff', color: activeTab === '2' ? '#fff' : '#333', cursor:'pointer', borderRadius: '5px 5px 0 0' }}
                    onClick={() => setActiveTab('2')}>
            Ticket History
            </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        
        {/* --- CREATE TICKET --- */}
        <TabPane tabId="1">
            <Row>
                <Col sm="12">
                    <Card className="border-0 shadow-sm w-100">
                        <CardBody>
                            <h5 className="fw-bold mb-4">New Support Request</h5>
                            <Row>
                                <Col md="6" className="mb-3">
                                    <Label className="fw-bold">Title</Label>
                                    <Input value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />
                                </Col>
                                <Col md="6" className="mb-3">
                                    <Label className="fw-bold">Category</Label>
                                    <Input type="select" value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})}>
                                        <option>Technical Issue</option>
                                        <option>Billing Query</option>
                                        <option>Feature Request</option>
                                    </Input>
                                </Col>
                                <Col md="12" className="mb-3">
                                    <Label className="fw-bold">Description</Label>
                                    <Input type="textarea" rows="4" value={form.desc} onChange={(e)=>setForm({...form, desc:e.target.value})} />
                                </Col>
                                <Col md="12">
                                    <Button style={{backgroundColor: GOLD, border: 'none'}} className="px-4" onClick={handleCreateTicket}>
                                        Submit Ticket
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </TabPane>

        {/* --- TICKET HISTORY --- */}
        <TabPane tabId="2">
            <Row>
                <Col sm="12">
                    <Card className="border-0 shadow-sm w-100">
                        <CardBody>
                            <Table responsive hover className="align-middle w-100">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Notes</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((t) => (
                                        <tr key={t.id}>
                                            <td>#{t.id}</td>
                                            <td className="fw-bold">{t.title}</td>
                                            <td>{t.category}</td>
                                            <td className="text-muted">{t.note}</td>
                                            <td>
                                                <Badge style={{backgroundColor: t.status === 'Closed' ? 'green' : GOLD}}>{t.status}</Badge>
                                            </td>
                                            <td>
                                                <Button size="sm" color="danger" outline onClick={()=>handleDelete(t.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
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