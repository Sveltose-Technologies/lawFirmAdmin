'use client';
import React from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

const Logs = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" className="mb-3">Activity Logs</CardTitle>
        <Table striped responsive size="sm">
          <thead>
            <tr>
              <th>Time</th>
              <th>User</th>
              <th>Activity</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10:05 AM</td>
              <td>Admin</td>
              <td>Updated Case #CN102 Status</td>
              <td>192.168.1.1</td>
            </tr>
            <tr>
              <td>09:30 AM</td>
              <td>Adv. Amit</td>
              <td>Uploaded Document &apos;Bail.pdf&apos;</td>
              <td>192.168.1.15</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
export default Logs;
