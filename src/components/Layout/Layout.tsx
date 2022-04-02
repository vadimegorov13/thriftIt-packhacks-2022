import { useState } from 'react';
import { createStyles, AppShell, Navbar, Container } from '@mantine/core';
import NavbarMainLinks, { NavbarMainLink } from './NavbarMain';
import { Logout } from 'tabler-icons-react';
import HeaderMain from './Header';
import { useAuth } from '../../hooks/useAuth';

const useStyles = createStyles((theme) => ({
  navbar: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
    borderRight: 1,
  },
  appShell: {
    display: 'flex',
    height: 'full',
    width: 'full',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

const Layout: React.FC = ({ children }) => {
  const { classes } = useStyles();
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);

  const logoutLink = {
    icon: <Logout size={16} />,
    color: 'grape',
    label: 'Logout',
    href: '/',
  };

  return (
    <AppShell
      fixed
      navbarOffsetBreakpoint="sm"
      className={classes.appShell}
      header={<HeaderMain user={user} open={open} setOpen={setOpen} />}
      navbar={
        <Navbar
          className={classes.navbar}
          width={{ base: '100%', sm: 0 }}
          hidden={!open}
        >
          <Navbar.Section grow mt="xs">
            <NavbarMainLinks loading={loading} user={user} />
            {children}
          </Navbar.Section>
          {user ? (
            <Navbar.Section>
              <NavbarMainLink {...logoutLink} />
            </Navbar.Section>
          ) : null}
        </Navbar>
      }
    >
      <Container size="md" px="md">
        {children}
      </Container>
    </AppShell>
  );
};

export default Layout;
