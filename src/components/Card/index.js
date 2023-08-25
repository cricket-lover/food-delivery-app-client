import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { StarRating } from "../StarRating";
import {
  RestaurantsContext,
  RestaurantsDispatchContext,
} from "../../RestaurantsContext";
import { CDN_URL } from "../../constants";
import "./card.css";

export const Card = ({ data }) => {
  const { cartItems } = useContext(RestaurantsContext);
  const { cartDispatch } = useContext(RestaurantsDispatchContext);
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    deliveryTime,
    id,
  } = data;

  const [isVisible, setIsVisible] = useState(false);

  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          setIsVisible(true);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(ref.current);
  }, []);

  const addToCart = () => {
    cartDispatch({
      type: "add_to_cart",
      item: {
        cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        costForTwo,
        deliveryTime,
        id,
      },
    });
  };

  const increaseQuantity = () => {
    cartDispatch({
      type: "increase_quantity",
      item: {
        cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        costForTwo,
        deliveryTime,
        id,
      },
    });
  };

  const decreaseQuantity = (cartItem) => {
    if (cartItem.quantity === 1) {
      cartDispatch({
        type: "remove_from_cart",
        item: {
          cloudinaryImageId,
          name,
          cuisines,
          avgRating,
          costForTwo,
          deliveryTime,
          id,
        },
      });
      return;
    }
    cartDispatch({
      type: "decrease_quantity",
      item: {
        cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        costForTwo,
        deliveryTime,
        id,
      },
    });
  };

  const cartItem = cartItems.find(({ item }) => item.name === name);
  return (
    <div ref={ref} className={`card ${isVisible ? "" : "hidden"}`}>
      <img
        src={CDN_URL + cloudinaryImageId}
        alt={name}
        className="restaurant-image"
      />
      <h3 className="restaurant-name">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <div className="cost-and-time">
        <h5>₹{costForTwo / 100} FOR TWO</h5>
        <h5>{deliveryTime} mins</h5>
      </div>
      <StarRating value={avgRating} />
      {cartItem ? (
        <div className="buttons-container">
          <span
            className="btn filled"
            onClick={() => decreaseQuantity(cartItem)}
          >
            -
          </span>
          <strong>{cartItem.quantity}</strong>
          <span className="btn filled" onClick={increaseQuantity}>
            +
          </span>
        </div>
      ) : (
        <button className={`btn filled`} onClick={addToCart}>
          Add to cart
        </button>
      )}
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.object,
};
