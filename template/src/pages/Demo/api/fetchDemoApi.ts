import { fetchApi } from '../../../shared/helpers/fetchApi/fetchApi';
import { Users } from '../demo.type';

export const fetchDemoApi = async () => {
  const users = await fetchApi<Users>({
    path: 'https://jsonplaceholder.typicode.com/users',
  });

  return users.map(user => ({ ...user, username: user.username.toUpperCase(), email: user.email.toLowerCase() }));
};
