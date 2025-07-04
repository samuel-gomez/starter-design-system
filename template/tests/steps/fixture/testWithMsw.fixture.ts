import { createNetworkFixture, type NetworkFixture } from '@msw/playwright';
import { test as base } from './testWithCoverage.fixture';

export const test = base.extend<{ network: NetworkFixture }>({
  network: createNetworkFixture(),
});
