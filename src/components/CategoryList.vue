<template>
  <ForumList
    v-for="category in categories"
    :key="category.id"
    :forums="getForumsForCategory(category)"
    :category-name="category.name"
  />
</template>

<script>
import sourceData from '@/data.json';
import ForumList from '@/components/ForumList';

export default {
  components: {
    ForumList,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },

  methods: {
    getForumsForCategory(category) {
      return sourceData.forums.filter(
        (forum) => forum.categoryId === category.id
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
