<template>
  <form @submit.prevent="addPost">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input type="text" id="thread_title" class="form-input" name="title" />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="text"
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-ghost">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">Publish</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    };
  },
  methods: {
    addPost() {
      const post = {
        text: this.text,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.id,
        userId: 'rpbB8C6ifrYmNDufMERWfQUoa202',
      };

      this.$emit('save', { post }); // access under eventData.post
      // this.posts.push(post);
      // this.thread.posts.push(postId);
      this.text = '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
