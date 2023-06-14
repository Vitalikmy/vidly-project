import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

// input = number of page, items on page.
// event = click - page change

const Pagination = props => {
  const{
  itemsCount,
  pageSize,
  currentPage,
  onPageChange
} = props;
  // get how many pages should the paginated number shows
  const pagesCount = Math.ceil(itemsCount / pageSize);

  // if the items on page is greater that the total elements (show 10 items where it has only 5), then don't show the pagination.
  if (pagesCount === 1) return null;

  // create array of number 1 to {pageCount}
  // [1, ...pageCount]
  // need to add +1 at the end, so it includes the last number ex. if there are four elements, it will return [1, 2, 3] if there's no +1
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination" >
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button onClick={() => onPageChange(page)} className="page-link">
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
export default Pagination;
