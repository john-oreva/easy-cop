require('dotenv').config();

const { add } = require('lodash');
//const createCursor = require('ghost-cursor');
//const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const URL = 'https://kith.com/collections/mens-footwear/products/aagw3955';


var kith = (async()=>{

    const browser = await puppeteer.launch ({ignoreHTTPSErrors: true, headless: false, slowMo: 200});
    const page = await browser.newPage();

    const firstName = await page.$('input#CheckoutData_BillingFirstName');
    const lastName = await page.$('input#CheckoutData_BillingLastName');
    const email = await page.$('input#CheckoutData_Email');
    const address = await page.$('input#CheckoutData_BillingAddress1');
    const city = await page.$('input#BillingCity');
    const postal = await page.$('input#BillingZIP');
    const phone = await page.$('input#CheckoutData_BillingPhone');
    const cardSelector = await page.$('input#cardNum');
    const securitySelector = await page.$('input#cvdNumber');

    
    //const cursor = createCursor(page)
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(URL);

    await page.select("#SingleOptionSelector-0", '9.5');
    await page.waitForTimeout(4000);
    await page.click("button.btn.product-form__add-to-cart", btn => btn.click());
    await page.waitForTimeout(2000);
    await page.click("button.btn.ajaxcart__checkout", btn => btn.click());

    await page.waitForTimeout(5000);
    

    await page.waitForSelector(firstName);
    await page.click(firstName);
    await page.type(firstName, 'Jane',
    {delay:10});

    await page.waitForTimeout(2000);

    await page.waitForSelector(lastName);
    await page.type(lastName,'Doe', 
    {delay:10});

    await page.waitForTimeout(2000);

    await page.waitForSelector(email);
    await page.type(lastName,'janedoe@gmail.com', 
    {delay:10});

    await page.waitForTimeout(2000);

    await page.waitForSelector(address);
    await page.type(address, process.env.STREET_ADDRESS, 
    {delay:10});

    await page.waitForTimeout(2000);

    await page.waitForSelector(city);
    await page.type(city, process.env.ADDRESS_CITY, 
    {delay:10});

    await page.waitForTimeout(2000);

    await page.waitForSelector(postal);
    await page.type(postal, process.env.ADDRESS_POSTAL, 
    {delay:10});

    await page.waitForTimeout(2000);

    await page.select("#BillingStateID", "12948");

    await page.waitForTimeout(2000);

    await page.waitForSelector(phone);
    await page.type(page,'2263505748', 
    {delay:10});

    await page.waitForTimeout(2000);

    await page.cardSelector(cardSelector);
    await page.type(cardSelector, process.env.CARD_NUMBER, 
    {delay:10});

    await page.waitForTimeout(2000);

    await page.select(process.env.EXPIRATION_MONTH);

    await page.waitForTimeout(2000);

    await page.select(process.env.EXPIRATION_YEAR);

    await page.waitForTimeout(2000);

    await page.waitForSelector(securitySelector);
    await page.type(securitySelector, process.env.SECURITY_CODE, 
    {delay:10});

    await page.waitForTimeout(2000);

    await page.click('button.btn.checkout-button-1.btnPay', btn => btn.click());
})();