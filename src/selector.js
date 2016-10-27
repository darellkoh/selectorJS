var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

   if(matchFunc(startEl)){
    resultSet.push(startEl);
   }

   if(startEl.children.length){
    // converts the array-like obj into an array
    // could also use a for-loop
    [].slice.call(startEl.children).forEach(function(child){
      var matchingElementsStartingAtChild = traverseDomAndCollectElements(matchFunc, child);
      resultSet = resultSet.concat(matchingElementsStartingAtChild);
    });
  }
  // your code here
  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements
  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag
var selectorTypeMatcher = function(selector) {
  var type;
  if(selector[0] === "#"){
    type = "id";
  } else if (selector[0] === "."){
    type = "class";
  } else if (selector[0] !== "." && selector.slice(1).match(/[.]/g)){
    type = "tag.class";
  } else {
    type = "tag";
  }
  return type;
};


// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    // define matchFunction for id
    matchFunction = function(el){
      return el.id === selector.slice(1);
    }
  } else if (selectorType === "class") {
    // define matchFunction for classxs
    matchFunction = function(el){
    var classArr = el.className.split(" ");
        if(classArr.indexOf(selector.slice(1)) !== -1){
          return true;
        } else {
          return false;
        }
    };
  } else if (selectorType === "tag.class") {
    // define matchFunction for tag.class
    matchFunction = function(el){
      var tag = selector.split('.')[0];
      var classEl = selector.split('.')[1];
      var classArr = el.className.split(" ");
      return classArr.indexOf(classEl) !== -1 && el.tagName.toLowerCase() === tag.toLowerCase();
      }
    } else if (selectorType === "tag") {
    // define matchFunction for tag
    matchFunction = function(el){
      return el.tagName.toLowerCase() === selector.toLowerCase();
    }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
