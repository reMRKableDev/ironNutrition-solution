import React, { useState } from 'react';

const initialState = {
  name: '',
  calories: 0,
  image: '',
};

const FoodForm = ({ addNewFood }) => {
  const [formState, setFormState] = useState(initialState);

  // Handler for changing values in the input fields
  const inputChangeHandler = (event) => {
    let { value, name, type } = event.target;

    if (type === 'number') {
      value = Number(value);
    }

    setFormState({ ...formState, [name]: value });
  };

  // Handle form submission
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    addNewFood(formState);

    setFormState(initialState);
  };

  return (
    <form onSubmit={formSubmissionHandler} className="mb-5">
      <div className="field">
        <label htmlFor="name" className="label">
          Food Name
        </label>
        <div className="control">
          <input
            type="text"
            name="name"
            className="input is-primary"
            value={formState.name}
            onChange={inputChangeHandler}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="name" className="label">
          Food Calories
        </label>
        <div className="control">
          <input
            type="text"
            name="number"
            className="input is-primary"
            value={formState.calories}
            onChange={inputChangeHandler}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="name" className="label">
          Food Image Link
        </label>
        <div className="control">
          <input
            type="text"
            name="image"
            className="input is-primary"
            value={formState.image}
            onChange={inputChangeHandler}
          />
        </div>
      </div>

      <div className="control">
        <button className="button is-primary">Submit</button>
      </div>
    </form>
  );
};

export default FoodForm;
