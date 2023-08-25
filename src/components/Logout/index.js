import { useContext } from "react";
import { RestaurantsDispatchContext } from "../../RestaurantsContext";
import { API_URL } from "../../constants";

export const Logout = () => {
  const { userDispatch } = useContext(RestaurantsDispatchContext);

  const logoutHandler = async (e) => {
    const token = localStorage.getItem("access_token") || "";

    const response = await fetch(`${API_URL}/api/logout`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });

    if (response.status === 204) {
      localStorage.removeItem("access_token");
      userDispatch({ type: "delete" });
      return;
    }
  };
  return (
    <button className="btn" onClick={logoutHandler}>
      Logout
    </button>
  );
};
