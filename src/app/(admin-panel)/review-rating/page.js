'use client';
import React, { useState } from 'react';
import { Card, CardBody, Table, Button, Badge } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewRating = () => {
  const GOLD = "#eebb5d";
  const [reviews, setReviews] = useState([
    { id: 1, client: "John Doe", lawyer: "Adv. Amit", rating: 5, comment: "Excellent service!", status: "Published" },
    { id: 2, client: "Jane Smith", lawyer: "Adv. Priya", rating: 3, comment: "Average experience.", status: "Pending" }
  ]);

  const toggleStatus = (id) => {
    setReviews(reviews.map(r => r.id === id ? {...r, status: r.status === "Published" ? "Hidden" : "Published"} : r));
    toast.success("Status Updated!", {theme:"colored"});
  };
  const handleDelete = (id) => { setReviews(reviews.filter(r => r.id !== id)); toast.error("Review Deleted!", {theme:"colored"}); };

  return (
    <div className="p-3 bg-light min-vh-100">
      <ToastContainer />
      <Card className="mb-4 border-0 shadow-sm"><CardBody className="p-3"><h5 className="mb-0 fw-bold" style={{ color: GOLD }}>Reviews & Ratings</h5></CardBody></Card>
      <Card className="border-0 shadow-sm"><CardBody className="p-4">
        <Table className="align-middle text-nowrap"><thead className="table-light"><tr><th>Client</th><th>Lawyer</th><th>Rating</th><th>Comment</th><th>Status</th><th className="text-end">Action</th></tr></thead><tbody>
            {reviews.map(item => (
                <tr key={item.id}>
                    <td>{item.client}</td><td>{item.lawyer}</td>
                    <td className="text-warning">{"★".repeat(item.rating)}</td>
                    <td className="text-truncate" style={{maxWidth:'200px'}}>{item.comment}</td>
                    <td><Badge color={item.status==='Published'?'success':'secondary'}>{item.status}</Badge></td>
                    <td className="text-end">
                        <button onClick={()=>toggleStatus(item.id)} className="btn btn-sm me-2" style={{color:GOLD}}><i className="bi bi-eye"></i></button>
                        <button onClick={()=>handleDelete(item.id)} className="btn btn-sm text-danger"><i className="bi bi-trash"></i></button>
                    </td>
                </tr>
            ))}
        </tbody></Table>
      </CardBody></Card>
    </div>
  );
};
export default ReviewRating;