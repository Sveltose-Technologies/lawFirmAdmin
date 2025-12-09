'use client';
import React from 'react';
import { Row, Col, Card, CardBody, Table, Badge, Button } from 'reactstrap';

export default function AttorneyDashboard() {
  
  // Requirement: Click on Success Cases shows details
  const handleSuccessClick = () => {
    alert("Displaying All Success Cases Details...");
  };

  const stats = [
    { title: "Success Cases", count: "8", icon: "bi bi-check-circle-fill", color: "success", action: handleSuccessClick, clickable: true },
    { title: "Total Cases (Open)", count: "15", icon: "bi bi-briefcase", color: "primary" },
    { title: "Total Cases (Closed)", count: "12", icon: "bi bi-archive", color: "secondary" },
    { title: "Total Appointments", count: "45", icon: "bi bi-calendar-check", color: "info" },
  ];

  return (
    <div>
      <h3 className="mb-4 fw-bold">Attorney Dashboard</h3>

      {/* --- STATS SECTION --- */}
      <Row>
        {stats.map((item, index) => (
          <Col sm="6" lg="3" key={index} className="mb-4">
            <Card 
                className={`border-0 shadow-sm h-100 ${item.clickable ? 'cursor-pointer' : ''}`} 
                onClick={item.action ? item.action : null}
                style={{ cursor: item.clickable ? 'pointer' : 'default' }}
            >
              <CardBody className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted text-uppercase small fw-bold">{item.title}</h6>
                    <h2 className="mb-0 fw-bold">{item.count}</h2>
                  </div>
                  <div className={`fs-1 text-${item.color}`}>
                    <i className={item.icon}></i>
                  </div>
                </div>
                {item.clickable && <small className="text-primary mt-2 d-block">Click to view details</small>}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {/* --- UPCOMING APPOINTMENTS --- */}
        <Col lg="8" className="mb-4">
          <Card className="border-0 shadow-sm">
            <CardBody>
              <h5 className="fw-bold mb-3">Upcoming Appointments & Case Overview</h5>
              <Table responsive hover>
                <thead className="table-light">
                  <tr>
                    <th>Client Name</th>
                    <th>Case Type</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rahul Sharma</td>
                    <td>Civil</td>
                    <td>12 Dec, 10:00 AM</td>
                    <td><Badge color="warning">Open</Badge></td>
                  </tr>
                  <tr>
                    <td>Amit Verma</td>
                    <td>Criminal</td>
                    <td>14 Dec, 02:00 PM</td>
                    <td><Badge color="success">Confirmed</Badge></td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>

        {/* --- MESSAGES & LEAD FOLLOW UP --- */}
        <Col lg="4" className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <CardBody>
              <h5 className="fw-bold mb-3">Follow up & Messages</h5>
              
              <div className="mb-3 border-bottom pb-2">
                <strong className="d-block">New Lead: Priya Singh</strong>
                <small className="text-muted">Inquired about divorce case pricing.</small>
                <div className="mt-2">
                    <Button size="sm" color="primary" outline className="me-2">Call</Button>
                    <Button size="sm" color="success" outline>Message</Button>
                </div>
              </div>

              <div className="mb-3">
                <strong className="d-block">Message from Admin</strong>
                <small className="text-muted">Please update case #1023 documents.</small>
              </div>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}