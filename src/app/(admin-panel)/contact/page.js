'use client';
import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, Table, Button, Badge
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import authService from '@/services/authService';

const ContactUsPage = () => {
  const GOLD = '#eebb5d';
  const LIGHT_GOLD = '#fdf8ef';

  const [dataList, setDataList] = useState([]);

  // Page load par data fetch karna
  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const res = await authService.getAllContacts();
    if (res.success) {
      // Backend response se data nikal kar state mein daalna
      setDataList(Array.isArray(res.data.data) ? res.data.data : []);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this inquiry?")) {
      const res = await authService.deleteContact(id);
      if (res.success) {
        toast.success("Inquiry Deleted!");
        fetchData();
      }
    }
  };

  return (
    <div className="p-4 min-vh-100" style={{ backgroundColor: '#f9f9f9' }}>
      <ToastContainer theme="colored" />
      
      {/* Header Area */}
      <div className="mb-4">
        <h4 className="fw-bold mb-0" style={{ color: '#333' }}>Contact Inquiries</h4>
        <p className="text-muted small">Website se aayi hui saari leads aur client messages yahan dikhengi.</p>
      </div>

      {/* Main Table Card */}
      <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
        <CardBody className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead style={{ backgroundColor: LIGHT_GOLD }}>
              <tr>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3">Contact Details</th>
                <th className="py-3">Inquiry Type</th>
                <th className="py-3">Message</th>
                <th className="py-3">Date</th>
                <th className="py-3 text-end px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-5 text-center text-muted">
                    Abhi tak koi inquiry nahi aayi hai.
                  </td>
                </tr>
              ) : (
                dataList.map((item) => (
                  <tr key={item.id} className="border-bottom">
                    <td className="py-3 px-4 fw-bold">
                      {item.firstName} {item.lastName}
                    </td>
                    <td>
                      <div className="small fw-bold text-dark">{item.email}</div>
                      <div className="small text-muted">
                        {item.countryCode} {item.phoneNumber}
                      </div>
                    </td>
                    <td>
                      <Badge style={{ backgroundColor: LIGHT_GOLD, color: GOLD, border: `1px solid ${GOLD}` }} pill>
                        {item.inquiryType || 'General'}
                      </Badge>
                    </td>
                    <td>
                      <div 
                        style={{ maxWidth: '300px', fontSize: '13px', color: '#555' }}
                        dangerouslySetInnerHTML={{ __html: item.message }}
                      />
                    </td>
                    <td>
                      <small className="text-muted">
                        {new Date(item.createdAt).toLocaleDateString('en-IN')}
                      </small>
                    </td>
                    <td className="text-end px-4">
                      {/* Sirf Delete button rakha hai leads clean karne ke liye */}
                      <Button 
                        size="sm" 
                        color="light" 
                        className="text-danger border shadow-sm" 
                        onClick={() => handleDelete(item.id)}
                        title="Delete Inquiry"
                      >
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactUsPage;