// this component is a child of ingredientsList component
// which is called by the App component, source of handlers and other functions

import React from "react";
import PropTypes from "prop-types";
import "../styles/addTextItemInput.css";

// schema for PropTypes type checking for props passed to this component
// by ingredientsList component parent
const propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  addHandler: PropTypes.func,
  handleAddNextChange: PropTypes.func,
  canAddItem: PropTypes.bool
};

// stateless functional component, props param takes in props
// and returns (this JSX as HTML)
// uses () instead of {} for immediate invocation?
const AddTextItemInput = props => (
  // component container div with classes
  <div className="form-group add-container">
    {/* label for the input element below */}
    <label htmlFor={props.id} className="sr-only">
      Add another ingredient
    </label>
    {/* Bootstrap input-group container div */}
    <div className="input-group">
      {/* input field takes in main props */}
      <input
        // gets id from props
        id={props.id}
        type="text"
        className="form-control"
        // gets placeholder text from props
        placeholder={props.placeholder}
        // gets initial value from props
        value={props.value}
        // on any change (value change), event is passed into a function as (ev), which
        // calls changeHandler function from props and passes it event's targe.value
        // changeHandler passed from App > ingredientsList > AddTextItemInput via props
        onChange={ev => props.changeHandler(ev.target.value)}
        // whenever a key is pressed, callback checks to see if key was "Enter",
        // and if so, AND .canAddItem exists (is TRUE) AND addHander() callback exists,
        // then evaluate the last condition, i.e., fire the addHander() function
        // addHander() is addIngredient() from App component
        onKeyPress={ev => ev.key === "Enter" && props.canAddItem && props.addHandler()}
      />
      {/* inline container span for input button elements */}
      <span className="input-group-btn">
        <button
          // Bootstrp button classes
          className="btn btn-success"
          // clicking button function checks if canAddItem is TRUE,
          // and if so, evaluate (call function) addHandler()
          // so either hitting "Enter" (on input, above),
          // OR clicking button fires the addIngredient() from the App component
          onClick={() => props.canAddItem && props.addHandler()}
          // the opposite of canAddItem value (true/false),
          // so if canAddItem is TRUE, disabled is FALSE, and the button works
          disabled={!props.canAddItem}
        >
          {/* change this: no glpyicons in Bootstrap 4 */}
          <i className="glyphicon glyphicon-plus add-icon"></i>
        </button>
      </span>
    </div>
  </div>
);

// PropType checking has to occur AFTER the props have been called in JSX above,
// but the schema can be declared before (at the top) where convienient reference
AddTextItemInput.propTypes = propTypes;

export default AddTextItemInput;
