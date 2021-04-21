<template>
  <div class="about">
    <h1>This is an about page</h1>
    <modalCamera/>

  </div>
</template>

<script>
import ModalCamera from '@/components/WebCamera.vue'


export default {
  name: "About",
  components: {
    ModalCamera
  },
}
</script>

