import { expect } from '@playwright/test';
import { DataTable } from 'playwright-bdd';
import { getDemoData200 } from '../../mocks/handlers/demoHandlers';
import { Given, Then, When } from './fixture/playwrightBdd.fixture';

Given('All users are loaded from the API', async ({ network }) => {
  network.use(getDemoData200);
});

Given('I am on the home page', async ({ page }) => {
  await page.goto('/');
});

Given('I am on the Demo page', async ({ page }) => {
  await page.goto('/demo');
});

When('I click on the link {string}', async ({ page }, linkText) => {
  await page.getByRole('link', { name: linkText, exact: true }).click();
});

When('I click on the user name {string}', async ({ page }, userName) => {
  await page.getByRole('link', { name: userName }).click();
});

Then('I am redirected to the Demo page', async ({ page }) => {
  await page.waitForURL('/demo');

  await expect(page.getByRole('heading', { name: 'Demo page', level: 1 })).toBeVisible();
});

Then('I am redirected to the home page', async ({ page }) => {
  await page.waitForURL('/');

  await expect(page.getByRole('heading', { name: 'Home page', level: 1 })).toBeVisible();
});

Then('I see the list of users', async ({ page }, dataTable: DataTable) => {
  const data = dataTable.hashes() as Record<'user', string>[];

  await Promise.all(
    data.map(async row => {
      const userName = row.user;
      await expect(page.getByRole('link', { name: userName })).toBeVisible();
    }),
  );
});

Then('I see the SubDemo page for {string}', async ({ page }, userName) => {
  await expect(page.getByRole('heading', { name: userName, level: 2 })).toBeVisible();
});

Then("The user's information is displayed", async ({ page }, dataTable: DataTable) => {
  const data = dataTable.hashes() as Record<string, string>[];

  await Promise.all(
    data.map(row => {
      Object.keys(row).forEach(async key => {
        await expect(page.getByText(`${key}: ${row[key]}`)).toBeVisible();
      });
    }),
  );
});
