import * as React from "react";

function CurrencyPoundIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9.763 9.51a2.25 2.25 0 013.828-1.351.75.75 0 001.06-1.06 3.75 3.75 0 00-6.38 2.252c-.033.307 0 .595.032.822l.154 1.077H8.25a.75.75 0 000 1.5h.421l.138.964a3.75 3.75 0 01-.358 2.208l-.122.242a.75.75 0 00.908 1.047l1.539-.512a1.5 1.5 0 01.948 0l.655.218a3 3 0 002.29-.163l.666-.333a.75.75 0 10-.67-1.342l-.667.333a1.5 1.5 0 01-1.145.082l-.654-.218a3 3 0 00-1.898 0l-.06.02a5.25 5.25 0 00.053-1.794l-.108-.752H12a.75.75 0 000-1.5H9.972l-.184-1.29a1.863 1.863 0 01-.025-.45z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = React.forwardRef(CurrencyPoundIcon);
export default ForwardRef;