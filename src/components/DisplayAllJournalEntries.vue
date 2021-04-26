<template>
  <div
    class="accordion margin-bottom-20 orange-background"
    id="accordionExample"
  >
    <div class="accordion-item orange-background">
      <h2 class="accordion-header" id="headingOne">
        <button
          class="accordion-button show orange-background"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <strong class="entry-header">Journal Entries</strong>
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <DisplayASingleJournalEntry
            v-for="entry in entries"
            :key="entry.id"
            :entry="entry"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DisplayASingleJournalEntry from "@/components/DisplayASingleJournalEntry.vue";

export default {
  name: "DisplayJournalEntry",
  props: ["entries"],
  components: {
    DisplayASingleJournalEntry,
  },
  data: function () {
    return {};
  },
  methods: {
    // markDone: function (task) {
    //   db.collection("to-do-items")
    //     .doc(task.id)
    //     .update({ ["isComplete"]: true });
    //   this.$emit("toDoStatusEvent", this.id);
    // },
    // markUndone: function (task) {
    //   db.collection("to-do-items")
    //     .doc(task.id)
    //     .update({ ["isComplete"]: false });
    //   this.$emit("toDoStatusEvent", this.id);
    // },
  },
};
</script>

<style>
strong.entry-header {
  color: white;
  font-size: 125%;
}
</style>
