<template>
  <div class="container light-blue-background padding-vertical-5">
    <div class="unable-to-find-id">
      <strong>
        Your {{ error_type }} URL doesn't match with our records. You may...
      </strong>
      <br />
      1. have entered the wrong {{ error_type }} URL. <br />
      2. not be the owner of this {{ error_type }}. <br />
      3. have deleted this {{ error_type }}.
    </div>
  </div>
</template>

<script>
export default {
  name: "UnableToFindId",
  props: ["error_type"],
};
</script>

<style scoped>
.unable-to-find-id {
  margin: 40px;
  text-align: left;
}
</style>