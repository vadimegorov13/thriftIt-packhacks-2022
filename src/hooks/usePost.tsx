import { useRouter } from 'next/router';
import { useState } from 'react';
import { db } from '../firebase/firebase';
import { PostData, PostForm, usePostType } from '../types';
import { useAuth } from './useAuth';

export const usePost = (): usePostType => {
  const { user } = useAuth();
  const router = useRouter();

  const [postLoading, setLoading] = useState(true);

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

  const getUserPosts = (
    userId: string,
    setMyPosts: any,
    isSubscribed: boolean
  ) => {
    if (!isSubscribed) return;

    try {
      db.collection('users')
        .doc(userId)
        .collection('posts')
        .onSnapshot((snap) => {
          const posts: PostData[] = [];

          snap.docs.map(async (doc) => {
            await db
              .collection('posts')
              .doc(doc.id)
              .get()
              .then((res) => {
                posts.push(res.data() as PostData);
              });
          });
          console.log('setposts ', posts);
          setMyPosts(posts);
          setLoading(false);
        });
    } catch (err) {
      console.log('Something went wrong: ', err);
    }
  };

  const getAllPosts = (setPosts: any, isSubscribed: boolean) => {
    if (!isSubscribed) return;

    try {
      db.collection('posts')
        .orderBy('createdAt')
        .onSnapshot((snap) => {
          const posts = snap.docs.map((doc) => ({
            ...doc.data(),
          }));
          setPosts(posts as PostData[]);
        });
    } catch (err) {
      console.log('Something went wrong: ', err);
    }
  };

  return {
    createPost,
    deletePost,
    editPost,
    toggleAvailability,
    getUserPosts,
    getAllPosts,
    postLoading,
  };
};
