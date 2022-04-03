import {
  Avatar,
  Box,
  Group,
  Paper,
  Popper,
  UnstyledButton,
  Text,
  createStyles,
} from '@mantine/core';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  logoutButton: {
    display: 'block',
    borderRadius: theme.radius.sm,
    color: 'black',
    backgroundColor: theme.colors.pink[3],
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  createButton: {
    display: 'block',
    borderRadius: theme.radius.sm,
    color: 'black',
    backgroundColor: theme.colors.cyan[3],
    '&:hover': {
      backgroundColor: 'white',
    },
  },
}));

const UserDropdown = () => {
  const { classes } = useStyles();
  const { user, loading, signOut } = useAuth();
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [visible, setVisible] = useState(true);
  let body;

  if (loading) {
    body = null;
  } else {
    body = (
      <Group>
        <UnstyledButton
          ref={setReferenceElement}
          onClick={() => setVisible((m) => !m)}
        >
          <Avatar src={user!.photoUrl} alt={user!.username} radius="xl" />
        </UnstyledButton>

        <Popper
          placement="end"
          arrowSize={5}
          withArrow
          mounted={visible}
          referenceElement={referenceElement}
          transition="pop-top-left"
          transitionDuration={200}
        >
          <Paper>
            <Box style={{ height: 100, width: 200 }}>
              <Link href="/myposts" passHref={true}>
                <UnstyledButton className={classes.createButton} ml="sm">
                  <Text mx="sm" weight={500} py={6}>
                    My posts
                  </Text>
                </UnstyledButton>
              </Link>
              <Link href="/new" passHref={true}>
                <UnstyledButton className={classes.createButton} ml="sm">
                  <Text mx="sm" weight={500} py={6}>
                    Create a post
                  </Text>
                </UnstyledButton>
              </Link>
              <Link href="/" passHref={true}>
                <UnstyledButton
                  className={classes.logoutButton}
                  ml="sm"
                  onClick={signOut}
                >
                  <Text mx="sm" weight={500} py={6}>
                    Logout
                  </Text>
                </UnstyledButton>
              </Link>
            </Box>
          </Paper>
        </Popper>
      </Group>
    );
  }

  return <>{body}</>;
};

export default UserDropdown;
