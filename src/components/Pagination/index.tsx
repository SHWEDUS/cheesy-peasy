import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './styles/styles.module.scss'

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (selectedPage: number) => void;
}

function Pagination({currentPage, setCurrentPage}: PaginationProps): React.JSX.Element {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => setCurrentPage(e.selected + 1 )}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;