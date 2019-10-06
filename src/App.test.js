import React from "react";
import ReactDOM from "react-dom";
// enzyme's "shallow" does NOT render/test any child components
// use "mount" instead to render/test full DOM tree of children
import { shallow } from "enzyme";
import App from "./App";

// ============================================

// Curried helper function to eliminate repeating this code,
// note () instead of {} so we're returning the result.
// Finds a type of element whose classes contain a specified class
const getElement = wrapper => elementType => classToSearchFor => wrapper.find(elementType).findWhere(e => e.props().className && e.props().className.indexOf(classToSearchFor) !== -1);

// ============================================

// the default Jest test
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// ============================================
// NEW TESTS
// ============================================

// describe() function used to nicely format a titled section of tests
describe("Recipe List Item", () => {
  // first test, checks the class of main div of component
  it("renders a div with the className prop set to be an item card", () => {
    // wrap test around entire component
    const wrapper = shallow(<App />);
    // expect 1 div to have a className of list-item-card
    expect(getElement(wrapper)("div")("list-item-card").length).toBe(1);
  });

  // ============================================

  // test to see if linked image is displayed with alt text
  it("should display the image supplied by the props", () => {
    // dummy content to render into component's actual <img> element (NOT using component's actual data)
    const testAlt = `I'm Batman`;
    const testImage = "http://www.vectortemplates.com/raster/batman-logo-big.gif";
    // wrap test around component, and pass the component props with dummy content (above)
    const wrapper = shallow(<App title={testAlt} image={testImage} />);
    // test functionality of src="" and alt="" of <img className="recipe-list-item-image">
    // by seeing if they can render the dummy props passed in (above)
    expect(getElement(wrapper)("img")("recipe-list-item-image").props().alt).toEqual(testAlt);
    expect(getElement(wrapper)("img")("recipe-list-item-image").props().src).toEqual(testImage);
  });

  // ============================================

  // NOTE!! THIS TEST FAILS, .text() FINDING 4 MATCHING NODES, UNLESS div CHANGED TO section
  // IS THE TOO-SIMILAR CLASS NAMING CONVENTION TRIPPING UP ENZYME? (TOO MANY same-same-same?)
  // test to see if it displays a recipe title
  it("should display a title", () => {
    // dummy title for testing
    const testTitle = `I'm Batman`;
    // test wrap the component and pass it a "title" prop with dummy title data
    const wrapper = shallow(<App title={testTitle} />);
    // then grab the <div className="recipe-list-item-title"> and check if
    // the .text() (Enzyme, not jQuery or JS) inside the tags matches dummy title
    expect(getElement(wrapper)("section")("recipe-list-item-title").text()).toEqual(testTitle);
  });

  // ============================================

  it("should show the number of ingredients used", () => {
    const testUsedIngredientsCount = 3;
    const wrapper = shallow(<App usedIngredientsCount={testUsedIngredientsCount} />);

    expect(
      getElement(wrapper)("section")("recipe-list-item-used-ingredients")
        .text() // text content of div tag
        .indexOf(`${testUsedIngredientsCount}`) // find the var value in the text
    ).not.toEqual(-1); // to be present somewhere in the .text() (=== -1 would be NOT in text)
    // here, both "-1" and -1 work in the toEqual() (because testing indexOf a number?)
  });

  // ============================================

  it("should say ALL ingredients used instead of a number, if all ingredients are used", () => {
    const testUsedIngredientsCount = 1;
    const testMissingIngredientsCount = 0;
    const wrapper = shallow(<App usedIngredientsCount={testUsedIngredientsCount} missedIngredientCount={testMissingIngredientsCount} />);

    expect(
      getElement(wrapper)("section")("recipe-list-item-used-ingredients")
        .text() // between the section element tags with the above className
        .indexOf("all") // the location of the characters/word: all
    ).not.toEqual("-1"); // should be present (not absent) in the .text() string
    // NOTE! this code requires "-1" (string), NOT -1 (number) for .toEqual()
    // CAUSE? using the ternary operator JS in JSX?
  });

  // ============================================

  it("should show a missing ingredient count if we have missing ingredients", () => {
    const testMissingIngredientsCount = 1;
    const wrapper = shallow(<App missedIngredientCount={testMissingIngredientsCount} />);

    expect(
      getElement(wrapper)("section")("recipe-list-item-missing-ingredients")
        .text() // between tags of section with this className
        .indexOf(`${testMissingIngredientsCount}`) // find index of var's value
    ).not.toEqual("-1"); // and it should not be absent
  });

  // ============================================

  it("should not show a missing ingredient count if there are no missing ingredients", () => {
    const testMissingIngredientsCount = 0;
    const wrapper = shallow(<App missedIngredientCount={testMissingIngredientsCount} />);

    expect(getElement(wrapper)("section")("recipe-list-item-missing-ingredients").length).toEqual(0);
  });

  // ============================================
});
