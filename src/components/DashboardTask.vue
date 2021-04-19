<template>
  <div class="container light-green-background p-3">
    <div class="row">
      <div class="col-9">
          <strong>{{ task.name }}</strong> (due {{ task.deadline }})
      </div>
      <div class="col-3 fw-bold small-text text-end">
        <span v-if="task.isComplete" class="green">DONE</span>
        <span v-else class="red">NOT DONE</span>
      </div>
    </div>
    <div>{{ task.description }}</div>
  </div>
</template>

<script>
export default {
  name: "DashboardTask",
  props: ["task"],
  components: {},
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