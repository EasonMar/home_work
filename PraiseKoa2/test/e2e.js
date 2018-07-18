// var webdriver = require('selenium-webdriver'),
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

const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://localhost:3000/index/index');
    await driver.sleep(2000);
    await driver.findElement(By.id('thumb')).click();
    await driver.wait(driver.findElement(By.id('animation')).isDisplayed(), 5000);
    await driver.sleep(2000);
  } finally {
    await driver.quit();
  }
})();