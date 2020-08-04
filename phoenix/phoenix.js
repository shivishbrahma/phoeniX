const makeNiceCollection = (collection) => {
  collection.each = (callback) => {
    collection.forEach((element, i) => {
      const boundFn = callback.bind(element);
      boundFn(i, element);
    });
  };

  collection.on = (eventName, handler) => {
    collection.forEach((ele) => {
      ele.addEventListener(eventName, handler);
    });
  };

  // Style Setter
  collection.css = (...cssArgs) => {
    if (typeof cssArgs[0] === 'string') {
      const [property, value] = cssArgs;
      if (cssArgs.length == 1) {
        styleArray = [];
        collection.forEach((ele) => {
          styleArray.push(getComputedStyle(ele)[property]);
        });
        return styleArray;
      } else {
        collection.forEach((ele) => {
          ele.style[property] = value;
        });
      }
    } else if (typeof cssArgs[0] === 'object') {
      const cssProps = Object.entries(cssArgs[0]);
      collection.forEach((ele) => {
        cssProps.forEach(([property, value]) => {
          ele.style[property] = value;
        });
      });
    }
  };

  collection.html = () => {
    htmlList = [];
    collection.forEach((ele) => {
      htmlList.push(ele.innerHTML);
    });
    return htmlList;
  };

  collection.height = (...args) => {
    if (args.length == 0) {
      styleArray = [];
      collection.forEach((ele) => {
        styleArray.push(getComputedStyle(ele)[height].replace('px', ''));
      });
      return styleArray;
    } else {
      val = args[0];
      collection.forEach((ele) => {
        if (typeof val === 'function') val = val();
        if (typeof val === 'string') ele.style.height = val;
        else ele.style.height = val + 'px';
      });
    }
  };
};

const phoenix = ($ = (...args) => {
  if (typeof args[0] === 'function') {
    // document ready listener
    const readyFn = args[0];
    document.addEventListener('DOMContentLoaded', readyFn);
  } else if (typeof args[0] === 'string') {
    // select an element!
    const selector = args[0];
    const collection = document.querySelectorAll(selector);
    makeNiceCollection(collection);
    return collection;
  } else if (args[0] instanceof HTMLElement) {
    // we have an element!
    const collection = [args[0]];
    makeNiceCollection(collection);
    return collection;
  }
});
