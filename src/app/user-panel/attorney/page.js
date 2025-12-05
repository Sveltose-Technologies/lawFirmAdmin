'use client';
import React, { useState } from "react";
import { Row, Col, Card, CardBody, Input, Button, Modal, ModalBody, FormGroup, Label } from "reactstrap";
import SidebarUser from "@/app/(admin-panel)/layouts/sidebars/vertical/SidebarUser";
// --- 1. TOAST IMPORTS ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AttorneyPage() {
  const goldColor = "#eebb5d";
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAttorney, setSelectedAttorney] = useState(null);
  const [bookingDate, setBookingDate] = useState("");

  const attorneys = [
    { id: 1, name: "Karthik", role: "Civil Lawyer", exp: "10", price: "500", img: "/images/users/user1.jpg", bio: "Experienced civil lawyer." },
    { id: 2, name: "Pepe Gonzale", role: "Family Lawyer", exp: "3", price: "12", img: "/images/users/user2.jpg", bio: "Specialist in family matters." },
    { id: 3, name: "Test Attorney", role: "Criminal Lawyer", exp: "5", price: "160", img: "/images/users/user3.jpg", bio: "Expert in criminal law." },
    { id: 4, name: "Tasnia Sharin", role: "Senior Lawyer", exp: "2", price: "300", img: "/images/users/user4.jpg", bio: "Corporate legal advisor." },
  ];

  const filteredData = attorneys.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleModal = (attorney = null) => {
    if(attorney) {
        setSelectedAttorney(attorney);
        setBookingDate(""); // Reset date on open
    }
    setModal(!modal);
  };

  // --- HANDLE BOOKING ---
  const handleConfirmBooking = () => {
    // --- RED TOAST VALIDATION ---
    if (!bookingDate) {
        toast.error("Please select a date for the appointment!", {
            theme: "colored",
            position: "top-center"
        });
        return;
    }

    // --- GREEN TOAST SUCCESS ---
    toast.success(`Appointment booked with ${selectedAttorney.name} on ${bookingDate}!`, {
        theme: "colored",
        position: "top-right"
    });
    setModal(false);
  };

  // --- HANDLE CHAT ---
  const handleChat = () => {
    toast.info("Connecting to secure chat...", {
        theme: "colored",
        position: "bottom-right",
        autoClose: 2000
    });
  };

  return (
    <div className="bg-light min-vh-100 p-3 p-lg-4 font-sans">
      
      {/* --- 2. TOAST CONTAINER --- */}
      <ToastContainer />

      <Row>
        <Col lg="3" className="d-none d-lg-block mb-4">
             <SidebarUser />
        </Col>

        <Col lg="9" md="12">
            <div className="d-lg-none mb-3"><SidebarUser /></div>

            {/* Header */}
            <Card className="border-0 shadow-sm rounded-4 mb-4">
                <CardBody className="p-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                    <h4 className="fw-bold mb-0">Attorneys</h4>
                    <div className="position-relative w-100" style={{ maxWidth: '300px' }}>
                        <Input 
                            placeholder="Search Attorney..." 
                            className="rounded-pill ps-3 pe-5 py-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                    </div>
                </CardBody>
            </Card>

            {/* Grid */}
            <Row>
                {filteredData.map((item) => (
                    <Col xl="4" md="6" sm="12" key={item.id} className="mb-4">
                        <Card className="border-0 shadow-sm rounded-4 h-100">
                            <CardBody className="p-4 d-flex flex-column">
                                <div className="d-flex align-items-center mb-3">
                                    <img src={item.img} alt={item.name} className="rounded-circle me-3" width="50" height="50" style={{objectFit:'cover'}} />
                                    <div>
                                        <h6 className="fw-bold mb-0 text-dark">{item.name}</h6>
                                        <small className="text-muted">{item.role}</small>
                                    </div>
                                </div>
                                <div className="mb-3 small flex-grow-1">
                                    <p className="mb-1 text-muted fw-bold">Experience: <span className="fw-normal">{item.exp} years</span></p>
                                    <p className="text-muted mb-0">{item.bio}</p>
                                </div>
                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                    <Button className="border-0 px-4 text-white small fw-bold" style={{ backgroundColor: goldColor }} onClick={() => toggleModal(item)}>
                                        Book Now
                                    </Button>
                                    <span className="fw-bold text-muted">${item.price}</span>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Col>
      </Row>

      {/* Modal */}
      <Modal isOpen={modal} toggle={() => toggleModal()} size="lg" centered>
        <ModalBody className="p-0">
            <button onClick={() => setModal(false)} className="position-absolute top-0 end-0 m-3 btn btn-sm btn-light rounded-circle shadow-sm" style={{zIndex: 10}}><i className="bi bi-x fs-5"></i></button>
            <Row className="g-0">
                <Col md="5" className="border-end p-4 bg-light">
                    <h5 className="fw-bold mb-4">Attorney Profile</h5>
                    {selectedAttorney && (
                        <>
                            <div className="d-flex align-items-center mb-4">
                                <img src={selectedAttorney.img} alt="User" className="rounded-circle me-3" width="60" height="60" style={{objectFit:'cover'}} />
                                <div><h6 className="fw-bold mb-0">{selectedAttorney.name}</h6><small className="text-muted">attorney@example.com</small></div>
                            </div>
                            <div className="mb-4">
                                <h6 className="fw-bold small mb-2">Experience: <span className="fw-normal text-muted">{selectedAttorney.exp} years</span></h6>
                                <h6 className="fw-bold small">Consultation Fee: <span className="fw-normal text-success fw-bold">${selectedAttorney.price}</span></h6>
                            </div>
                        </>
                    )}
                    <div onClick={handleChat} className="text-decoration-none small fw-bold text-primary cursor-pointer" style={{cursor: 'pointer'}}>
                        <i className="bi bi-chat-dots me-2"></i> Chat Now
                    </div>
                </Col>
                <Col md="7" className="p-4">
                    <h5 className="fw-bold mb-4">Select Date</h5>
                    
                    <FormGroup>
                        <Label className="small fw-bold text-muted">Appointment Date</Label>
                        <Input 
                            type="date" 
                            className="p-2"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                        />
                    </FormGroup>

                    <div className="alert alert-light border small text-muted mt-3">
                        <i className="bi bi-info-circle me-2"></i>
                        Available slots will be shown after date selection.
                    </div>

                    <Button 
                        block 
                        className="border-0 fw-bold mt-3 py-2" 
                        style={{ backgroundColor: goldColor }}
                        onClick={handleConfirmBooking}
                    >
                        Confirm Booking
                    </Button>
                </Col>
            </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}