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



module.exports = DOMNodeCollection;
