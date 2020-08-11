/**
 * @author: Purbayan Chowdhury
 */

const makeNiceCollection = (collection) => {
  collection.each = (callback) => {
    collection.forEach((element, i) => {
      const boundFn = callback.bind(element);
      boundFn(i, element);
    });
  };

  /**
   * Add event listener
   * @param {string} eventName Contains event name
   * @param {function} handler Contains callback function
   */
  collection.on = (eventName, handler) => {
    collection.forEach((ele) => {
      ele.addEventListener(eventName, handler);
    });
  };

  /**
   * Sets or Returns the style value for the field
   * @param  {...any} cssArgs - Contains a object with style elements or a function or a string
   */
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

  /**
   * Sets or Returns the height
   * @param  {...any} args - Contains a function or a string
   */
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

  /**
   * Sets or Returns the width
   * @param  {...any} args - Contains a function or a string
   */
  collection.width = (...args) => {
    if (args.length == 0) {
      styleArray = [];
      collection.forEach((ele) => {
        styleArray.push(getComputedStyle(ele)[width].replace('px', ''));
      });
      return styleArray;
    } else {
      val = args[0];
      collection.forEach((ele) => {
        if (typeof val === 'function') val = val();
        if (typeof val === 'string') ele.style.width = val;
        else ele.style.width = val + 'px';
      });
    }
  };

  /**
   * Sets or Returns the inner HTML of the DOM element
   * @param {...any} args - Contains a function, a string or an array
   */
  collection.html = (...args) => {
    if (args.length == 0) {
      htmlList = [];
      collection.forEach((ele) => {
        htmlList.push(ele.innerHTML);
      });
      return htmlList;
    } else {
      if (args.length == 1) {
        val = args[0];
        collection.forEach((ele) => {
          if (typeof val === 'function') val = val();
          if (typeof val === 'string') ele.innerHTML = val;
          if (typeof val == 'object') {
            let v;
            collection.forEach((ele, i) => {
              if (i <= val.length) v = val[i];
              else v = val[val.length - 1];
              if (typeof v === 'function') v = v();
              if (typeof v === 'string') ele.innerHTML = v;
            });
          }
        });
      }
    }
  };

  /**
   * Sets or Returns the inner text of the DOM element
   * @param {...any} args - Contains a function, a string or an array
   */
  collection.text = (...args) => {
    if (args.length == 0) {
      textList = [];
      collection.forEach((ele) => {
        textList.push(ele.textContent);
      });
      return textList;
    } else {
      if (args.length == 1) {
        val = args[0];
        collection.forEach((ele) => {
          if (typeof val === 'function') val = val();
          if (typeof val === 'string') ele.textContent = val;
          if (typeof val == 'object') {
            let v;
            collection.forEach((ele, i) => {
              if (i <= val.length) v = val[i];
              else v = val[val.length - 1];
              if (typeof v === 'function') v = v();
              if (typeof v === 'string') ele.textContent = v;
            });
          }
        });
      }
    }
  };

  collection.hide = () => {
    collection.forEach((ele) => {
      ele.style.display = 'none';
    });
  };

  collection.show = () => {
    collection.forEach((ele) => {
      ele.style.display = '';
    });
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
