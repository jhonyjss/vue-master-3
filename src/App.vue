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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
