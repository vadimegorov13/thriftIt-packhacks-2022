import { Avatar, Button, Card, Center, Title } from '@mantine/core';
import { Lock } from 'tabler-icons-react';
import { useAuth } from '../hooks/useAuth';

const SignInComponent = () => {
  const { signInWithGoogle, signInWithGitHub } = useAuth();

  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <Card shadow="sm">
        <Center m={2}>
          <Avatar color="blue" radius="lg" size="lg">
            <Lock size={40} />
          </Avatar>
        </Center>

        <Title order={3} align="center">
          Sign In
        </Title>
        <Card.Section mb={2}>
          <Button onClick={signInWithGoogle}> Sign in with google</Button>
          <Button onClick={signInWithGitHub}> Sign in with github</Button>
        </Card.Section>
      </Card>
    </div>
  );
};

export default SignInComponent;
