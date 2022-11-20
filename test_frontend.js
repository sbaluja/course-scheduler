require("chromedriver");
const assert = require("assert");

const {Builder, By, Key, until, WebElement} = require('selenium-webdriver');

async function test() {
  //open Chrome browser
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    //open the website
    await driver.get('https://131.104.49.100/');
    await new Promise(r => setTimeout(r, 3000));
    //click hamburger menu
    await driver.findElement(By.xpath("/html/body/div[@id='root']/div[@class='sc-csuSiG bIeGCJ']/div[@class='sc-hLBbgP iqrZZa']/div[@class='sc-eDvSVe djHnMO']/div[@class='sc-pyfCe iemarC']/div[@class='hamburger-react']")).click()
    await new Promise(r => setTimeout(r, 3000));
    //click schedule button
    await driver.findElement(By.xpath("/html/body/div[@id='root']/div[@class='sc-csuSiG bIeGCJ']/div[@class='sc-hLBbgP iqrZZa']/div[@class='sc-jrcTuL eqFosN']/ul[@class='sc-gKPRtg VtAXQ']/li[@class='sc-kDvujY mihwM'][3]/a[@class='sc-ipEyDJ gqbUTD']")).click()
    await new Promise(r => setTimeout(r, 3000));
    //find the schedulur list of courses
    var courseList = await driver.findElements(By.className("sc-hhOBVt edawTc"))
    await new Promise(r => setTimeout(r, 3000));
    //assert there is courses present
    assert(courseList.length > 0)
    await new Promise(r => setTimeout(r, 3000));
    //open fall/winter dropdown
    await driver.findElement(By.xpath("/html/body/div[@id='root']/div[@class='sc-csuSiG bIeGCJ']/div[@class='sc-gYbzsP gtuSvY']/div[@class='dropdown']/button[@id='dropdown-basic']")).click()
    await new Promise(r => setTimeout(r, 3000));
    //change to fall
    await driver.findElement(By.xpath("/html/body/div[@id='root']/div[@class='sc-csuSiG bIeGCJ']/div[@class='sc-gYbzsP gtuSvY']/div[@class='show dropdown']/div[@class='dropdown-menu show']/a[@class='dropdown-item'][1]")).click()
    await new Promise(r => setTimeout(r, 3000));
    //find the schedulur list of courses
    var courseList = await driver.findElements(By.className("sc-hhOBVt edawTc"))
    await new Promise(r => setTimeout(r, 3000));
    //assert there is courses present
    assert(courseList.length > 0)
    //find the search box and enter webdriver as the search term
    await new Promise(r => setTimeout(r, 10000));
    //wait for the page to load
    
  } finally {
    //close the browser
    await driver.quit();
  }
}

test();
