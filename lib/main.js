
const DOMNodeCollection = require('./dom_node_collection.js');

let queue = [];
Window.prototype.$l = function (element) {
  if ((typeof element === "function") && (document.readyState !== "complete")) {
    queue.push(element);
    return;
  }

  let elArray;
  if (element instanceof HTMLElement) {
    elArray = [element];
  } else {
    let nodes = document.querySelectorAll(element);
    elArray = Array.from(nodes);
  }

  return new DOMNodeCollection(elArray);
};
