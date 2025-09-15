import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly allCategoriesBtn: Locator;
  readonly searchBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allCategoriesBtn = page.getByRole('button', { name: 'All Categories' });
    this.searchBtn = page.getByRole('button', { name: 'Search' });
  }

  async goto() {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/');
  }

async navigateToCategory(categoryName: string) {
    await this.allCategoriesBtn.click();
    const categoryLink = this.page.getByRole('link', { name: categoryName });
    await categoryLink.last().click();
    await this.searchBtn.click();
  }
}
