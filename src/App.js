import { ReactComponent as Chevron } from './chevron-right.svg'
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
      <div className="list-item-card recipe-list-item">
        <div className="recipe-item-content-container">
          <div className="recipe-list-item-image-container">
            {/* prettier-ignore */}
            <img 
              src={this.props.image} 
              className="img-responsive recipe-list-item-image" 
              alt={this.props.title} 
            />
          </div>
          <div className="recipe-list-item-text-container">
            <section className="recipe-list-item-title">{this.props.title}</section>
            <section className="recipe-list-item-used-ingredients">You have {this.props.missedIngredientCount === 0 ? "all" : this.props.usedIngredientCount} ingredients.</section>
            {/* JS trick: show/hide element with simple conditional evaluation: */}
            {/* if first && second both true, RETURN value of second */}
            {/* but if first is false, abort and do nothing */}
            {this.props.missedIngredientCount > 0 && <section className="recipe-list-item-missing-ingredients">There's {this.props.missedIngredientCount} ingredients missing.</section>}
          </div>
        </div>
        <Chevron className="recipe-list-item-chevron"/>
      </div>
    );
  }
}

export default App;
