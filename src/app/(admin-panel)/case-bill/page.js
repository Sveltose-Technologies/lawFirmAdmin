'use client';
import React from 'react';
import { Card, CardBody, CardTitle, Table, Button, Badge } from 'reactstrap';

const CaseBill = () => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <CardTitle tag="h5">Invoices & Billing</CardTitle>
          <Button color="success" size="sm"><i className="bi bi-receipt"></i> Generate Bill</Button>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Client</th>
              <th>Case Ref</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#INV-001</td>
              <td>Rahul Kumar</td>
              <td>CN-102</td>
              <td>₹ 15,000</td>
              <td>20 Dec 2024</td>
              <td><Badge color="danger">Unpaid</Badge></td>
              <td><Button size="sm" outline><i className="bi bi-printer"></i></Button></td>
            </tr>
            <tr>
              <td>#INV-002</td>
              <td>Amit Sharma</td>
              <td>CN-109</td>
              <td>₹ 5,000</td>
              <td>10 Dec 2024</td>
              <td><Badge color="success">Paid</Badge></td>
              <td><Button size="sm" outline><i className="bi bi-printer"></i></Button></td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
export default CaseBill;