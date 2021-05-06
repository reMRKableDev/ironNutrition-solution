import React, { useState } from 'react';
import foodList from '../foods.json';
import FoodBox from './FoodBox';
import FoodForm from './FoodForm';
import FoodSearch from './FoodSearch';

const FoodList = () => {
  const [form, setForm] = useState(false);
  const [searching, setSearching] = useState(false);
  const [foodListState, setFoodListState] = useState(foodList);
  const [filteredFoodListState, setFilteredFoodListState] = useState([]);
  const [todaysFoodListState, setTodaysFoodListState] = useState([]);

  // handle form rendering
  const formRenderingHandler = () => setForm(!form);

  // handle adding food to a list
  const addNewFoodHandler = (newFoodItem) => {
    const foodListCopy = [...foodListState];
    foodListCopy.push(newFoodItem);
    formRenderingHandler();
    setFoodListState(foodListCopy);
  };

  // handle filtering of the incoming search value
  const filterFoodsHandler = (searchValue) => {
    const foodListCopy = [...foodListState];

    const filteredResults = foodListCopy.filter((foodItem) => {
      return foodItem.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    setSearching(true);
    setFilteredFoodListState(filteredResults);
  };

  // handle add new food to today's list
  const addFoodToTodaysListHandler = (newFoodToAdd) => {
    const todaysFoodListStateCopy = [...todaysFoodListState];
    newFoodToAdd.calories *= newFoodToAdd.quantity;
    todaysFoodListStateCopy.push(newFoodToAdd);
    setTodaysFoodListState(todaysFoodListStateCopy);
  };

  // handle total of food list
  const totalCaloriesHandler = () =>
    todaysFoodListState.reduce((acc, val) => acc + val.calories, 0);

  return (
    <div>
      {form && <FoodForm addNewFood={addNewFoodHandler} />}

      <button className="button is-link" onClick={() => formRenderingHandler()}>
        {form ? 'Hide form' : 'Show form'}
      </button>

      <hr />

      <FoodSearch filterFood={filterFoodsHandler} />

      <div style={{ width: '70%', float: 'left', padding: '10px' }}>
        {searching
          ? filteredFoodListState.map((foodItem, index) => (
              <FoodBox
                key={index}
                {...foodItem}
                addToToday={addFoodToTodaysListHandler}
              />
            ))
          : foodListState.map((foodItem, index) => (
              <FoodBox
                key={index}
                {...foodItem}
                addToToday={addFoodToTodaysListHandler}
              />
            ))}
      </div>

      <div style={{ width: '30%', float: 'right', padding: '10px' }}>
        <h2 className="title has-text-centered">Today's Food</h2>

        <ul>
          {todaysFoodListState.map((foodItem, index) => (
            <li key={index}>
              {foodItem.quantity} {foodItem.name} = {foodItem.calories} cal
            </li>
          ))}
          <br />
          <p className="is-capitalized has-text-weight-semibold">
            Total: {totalCaloriesHandler()}
          </p>
        </ul>
      </div>
    </div>
  );
};

export default FoodList;
