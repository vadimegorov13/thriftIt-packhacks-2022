export type UserData = {
  id: string;
  username: string;
  photoUrl: string;
};

/** Type for useAuth hook */
export type useAuthType = {
  user: UserData | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
};

/** Default values for useAuth */
export const authContextDefaultValues: useAuthType = {
  user: null,
  loading: true,
  signOut: async () => {},
  signInWithGoogle: async () => {},
  signInWithGitHub: async () => {},
};
