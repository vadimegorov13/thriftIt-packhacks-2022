import { useRouter } from 'next/router';
import { db } from '../firebase/firebase';
import { PostData, PostForm, usePostType } from '../types';
import { useAuth } from './useAuth';

export const usePost = (): usePostType => {
  const { user } = useAuth();
  const router = useRouter();

  const createPost = async (post: PostForm) => {
    if (user) {
      try {
        const newPost = db.collection('posts').doc();
        await newPost.set({
          id: newPost.id,
          ...post,
          available: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          ownerId: user.id,
        });

        await db
          .collection('users')
          .doc(user.id)
          .collection('posts')
          .doc(newPost.id)
          .set({ postId: newPost.id });
      } catch (err) {
        console.log('Something went wrong: ', err);
      }
    } else {
      console.log('User is not logged in!');
      router.push('/sign-in');
    }
  };

  const deletePost = async (postId: string) => {
    if (user) {
      try {
        await db
          .collection('posts')
          .doc(postId)
          .get()
          .then(async (res) => {
            const post = res.data() as PostData;
            if (post) {
              if (post.ownerId === user.id) {
                await db.collection('posts').doc(postId).delete();

                await db
                  .collection('users')
                  .doc(user.id)
                  .collection('posts')
                  .doc(postId)
                  .delete();
              }
            }
          });
      } catch (err) {
        console.log('Something went wrong: ', err);
      }
    } else {
      console.log('User is not logged in!');
      router.push('/sign-in');
    }
  };

  const editPost = async (postId: string, post: PostForm) => {
    if (user) {
      try {
        await db
          .collection('posts')
          .doc(postId)
          .get()
          .then(async (res) => {
            const post = res.data() as PostData;
            if (post) {
              if (post.ownerId === user.id) {
                await db
                  .collection('posts')
                  .doc(postId)
                  .update({ ...post });
              }
            }
          });
      } catch (err) {
        console.log('Something went wrong: ', err);
      }
    } else {
      console.log('User is not logged in!');
      router.push('/sign-in');
    }
  };

  const toggleAvailability = async (postId: string) => {
    if (user) {
      try {
        await db
          .collection('posts')
          .doc(postId)
          .get()
          .then(async (res) => {
            const post = res.data() as PostData;
            if (post) {
              if (post.ownerId === user.id) {
                await db
                  .collection('posts')
                  .doc(postId)
                  .update({ available: !post.available });
              }
            }
          });
      } catch (err) {
        console.log('Something went wrong: ', err);
      }
    } else {
      console.log('User is not logged in!');
      router.push('/sign-in');
    }
  };

  //   await db.collection('users')
  //           .doc(user.id)
  //           .collection('posts')
  //           .doc(newPost.id)
  //           .set({ postId: newPost.id });

  const getMyPosts = (setMyPosts: any, isSubscribed: boolean) => {
    if (!isSubscribed) return;

    if (user) {
      try {
        db.collection('users')
          .doc(user.id)
          .collection('posts')
          .onSnapshot((snap) => {
            const postIds: string[] = snap.docs.map((doc) => doc.id);
            const posts: PostData[] = [];

            postIds.map(async (postId) => {
              await db
                .collection('posts')
                .doc(postId)
                .get()
                .then((res) => {
                  posts.push(res.data() as PostData);
                });
            });

            if (isSubscribed) {
              setMyPosts(posts as PostData[]);
            }
          });
      } catch (err) {
        console.log('Something went wrong: ', err);
      }
    } else {
      console.log('User is not logged in!');
      router.push('/sign-in');
    }
  };

  return {
    createPost,
    deletePost,
    editPost,
    toggleAvailability,
    getMyPosts,
  };
};
