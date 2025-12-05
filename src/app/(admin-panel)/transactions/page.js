'use client';
import React from 'react';
import { Card, CardBody, CardTitle, Table, Badge } from 'reactstrap';

const Transactions = () => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between mb-3">
             <CardTitle tag="h5">Financial Transactions / Fees</CardTitle>
            
        </div>
        <Table hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Trans ID</th>
              <th>Date</th>
              <th>Method</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#TXN-8877</td>
              <td>12 Dec 2024</td>
              <td>UPI</td>
              <td>Case Fee Payment</td>
              <td className="text-success">+ ₹ 10,000</td>
              <td><Badge color="success">Success</Badge></td>
            </tr>
            <tr>
              <td>#TXN-8878</td>
              <td>13 Dec 2024</td>
              <td>Bank Transfer</td>
              <td>Platform Commission</td>
              <td className="text-danger">- ₹ 500</td>
              <td><Badge color="success">Deducted</Badge></td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
export default Transactions;