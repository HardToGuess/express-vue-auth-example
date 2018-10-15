<template>
  <div id="app" class="container centered">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.centered {
  text-align: center;
}
.width100 {
  min-width: 100% !important;
}
</style>
