<template>
  <div class="accordion accordion-flush mb-3" id="accordionFlushExample">
    <div class="accordion-item green-background">
      <h2 class="accordion-header" id="flush-heading">
        <button
          class="accordion-button show green-background"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseOne"
          aria-expanded="true"
          aria-controls="flush-collapseOne"
        >
          <router-link
            :to="{
              name: 'ProjectSpecific',
              params: { project_id: project.id },
            }"
            class="remove-a-href-styles text-dark"
          >
            <strong>{{ project.project_name }} - </strong>
            <template v-if="complete">
              <strong class="Complete">COMPLETED </strong>
            </template>
            <template v-else>
              <strong class="Incomplete">IN PROGRESS </strong>
            </template>

            <button
              type="button"
              class="btn blue-background color-white p-1 pt-0 pb-0"
            >
              View
            </button>
          </router-link>
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        class="accordion-collapse show"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      >
        <div class="accordion-body">
          <strong>To-do Items:</strong>
          <DashboardTask v-for="task in tasks" :key="task.id" :task="task" />
        </div>

        <div class="accordion-body">
            <strong>Journal Entries:</strong>
            <DashboardEntry v-for="entry in journalEntries" :key="entry.id" :entry="entry" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseConfig.js";
import DashboardTask from "./DashboardTask.vue";
import DashboardEntry from "./DashboardJournalEntry.vue"

export default {
  name: "DashboardProject",
  props: ["project"],
  components: {
      DashboardTask,
      DashboardEntry
  },
  data: function () {
    return {
        tasks: [],
        journalEntries: [],
        complete: false
    };
  },

  beforeUpdate() {
    var doneTasks = db
      .collection("to-do-items")
      .where("project_id", "==", this.project.id)
      .where("isComplete", "==", false);
    doneTasks.get().then((res) => {
      if (res.size == 0) {
        this.complete = true;
      } else {
        this.complete = false;
      }
    });
  },

  firestore: function () {
    return {
      tasks: db
        .collection("to-do-items")
        .where("project_id", "==", this.project.id),
      // .orderBy("timestamp", "desc"), WILEY - WILL NEED TO SORT QUERY WHEN PROJECT IS FINISHED

      journalEntries: db
        .collection("journalEntries")
        .where("project_id", "==", this.project.id)
    };
  },
};
</script>


<style scope>
.margin-vertical-40 {
  margin-top: 40px;
  margin-bottom: 40px;
}

.remove-a-href-styles {
  text-decoration: none !important;
  color: inherit;
}

strong.Complete {
  color: green;
}

strong.Incomplete {
  color: yellow;
}
</style>