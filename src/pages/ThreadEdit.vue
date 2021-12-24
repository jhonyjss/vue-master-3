<template>
  <div class="col-full push-top">
    <h1>
      Editing new thread in <i>{{ thread.title }}</i>
    </h1>
    <ThreadEditor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor';
export default {
  components: {
    ThreadEditor,
  },
  props: {
    threadId: {
      type: String,
      required: true,
    },
  },

  computed: {
    thread() {
      return this.$store.state.threads.find(
        (thread) => thread.id === this.threadId
      );
    },

    text() {
      return this.$store.state.posts.find(
        (post) => post.id === this.thread.posts[0]
      ).text;
    },
  },

  methods: {
    async save({ title, text }) {
      //dispatch a vuex action
      const thread = await this.$store.dispatch('updateThread', {
        id: this.id,
        title,
        text,
      });

      this.$router.push({ name: 'ThreadShow', params: { id: thread.id } });
    },

    cancel() {
      this.$router.push({ name: 'Forum', param: { id: this.forum.id } });
    },
  },
};
</script>

<style lang="scss" scoped></style>
