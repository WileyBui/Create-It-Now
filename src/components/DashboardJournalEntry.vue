<template>
  <div class="container light-green-background p-3 margin-top-10 hoverable" @click="toSpecificPage(task)">
    <div class="row">
      <div class="col-9">
          <strong>{{ entry.title }}</strong>
      </div>
    </div>
    <div>{{ entry.description }}</div>
  </div>
</template>

<script>

export default {
  name: "DashboardEntry",
  props: ["entry"],
  components: {},
  methods: {
      toSpecificPage(task) {
          this.$router.push({ name: 'SingleTask', params: { id: task.id } })
      }
  }
  
};
</script>

<style scoped>
.red {
  color: red;
}

.green {
  color: green;
}

.no-padding-left {
  padding-left: 0 !important;
}
</style>