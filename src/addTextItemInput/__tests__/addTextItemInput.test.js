import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import getElement from "../../common/utils/getElement";

import AddTextItemInput from "../components/AddTextItemInput";

// "setup" function creates an "input" object to pass for testing,
// who's properties either accept a manually set value on-site,
// or have default values for all properties not manually set.
// arrow function accepts object property key:value pair,
// which it then assigns to input.key (key === property key name passed)
const setup = (input = {}) => ({
  id: input.id || "id",
  placeholder: input.placeholder || "placeholder",
  value: input.value || "value",
  changeHandler: input.changeHandler || jest.fn(),
  addHandler: input.addHandler || jest.fn(),
  // !! (double negation) operator coerces truthy non-Boolean value
  // into an actual Boolean value (TRUE or FALSE)
  canAddItem: !!input.canAddItem
});

describe("AddTextItemInput", () => {
  // basic Jest test
  
  it("renders without crashing", () => {
    const testEnv = setup(); // setup's input object, all default values
    const div = document.createElement("div");
    // ... spread operator adds all testEnv setup() properties to AddTextItemInput
    ReactDOM.render(<AddTextItemInput {...testEnv} />, div);
  });


  it("passes the id prop to a label", () => {
    // assign a custom id: value to the setup() object
    const testEnv = setup({ id: "batId" });
    // do a shallow enzyme wrap of component with all setup() object properties added
    const wrapper = shallow(<AddTextItemInput {...testEnv} />);
    // use getElement helper to select all <label>s with className="sr-only"
    // as an array of items, and expect() the length of that array .toBe() only 1,
    // i.e., there is only one <label> with className="sr-only",
    // and if it exists, then that means it successfully recieved the setup() props
    expect(getElement(wrapper)("label")("sr-only").length).toBe(1);
  });


  it("passes the id prop to the id of a text input", () => {
    const testEnv = setup({ id: "batId" });
    const wrapper = shallow(<AddTextItemInput {...testEnv} />);
    // check <input className="form-control"> to see if the test props in setup()
    // successfully passed it the property id="batId"
    expect(getElement(wrapper)("input")("form-control").props().id).toBe("batId");
  });


  it("passes the placeholder prop to the placeholder of a text input", () => {
    const testEnv = setup({ placeholder: "batSignal" });
    const wrapper = shallow(<AddTextItemInput {...testEnv} />);
    // check to see if <input className="form-control">
    // was passed the test placeholder="batSignal" property value
    expect(getElement(wrapper)("input")("form-control").props().placeholder).toBe("batSignal");
  });


  it("passes the value prop to the value of a text input", () => {
    const testEnv = setup({ value: `I'm Batman` });
    const wrapper = shallow(<AddTextItemInput {...testEnv} />);
    // check to see if <input> was passed: value="I'm Batman"
    expect(getElement(wrapper)("input")("form-control").props().value).toBe(`I'm Batman`);
  });


  it("calls the changeHandler on props with current value when input changes", () => {
    const testEnv = setup({
      changeHandler: jest.fn(),
      value: `I'm Batman`
    });
    const wrapper = shallow(<AddTextItemInput {...testEnv} />);
    // get the <input>, and .simulate a "change" event,
    // and set the event.target.value to setup()'s test .value
    getElement(wrapper)("input")("form-control").simulate("change", { target: { value: testEnv.value } });
    // and expect the dummy .changeHandler function to be passed the dummy .value value
    // by the actual component code
    expect(testEnv.changeHandler).toBeCalledWith(testEnv.value);
  });


  it("does not call addHandler callback on props for any key press that was not ENTER", () => {
    const testEnv = setup({
      addHandler: jest.fn(),
      canAddItem: true
    });
    const wrapper = shallow(<AddTextItemInput {...testEnv} />);
    // enzyme .simulate() pressing the SHIFT key
    getElement(wrapper)("input")("form-control").simulate("keyPress", { key: "Shift" });
    // and expect the dummy addHandler jest.fn() to NOT have been called
    expect(testEnv.addHandler).not.toHaveBeenCalled();
  });


  it("does not call addHandler callback if the ENTER key is pressed but canAddItem is FALSE", () => {
    const testEnv = setup({
      addHandler: jest.fn(),
      canAddItem: false
    });
    const wrapper = shallow(<AddTextItemInput {...testEnv} />);
    // enzyme .simulate() pressing the ENTER key
    getElement(wrapper)("input")("form-control").simulate("keyPress", { key: "Enter" });
    // and expect the dummy addHandler jest.fn() to NOT have been called
    expect(testEnv.addHandler).not.toHaveBeenCalled();
  });


  it("does call addHandler callback when ENTER key is pressed", () => {
    const testEnv = setup({
      addHandler: jest.fn(),
      canAddItem: true
    });
    const wrapper = shallow(<AddTextItemInput {...testEnv} />);
    // enzyme .simulate() pressing the ENTER key
    getElement(wrapper)("input")("form-control").simulate("keyPress", { key: "Enter" });
    // and expect the dummy addHandler jest.fn() to have been called
    expect(testEnv.addHandler).toHaveBeenCalled();
  });


  it("does call addHandler callback when component's button is pressed", () => {
    const testEnv = setup({
      addHandler: jest.fn(),
      canAddItem: true
    });
    const wrapper = shallow(<AddTextItemInput {...testEnv} />);
    // get the input button attached to input field and simulate a click on it
    getElement(wrapper)("button")("btn-succes").simulate("click");
    // and expect the dummy addHandler jest.fn() to have been called
    expect(testEnv.addHandler).toHaveBeenCalled();
  });


  it("does not call addHandler callback when component's button is pressed but canAddItem is false", () => {
    const testEnv = setup({
      addHandler: jest.fn(),
      canAddItem: false
    });
    const wrapper = shallow(<AddTextItemInput {...testEnv} />);
    // get the input button attached to input field and simulate a click on it
    getElement(wrapper)("button")("btn-succes").simulate("click");
    // and expect the dummy addHandler jest.fn() to NOT have been called
    expect(testEnv.addHandler).not.toHaveBeenCalled();
  });


  it("disables the add item button when canAddItem prop is FALSE", () => {
    const testEnv = setup({
      canAddItem: false
    });
    const wrapper = shallow(<AddTextItemInput {...testEnv} />);
    // get the add item button AND expect it's property: disabled="true"
    expect(getElement(wrapper)("button")("btn-succes").props().disabled.toBe(true);
  });
  //
}); // end describe()
