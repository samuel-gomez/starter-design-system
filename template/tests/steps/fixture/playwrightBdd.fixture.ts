import { createBdd } from 'playwright-bdd';
import { test } from './testWithMsw.fixture';

export const { Given, When, Then } = createBdd(test);
