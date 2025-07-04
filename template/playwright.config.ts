import { defineConfig, devices } from '@playwright/test';
import { cucumberReporter, defineBddConfig } from 'playwright-bdd';

const appUrl = 'http://localhost:3000';

export default defineConfig({
  testDir: defineBddConfig({
    features: ['tests/features/**/*.feature'],
    featuresRoot: './tests/features/',
    outputDir: './tests/.features-gen',
    steps: ['tests/steps/**/*.stepDefinition.ts', 'tests/steps/**/*.fixture.ts'],
  }),
  outputDir: './test-reports/e2e/test-results',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    cucumberReporter('junit', {
      outputFile: 'test-reports/e2e/junit-report.xml',
      suiteName: 'playwright e2e tests',
    }),
  ],
  globalSetup: 'tests/utils/playwright.globalSetup.ts',
  globalTeardown: 'tests/utils/playwright.globalTeardown.ts',
  use: {
    baseURL: appUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Firefox Desktop'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run build -- --mode test && npm run preview',
    url: appUrl,
    stdout: 'pipe',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
