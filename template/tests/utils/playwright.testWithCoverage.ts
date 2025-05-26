import MCR from 'monocart-coverage-reports';
import { test as base } from 'playwright-bdd';
import { coverageOptions } from '../../mrc.e2e.config';

export const test = base.extend<{
  testWithCoverage: string;
}>({
  testWithCoverage: [
    async ({ page }, use) => {
      const isChromium = test.info().project.name === 'chromium';

      if (isChromium && coverageOptions.enabled) {
        await page.coverage.startJSCoverage({
          resetOnNavigation: false,
        });
      }

      await use('testWithCoverage');

      if (isChromium && coverageOptions.enabled) {
        const coverageList = await page.coverage.stopJSCoverage();
        const mcr = MCR(coverageOptions);
        await mcr.add(coverageList);
      }
    },
    {
      scope: 'test',
      auto: true,
    },
  ],
});
