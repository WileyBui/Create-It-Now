<template>
  <div v-if="entries.length > 0" class="accordion margin-top-20" id="journal-entry-accordion">
    <div class="accordion-item orange-background">
      <h2 class="accordion-header" id="journalHeadingAccordion">
        <button
          class="accordion-button orange-background color-black fw-bold collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseJournalAccordion"
          aria-expanded="true"
          aria-controls="collapseJournalAccordion"
        >
          Journal Entries
        </button>
      </h2>
      <div
        id="collapseJournalAccordion"
        class="accordion-collapse collapse"
        aria-labelledby="journalHeadingAccordion"
        data-bs-parent="#journal-entry-accordion"
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
  name: "DashboardAccordionJournalEntries",
  props: ["entries"],
  components: {
    DashboardJournalEntry,
  },
};
</script>