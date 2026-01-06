// src/hooks/usePagination.js
import { useState } from 'react';

export const usePagination = (itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  return {
    currentPage,
    setCurrentPage,
    getPaginatedData,
    itemsPerPage
  };
};