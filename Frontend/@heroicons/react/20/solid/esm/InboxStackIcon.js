import * as React from "react";

function InboxStackIcon({
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
    d: "M1.045 6.954a2.75 2.75 0 01.217-.678L2.53 3.58A2.75 2.75 0 015.019 2h9.962a2.75 2.75 0 012.488 1.58l1.27 2.696c.101.216.174.444.216.678A1 1 0 0119 7.25v1.5a2.75 2.75 0 01-2.75 2.75H3.75A2.75 2.75 0 011 8.75v-1.5a1 1 0 01.045-.296zm2.843-2.736A1.25 1.25 0 015.02 3.5h9.962c.484 0 .925.28 1.13.718l.957 2.032H14a1 1 0 00-.86.49l-.606 1.02a1 1 0 01-.86.49H8.236a1 1 0 01-.894-.553l-.448-.894A1 1 0 006 6.25H2.932l.956-2.032z",
    clipRule: "evenodd"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1 14a1 1 0 011-1h4a1 1 0 01.894.553l.448.894a1 1 0 00.894.553h3.438a1 1 0 00.86-.49l.606-1.02A1 1 0 0114 13h4a1 1 0 011 1v2a2 2 0 01-2 2H3a2 2 0 01-2-2v-2z"
  }));
}

const ForwardRef = React.forwardRef(InboxStackIcon);
export default ForwardRef;