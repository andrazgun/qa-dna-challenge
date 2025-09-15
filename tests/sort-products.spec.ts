import { test } from '@playwright/test';
import { HomePage } from './pageobjects/homepage';
import { ProductPage } from './pageobjects/productPage';

test.describe('Product Sorting Validation', () => {
  test('should sort products by Price (High > Low)', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.goto();
    await homePage.navigateToCategory('Desktops');
    await productPage.sortBy('Price (High > Low)');
    await productPage.verifyPricesDescending();
  });
});
