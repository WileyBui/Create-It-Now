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
          <strong class="entry-header">Journal Entries </strong>
          <router-link
            :to="{
              name: 'ProjectJournal',
              params: { project_id: proj_id },
            }"
            class="remove-a-href-styles text-dark"
          >

            <button
              id="viewingJournal"
              type="button"
              class="btn blue-background color-white p-1 pt-0 pb-0"
            >
              View Journal
            </button>
          </router-link>
        </button>
      </h2>
      <div id="collapseOne"
           class="accordion-collapse collapse show"
           aria-labelledby="headingOne"
           data-bs-parent="#accordionExample">
          <div class="accordion-body">
              <DisplayASingleJournalEntry v-for="entry in entries"
                                          :key="entry.id"
                                          :entry="entry" />
          </div>
          <button @click="toAllEntries()" type="button" id="seeAllEntries" class="btn blue-background color-white p-1 pt-0 pb-0">See All Entries</button>
      </div>
    </div>
  </div>
</template>

<script>
import DisplayASingleJournalEntry from "@/components/DisplayASingleJournalEntry.vue";

export default {
  name: "DisplayJournalEntry",
  props: ["entries", "proj_id"],
  components: {
    DisplayASingleJournalEntry,
  },
  data: function () {
    return {
        project_idLocal: this.project_id
    };
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

      toAllEntries: function () {
          this.$router.push({
              name: 'AllJournalsFromProject',
              params: { project_id: this.proj_id },
          });
      }
  },
};
</script>

<style>
strong.entry-header {
  color: white;
  font-size: 125%;
}

#viewingJournal, #seeAllEntries {
  margin: 1em;
}
</style>
