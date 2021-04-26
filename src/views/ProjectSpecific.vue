<template>
  <div>
    <template v-if="project_object">
      <h3 class="project-title">{{ project_object.project_name }}</h3>
      <template v-if="isComplete">
          <strong class="Complete"><strong>COMPLETED</strong></strong>
      </template>
      <template v-else>
          <strong class="Incomplete"><strong>IN PROGRESS</strong></strong>
      </template>

      <div
        class="accordion accordion-flush mb-3 margin-tile"
        id="accordionFlushExample"
      >
        <div class="accordion-item green-background">
          <h2 class="accordion-header" id="flush-headingOne">
            <button
              class="accordion-button show green-background"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="true"
              aria-controls="flush-collapseOne"
            >
              <strong class="todo-header">To-do Items</strong>
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse show"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              <table class="todos-table">
                <tr>
                  <th>
                    <u><b>Task Name</b></u>
                  </th>
                  <th>
                    <u><b>Deadline</b></u>
                  </th>
                  <th>
                    <u><b>Task Details</b></u>
                  </th>
                  <th>
                    <u><b>Status</b></u>
                  </th>
                </tr>
                <task
                  v-for="task in allToDosFromProject"
                  :key="task.id"
                  :id="task.id"
                  :task="task"
                  v-on:toDoStatusEvent="getModal"
                />
              </table>
            </div>
            <ModalAddAProjectAndOrToDo
              :project_id="project_idLocal"
              :isAddNewProject="false"
            />

            <ModalAddOrUpdateJournal
              :todo_id="clickedSpecificJournalEntryId"
              :project_id="project_idLocal"
            />
          </div>
        </div>
        <DisplayAllJournalEntries
          v-if="journalEntries.length > 0"
          :entries="journalEntries"
          class="margin-top-10"
        />
      </div>
    </template>
    <template v-else>
      <UnableToFindId error_type="project" />
    </template>
  </div>
</template>

<script>
import { db } from "../firebaseConfig.js";
import task from "../components/ToDoItem.vue";
import DisplayAllJournalEntries from "../components/DisplayAllJournalEntries.vue";
// import JournalEntry from "../components/JournalEntry.vue"
import ModalAddAProjectAndOrToDo from "@/components/ModalAddAProjectAndOrToDo.vue";
import ModalAddOrUpdateJournal from "@/components/ModalAddOrUpdateJournal.vue";
import UnableToFindId from "@/components/UnableToFindId.vue";

export default {
  name: "ProjectSpecific",
  components: {
    task,
    // JournalEntry,
    DisplayAllJournalEntries,
    ModalAddAProjectAndOrToDo,
    ModalAddOrUpdateJournal,
    UnableToFindId,
  },
  data: function () {
    return {
      project_idLocal: this.$route.params.project_id,
      project_object: null,
      allToDosFromProject: [],
      journalEntries: [],
      clickedSpecificJournalEntryId: null,
      clickedSpecificJournalEntryIsDone: null,
      isComplete: false,
    };
  },

  beforeMount() {
    var doneTasks = db
      .collection("to-do-items")
      .where("project_id", "==", this.project_idLocal)
      .where("isComplete", "==", false);

    doneTasks.get().then((res) => {
      if (res.size == 0) {
        this.isComplete = true;
      } else {
        this.isComplete = false;
      }
    });
  },

  firestore: function () {
    return {
      project_object: db.collection("projects").doc(this.project_idLocal),
      allToDosFromProject: db
        .collection("to-do-items")
        .where("project_id", "==", this.project_idLocal),
      journalEntries: db
        .collection("journalEntries")
        .where("project_id", "==", this.project_idLocal),
    };
  },
  methods: {
    getModal: function (id) {
      this.clickedSpecificJournalEntryId = id;
      window.$("#addAJournal").modal("toggle");
    },
  },
};
</script>
<style scoped>
table.project-header {
  margin-left: auto;
  margin-right: auto;
  border-block-style: double;
  border-color: lightseagreen;
  font-size: 2em;
}

table.todos-table {
  margin-left: auto;
  margin-right: auto;
  border-block-style: double;
  border-color: lightseagreen;
}

tr {
  padding: 0.5em;
  color: black;
}

th {
  padding: 0.5em;
}

h3.project-title{
    font-size: 300%;
    color: brown;
    margin-left: 5%;
    margin-right: 5%;
    background-color: lightgray;
}

div.margin-tile {
  margin-left: 5%;
  margin-right: 5%;
}

strong.todo-header {
  color: blueviolet;
  font-size: 125%;
}

strong.Complete {
  color: green;
  font-size: larger;
}

strong.Incomplete {
  color: yellow;
  font-size: larger;
}
</style>
