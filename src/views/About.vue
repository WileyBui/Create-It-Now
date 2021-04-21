<template>
  <div class="about">
    <h1>This is an about page</h1>
    <webCamera/>

  </div>
</template>

<script>
import webCamera from '@/components/WebCamera.vue'


export default {
  name: "About",
  components: {
    webCamera
  },
}
</script>

