import PropTypes from "prop-types";
import "./pagination.css";
import { useContext } from "react";
import {
  RestaurantsContext,
  RestaurantsDispatchContext,
} from "../../RestaurantsContext";

export const Pagination = ({ totalItemsCount, itemsPerPage }) => {
  const { paginationDispatch } = useContext(RestaurantsDispatchContext);
  const { pageNumber } = useContext(RestaurantsContext);
  const numberOfPages = Math.ceil(totalItemsCount / itemsPerPage);
  const pageNumberButtons = Array(numberOfPages).fill(0);

  return (
    <div className="pagination-cards">
      <div className="pagination-buttons-container">
        <button
          className="btn outline"
          onClick={() =>
            paginationDispatch({
              type: "first_page",
              pageNumber: 1,
            })
          }
          disabled={pageNumber === 1}
        >
          {"<<"}
        </button>
        <button
          className="btn outline"
          onClick={() => paginationDispatch({ type: "prev_page" })}
          disabled={pageNumber === 1}
        >
          {"<"}
        </button>
        {pageNumberButtons.map((n, i) => {
          return (
            <button
              className={`btn ${pageNumber === i + 1 ? "filled" : "outline"}`}
              key={i}
              onClick={() =>
                paginationDispatch({
                  type: "click_page_number",
                  pageNumber: i + 1,
                })
              }
            >
              {i + 1}
            </button>
          );
        })}
        <button
          className="btn outline"
          onClick={() => paginationDispatch({ type: "next_page" })}
          disabled={numberOfPages === pageNumber}
        >
          {">"}
        </button>
        <button
          className="btn outline"
          onClick={() =>
            paginationDispatch({
              type: "last_page",
              pageNumber: numberOfPages,
            })
          }
          disabled={pageNumber === numberOfPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalItemsCount: PropTypes.number,
};
