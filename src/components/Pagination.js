import React from 'react';

const Pagination = ({total_pages, page, goToPreviousPage, goToNextPage}) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination flex-wrap">
        <li className={`page-item ${page === 1 ? 'disabled' : null}`}>
          <button className="page-link" onClick={goToPreviousPage}>Previous page</button>
        </li>
        <li className="page-item active disabled">
          <button className="page-link">Current page: {page}</button>
        </li>
        <li className="page-item disabled">
          <button className="page-link text-success">Total pages: {total_pages}</button>
        </li>
        <li className={`page-item ${page === total_pages ? 'disabled' : null}`}>
          <button className="page-link" onClick={goToNextPage}>Next page</button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination;
