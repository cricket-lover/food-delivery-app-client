import PropTypes from "prop-types";
import "./sort.css";
import { useContext } from "react";
import { RestaurantsDispatchContext } from "../../RestaurantsContext";

export const Sort = ({ onSortChange }) => {
  const { displayOptionsDispatch } = useContext(RestaurantsDispatchContext);

  return (
    <div className="sort-container">
      <label>Sort By: </label>
      <select
        className="btn outline"
        onChange={(e) =>
          displayOptionsDispatch({ type: "sort", sortOption: e.target.value })
        }
      >
        <option value="deliveryTime">Delivery Time</option>
        <option value="name">Name</option>
        <option value="avgRating">Rating</option>
        <option value="costForTwo">Cost</option>
      </select>
    </div>
  );
};

Sort.propTypes = {
  onSortChange: PropTypes.func,
};
