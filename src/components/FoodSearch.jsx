import React, { Component } from 'react';

class FoodSearch extends Component {
  inputChangeHandler = (event) => {
    this.props.filterFood(event.target.value);
  };

  render() {
    return (
      <input
        className="input is-danger mb-5"
        name="search"
        type="text"
        placeholder="Search for your food..."
        onChange={this.inputChangeHandler}
      />
    );
  }
}

export default FoodSearch;
