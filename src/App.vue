<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="container">
    <PageHome />
  </div>
</template>

<script>
import PageHome from '@/components/PageHome';

export default {
  name: 'App',
  components: {
    PageHome: PageHome,
  },
};
</script>

<style>
@import 'assets/style.css';
</style>
