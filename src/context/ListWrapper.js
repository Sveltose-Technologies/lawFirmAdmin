// src/components/ListWrapper.js
import React from 'react';
import PaginationComponent from './PaginationComponent';

const ListWrapper = ({ children, totalItems, itemsPerPage, currentPage, onPageChange }) => {
  return (
    <>
      {/* 1. Aapka Table/List yahan render hoga */}
      {children}

      {/* 2. Logic: Agar data 1 se zyada hai, toh hi pagination dikhao */}
      {totalItems > 0 && (
        <div className="mt-3 border-top pt-2">
          <PaginationComponent 
            totalItems={totalItems} 
            itemsPerPage={itemsPerPage} 
            currentPage={currentPage} 
            onPageChange={onPageChange} 
          />
        </div>
      )}
    </>
  );
};

export default ListWrapper;