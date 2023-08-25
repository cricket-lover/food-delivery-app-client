import { useReducer } from "react";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import {
  RestaurantsContext,
  RestaurantsDispatchContext,
} from "./RestaurantsContext";
import {
  cartReducer,
  paginationReducer,
  queryReducer,
  restaurantsReducer,
  userReducer,
} from "./reducers";
import { Header } from "./components";
import "./App.css";

function App() {
  const existingCartItems =
    JSON.parse(localStorage.getItem("cart_items")) || [];
  const [displayOptions, displayOptionsDispatch] = useReducer(queryReducer, {
    query: "",
    sortOption: "deliveryTime",
    showPagination: false,
  });
  const [pageNumber, paginationDispatch] = useReducer(paginationReducer, 1);
  const [cartItems, cartDispatch] = useReducer(cartReducer, existingCartItems);
  const [restaurants, restaurantsDispatch] = useReducer(restaurantsReducer, []);
  const [user, userDispatch] = useReducer(
    userReducer,
    localStorage.getItem("user")
  );

  return (
    <RestaurantsContext.Provider
      value={{
        displayOptions,
        cartItems,
        restaurants,
        pageNumber,
        user,
      }}
    >
      <RestaurantsDispatchContext.Provider
        value={{
          displayOptionsDispatch,
          cartDispatch,
          restaurantsDispatch,
          paginationDispatch,
          userDispatch,
        }}
      >
        <SnackbarProvider>
          <div className="app">
            <Header />
            <main className="main-container">
              <Outlet />
            </main>
          </div>
        </SnackbarProvider>
      </RestaurantsDispatchContext.Provider>
    </RestaurantsContext.Provider>
  );
}

export default App;
