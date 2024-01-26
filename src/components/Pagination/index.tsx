import React, {memo} from 'react';
import ReactPaginate from "react-paginate";
import styles from './styles/styles.module.scss'

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = memo(({currentPage, setCurrentPage}) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(e) => setCurrentPage(e.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={currentPage - 1}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
))

export default Pagination;