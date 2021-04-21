<template>
  <div class="home">
    <!-- ELISE'S PART -->
    <table v-if="project_object" class="project-header">
      <tr>
        <th><u><b>Project Name</b></u></th>
      </tr>
      <tr>
        <td>{{project_object.project_name}}</td>
      </tr>
    </table>
    <br />
    <br />
    <h3>ToDo List</h3>
    <table class="todos-table">
        <tr>
            <th><u><b>Task Name</b></u></th>
            <th><u><b>Deadline</b></u></th>
            <th><u><b>Task Details</b></u></th>
            <th><u><b>Status</b></u></th>
        </tr>

        <task v-for="task in allToDosFromProject" :key="task.id" :id = "task.id" :task = "task" />
    </table>
    
    <ModalAddAProjectAndOrToDo
      :project_id="project_idLocal"
      :isAddNewProject="false"
    />
    <br />
    <br />  
    <h3>Journal Entries</h3>
      <JournalEntry v-for="entry in journalEntries" :key="entry.id" :id="entry.id" :entry ="entry" />
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
