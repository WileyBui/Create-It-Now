<template>
  <div class="home">
    <img alt="Create It Now logo" src="../assets/Icon.png">
    <Welcome msg="Welcome to Create it Now!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'

export default {
  name: 'Home',
  components: {
    Welcome
  }
}
</script>

<style>
    img {
        width: 500px;
        height: 500px;
    }
</style>
