<template>
  <div class="container light-orange-background p-3 margin-top-10 hoverable" @click="toSpecificPage(entry)">
    <div class="row">
      <div class="col-9">
          <strong>{{ entry.title }}</strong>
      </div>
    </div>
    <div class="text-truncate">{{ entry.description }}</div>
  </div>
</template>

<script>

export default {
  name: "DashboardEntry",
  props: ["entry"],
  components: {},
  methods: {
      toSpecificPage(entry) {
          this.$router.push({ name: 'SingleJournalEntry', params: { id: entry.id } })
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