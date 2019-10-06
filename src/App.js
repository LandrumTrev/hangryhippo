import React, { Component } from "react";
import "./App.css";

class App extends Component {
  // use defaultProps for dev from spoonacular JSON sample data

  static defaultProps = {
    id: 641803,
    title: "Easy & Delish! ~ Apple Crumble",
    image: "https://spoonacular.com/recipeImages/Easy---Delish--Apple-Crumble-641803.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 4,
    likes: 1
  };

  render() {
    return (
      <div className="list-item-card">
        {/* replace Hello World with default props */}
        {JSON.stringify(this.props)}
      </div>
    );
  }
}

export default App;
