import { delay, http, HttpResponse } from 'msw';
import { users } from '../fixtures/demoFixture';

export const getDemoData200 = http.get('https://jsonplaceholder.typicode.com/users', async () => {
  await delay();

  return HttpResponse.json(users);
});

export const getDemoData200Empty = http.get('https://jsonplaceholder.typicode.com/users', async () => {
  await delay();

  return HttpResponse.json([]);
});
