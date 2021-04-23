<template>
  <div v-if="entries.length > 0" class="accordion margin-top-20" id="journal-entry-accordian">
    <div class="accordion-item orange-background">
      <h2 class="accordion-header" id="journalHeadingAccordian">
        <button
          class="accordion-button orange-background color-black fw-bold"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseJournalAccordian"
          aria-expanded="true"
          aria-controls="collapseJournalAccordian"
        >
          Journal Entries
        </button>
      </h2>
      <div
        id="collapseJournalAccordian"
        class="accordion-collapse collapse"
        aria-labelledby="journalHeadingAccordian"
        data-bs-parent="#journal-entry-accordian"
      >
        <div class="accordion-body">
          <DashboardJournalEntry v-for="entry in entries" :key="entry.id" :entry="entry" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardJournalEntry from "./DashboardJournalEntry.vue";

export default {
  name: "DashboardAccordianJournalEntries",
  props: ["entries"],
  components: {
    DashboardJournalEntry,
  },
};
</script>