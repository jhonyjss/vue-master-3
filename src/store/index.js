import { createStore } from 'vuex';
import sourceData from '@/data';

export default createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  getters: {
    authUser: (state) => {
      const user = state.users.find((user) => user.id === state.authId);
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
    },
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = 'qqqq' + Math.random();
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);

      commit('setPost', { post });
      commit('appendPostToThread', {
        postId: post.id,
        threadId: post.threadId,
      });
    },

    updateUser({ commit }, user) {
      commit('setUser', { user, userId: user.id });
    },
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post);
    },
    setUser(state, { user, userId }) {
      const userIdex = state.users.findIndex((user) => user.id === userId);
      state.users[userIdex] = user;
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads.find((thread) => thread.id === threadId);
      thread.posts.push(postId);
    },
  },
});
