'use client';
import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import SidebarUser from "@/app/layouts/sidebars/vertical/SidebarUser";

export default function UserDashboard() {
  const goldColor = "#eebb5d";

  const stats = [
    { title: "Total Appointment", count: "33", icon: "bi-hammer", color: "#198754" },
    { title: "Pending Cases", count: "2", icon: "bi-arrow-down-up", color: "#6c757d" },
    { title: "Total Cases", count: "8", icon: "bi-briefcase-fill", color: "#0d6efd" } 
  ];

  return (
    <div className="bg-light min-vh-100 p-3 p-lg-4 font-sans">
      <Row>
        {/* Sidebar: Visible on Desktop Only */}
        <Col lg="3" className="d-none d-lg-block mb-4">
             <SidebarUser />
        </Col>

        {/* Content: Full width on Mobile, 9 cols on Desktop */}
        <Col lg="9" md="12" sm="12">
            
            {/* Mobile Sidebar Toggle is inside SidebarUser component, but we need to render it for mobile */}
            <div className="d-lg-none mb-3">
                 <SidebarUser />
            </div>

            {/* Stats */}
            <Row className="mb-4">
                {stats.map((stat, idx) => (
                    <Col xl="4" md="6" sm="12" key={idx} className="mb-3">
                        <Card className="border-0 shadow-sm rounded-4 h-100">
                            <CardBody className="p-4 d-flex align-items-center">
                                <div 
                                    className="rounded-circle d-flex align-items-center justify-content-center me-3 text-white flex-shrink-0"
                                    style={{ width: '50px', height: '50px', backgroundColor: stat.color }}
                                >
                                    <i className={`bi ${stat.icon} fs-4`}></i>
                                </div>
                                <div>
                                    <small className="text-muted fw-bold d-block mb-1">{stat.title}</small>
                                    <h3 className="mb-0 fw-bold" style={{ color: stat.color }}>{stat.count}</h3>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Bottom Panels */}
            <Row>
                <Col md="6" className="mb-4">
                    <h5 className="fw-bold mb-3 text-dark">Upcoming Appointment</h5>
                    <Card className="border-0 shadow-sm rounded-4 bg-white" style={{ minHeight: '250px' }}>
                        <CardBody className="d-flex flex-column align-items-center justify-content-center text-center p-4 p-lg-5 bg-light rounded-4 m-2">
                            <div className="mb-3 opacity-50"><i className="bi bi-inbox fs-1 text-secondary"></i></div>
                            <h6 className="text-muted">No Upcoming Date</h6>
                        </CardBody>
                    </Card>
                </Col>

                <Col md="6" className="mb-4">
                    <h5 className="fw-bold mb-3 text-dark">Recent Message</h5>
                    <Card className="border-0 shadow-sm rounded-4 bg-white" style={{ minHeight: '250px' }}>
                        <CardBody className="bg-light rounded-4 m-2 d-flex align-items-center p-4">
                            <div className="me-3">
                                <div style={{width:'60px', height:'60px', borderRadius:'50%', backgroundColor:'#ddd', overflow:'hidden', flexShrink: 0}}>
                                    <img src="/images/users/user2.jpg" alt="User" style={{ width:'100%', height:'100%', objectFit: 'cover' }} />
                                </div>
                            </div>
                            <div>
                                <h6 className="fw-bold mb-1 text-dark">Tasnia Sharin</h6>
                                <p className="text-muted mb-1 small">Send you a message</p>
                                <small className="text-secondary" style={{fontSize: '11px'}}>a month ago</small>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Col>
      </Row>
    </div>
  );
}