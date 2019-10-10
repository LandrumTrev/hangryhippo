// shortcut helper function for getting element by class as a wrapper for testing

// Curried helper function to eliminate repeating this code,
// note () instead of {} so we're returning the result.
// Finds a type of element whose classes contain a specified class

// call this like:
// expect(getElement(wrapper)("section")("recipe-list-item-title").text()).toEqual(testTitle);

const getElement = wrapper => elementType => classToSearchFor =>
  wrapper
    //
    .find(elementType)
    .findWhere(e => e.props().className && e.props().className.indexOf(classToSearchFor) !== -1);

export default getElement;
