import React from 'react';
import FoodList from './components/FoodList';

function App() {
  return (
    <main className="container">
      <section className="hero">
        <div className="hero-body">
          <h1 className="title is-1 is-centered">Iron Nutrition</h1>
        </div>
      </section>
      <FoodList />
    </main>
  );
}

export default App;
