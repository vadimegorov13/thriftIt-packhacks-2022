import { Text } from '@mantine/core';
import { doc, getFirestore } from 'firebase/firestore';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import Layout from '../../components/Layout/Layout';
import UserPage from '../../components/User/UserPage';
import { app } from '../../firebase/firebase';
import { usePost } from '../../hooks/usePost';
import { PostData, UserData } from '../../types';

const User: NextPage<{ id: string }> = ({ id }) => {
  const [post, setPost] = useState<PostData | null>(null);
  const { getPost } = usePost();

  const [userData, userDataLoading] = useDocumentOnce(
    doc(getFirestore(app), 'users', `${id}`)
  );

  useEffect(() => {
    let isSubscribed = true;

    getPost(id, setPost, isSubscribed);
    console.log('id: ', id);
    console.log('post: ', post);

    return () => {
      isSubscribed = false;
    };
  }, []);

  let body;

  if (userDataLoading) {
    body = (
      <Text align="center" size="xl">
        Loading...
      </Text>
    );
  } else if (!userData) {
    body = (
      <Text align="center" size="xl">
        This user does not exist
      </Text>
    );
  } else {
    body = <UserPage user={userData.data() as UserData} />;
  }

  return <Layout>{body}</Layout>;
};

User.getInitialProps = ({ query }) => {
  return {
    id: query.slug as string,
  };
};

export default User;
