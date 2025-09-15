import { expect } from '@playwright/test';

export class NumberUtils {
  /**
   * Convert a formatted string price to number
   * Example: "$1,234.56" => 1234.56
   */
  static parsePrice(text: string): number {
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  /**
   * Check if a numeric array is in descending order
   * Throws a Playwright expect error if not
   */
  static verifyArrayDescending(arr: number[], context = 'array'): void {
    for (let i = 1; i < arr.length; i++) {
      expect(
        arr[i] <= arr[i - 1],
        `${context} is not descending at index ${i}: ${arr[i]} > ${arr[i - 1]}`
      ).toBeTruthy();
    }
  }
}
