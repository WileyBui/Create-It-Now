<template>
  <div
    class="container light-orange-background p-3 margin-top-10 hoverable text-start"
  >
    <div class="row">
      <div class="col-9">
        <strong><strong>{{ entry.title }}</strong></strong>
        <div>{{ entry.description }}</div>
      </div>
      <div class="col-3 fw-bold small-text text-end">
        <JournalEntry />
      </div>
    </div>
    <!-- <div>{{ entry.picture }}</div> -->
  </div>
</template>

<script>
import JournalEntry from "./JournalEntry.vue";

export default {
  name: "DisplayASingleJournalEntry",
  props: ["entry"],
  components: {
    JournalEntry,
  },

  data: function () {
    return {};
  },
  methods: {},
};
</script>