'use strict';

require('babel-polyfill');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // var webdriver = require('selenium-webdriver'),
//     By = webdriver.By;

// var driver = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();

//     driver.get("http://localhost:3000/index/index");
//     driver.findElement(By.id('thumb')).click();

//     const _animation=driver.findElement(By.id('animation'));
//     // console.log(_animation.isDisplayed());
//     // WebElement.isDisplayed(): Test whether this element is currently displayed.	
//     // Returns: A promise that will be resolved with whether this element is currently visible on the page.
//     driver.wait(_animation.isDisplayed(),10000);
//     // driver.wait：Waits for a condition to evaluate to a "truthy" value. 
//     // The condition may be specified by a Condition, as a custom function, or as any promise-like thenable.
//     driver.quit(); // 一定要退出

var _require = require('selenium-webdriver'),
    Builder = _require.Builder,
    By = _require.By,
    Key = _require.Key,
    until = _require.until;

(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var driver;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new Builder().forBrowser('firefox').build();

          case 2:
            driver = _context.sent;
            _context.prev = 3;
            _context.next = 6;
            return driver.get('http://localhost:3000/index/index');

          case 6:
            _context.next = 8;
            return driver.findElement(By.id('thumb')).click();

          case 8:
            _context.next = 10;
            return driver.wait(driver.findElement(By.id('animation')).isDisplayed(), 100000);

          case 10:
            _context.prev = 10;
            _context.next = 13;
            return driver.quit();

          case 13:
            return _context.finish(10);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3,, 10, 14]]);
  }));

  function example() {
    return _ref.apply(this, arguments);
  }

  return example;
})()();
