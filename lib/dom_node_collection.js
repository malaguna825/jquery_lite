class DOMNodeCollection {
  constructor(nodelist) {
    this.nodelist = nodelist;
  }
}

each(callback){
  this.nodelist.forEach(callback)
}
  html(html) {
    if(typeof html === 'string'){
      this.each((ele)=> {
        ele.innerHTML = html;
      });
    }else {
      return this.nodelist[0].innerHTML;
    }
  }

  empty(){
    this.html("");
    //when empty call html function and pass and empty string
  }

  append(something) {
    if (something instanceof DOMNodeCollection) {
      something.elements.forEach( (el) => {
        this.append(el);
      });
    } else if (something instanceof HTMLElement) {
      this.elements.forEach( (el) => {
        el.innerHTML = el.innerHTML + something.outerHTML;
      });
    } else {
      this.elements.forEach( (el) => {
        el.innerHTML = el.innerHTML + something;
      });
    }
  }

  attr(name, value) {
   if (value === undefined) {
     return this.elements[0].getAttribute(name);
   }

   if (typeof name === 'string') {
     this.elements.forEach( (el) => {
       el.setAttribute(name, value);
     });
   } else if (typeof name === 'object') {
     this.elements.forEach( (el) => {
       for (let keys in name) {
         el.setAttribute(key, name[key]);
       }
     });
   }
 }

 addClass(newClass) {
  this.each(node => node.classList.add(newClass));
}

removeClass(oldClass) {
  this.each(node => node.classList.remove(oldClass));
}

toggleClass(toggleClass) {
  this.each(node => node.classList.toggle(toggleClass));
}

children() {
    let allChildren = [];

    this.elements.forEach( (el) => {
      allChildren.push(...el.children);
    });

    return new DOMNodeCollection(allChildren);
  }

parent() {
  let allParents = [];

  this.elements.forEach ( (el) => {
    allParents.push(el.parentNode);
  });

  return allParents;
}

find(selector) {
  const findNode = [];
  this.array.forEach((node) => {
    findNode.push(node.querySelectorAll(selector));
  });

  return new DOMNodeCollection(findNode);
}

remove() {
  this.elements.forEach( (el) => {
    el.remove();
  });
}

on(e, handler) {
  this.elements.forEach( el => {
    el.addEventListener(e, handler);
    el[`${e}Handler`] = handler;
  });
}

off(e) {
  this.elements.forEach( el => {
    let handler = el[`${e}Handler`];
    el.removeEventListener(e, handler);
  });
}
}

html(html) {
    if (typeof html === "string") {
      this.each((node) => {
        node.innerHTML = html;
      });
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  append(children) {
    if (this.nodes.length === 0) return;

    if (typeof children === 'object' &&
        !(children instanceof DomNodeCollection)) {
      // ensure argument is coerced into DomNodeCollection
      children = $l(children);
    }

    if (typeof children === "string") {
      this.each((node) => {
        node.innerHTML += children;
      });
    } else if (children instanceof DomNodeCollection) {
      // You can't append the same child node to multiple parents,
      // so we must duplicate the child nodes here.
      this.each((node) => {
        // The argument to cloneNode indicates whether or not
        // all children should be cloned.
        children.each((childNode) => {
          node.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  remove() {
    this.each(node => node.parentNode.removeChild(node));
  }

  attr(key, val) {
    if (typeof val === "string") {
      this.each(node => node.setAttribute(key, val));
    } else {
      return this.nodes[0].getAttribute(key);
    }
  }

  addClass(newClass) {
    this.each(node => node.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.each(node => node.classList.remove(oldClass));
  }

  toggleClass(toggleClass) {
    this.each(node => node.classList.toggle(toggleClass));
  }

  find(selector) {
    let foundNodes = [];
    this.each((node) => {
      const nodeList = node.querySelectorAll(selector);
      foundNodes = foundNodes.concat(Array.from(nodeList));
    });
    return new DomNodeCollection(foundNodes);
  }

  children() {
    let childNodes = [];
    this.each((node) => {
      const childNodeList = node.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });
    return new DomNodeCollection(childNodes);
  }

  parent() {
    const parentNodes = [];
    this.each(({ parentNode }) => {
      // we apply 'visited' property to prevent adding duplicate parents
      if (!parentNode.visited) {
        parentNodes.push(parentNode);
        parentNode.visited = true;
      }
    });

    parentNodes.forEach((node) => {
      node.visited = false;
    });
    return new DomNodeCollection(parentNodes);
  }
}



module.exports = DOMNodeCollection;
