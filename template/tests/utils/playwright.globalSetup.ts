import type { FullConfig } from '@playwright/test';
import MCR from 'monocart-coverage-reports';
import { coverageOptions } from '../../mrc.e2e.config';

// eslint-disable-next-line import/no-default-export
export default (config: FullConfig) => {
  if (config.webServer && coverageOptions.enabled) {
    console.info('[playwright]  Coverage enabled with monocart');
    const mcr = MCR(coverageOptions);
    mcr.cleanCache();
  }
};
