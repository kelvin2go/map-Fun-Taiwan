<template>
  <div id="app">
    <my-header></my-header>

    <md-layout md-gutter>
      <router-view></router-view>
    </md-layout md-gutter>
  </div>
</template>

<script>
import MyHeader from '@/components/Header'
export default {
  name: 'app',
  components: {
    MyHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
