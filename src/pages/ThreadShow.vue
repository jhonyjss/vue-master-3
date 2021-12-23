<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <post-list :posts="threadPosts" />
    <post-editor @save="addPost" />
  </div>
</template>

<script>
import PostList from '@/components/PostList';
import PostEditor from '@/components/PostEditor';

export default {
  name: 'ThreadShow',
  components: {
    PostList,
    PostEditor,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    threads() {
      return this.$store.state.threads;
    },
    posts() {
      return this.$store.state.posts;
    },
    thread() {
      return this.threads.find((t) => t.id === this.id);
    },
    threadPosts() {
      return this.posts.filter((post) => post.threadId === this.id);
    },
  },

  methods: {
    addPost(eventdata) {
      const post = {
        ...eventdata.post,
        threadId: this.id,
      };

      this.posts.push(post);
      this.thread.posts.push(post.id);
    },
  },
};
</script>
