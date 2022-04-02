export type UserData = {
  id: string;
  username: string;
  photoUrl: string;
  contacts: string[];
  about: string;
  joinedAt?: number;
};

export type PostData = {
  id: string;
  title: string;
  description: string;
  reason: string;
  quality: number;
  pictures: string[];
  tags: string[];
  available: boolean;
  createdAt: number;
  updatedAt: number;
};

export type PostForm = {
  title: string;
  description: string;
  reason: string;
  quality: number;
  tags: string[];
}

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
