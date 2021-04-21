<template>
  <div class="accordion accordion-flush mb-3" id="accordionFlushExample">
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
          <router-link
            :to="{
              name: 'ProjectSpecific',
              params: { project_id: project_object.id },
            }"
            class="remove-a-href-styles text-dark"
          >
            <strong>{{ project_object.project_name }} - </strong>
            <template v-if="complete">
              <strong class="Complete">COMPLETED </strong>
            </template>
            <template v-else>
              <strong class="Incomplete">IN PROGRESS </strong>
            </template>

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
          <table class="todos-table">
            <tr>
                <th><u><b>Task Name</b></u></th>
                <th><u><b>Deadline</b></u></th>
                <th><u><b>Task Details</b></u></th>
                <th><u><b>Status</b></u></th>
            </tr>

            <task v-for="task in allToDosFromProject" :key="task.id" :id = "task.id" :task = "task" />
          </table>
        </div>
        <ModalAddAProjectAndOrToDo
          :project_id="project_idLocal"
          :isAddNewProject="false"
        />
        <h3>Journal Entries</h3>
        <JournalEntry v-for="entry in journalEntries" :key="entry.id" :id="entry.id" :entry ="entry" />
      </div>
    </div>
  </div>
</template>

<script>
import {db} from "../firebaseConfig.js"
import task from "../components/ToDoItem.vue"
import JournalEntry from "../components/JournalEntry.vue"
import ModalAddAProjectAndOrToDo from "@/components/ModalAddAProjectAndOrToDo.vue";

export default {
  name: "ProjectSpecific",
  components: {
    task,
    JournalEntry,  
    ModalAddAProjectAndOrToDo
  },
  data: function () {
    return {
      project_idLocal: this.$route.params.project_id,
      project_object: null,
      allToDosFromProject: [],
      journalEntries: [],
    };
  },
  firestore: function() {
        return {
            project_object: db.collection("projects").doc(this.project_idLocal),
            allToDosFromProject: db.collection("to-do-items").where("project_id", "==", this.project_idLocal),
            journalEntries: db.collection("journalEntries").where("project_id", "==", this.project_idLocal)
        }
    },

        
}
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
</style>
