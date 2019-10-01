import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "./App";

// the basic Jest test
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// our first Enzyme DOM test
// on first run, we need to make sure that it FAILS,
// since it is testing something that doesn't exist yet.
it("renders a div with the className set to be an item card", () => {
  // create a shallow enzyme wrapper for App component
  const wrapper = shallow(<App />);
  // then write the expect() function, passing in what you expect
  expect(
    // on the (shallow App) wrapper...
    wrapper
      // return another wrapper just the divs in App,
      .find("div")
      // iterate over all divs, and where (using props()) a div
      // has prop of className="list-item-card", return all matches
      // get the length of the returned array of all matches
      .findWhere(e => e.props().className === "list-item-card").length
  )
    // and then we expect() the resulting .length to be: 1.
    // if the value in toBe() matches our expect() value, test passes.
    .toBe(1);
});
