<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link
        :to="{ name: 'ThreadEdit', id: this.id }"
        class="btn-green btn-small"
        tag="button"
      >
        Edit Thread
      </router-link>
    </h1>
    <p>
      By <a href="#" class="link-unstyled"> {{ thread.author.name }} </a>,
      <AppDate :timestamp="thread.publishedAt" />
      <span style="margin-top: 2px" class="hide-mobile text-faded text-small">
        {{ thread.repliedCount }} replies by
        {{ thread.contributorsCount }} contributors
      </span>
    </p>

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
      return this.$store.getters.thread(this.id);
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

      this.$store.dispatch('createPost', post);

      this.thread.posts.push(post.id);
    },
  },
};
</script>
