<template>
  <div v-if="items.length > 0" class="accordion">
    <div
      class="accordion-item"
      :class="[
        type == 'journal'
          ? 'orange-background margin-top-20'
          : 'green-background',
      ]"
    >
      <h2 class="accordion-header" id="headingAccordion">
        <button
          class="accordion-button color-black fw-bold"
          :class="[
            type == 'journal'
              ? 'orange-background'
              : 'green-background show',
          ]"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#' + type + '-flush-collapse-' + index"
          aria-expanded="true"
          :aria-controls="type + '-flush-collapse-' + index"
        >
          <template v-if="type == 'journal'"> Journal Entries - 
              <router-link :to="{
              name: 'ProjectJournal',
              params: { project_id: project_id },
            }"
                           class="remove-a-href-styles text-dark">

                  <button type="button"
                          class="btn blue-background color-white p-1 pt-0 pb-0">
                      View Journal
                  </button>
              </router-link>
          </template>
          <template v-else> To-do Items </template>
        </button>
      </h2>
      <div
        :id="type + '-flush-collapse-' + index"
        class="accordion-collapse collapse show"
      >
        <div class="accordion-body">
            <template v-if="type == 'journal'">
                <DashboardJournalEntry v-for="entry in items"
                                       :key="entry.id"
                                       :entry="entry" />
                 <button @click="toAllEntries()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">See All Entries</button>
            </template>
          <template v-else>
            <DashboardTask v-for="task in items" :key="task.id" :task="task" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardTask from "./DashboardTask.vue";
import DashboardJournalEntry from "./DashboardJournalEntry.vue";

// The props are items, type, and index.
// We are referencing `items` as journal entries or the to-do tasks, depending
// on what parameter type that we are passing in, so the `type` prop is either a
// "to-do" or a "journal". If it's a "journal" type, then we need to call the
// `DashboardJournalEntry` component, otherwise, we need to call `DashboardTask`
// component. The index is for the HTML ID tag so users can click on an accordion
// header to collapse its own corresponding accordion.
export default {
  name: "DashboardToDoItemsAccordion",
  props: ["items", "type", "index", "project_id"],
  components: {
    DashboardTask,
    DashboardJournalEntry,
  },
  methods: {
      toAllEntries: function () {
          this.$router.push({
              name: 'AllJournalsFromProject',
              params: { project_id: this.project_id },
          });
      }
  }
};
</script>