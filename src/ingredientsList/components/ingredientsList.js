import React from "react";
import PropTypes from "prop-types";
import IngredientListItem from "../../ingredientListItem/components/IngredientListItem";
import AddTextItemInput from "../../addTextItemInput/components/AddTextItemInput";
import "../styles/ingredientsList.css";

// TRUE or FALSE, depending on whether there are any ingredients
const hasIngredients = props => props.ingredients && props.ingredients.length > 0;

// handy: propTypes gives you a list of all props being passed into this component
// from the parent component that displays (returns) an <IngredientsList />
const propTypes = {
  ingredients: PropTypes.array,
  nextIngredient: PropTypes.string,
  addIngredient: PropTypes.func.isRequired,
  handleAddNextChange: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  doSearch: PropTypes.func.isRequired,
  canSearch: PropTypes.bool
};

// Stateless Functional Component: no state in here,
// just passing along props from parent that calls an IngredientsList
const IngredientsList = props => {
  return (
    <div className="ingredients-panel">
      <div className="ingredients-panel-text">
        {/* header copy */}
        Quick give me a list of the ingredients in your fridge! Don't worry, we're here to help.
      </div>
      <div>
        <button
          // find recipes button
          className="btn btn-info ingredients-go-button"
          onClick={props.doSearch}
          disabled={!props.canSearch}
        >
          Feed me!!
        </button>
      </div>
      <div className="ingredients-list-container">
        {// pass props into hasIngredients, and if TRUE, then
        hasIngredients(props) &&
          // use && (auto TRUE) to .map() props.ingredients
          // params: ingredient (array element) and index (of array element)
          props.ingredients.map((ingredient, index) => {
            // callback returns an IngredientsListItem for each element
            return (
              <IngredientsListItem
                // use index param for both key and index
                key={index}
                index={index}
                // passing functions down from parent to grandchild
                removeItem={props.removeIngredient}
                canSearch={props.canSearch}
              >
                {/* and have the element's value as displayed content */}
                {ingredient}
              </IngredientsListItem>
            );
          })}
        {/* ingredient input text field */}
        <AddTextItemInput
          id="nextIngredient"
          placeholder="Add another ingredient"
          // passing functions down from parent to grandchild
          value={props.nextIngredient}
          addHandler={props.addIngredient}
          changeHandler={props.handleAddNextChange}
          // FALSE if there are ingredients OR if canSearch prop is FALSE
          canAddItem={!hasIngredients(props) || props.canSearch}
        />
      </div>
    </div>
  );
};

// must define here, after the return() function
// propTypes does NOT fail compile of code if error; just prints error to console
IngredientsList.propTypes = propTypes;

export default IngredientsList;
