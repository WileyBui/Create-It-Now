<template>
  <div class="accordion accordion-flush mb-3">
    <div class="accordion-item light-blue-background">
      <h2 class="accordion-header">
        <button
          class="accordion-button show light-blue-background"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#flush-collapse-' + index"
          aria-expanded="true"
          :aria-controls="'flush-collapse-' + index"
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
              id="viewProjectDashboard"
              class="btn btn-primary"
            >
              View Project
            </button>
          </router-link>
        </button>
      </h2>
      <div :id="'flush-collapse-' + index" class="accordion-collapse show">
        <div class="accordion-body">
          <DashboardToDoItemsOrJournalEntriesAccordion
            :items="tasks"
            type="to-do"
            :index="index"
          />
          <DashboardToDoItemsOrJournalEntriesAccordion
            :items="journalEntries"
            type="journal"
            :index="index"
            :project_id="project.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseConfig.js";
import DashboardToDoItemsOrJournalEntriesAccordion from "./DashboardToDoItemsOrJournalEntriesAccordion.vue";

export default {
  name: "DashboardProject",
  props: ["project", "index"],
  components: {
    DashboardToDoItemsOrJournalEntriesAccordion,
  },
  data: function () {
    return {
      tasks: [],
      journalEntries: [],
      complete: false,
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
        .where("project_id", "==", this.project.id)
        .limit(3),

      journalEntries: db
        .collection("journalEntries")
        .where("project_id", "==", this.project.id)
        .orderBy("created_at", "desc")
        .limit(3)
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

#viewProjectDashboard {
  margin-left: 1em;
}
</style>