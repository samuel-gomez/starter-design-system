import type { FullConfig } from '@playwright/test';
import MCR from 'monocart-coverage-reports';
import { coverageOptions } from '../../mrc.e2e.config';

// eslint-disable-next-line import/no-default-export
export default async (config: FullConfig) => {
  if (config.webServer && coverageOptions.enabled) {
    const mcr = MCR(coverageOptions);
    await mcr.generate();
  }
};
