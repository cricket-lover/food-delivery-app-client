import { useContext } from "react";
import "./toggle.css";
import {
  RestaurantsContext,
  RestaurantsDispatchContext,
} from "../../RestaurantsContext";

export const Toggle = () => {
  const { displayOptions } = useContext(RestaurantsContext);
  const { displayOptionsDispatch } = useContext(RestaurantsDispatchContext);
  const { showPagination } = displayOptions;
  return (
    <div className="toggle">
      <span>Pagination: </span>
      <button
        className="btn outline"
        onClick={(e) => displayOptionsDispatch({ type: "toggle_pagination" })}
      >
        {showPagination ? "Off" : "On"}
      </button>
    </div>
  );
};
