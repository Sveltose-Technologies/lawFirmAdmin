'use client';
import React from 'react';
import { Card, CardBody, CardTitle, Table, Progress } from 'reactstrap';

const CaseLoad = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" className="mb-4">Attorney Case Load Analysis</CardTitle>
        <Table responsive className="align-middle">
          <thead>
            <tr>
              <th>Attorney Name</th>
              <th>Active Cases</th>
              <th>Pending Tasks</th>
              <th>Workload Capacity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Adv. Amit Sharma</td>
              <td>12</td>
              <td>5</td>
              <td>
                <div className="d-flex align-items-center">
                    <span className="me-2">80%</span>
                    <Progress value={80} color="danger" style={{height: '6px', width: '100px'}} />
                </div>
              </td>
            </tr>
            <tr>
              <td>Adv. Priya Verma</td>
              <td>5</td>
              <td>2</td>
              <td>
                <div className="d-flex align-items-center">
                    <span className="me-2">40%</span>
                    <Progress value={40} color="success" style={{height: '6px', width: '100px'}} />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
export default CaseLoad;