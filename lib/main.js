const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = (arg) => {
  switch (typeof arg) {
    case "string":
      const nodes = document.querySelectorAll(arg);
      const nodesArr = Array.from(nodes);
      return new DOMNodeCollection(nodesArr);
    case "object":
      if (arg instanceof HTMLElement) {
      return new DOMNodeCollection([arg]);
    }
  }
};

window.$l = $l;
