<template>
  <div class="home">
    <!-- ELISE'S PART -->
    <table>
      <tr>
        <th><u><b>Project Name</b></u></th>
      </tr>
      <tr>
        <td>{{project_object.project_name}}</td>
      </tr>
    </table>
    <br>
    <table>
      <tr>
        <th><u><b>Task Name</b></u></th>
        <th><u><b>Deadline</b></u></th>
        <th><u><b>Task Details</b></u></th>
        <th><u><b>Specific Task View</b></u></th>
      </tr>
      <task v-for="task in allToDosFromProject" :key="task.id" :id = "task.id" :task = "task" :project_id = "project_id"/>
    </table>
  </div>
</template>

<script>
import {db} from "../firebaseConfig.js"
import task from "../components/ToDoItem.vue"
export default {
  name: "ProjectSpecific",
  components: {task
  },
  data: function () {
    return {
      project_idLocal: this.$route.params.project_id,
      project_object: null, 
      allToDosFromProject: []
    };
  },
  firestore: function() {
        return {
            project_object: db.collection("projects").doc(this.project_idLocal),
            allToDosFromProject: db.collection("to-do-items").where("project_id", "==", this.project_idLocal)
        }
    },

        
}
</script>
<style scoped>
  table {
    margin-left: auto;
    margin-right: auto;
    border-block-style: double;
    border-color: lightseagreen;
    font-size: 2em;
  }

  tr {
    padding: 0.5em;
    color: black;
  }

  th {
    padding: 0.5em;
  }
</style>
