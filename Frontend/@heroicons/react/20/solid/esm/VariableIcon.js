import * as React from "react";

function VariableIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M15.212 2.079a.75.75 0 011.006.336A16.932 16.932 0 0118 10c0 2.724-.641 5.3-1.782 7.585a.75.75 0 11-1.342-.67A15.432 15.432 0 0016.5 10c0-2.486-.585-4.834-1.624-6.915a.75.75 0 01.336-1.006zm-10.424 0a.75.75 0 01.336 1.006A15.433 15.433 0 003.5 10c0 2.486.585 4.834 1.624 6.915a.75.75 0 11-1.342.67A16.933 16.933 0 012 10c0-2.724.641-5.3 1.782-7.585a.75.75 0 011.006-.336zm2.285 3.554a1.5 1.5 0 012.219.677l.856 2.08 1.146-1.77a2.25 2.25 0 013.137-.65l.235.156a.75.75 0 11-.832 1.248l-.235-.156a.75.75 0 00-1.045.216l-1.71 2.644 1.251 3.04.739-.492a.75.75 0 11.832 1.248l-.739.493a1.5 1.5 0 01-2.219-.677l-.856-2.08-1.146 1.77a2.25 2.25 0 01-3.137.65l-.235-.156a.75.75 0 01.832-1.248l.235.157a.75.75 0 001.045-.217l1.71-2.644-1.251-3.04-.739.492a.75.75 0 01-.832-1.248l.739-.493z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = React.forwardRef(VariableIcon);
export default ForwardRef;