// RecipeItem is a SFC (Stateless Functional Component)
// because it is a presentation component without its own state
// note the use of () instead of

import React from "react";
import "../styles/RecipeItem.css";
import { ReactComponent as Chevron } from "./chevron-right.svg";
import PropTypes from "prop-types";

const propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  usedIngredientCount: PropTypes.number,
  missedIngredientCount: PropTypes.number
};

const RecipeItem = props => (
  <div className="list-item-card recipe-list-item">
    <div className="recipe-item-content-container">
      <div className="recipe-list-item-image-container">
        <img src={props.image} className="img-responsive recipe-list-item-image" alt={props.title} />
      </div>
      <div className="recipe-list-item-text-container">
        <section className="recipe-list-item-title">{props.title}</section>
        <section className="recipe-list-item-used-ingredients">
          You have
          {/* ternary conditional replaces prop val with hard coded val */}
          {props.missedIngredientCount === 0 ? "all" : props.usedIngredientCount} ingredients.
        </section>
        {/* JS trick: show/hide element with simple conditional evaluation: */}
        {/* if first && second both true, RETURN value of second */}
        {/* but if first is false, abort and do nothing */}
        {props.missedIngredientCount > 0 && <section className="recipe-list-item-missing-ingredients">There's {props.missedIngredientCount} ingredients missing.</section>}
      </div>
    </div>
    <Chevron className="recipe-list-item-chevron" />
  </div>
);

RecipeItem.propTypes = propTypes;

export default RecipeItem;
