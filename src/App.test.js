import React from "react";
import ReactDOM from "react-dom";
// enzyme's "shallow" does NOT render/test any child components
// use "mount" instead to render/test full DOM tree of children
import { shallow } from "enzyme";
import App from "./App";

// ============================================

// the default Jest test
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// ============================================

// our first Enzyme DOM test
// on first run, we need to make sure that it FAILS,
// since it is testing something that doesn't exist yet.
it("renders a div with the className set to be an item card", () => {
  // create a shallow enzyme wrapper for App component
  const wrapper = shallow(<App />);
  // then write the expect() function, passing in what you expect
  expect(
    // expect on the wrapper (App component)
    wrapper
      // find() returns all divs as an array
      .find("div")
      // findWhere() iterates all divs (each div iterated is "e")
      // and finds each div with a property of className="list-card-item".
      // then return the .length of resulting .findWhere()'s array
      .findWhere(e => e.props().className === "list-item-card").length
  )
    // and then we expect() the resulting .length to be: 1.
    // if the value in toBe() matches our expect() value, test passes.
    .toBe(1);
});

// ============================================

// second Enzyme test, to see if our mocked DefaultProps render properly
it("renders a stringified version of props in the div", () => {
  // create shallow Enzyme wrapper for App component
  const wrapper = shallow(<App />);
  // the test
  expect(
    // expect on the wrapper (App component)
    wrapper
      // find() returns all divs as an array
      .find("div")
      // findWhere() iterates all divs (each div iterated is "e")
      // and finds each div with a property of className="list-card-item"
      // then return Enzyme's .text(), content rendered inside that/those div(s)
      .findWhere(e => e.props().className === "list-item-card")
      .text()
    // and expect that .text() to be App's defaultProps (after stringifying JSON)
  ).toBe(JSON.stringify(App.defaultProps));
});

// ============================================

