import { useEffect, useContext } from "react";
import { sortBy } from "lodash";
import { Sort, Cards, Pagination, Toggle } from "../../components";
import {
  RestaurantsContext,
  RestaurantsDispatchContext,
} from "../../RestaurantsContext";
import { API_URL } from "../../constants";

export const Body = () => {
  const { restaurantsDispatch } = useContext(RestaurantsDispatchContext);
  const { displayOptions, restaurants, pageNumber } =
    useContext(RestaurantsContext);
  const { query, sortOption, showPagination } = displayOptions;

  useEffect(() => {
    fetch(`${API_URL}/api/restaurants`)
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          throw new Error(data.err);
        }
        restaurantsDispatch({ type: "load", restaurants: data });
      })
      .catch((err) => console.log(err.message));
  }, [restaurantsDispatch]);

  const searchResults = restaurants.filter((restaurant) => {
    return restaurant.data.name.toLowerCase().includes(query.toLowerCase());
  });

  const sortedRestaurants = sortBy(searchResults, [
    function (o) {
      return o.data[sortOption];
    },
  ]);
  const itemsPerPage = 10;
  const startIndex = itemsPerPage * (pageNumber - 1);
  const endIndex = startIndex + itemsPerPage - 1;

  const currentPageRestaurants = sortedRestaurants.slice(
    startIndex,
    endIndex + 1
  );

  const restaurantsToShow = showPagination
    ? currentPageRestaurants
    : sortedRestaurants;

  return (
    <>
      <section className="options">
        <Toggle />
        <Sort />
      </section>
      <Cards restaurants={restaurantsToShow} />
      {showPagination && (
        <Pagination
          totalItemsCount={searchResults.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </>
  );
};
