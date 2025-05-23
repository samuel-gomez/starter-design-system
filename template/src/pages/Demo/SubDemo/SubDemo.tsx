import { useOutletContext, useParams } from 'react-router';
import type { Users } from '../demo.type';

export const SubDemo = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { users } = useOutletContext<{ users: Users }>();

  const currentUser = users.find(user => user.id.toString() === id);

  if (!currentUser) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <h2>SubDemo page {currentUser.name}</h2>
      <p>Name: {currentUser.username}</p>
      <p>Email: {currentUser.email}</p>
      <p>Phone: {currentUser.phone}</p>
      <p>Website: {currentUser.website}</p>
      <p>Company: {currentUser.company.name}</p>
      <p>
        Address: {currentUser.address.street}, {currentUser.address.suite}, {currentUser.address.city}, $
        {currentUser.address.zipcode}
      </p>
    </>
  );
};
