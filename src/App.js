import React, { Component } from 'react';
import './App.css';

import FoodBox from './components/FoodBox';
import FoodForm from './components/FoodForm';
import FoodSearch from './components/FoodSearch';

import foodList from './foods.json';

class App extends Component {
  state = {
    foodState: foodList,
    filteredFoodListState: [],
    form: false,
    searching: false,
    todaysFoodList: [],
  };

  // handleRenderForm() - it changes the value of "form" in our state. Helps with rendering the food form.
  handleRenderForm = () => {
    // 1. Make a copy of our state so we are not directly affecting it.
    const stateCopy = { ...this.state };
    // 2. Change the form value within the state
    stateCopy.form = !this.state.form;
    // 3. Set the copy to state
    this.setState(stateCopy);
  };

  // handleAddNewFood() - The function that will help FoodForm.js to lift state.
  handleAddNewFood = (newFoodItem) => {
    // 1. Make a copy of our state so we are not directly affecting it.
    const stateCopy = { ...this.state };

    // 2. Change the form value within the state
    stateCopy.foodState = [...stateCopy.foodState, newFoodItem];

    // 2.5 Change form back to false
    stateCopy.form = !stateCopy.form;

    // 3. Set the copy to state
    this.setState(stateCopy);
  };

  // filter foods according to the incoming search value
  handleFilterFoods = (searchInput) => {
    const stateCopy = { ...this.state };

    // Filter through our foodState with the matching values of searchInput
    const filteredFoodList = stateCopy.foodState.filter((foodItem) =>
      foodItem.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Update the food state
    stateCopy.filteredFoodListState = filteredFoodList;
    stateCopy.searching = true;

    this.setState(stateCopy);
  };

  // Add new food to today's list
  handleAddFoodToTodaysList = (foodObject) => {
    // Copy state
    const stateCopy = { ...this.state };

    // Calculate calories and quantity
    foodObject.calories *= foodObject.quantity;

    // Push new value to todaysFoodList
    stateCopy.todaysFoodList.push(foodObject);

    this.setState(stateCopy);
  };

  // Get total value
  handleCalculateTotalCalories = () =>
    this.state.todaysFoodList.reduce((acc, val) => acc + val.calories, 0);

  render() {
    return (
      <div className="App">
        <h1>Iron Nutrition App</h1>
        {/* Search Bar */}
        <FoodSearch handleFilterSearch={this.handleFilterFoods} />

        {/* Button to toggle our form */}
        <button className="button" onClick={this.handleRenderForm}>
          Add Food
        </button>

        {/* Toggle the form when this.state.form has the value of "true"*/}
        {this.state.form && (
          <FoodForm handleLiftFoodFormState={this.handleAddNewFood} />
        )}

        <div>
          <div style={{ width: '70%', float: 'left' }}>
            {/* Mapping through the state of foods and passing them to the FoodBox component */}
            {this.state.searching
              ? this.state.filteredFoodListState.map((foodItem, index) => (
                  <FoodBox
                    key={index}
                    {...foodItem}
                    handleAddFood={this.handleAddFoodToTodaysList}
                  />
                ))
              : this.state.foodState.map((foodItem, index) => (
                  <FoodBox
                    key={index}
                    {...foodItem}
                    handleAddFood={this.handleAddFoodToTodaysList}
                  />
                ))}
          </div>

          <div style={{ width: '30%', float: 'right' }}>
            {/* The list of today's food */}
            <h2>Today's Food!</h2>
            <ul>
              {this.state.todaysFoodList.map((element, index) => (
                <li key={index}>
                  {element.quantity} {element.name} = {element.calories} cal
                </li>
              ))}
              <p>Total: {this.handleCalculateTotalCalories()} calories</p>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
