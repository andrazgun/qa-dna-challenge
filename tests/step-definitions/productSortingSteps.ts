import { Given, When, Then, Before, After, setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, Page, Browser } from '@playwright/test';
import { HomePage } from '../pageobjects/homepage';
import { ProductPage } from '../pageobjects/productPage';

class CustomWorld extends World {
  page!: Page;
  browser!: Browser;
  homePage!: HomePage;
  productPage!: ProductPage;
}

setWorldConstructor(CustomWorld);

// Launch browser and page before each scenario
Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.page = await this.browser.newPage();
  this.homePage = new HomePage(this.page);
  this.productPage = new ProductPage(this.page);
});

// Close browser after each scenario
After(async function () {
  if (this.page) await this.page.close();
  if (this.browser) await this.browser.close();
});

Given('I am on the homepage', async function () {
  await this.homePage.goto();
});

When('I navigate to the {string} category', async function (categoryName: string) {
  await this.homePage.navigateToCategory(categoryName);
});

When('I sort products by Price High to Low', async function () {
  await this.productPage.sortByPriceHighToLow();
});

Then('I should see the products sorted in descending order', async function () {
  await this.productPage.verifyPricesDescending();
});
