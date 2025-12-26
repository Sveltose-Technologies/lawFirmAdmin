'use client';
import React, { useState } from "react";
import { 
  Row, Col, Card, CardBody, Table, Input, Button, Badge, Modal, ModalHeader, ModalBody 
} from "reactstrap";
import SidebarUser from "@/app/layouts/sidebars/vertical/SidebarUser";

// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CaseHistory() {
  const goldColor = "#eebb5d";

  // --- States ---
  const [modal, setModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // --- Mock Data ---
  const caseData = [
    { 
      id: 1, type: "Law Professional Advice", attorney: "Tasnia Sharin", date: "09 July 2025", time: "3:00 PM", status: "Declined", 
      email: "attorney@gmail.com", phone: "+8801786533455", img: "/images/users/user1.jpg",
      desc: "Search the world's information, including webpages...",
      history: "Client requested urgent consultation regarding property dispute..."
    },
    { 
      id: 2, type: "Law Professional Advice", attorney: "Tasnia Sharin", date: "09 July 2025", time: "4:00 PM", status: "Success",
      email: "attorney@gmail.com", phone: "+8801786533455", img: "/images/users/user1.jpg",
      desc: "Legal advice regarding corporate tax filing.",
      history: "Case resolved successfully in the first hearing."
    },
    { 
      id: 3, type: "ADVOCATE", attorney: "Tasnia Sharin", date: "06 October 2025", time: "17:10 AM", status: "Accepted",
      email: "attorney@gmail.com", phone: "+8801786533455", img: "/images/users/user1.jpg",
      desc: "Criminal defense consultation.",
      history: "Initial hearing scheduled."
    },
    { 
      id: 4, type: "Law Real-Estate", attorney: "Tasnia Sharin", date: "17 July 2025", time: "7:00 PM", status: "Pending",
      email: "attorney@gmail.com", phone: "+8801786533455", img: "/images/users/user1.jpg",
      desc: "Land dispute resolution.",
      history: "Waiting for court summons."
    },
    { 
      id: 5, type: "Family", attorney: "Tasnia Sharin", date: "18 August 2025", time: "3:00 PM", status: "Ongoing",
      email: "attorney@gmail.com", phone: "+8801786533455", img: "/images/users/user1.jpg",
      desc: "Child custody agreement.",
      history: "Documents submitted for review."
    },
  ];

  // --- Filter ---
  const filteredData = caseData.filter(item => 
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.attorney.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Status Badge Logic (Exact Colors) ---
  const getStatusBadge = (status) => {
    switch(status) {
        case "Declined": return <Badge color="danger" className="rounded-pill px-3 py-2" style={{backgroundColor: '#dc3545'}}>Declined</Badge>; // Red
        case "Success": return <Badge color="success" className="rounded-pill px-3 py-2" style={{backgroundColor: '#198754'}}>Success</Badge>; // Dark Green
        case "Accepted": return <Badge color="success" className="rounded-pill px-3 py-2" style={{backgroundColor: '#28a745'}}>Accepted</Badge>; // Light Green
        case "Ongoing": return <Badge color="primary" className="rounded-pill px-3 py-2" style={{backgroundColor: '#0d6efd'}}>Ongoing</Badge>; // Blue
        case "Pending": return <Badge className="rounded-pill px-3 py-2 text-white" style={{backgroundColor: '#ffc107'}}>Pending</Badge>; // Yellow
        default: return <Badge color="secondary">{status}</Badge>;
    }
  };

  const toggleModal = (item = null) => {
    if(item) {
        setSelectedCase(item);
        // --- INFO TOAST ---
        toast.info("Viewing Case Details", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            theme: "colored"
        });
    }
    setModal(!modal);
  };

  // --- PAGINATION TOAST ---
  const handlePagination = (action) => {
    toast.info(`${action} page clicked`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        theme: "colored"
    });
  };

  return (
    <div className="bg-light min-vh-100 p-3 p-lg-4 font-sans">
      
      {/* --- 2. TOAST CONTAINER --- */}
      <ToastContainer />

      <Row>
        {/* Sidebar Responsive Wrapper */}
        <Col lg="3" className="d-none d-lg-block mb-4"><SidebarUser /></Col>
        
        {/* Content Area */}
        <Col lg="9" md="12">
            {/* Mobile Hamburger (Visible only on small screens) */}
            <div className="d-lg-none mb-3"><SidebarUser /></div>
            
            <Card className="border-0 shadow-sm rounded-4">
                <CardBody className="p-4">
                    
                    {/* Header & Search */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                        <h4 className="fw-bold mb-0">Case History</h4>
                        <div className="d-flex gap-2 w-100 w-md-auto">
                            <div className="position-relative w-100">
                                <Input 
                                    placeholder="Search Cases..." 
                                    className="rounded-1 pe-5" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                            </div>
                            <Input type="select" style={{width: '80px'}}>
                                <option>All</option>
                            </Input>
                        </div>
                    </div>

                    {/* Responsive Table */}
                    <div className="table-responsive">
                        <Table hover className="align-middle text-nowrap">
                            <thead className="text-muted small border-bottom">
                                <tr>
                                    <th className="border-0 py-3">Case Type</th>
                                    <th className="border-0 py-3">Attorney Name</th>
                                    <th className="border-0 py-3">Appointment Date</th>
                                    <th className="border-0 py-3">Time</th>
                                    <th className="border-0 py-3">Case Status</th>
                                    <th className="border-0 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.id} style={{borderBottom: '1px solid #f9f9f9'}}>
                                        <td className="py-3 text-muted fw-bold">{item.type}</td>
                                        <td className="py-3 text-muted">{item.attorney}</td>
                                        <td className="py-3 text-muted">{item.date}</td>
                                        <td className="py-3 text-muted">{item.time}</td>
                                        <td className="py-3">{getStatusBadge(item.status)}</td>
                                        <td className="py-3">
                                            <Button 
                                                color="light" size="sm" className="rounded-circle border" 
                                                onClick={() => toggleModal(item)}
                                            >
                                                <i className="bi bi-eye text-muted"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    {/* Pagination with GOLD Buttons */}
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 border-top pt-3 gap-3">
                         <div className="small text-muted">
                            Show <Input type="select" bsSize="sm" className="d-inline-block mx-1" style={{width:'60px'}}><option>10</option></Input> 
                            Showing 1 to {filteredData.length} entries
                         </div>
                         <div className="d-flex gap-2">
                            <Button size="sm" className="border-0 fw-bold" style={{ backgroundColor: goldColor, color: '#fff' }} onClick={() => handlePagination('Previous')}>Previous</Button>
                            <Button size="sm" color="dark">1</Button>
                            <Button size="sm" className="border-0 fw-bold" style={{ backgroundColor: goldColor, color: '#fff' }} onClick={() => handlePagination('Next')}>Next</Button>
                         </div>
                    </div>

                </CardBody>
            </Card>
        </Col>
      </Row>

      {/* --- CASE DETAILS MODAL (Exact UI) --- */}
      <Modal isOpen={modal} toggle={() => toggleModal()} size="xl" centered>
        <ModalHeader toggle={() => toggleModal()} className="border-0 pb-0">
            <span className="fw-bold fs-5">Case Details</span>
        </ModalHeader>
        <ModalBody className="p-4 bg-light">
            {selectedCase && (
                <Row>
                    {/* 1. Attorney Info */}
                    <Col md="6" className="mb-4">
                        <Card className="border-0 shadow-sm rounded-3 h-100">
                            <CardBody className="p-4">
                                <h6 className="fw-bold mb-4 text-dark">Attorney Info</h6>
                                <div className="d-flex align-items-center mb-4">
                                    <img src={selectedCase.img} alt="Attorney" className="rounded-circle me-3" width="60" height="60" style={{objectFit:'cover'}}/>
                                    <div>
                                        <h6 className="fw-bold mb-0 text-primary">{selectedCase.attorney}</h6>
                                        <small className="text-muted">{selectedCase.email}</small>
                                    </div>
                                </div>
                                <div className="small text-muted">
                                    <p className="mb-2"><strong className="text-dark">Phone:</strong> {selectedCase.phone}</p>
                                    <p className="mb-2"><strong className="text-dark">Address:</strong> Khulna, Bangladesh</p>
                                    <p className="mb-0"><strong className="text-dark">Country:</strong> BD</p>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    {/* 2. Case Info */}
                    <Col md="6" className="mb-4">
                        <Card className="border-0 shadow-sm rounded-3 h-100">
                            <CardBody className="p-4">
                                <h6 className="fw-bold mb-4 text-dark">Case Information</h6>
                                <p className="small mb-3"><strong className="text-dark">Case Type:</strong> {selectedCase.type}</p>
                                <div className="mb-3"><strong className="text-dark small d-block mb-1">Description:</strong><p className="text-muted small mb-0">{selectedCase.desc}</p></div>
                                <div className="mt-3"><strong className="text-dark small me-2">Status:</strong>{getStatusBadge(selectedCase.status)}</div>
                            </CardBody>
                        </Card>
                    </Col>
                    {/* 3. Booking Details */}
                    <Col md="6" className="mb-4">
                        <Card className="border-0 shadow-sm rounded-3 h-100">
                            <CardBody className="p-4">
                                <h6 className="fw-bold mb-4 text-dark">Booking Details</h6>
                                <p className="small mb-2"><strong className="text-dark">Date:</strong> {selectedCase.date}</p>
                                <p className="small mb-0"><strong className="text-dark">Time:</strong> {selectedCase.time}</p>
                            </CardBody>
                        </Card>
                    </Col>
                    {/* 4. Evidence */}
                    <Col md="6" className="mb-4">
                        <Card className="border-0 shadow-sm rounded-3 h-100">
                            <CardBody className="p-4">
                                <h6 className="fw-bold mb-4 text-dark">Evidence: N/A</h6>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )}
        </ModalBody>
      </Modal>
    </div>
  );
}