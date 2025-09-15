import { Page, Locator, expect } from '@playwright/test';
import { NumberUtils } from '../utils/numberUtils';

export class ProductPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly priceLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('#input-sort-212464');
    this.priceLocator = page.locator('.price-new');
  }

    async sortBy(label: string) {
    await this.sortDropdown.selectOption({ label });
    await this.priceLocator.first().waitFor({ state: 'visible' });
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.priceLocator.allTextContents();
    return texts.map(NumberUtils.parsePrice);
  }

  async verifyPricesDescending() {
    const prices = await this.getPrices();
    NumberUtils.verifyArrayDescending(prices, 'prices');
  }
}
