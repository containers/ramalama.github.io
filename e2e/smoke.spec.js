import { test, expect } from '@playwright/test';

test('page renders without errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/');
  await expect(page.locator('#root')).not.toBeEmpty();
  expect(errors).toEqual([]);
});
