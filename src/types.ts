export type UserData = {
  id: string;
  username: string;
  photoUrl: string;
  about: string;
  joinedAt?: number;
};

export type PostData = {
  id: string;
  title: string;
  description: string;
  reason: string;
  quality: number;
  // pictures: string[];
  tags: PostTag[];
  available: boolean;
  createdAt: number;
  updatedAt: number;
  ownerId: string;
};

export type UserPosts = {
  postId: string;
};

export type PostTag = {
  tag: string;
};

export type PostForm = {
  title: string;
  description: string;
  reason: string;
  quality: number;
  tags: PostTag[];
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

/** Type for useParticipants hook */
export type usePostType = {
  createPost: (post: PostForm) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  editPost: (postId: string, post: PostForm) => Promise<void>;
  toggleAvailability: (postId: string) => Promise<void>;
  getUserPosts: (
    userId: string,
    setMyPosts: any,
    isSubscribed: boolean
  ) => void;
  getAllPosts: (setPosts: any, isSubscribed: boolean) => void;
  getPost: (postId: string, setPost: any, isSubscribed: boolean) => void;
  postLoading: boolean;
};
