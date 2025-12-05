'use client';
import React, { useState } from "react";
import { 
  Row, Col, Card, CardBody, Table, Badge, Button, Modal, ModalHeader, ModalBody, Input 
} from "reactstrap";
import SidebarUser from "@/app/(admin-panel)/layouts/sidebars/vertical/SidebarUser";
// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Appointments() {
  const goldColor = "#eebb5d";
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const appointmentData = [
    { id: 1, type: "Criminal Law", attorney: "Karthik", status: "Confirmed", date: "19 Nov 2025", time: "12.00PM", img: "/images/users/user1.jpg", desc: "Bail hearing req." },
    { id: 2, type: "Family", attorney: "Tasnia Sharin", status: "Pending", date: "16 July 2025", time: "8.00PM", img: "/images/users/user2.jpg", desc: "Custody battle." },
    { id: 3, type: "Company Formation", attorney: "Tasnia Sharin", status: "Completed", date: "12 July 2025", time: "10.00PM", img: "/images/users/user2.jpg", desc: "LLC Docs." },
  ];

  const toggleModal = (item) => { 
    setSelectedItem(item); 
    setModal(!modal); 
  };

  // --- HANDLE SEND REQUEST ---
  const handleSendRequest = () => {
    // Green Toast
    toast.success("Case Request Sent Successfully!", {
        theme: "colored",
        position: "top-right"
    });
    setModal(false);
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

  const getStatusBadge = (status) => {
    switch(status) {
        case "Confirmed": return <Badge className="rounded-pill px-3 py-2" style={{backgroundColor: '#6c757d'}}>Confirmed</Badge>;
        case "Pending": return <Badge className="rounded-pill px-3 py-2 text-white" style={{backgroundColor: '#ffc107'}}>Pending</Badge>;
        case "Completed": return <Badge className="rounded-pill px-3 py-2" style={{backgroundColor: '#198754'}}>Completed</Badge>;
        default: return <Badge color="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="bg-light min-vh-100 p-3 p-lg-4 font-sans">
      
      {/* --- 2. TOAST CONTAINER --- */}
      <ToastContainer />

      <Row>
        <Col lg="3" className="d-none d-lg-block mb-4"><SidebarUser /></Col>
        <Col lg="9" md="12">
            <div className="d-lg-none mb-3"><SidebarUser /></div>
            
            <Card className="border-0 shadow-sm rounded-4">
                <CardBody className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-bold mb-0">Appointment</h4>
                        <Input type="select" style={{width: '80px', borderRadius: '8px'}}><option>All</option></Input>
                    </div>

                    <div className="table-responsive">
                        <Table hover className="align-middle text-nowrap">
                            <thead className="text-muted small border-bottom">
                                <tr>
                                    <th className="border-0 py-3">Case Type</th><th className="border-0 py-3">Attorney</th><th className="border-0 py-3">Booking Status</th><th className="border-0 py-3">Date</th><th className="border-0 py-3">Time</th><th className="border-0 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointmentData.map((item) => (
                                    <tr key={item.id} style={{borderBottom: '1px solid #f9f9f9'}}>
                                        <td className="py-3 text-muted">{item.type}</td>
                                        <td className="py-3 text-muted">{item.attorney}</td>
                                        <td className="py-3">{getStatusBadge(item.status)}</td>
                                        <td className="py-3 text-muted">{item.date}</td>
                                        <td className="py-3 text-muted">{item.time}</td>
                                        <td className="py-3"><Button color="light" size="sm" className="rounded-circle border" onClick={() => toggleModal(item)}><i className="bi bi-eye text-muted"></i></Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    {/* Pagination with GOLD Buttons */}
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 border-top pt-3 gap-3">
                         <div className="small text-muted">
                            Show <Input type="select" bsSize="sm" className="d-inline-block mx-1" style={{width:'60px'}}><option>10</option></Input> Entries
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

      {/* Modal - Exact UI */}
      <Modal isOpen={modal} toggle={() => setModal(!modal)} size="lg" centered>
        <ModalHeader toggle={() => setModal(!modal)} className="border-0 pb-0"><span className="fw-bold fs-5">Appointment Details</span></ModalHeader>
        <ModalBody className="p-4">
            {selectedItem && (
                <>
                <Row>
                    <Col md="6" className="mb-4">
                        <Card className="border shadow-sm rounded-3 h-100">
                            <CardBody className="p-4">
                                <h6 className="fw-bold mb-3 text-dark">Attorney Info</h6>
                                <div className="d-flex align-items-center mb-3"><img src={selectedItem.img} className="rounded-circle me-3" width="50" height="50"/><div><h6 className="fw-bold mb-0">{selectedItem.attorney}</h6><small>Senior Lawyer</small></div></div>
                                <div className="small text-muted"><p>Email: attorney@gmail.com</p><p>Status: {getStatusBadge(selectedItem.status)}</p></div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6" className="mb-4">
                        <Card className="border shadow-sm rounded-3 h-100">
                            <CardBody className="p-4">
                                <h6 className="fw-bold mb-3 text-dark">Case Info</h6>
                                <p className="small"><strong className="text-dark">Type:</strong> {selectedItem.type}</p>
                                <p className="small"><strong className="text-dark">Desc:</strong> {selectedItem.desc}</p>
                                <p className="small text-muted"><i className="bi bi-file-earmark-pdf"></i> Download PDF</p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <div className="mt-2">
                    <Button 
                        className="border-0 px-4 py-2 text-white fw-bold shadow-sm" 
                        style={{ backgroundColor: goldColor, borderRadius: '6px' }}
                        onClick={handleSendRequest}
                    >
                        Send Case Request
                    </Button>
                </div>
                </>
            )}
        </ModalBody>
      </Modal>
    </div>
  );
}