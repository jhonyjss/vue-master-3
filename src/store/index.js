import { createStore } from 'vuex';
import { findById, upsert } from '@/helpers';
import firebase from 'firebase/app';

export default createStore({
  state: {
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  getters: {
    authUser: (state, getters) => {
      return getters.user(state.authId);
    },
    user: (state) => {
      return () => {
        const user = findById(state.users, state.authId);
        if (!user) return null;
        return {
          ...user,
          get posts() {
            return state.posts.filter((post) => post.userId === user.id);
          },
          get threads() {
            return state.threads.filter((thread) => thread.userId === user.id);
          },
          get postsCount() {
            return this.posts.length || 0;
          },
          get threadsCount() {
            return this.threads.length || 0;
          },
        };
      };
    },
    thread: (state) => {
      return (id) => {
        const thread = findById(state.threads, id);
        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId);
          },
          get repliesCount() {
            return thread.posts.length - 1;
          },
          get contributorsCount() {
            return thread.contributors?.length || 0;
          },
        };
      };
    },
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = 'qqqq' + Math.random();
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);

      commit('setPost', { post });
      commit('appendPostToThread', {
        childId: post.id,
        parentId: post.threadId,
      });
      commit('appendContributorToThread', {
        childId: state.authId,
        parentId: post.threadId,
      });
    },

    async createThread({ commit, state, dispatch }, { title, text, forumId }) {
      const id = 'qqqq' + Math.random();
      const userId = state.authId;
      const publishedAt = Math.floor(Date.now() / 1000);

      const thread = { forumId, title, publishedAt, userId, id };
      commit('setThread', { thread });
      commit('appendThreadToUser', { parentId: userId, childId: id });
      commit('appendThreadToForum', { parentId: forumId, childId: id });
      dispatch('createPost', { text, threadId: id });
      return findById(state.threads, id);
    },

    updateUser({ commit }, user) {
      commit('setUser', { user, userId: user.id });
    },

    fetchThread({ commit }, { id }) {
      return new Promise((resolve) => {
        const db = firebase.firestore();
        db.collection('threads')
          .doc(id)
          .onSnapshot((doc) => {
            const thread = { ...doc.data(), id: doc.id };
            commit('setThread', { thread });
            resolve(thread);
          });
      });
    },
    fetchUser({ commit }, { id }) {
      return new Promise((resolve) => {
        const db = firebase.firestore();
        db.collection('users')
          .doc(id)
          .onSnapshot((doc) => {
            const user = { ...doc.data(), id: doc.id };
            commit('setUser', { user });
            resolve(user);
          });
      });
    },
    fetchPost({ commit }, { id }) {
      return new Promise((resolve) => {
        const db = firebase.firestore();
        db.collection('posts')
          .doc(id)
          .onSnapshot((doc) => {
            const post = { ...doc.data(), id: doc.id };
            commit('setPost', { post });
            resolve(post);
          });
      });
    },

    async updateThread({ commit, state }, { title, text, id }) {
      const thread = state.threads.find((thread) => thread.id === id);
      const post = findById(state.posts, thread.posts[0]);

      const newThread = { ...thread, title };
      const newPost = { ...post, text };

      commit('setThread', { thread: newThread });
      commit('setPost', { post: newPost });

      return newThread;
    },
  },
  mutations: {
    setPost(state, { post }) {
      upsert(state.posts, post);
    },
    setThread(state, { thread }) {
      upsert(state.threads, thread);
    },
    setUser(state, { user }) {
      upsert(state.users, user);
    },
    appendPostToThread: makeAppendChildtoParentMutation({
      parent: 'threads',
      child: 'posts',
    }),

    appendThreadToForum: makeAppendChildtoParentMutation({
      parent: 'forums',
      child: 'threads',
    }),

    appendThreadToUser: makeAppendChildtoParentMutation({
      parent: 'users',
      child: 'threads',
    }),

    appendContributorToThread: makeAppendChildtoParentMutation({
      parent: 'threads',
      child: 'contributors',
    }),
  },
});

function makeAppendChildtoParentMutation({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId);
    resource[child] = resource[child] || [];

    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  };
}
