<template>
  <div class="modalCamera">
    <h1>Take a picture</h1>
    <webCamera/>

  </div>
</template>

<script>
import webCamera from '@/components/WebCamera.vue'


export default {
  name: "modalCamera",
  components: {
    webCamera
  },
}
</script>
