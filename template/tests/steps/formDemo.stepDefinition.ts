import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

Given('I am on the FormDemo page', async ({ page }) => {
  await page.goto('/form-demo');
});

When('I fill the email field with {string}', async ({ page }, email) => {
  await page.getByLabel('Email').fill(email);
});

When('I fill the password field with {string}', async ({ page }, password) => {
  await page.getByLabel('Password').fill(password);
});

When('I submit the login form', async ({ page }) => {
  await page.getByRole('button', { name: 'Login' }).click();
});

Then('I should see the error message {string}', async ({ page }, errorMsg) => {
  await expect(page.getByText(errorMsg)).toBeVisible();
});

Then('I should not see the error message {string}', async ({ page }, errorMsg) => {
  await expect(page.getByText(errorMsg)).toHaveCount(0);
});
