<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">{{ categoryName }}</h2>

      <div class="forum-listing" v-for="forum in forums" :key="forum.id">
        <div class="forum-details">
          <router-link
            :to="{ name: 'Forum', params: { id: forum.id } }"
            class="text-xlarge"
          >
            {{ forum.name }}
          </router-link>

          <p class="forum-description">{{ forum.description }}</p>
        </div>

        <div class="threads-count">
          <p class="count text-lead">
            {{ forum.threads?.length }}
            {{ forumThreadsWords(forum) }}
          </p>
        </div>

        <div class="last-thread">
          <img
            class="avatar"
            src="http://cleaneatsfastfeets.com/wp-content/uploads/2013/05/Mr-Burns.gif"
            alt=""
          />
          <div class="last-thread-details">
            <a href="#">How I grill my fish</a>
            <p class="text-xsmall">
              By <a href="profile.html">Charles Montgomery Burns</a>, 2 days ago
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forums: {
      type: Array,
      required: true,
    },
    categoryName: {
      type: String,
      default: 'Forums',
    },
  },

  methods: {
    forumThreadsWords(forum) {
      if (forum.threads?.length) {
        return forum.threads.length > 1 ? 'threads' : 'thread';
      } else {
        return 'no threads';
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
