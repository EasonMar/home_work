const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        let i = 0;
        await driver.get('http://127.0.0.1:8080/index.html'); // 需要本地起服务,demo中通过http-server在项目根目录起了一个简易的服务
        await function(){
            do {
                driver.findElement(By.id('thumb')).click();
                i++;
            } while (i < 11)
        };
    } finally {
        await driver.quit(); // 做任何的关于小黑窗的测试一定要记得退出
    }
})();

// 但是这个测试测不出什么结果！需要想想更加合理的测试逻辑