// this simple file performs two basic setups in order to use Enzyme tests

// install a polyfill for requestAnimationFrame
// which React needs, but Jest lacks. see:
// https://reactjs.org/docs/javascript-environment-requirements.html#___gatsby
import "raf/polyfill";

// import the enzyme easier-setup tool
// https://airbnb.io/enzyme/docs/installation/react-16.html
import "enzyme-react-16-adapter-setup";
