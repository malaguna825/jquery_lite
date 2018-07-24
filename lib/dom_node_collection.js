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




module.exports = DOMNodeCollection;
