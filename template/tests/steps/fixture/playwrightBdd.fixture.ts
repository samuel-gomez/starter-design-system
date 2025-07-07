import { createNetworkFixture, type NetworkFixture } from '@msw/playwright';
import { createBdd, test as base } from 'playwright-bdd';
import { createTestWithCoverageFixture, TestWithCoverage } from '../../utils/createTestWithCoverageFixture';

type Fixtures = {
  network: NetworkFixture;
  testWithCoverage: TestWithCoverage;
};

export const test = base.extend<Fixtures>({
  network: createNetworkFixture(),
  testWithCoverage: createTestWithCoverageFixture(),
});

export const { Given, When, Then } = createBdd(test);
