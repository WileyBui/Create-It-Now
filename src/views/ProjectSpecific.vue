<template>
  <div class="home">
    <!-- ELISE'S PART -->
    {{project_id}}
  </div>
</template>

<script>

export default {
  name: "ProjectSpecific",
  components: {
  },
  data: function () {
    return {
      project_id: this.$route.params.project_id,
    };
  },
};
</script>
