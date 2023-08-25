import { Link } from "react-router-dom";
import "./header.css";
import { CartIcon } from "../CartIcon";
import { InputBox } from "../InputBox";
import { Logout } from "../Logout";
import { useContext } from "react";
import { RestaurantsContext } from "../../RestaurantsContext";

export const Header = () => {
  const { user } = useContext(RestaurantsContext);

  return (
    <header className="header">
      <h1 className="brand-name">
        <Link to={"/"}>FoodKaro</Link>
      </h1>
      <InputBox />
      {user ? <Logout /> : <Link to={"/login"}>Login</Link>}
      <CartIcon />
    </header>
  );
};
