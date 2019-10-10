import React, { Component } from "react";
import "../styles/App.css";
import Header from "../../header/components/header";
import IngredientsList from "../../ingredientsList/components/IngredientsList";
import RecipeItemList from "../../recipeItemList/components/RecipeItemList";
import Recipe from "../../recipe/components/Recipe";

import SpoonacularApi from "../../communications/spoonacularApi";

class App extends Component {
  state = {
    ingredients: [],
    nextIngredient: "",
    canSearch: false,
    isShowingRecipe: false,
    instructions: ""
  };

  addIngredient = () => {
    // if nextIngredient string is empty, then return (and do nothing),
    if (this.state.nextIngredient.length === 0) return;
    // but if there is a nextIngredient, update state:
    this.setState({
      // add nextIngredient to ingredients array, concat creates a new array
      ingredients: this.state.ingredients.concat(this.state.nextIngredient),
      // then reset nextIngredient to empty (length === 0),
      nextIngredient: "",
      // and set canSearch to true
      canSearch: true
    });
  };

  removeIngredient = indexToRemove => {
    // create newIngredients array as a shallow copy of ingredients array
    const newIngredients = this.state.ingredients.concat([]);
    // starting at ingredient to remove's index, remove it (1 item)
    newIngredients.splice(indexToRemove, 1);
    // if there are remaining ingredients in newIngredients, then TRUE
    const newCanSearch = newIngredients.length !== 0;

    this.setState({
      // then set ingredients to the new shortened array,
      ingredients: newIngredients,
      // and canSearch TRUE if remaining ingredients, FALSE if no ingredients
      canSearch: newCanSearch
    });
  };

  // event handler for input box, loads data into nextIngredient holding property
  handleAddNextChange = newAddNextIngredient => {
    this.setState({
      nextIngredient: newAddNextIngredient
    });
  };

  // async/await function
  doSearch = async () => {
    this.setState({
      // temporarily disable canSearch ability while waiting
      canSearch: false
    });

    await SpoonacularApi
      // call imported SpoonacularApi method getRecipes (pass in all ingredients)
      .getRecipes(this.state.ingredients)
      // then when response is received call response data "newRecipes"
      .then(newRecipes => {
        this.setState({
          // and set recipes state to newRecipes return data
          recipes: newRecipes,
          // and then turn canSearch back on
          canSearch: true
        });
      });
  };

  // method for showing "instructions" data of a recipe
  showRecipe = async id => {
    // while showRecipe is active,
    this.setState({
      // turn off canSearch and
      canSearch: false,
      // activate isShowingRecipe
      isShowingRecipe: true
    });

    // then call API's
    SpoonacularApi
      // get recipe by recipe ID method
      .getRecipeById(id)
      // and call response data "instructions"
      .then(instructions => {
        this.setState({
          // and set state prop "instructions: instructions" (shorthand)
          instructions
        });
      });
  };

  // and method for hiding a currently showing recipe's "instructions"
  hideRecipe = () => {
    this.setState({
      // if there are ingredients in the array, then TRUE
      canSearch: this.state.ingredients.length !== 0,
      // turn off is showing recipe prop
      isShowingRecipe: false,
      // and empty the instructions property, so no instructions displayed
      instructions: ""
    });
  };

  render() {
    return (
      <div className="App container-fluid">
        <div className="row container-fluid">
          <div className="panel panel-default header hangry-panel">
            <div className="panel-body">
              <Header />
            </div>
          </div>
        </div>
        <div className="row content-row">
          <div className="col-lg-4 ingredients-col">
            <div className="panel panel-default hangry-panel">
              <div className="panel-body">
                <IngredientsList
                  ingredients={this.state.ingredients}
                  nextIngredient={this.state.nextIngredient}
                  addIngredient={this.addIngredient}
                  removeIngredient={this.removeIngredient}
                  handleAddNextChange={this.handleAddNextChange}
                  canSearch={this.state.canSearch}
                  doSearch={this.doSearch}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-8 recipes-col">
            <div className="panel panel-default hangry-panel">
              <div className="panel-body">
                {this.state.isShowingRecipe ? (
                  <Recipe instructions={this.state.instructions} hideRecipe={this.hideRecipe} />
                ) : (
                  <RecipeItemList items={this.state.recipes} showRecipe={this.showRecipe} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
