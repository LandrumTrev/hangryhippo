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

  
});

// // ============================================
// PRELIMINARY TESTS
// // ============================================

// // our first Enzyme DOM test
// // on first run, we need to make sure that it FAILS,
// // since it is testing something that doesn't exist yet.
// it("renders a div with the className set to be an item card", () => {
//   // create a shallow enzyme wrapper for App component
//   const wrapper = shallow(<App />);
//   // then write the expect() function, passing in what you expect
//   expect(
//     // expect on the wrapper (App component)
//     wrapper
//       // find() returns all divs as an array
//       .find("div")
//       // findWhere() iterates all divs (each div iterated is "e")
//       // and finds each div with a property of className="list-card-item".
//       // then return the .length of resulting .findWhere()'s array
//       .findWhere(e => e.props().className === "list-item-card").length
//   )
//     // and then we expect() the resulting .length to be: 1.
//     // if the value in toBe() matches our expect() value, test passes.
//     .toBe(1);
// });

// // ============================================

// // second Enzyme test, to see if our mocked DefaultProps render properly
// it("renders a stringified version of props in the div", () => {
//   // create shallow Enzyme wrapper for App component
//   const wrapper = shallow(<App />);
//   // the test
//   expect(
//     // expect on the wrapper (App component)
//     wrapper
//       // find() returns all divs as an array
//       .find("div")
//       // findWhere() iterates all divs (each div iterated is "e")
//       // and finds each div with a property of className="list-card-item"
//       // then return Enzyme's .text(), content rendered inside that/those div(s)
//       .findWhere(e => e.props().className === "list-item-card")
//       .text()
//     // and expect that .text() to be App's defaultProps (after stringifying JSON)
//   ).toBe(JSON.stringify(App.defaultProps));
// });

// // ============================================
