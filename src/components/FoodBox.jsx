import React, { useState } from 'react';

const FoodBox = ({ image, name, calories, addToToday }) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (event) =>
    setQuantity(Number(event.target.value));

  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={image} alt="food-item" />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{name}</strong> <br />
              <small>{calories} cal</small>
            </p>
          </div>
        </div>
        <div className="media-right">
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <div className="control">
              <button
                className="button is-info"
                onClick={() => {
                  addToToday({ name, calories, quantity });
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default FoodBox;
