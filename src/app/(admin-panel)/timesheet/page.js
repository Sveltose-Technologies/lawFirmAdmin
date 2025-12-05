'use client';
import React from 'react';
import { Card, CardBody, CardTitle, Table, Button } from 'reactstrap';

const Timesheet = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <CardTitle tag="h5">Lawyer Timesheet</CardTitle>
            <Button color="primary" size="sm">Log Time</Button>
          </div>

          <div className="table-responsive">
            <Table className="text-nowrap mt-3 align-middle" bordered>
              <thead className="table-light">
                <tr>
                  <th>Lawyer Name</th>
                  <th>Case Name</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Total Duration</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Adv. Amit</td>
                  <td>Rahul vs State</td>
                  <td>12 Dec</td>
                  <td>10:00 AM</td>
                  <td>12:00 PM</td>
                  <td className="fw-bold">2 Hrs</td>
                  <td>Hearing preparation</td>
                </tr>
                <tr>
                  <td>Adv. Priya</td>
                  <td>Consultation</td>
                  <td>12 Dec</td>
                  <td>02:00 PM</td>
                  <td>03:30 PM</td>
                  <td className="fw-bold">1.5 Hrs</td>
                  <td>Client Meeting</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Timesheet;