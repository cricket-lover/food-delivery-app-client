import "./star-rating.css";

const Star = ({ marked, starId }) => {
  return (
    <span data-star-id={starId} className="star" role="button">
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

export const StarRating = ({ value }) => {
  return (
    <div className="star-rating">
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1}`}
          marked={value ? value >= i + 1 : value >= i + 1}
        />
      ))}
    </div>
  );
};
