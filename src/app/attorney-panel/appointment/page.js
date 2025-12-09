'use client';
import React from 'react';
import { Card, CardBody, Table, Button, Badge } from 'reactstrap';

export default function Appointments() {
  return (
    <div>
      <h3 className="mb-4 fw-bold">Appointment History</h3>

      {/* --- TABLE 1: NEW / UPCOMING APPOINTMENTS --- */}
      <Card className="border-0 shadow-sm mb-4">
        <CardBody>
            <div className="d-flex justify-content-between mb-3">
                <h5 className="fw-bold">New & Upcoming Appointments</h5>
                <Button color="primary" size="sm">+ Schedule New</Button>
            </div>
            
            <Table responsive bordered hover>
                <thead className="table-light">
                    <tr>
                        <th>Attorney Name</th>
                        <th>Case Type</th>
                        <th>Case Title</th>
                        <th>Date & Time</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Adv. John Doe</td>
                        <td>Civil</td>
                        <td>Property Dispute</td>
                        <td>12 Dec, 10:00 AM</td>
                        <td>First Hearing Prep</td>
                        <td><Badge color="primary">Scheduled</Badge></td>
                        <td>
                            <Button size="sm" color="warning" className="me-1" title="Reschedule"><i className="bi bi-calendar-event"></i></Button>
                            <Button size="sm" color="danger" title="Cancel"><i className="bi bi-x-circle"></i></Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </CardBody>
      </Card>

      {/* --- TABLE 2: APPOINTMENT HISTORY (Desc Order) --- */}
      <Card className="border-0 shadow-sm">
        <CardBody>
            <h5 className="fw-bold mb-3">Past Appointments (History)</h5>
            <Table responsive bordered className="text-muted">
                <thead className="table-light">
                    <tr>
                        <th>Attorney Name</th>
                        <th>Case Type</th>
                        <th>Case Title</th>
                        <th>Date & Time</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Adv. John Doe</td>
                        <td>Civil</td>
                        <td>Property Dispute</td>
                        <td>10 Nov, 11:00 AM</td>
                        <td>Client Meeting</td>
                        <td><Badge color="secondary">Completed</Badge></td>
                    </tr>
                </tbody>
            </Table>
        </CardBody>
      </Card>
    </div>
  );
}