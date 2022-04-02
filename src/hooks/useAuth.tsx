import {
  authContextDefaultValues,
  useAuthType,
  UserContacs,
  UserData,
} from '../types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, db } from '../firebase/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useRouter } from 'next/router';

const AuthContext = createContext<useAuthType>(authContextDefaultValues);

// AuthProvider is a wrapper that provides a way to share
// values between components without having to explicitly pass a prop
// through every level of the tree. Or simply a context.
export const AuthProvider = (props: { children: ReactNode }): JSX.Element => {
  const auth = useAuthProvider();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = (): useAuthType => {
  return useContext(AuthContext);
};

export const useAuthProvider = (): useAuthType => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  const signInWithGoogle = async () => {
    const google = new firebase.auth.GoogleAuthProvider();
    await auth
      .signInWithPopup(google)
      .then(() => console.log('login success'))
      .catch((err) => console.log(err.code))
      .finally(() => {
        setLoading(false);
        router.push('/');
      });
    return;
  };

  const signInWithGitHub = async () => {
    const github = new firebase.auth.GithubAuthProvider();
    await auth
      .signInWithPopup(github)
      .then(() => console.log('login success'))
      .catch((err) => console.log(err.code))
      .finally(() => {
        setLoading(false);
        router.push('/');
      });
    return;
  };

  // Sign out user
  const signOut = async (): Promise<void> => {
    // Change the state of the user
    if (user === null) return;
    return await auth.signOut().then(() => {
      setUser(null);
      router.push('/');
    });
  };

  const updateAbout = async (about: string) => {
    if (user) {
      try {
        await db.collection('users').doc(user.id).update({ about });
      } catch (err) {
        console.log('Something went wrong: ', err);
      }
    } else {
      console.log('User is not logged in!');
      router.push('/sign-in');
    }
  };

  const updateUsername = async (username: string) => {
    if (user) {
      try {
        await db.collection('users').doc(user.id).update({ username });
      } catch (err) {
        console.log('Something went wrong: ', err);
      }
    } else {
      console.log('User is not logged in!');
      router.push('/sign-in');
    }
  };

  const updateContacts = async (contacts: UserContacs[]) => {
    if (user) {
      try {
        await db.collection('users').doc(user.id).update({ contacts });
      } catch (err) {
        console.log('Something went wrong: ', err);
      }
    } else {
      console.log('User is not logged in!');
      router.push('/sign-in');
    }
  };

  // Returns user data from the firestore db.
  const getUserAdditionalData = async (user: UserData): Promise<void> => {
    await db
      .collection('users')
      .doc(user?.id)
      .get()
      .then((userData: any) => {
        if (userData.data()) {
          setUser(userData.data() as UserData);
        }
      });
    setLoading(false);

    return;
  };

  // When user re-enters the application, we need to fetch additional data again.
  const handleAuthStateChanged = async (
    user: UserData | null
  ): Promise<void> => {
    if (user) {
      await getUserAdditionalData(user);
    }
    setLoading(false);
  };

  // Observer for changes to the user's sign-in state
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user: any) => {
      if (user === null) {
        handleAuthStateChanged(user);
      } else {
        const userData: UserData = {
          id: user.uid,
          username: user!.displayName!,
          photoUrl: user!.photoURL!,
          about: '',
          contacts: [],
        };
        handleAuthStateChanged(userData);
      }
    });

    return () => unsub();
  }, []);

  return {
    user,
    loading,
    signOut,
    signInWithGoogle,
    signInWithGitHub,
    updateAbout,
    updateUsername,
    updateContacts,
  };
};
