'use client';
import React from 'react';
import { Card, CardBody, CardTitle, Badge } from 'reactstrap';

const TaskCalendar = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" className="mb-4">Task Calendar</CardTitle>
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          Calendar View Integration (FullCalendar or React-Big-Calendar) would go here.
        </div>
        
        {/* Simple List view as placeholder */}
        <h6 className="mt-4">Upcoming Schedule</h6>
        <div className="list-group">
            <div className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <h6 className="mb-0">Court Hearing - Room 302</h6>
                    <small className="text-muted">10:00 AM - Today</small>
                </div>
                <Badge color="danger">Urgent</Badge>
            </div>
            <div className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <h6 className="mb-0">Client Meeting with Mr. Sharma</h6>
                    <small className="text-muted">02:00 PM - Tomorrow</small>
                </div>
                <Badge color="primary">Meeting</Badge>
            </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default TaskCalendar;