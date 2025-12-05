'use client';
import React from 'react';
import { Card, CardBody, CardTitle, Table, Button } from 'reactstrap';

const LawyerAvailability = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" className="mb-3">Lawyer Availability Slots</CardTitle>
        <Table bordered responsive className="text-center">
          <thead className="table-light">
            <tr>
              <th>Lawyer</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold text-start">Adv. Amit</td>
              <td className="bg-success text-white">10am - 4pm</td>
              <td className="bg-success text-white">10am - 4pm</td>
              <td className="bg-danger text-white">Court</td>
              <td className="bg-success text-white">10am - 2pm</td>
              <td className="bg-success text-white">10am - 4pm</td>
            </tr>
            <tr>
              <td className="fw-bold text-start">Adv. Priya</td>
              <td className="bg-danger text-white">Leave</td>
              <td className="bg-success text-white">12pm - 6pm</td>
              <td className="bg-success text-white">12pm - 6pm</td>
              <td className="bg-success text-white">12pm - 6pm</td>
              <td className="bg-success text-white">12pm - 6pm</td>
            </tr>
          </tbody>
        </Table>
        <Button className="mt-3" color="primary">Update Slots</Button>
      </CardBody>
    </Card>
  );
};
export default LawyerAvailability;