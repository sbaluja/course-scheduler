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
    //change to light mode
    //await driver.findElement(By.xpath("/html/body/div[@id='root']/div[@class='sc-bqWxrE icnFdN']/div[@class='sc-eDvSVe fptgUy']/div[@class='sc-jSUZER ekoNyg']/nav[@class='sc-gKPRtg dZDTME'][2]/ul[@class='sc-iBYQkv fcEJIw']/button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-78trlr-MuiButtonBase-root-MuiIconButton-root']/svg[@class='[object SVGAnimatedString]']/path[@class='[object SVGAnimatedString]']")).click()
    //await new Promise(r => setTimeout(r, 3000));
    //click hamburger menu
    await driver.findElement(By.className("hamburger-react")).click()
    await new Promise(r => setTimeout(r, 3000));
    //click schedule button
    await driver.findElement(By.xpath("/html/body/div[@id='root']/div[@class='sc-bqWxrE jxkCbS']/div[@class='sc-eDvSVe kTbxze']/div[@class='sc-kDvujY bVyHgE']/ul[@class='sc-iBYQkv eRYPgv']/li[@class='sc-ipEyDJ jQHXw'][3]/a[@class='sc-csuSiG hQDsDa']")).click()
    await new Promise(r => setTimeout(r, 13000));
    //find the schedulur list of courses
    var courseList = await driver.findElements(By.className("sc-cabOPr bFGGnt"))
    await new Promise(r => setTimeout(r, 3000));
    //assert there is courses present
    assert(courseList.length > 0)
    await new Promise(r => setTimeout(r, 3000));
    //open fall/winter dropdown
    await driver.findElement(By.xpath("/html/body/div[@id='root']/div[@class='sc-bqWxrE jxkCbS']/div[@class='sc-iTFTee eODSPT']/div[@class='dropdown']/button[@id='dropdown-basic']")).click()
    await new Promise(r => setTimeout(r, 3000));
    //change to fall
    await driver.findElement(By.xpath("/html/body/div[@id='root']/div[@class='sc-bqWxrE jxkCbS']/div[@class='sc-iTFTee eODSPT']/div[@class='show dropdown']/div[@class='dropdown-menu show']/a[@class='dropdown-item'][1]")).click()
    await new Promise(r => setTimeout(r, 3000));
    //find the schedulur list of courses
    var courseList = await driver.findElements(By.className("sc-cabOPr bFGGnt"))
    await new Promise(r => setTimeout(r, 3000));
    //assert there is courses present
    assert(courseList.length > 0)

    //toggle on fourth year
    await driver.findElement(By.name("Fourth Year")).click();
    await new Promise(r => setTimeout(r, 3000));
    //click update filter
    await driver.findElement(By.id("addFilterBtn")).click();
    await new Promise(r => setTimeout(r, 5000));
    //check the length of the course list went to x amount
    var newCourseList = await driver.findElements(By.className("sc-cabOPr bFGGnt"));
    assert(newCourseList.length > 0 && newCourseList.length < courseList.length);
    await new Promise(r => setTimeout(r, 10000));
    
  } finally {
    //close the browser
    await driver.quit();
  }
}

test();
