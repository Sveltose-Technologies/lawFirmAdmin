import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationComponent = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // अगर सिर्फ 1 पेज है तो कुछ न दिखाएं

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination aria-label="Page navigation" className="d-flex justify-content-end mt-3">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous onClick={() => onPageChange(currentPage - 1)} />
      </PaginationItem>
      
      {pages.map((page) => (
        <PaginationItem active={page === currentPage} key={page}>
          <PaginationLink onClick={() => onPageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next onClick={() => onPageChange(currentPage + 1)} />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComponent;