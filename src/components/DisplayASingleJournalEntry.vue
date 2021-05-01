<template>
  <div
    class="container light-orange-background p-3 margin-top-10 text-start">
    <div class="row">
        <div class="col-9 hoverable" @click="toSpecificPage(entry)">
            <strong><strong>{{ entry.title }} </strong></strong> - {{entry.created_at ? entry.created_at.toDate() : "" | formatDate }}
            <div class="text-truncate">{{ entry.description }}</div>
        </div>
      <div class="col-3 fw-bold small-text text-end">
        <JournalEntry 
        :entry="entry"/>
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
  methods: {
      toSpecificPage(entry) {
          this.$router.push({ name: 'SingleJournalEntry', params: { id: entry.id } })
      }
  },
};
</script>