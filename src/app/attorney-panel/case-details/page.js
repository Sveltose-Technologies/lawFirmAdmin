'use client';
import React, { useState } from 'react';
import { Card, CardBody, Row, Col, Input, Button, Table, Nav, NavItem, NavLink, TabContent, TabPane, Label } from 'reactstrap';

export default function CaseDetails() {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <div>
      <h3 className="mb-4 fw-bold">Case Details</h3>

      {/* --- TABS: OPEN / CLOSED --- */}
      <Nav tabs className="mb-3">
        <NavItem>
          <NavLink className={activeTab === '1' ? 'active fw-bold' : ''} onClick={() => setActiveTab('1')} style={{cursor:'pointer'}}>
            Open Cases
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab === '2' ? 'active fw-bold' : ''} onClick={() => setActiveTab('2')} style={{cursor:'pointer'}}>
            Closed Cases
          </NavLink>
        </NavItem>
      </Nav>

      <Card className="border-0 shadow-sm mb-4">
        <CardBody>
            {/* --- SEARCH DROPDOWNS (Requirement) --- */}
            <Row className="g-3 mb-4">
                <Col md="3">
                    <Label className="small fw-bold">Case Number</Label>
                    <Input type="select"><option>Select Case No</option></Input>
                </Col>
                <Col md="3">
                    <Label className="small fw-bold">Practice Area</Label>
                    <Input type="select"><option>Select Area</option></Input>
                </Col>
                <Col md="3">
                    <Label className="small fw-bold">Attorney Name</Label>
                    <Input type="select"><option>Select Attorney</option></Input>
                </Col>
                <Col md="3">
                    <Label className="small fw-bold">Case Stage</Label>
                    <Input type="select"><option>Select Stage</option></Input>
                </Col>
                <Col md="12" className="text-end">
                    <Button color="primary"><i className="bi bi-search me-2"></i>Search</Button>
                </Col>
            </Row>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    {/* --- OPEN CASES TABLE --- */}
                    <div className="table-responsive">
                        <Table bordered hover className="align-middle">
                            <thead className="table-light small">
                                <tr>
                                    <th>Case Type</th>
                                    <th>Case No</th>
                                    <th>First Party</th>
                                    <th>Opposite Party</th>
                                    <th>City/State</th>
                                    <th>Court No</th>
                                    <th>Stage</th>
                                    <th>Next Hearing</th>
                                    <th>Docs</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Criminal</td>
                                    <td>CN-2024-001</td>
                                    <td>Rahul Kumar</td>
                                    <td>State of Delhi</td>
                                    <td>Delhi, DL</td>
                                    <td>Room 402</td>
                                    <td>Hearing</td>
                                    <td>15 Dec 2024</td>
                                    <td><i className="bi bi-file-earmark-pdf text-danger fs-5"></i></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </TabPane>
                <TabPane tabId="2">
                     <p className="text-muted p-3">No closed cases found matching criteria.</p>
                </TabPane>
            </TabContent>
        </CardBody>
      </Card>

      {/* --- EXTRA INPUTS (Requirement: Transferred & Upload) --- */}
      <Card className="border-0 shadow-sm">
        <CardBody>
            <h5 className="fw-bold mb-3">Additional Case Info</h5>
            <Row>
                <Col md="6" className="mb-3">
                    <Label className="fw-bold">If case transferred from previous lawyer/court</Label>
                    <Input type="textarea" placeholder="Enter previous lawyer or court details here..." />
                </Col>
                <Col md="6" className="mb-3">
                    <Label className="fw-bold">Upload Case Documents (Attorney/Client/Staff)</Label>
                    <Input type="file" multiple />
                    <small className="text-muted">Identity Proofs (PAN, Aadhaar) can also be uploaded here.</small>
                </Col>
                <Col md="12">
                    <Button color="success">Save Details</Button>
                </Col>
            </Row>
        </CardBody>
      </Card>
    </div>
  );
}