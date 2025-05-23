import { delay, http, HttpResponse } from 'msw';
import demoFixtures from '../fixtures/demoFixture.json';

export const getDemoData200 = http.get('https://jsonplaceholder.typicode.com/users', async () => {
  await delay();

  return HttpResponse.json(demoFixtures);
});

export const getDemoData200Empty = http.get('https://jsonplaceholder.typicode.com/users', async () => {
  await delay();

  return HttpResponse.json([]);
});
