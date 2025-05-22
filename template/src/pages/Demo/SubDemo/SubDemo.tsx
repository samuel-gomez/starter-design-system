import { useOutletContext, useParams } from 'react-router';

export const SubDemo = () => {
  const { id = '' } = useParams<{ id: string }>();
  const context = useOutletContext<string>();

  return (
    <>
      <h2>SubDemo page {id}</h2>
      <p>Context: {context}</p>
    </>
  );
};
