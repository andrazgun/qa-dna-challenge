import { test, expect } from '@playwright/test';

test.describe('Product Sorting Validation', () => {
  test('should sort products by Price (High > Low)', async ({ page }) => {
    // Navigate to product list page (Headphones chosen as example)

    const allCategoriesBtn = page.getByRole('button', { name: 'All Categories' });
    const desktopsLink = page.getByRole('link', { name: 'Desktops' });
    const searchBtn = page.getByRole('button', { name: 'Search' });
    const defaultOption = page.locator('[id="input-sort-212464"]');
    const priceLocator = page.locator('[class="price-new"]');

    await page.goto('https://ecommerce-playground.lambdatest.io/');

    await allCategoriesBtn.click();
    await desktopsLink.last().click();
    await searchBtn.click();

    // Select "Price (High > Low)" from sort dropdown
    await defaultOption.selectOption({ label: 'Price (High > Low)' });
    await page.locator('[class="price-new"]').first().waitFor({ state: 'visible' });

    // Extract all prices as numbers
    const prices = await priceLocator.allTextContents().then(texts => texts.map(text => parseFloat(text.replace(/[^0-9.]/g, ''))));

    // Validate that prices are in descending order
    const isDescending = prices.every((price, i) => i === 0 || price <= prices[i - 1]);
    // expect(isDescending).toBe(true);
    // expect(isDescending).toBe(true, `Prices are not in descending order: ${prices.join(', ')}`);

    if (!isDescending) {
      throw new Error(`Prices are not in descending order: ${prices.join(', ')}`);
    }
    expect(isDescending).toBeTruthy();
  });
});
