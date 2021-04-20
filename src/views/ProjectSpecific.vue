<template>
  <div class="home">
    <!-- ELISE'S PART -->
    <table class="project-header">
      <tr>
        <th><u><b>Project Name</b></u></th>
      </tr>
      <tr>
        <td>{{project_object.project_name}}</td>
      </tr>
    </table>
      <br /><br />
    <h3>ToDo List</h3>
    <table class="todos-table">
        <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Status</th>
        </tr>
        <tr v-for="item in todos" :key="item.id" :postID="item.id">
            <td class="name">{{item.name}}</td>
            <td class="description">{{item.description}}</td>
            <td class="deadline">{{item.deadline}}</td>
            <td class="status">{{item.isComplete}}</td>
        </tr>
    </table>
  </div>
</template>

<script>
import {db} from "../firebaseConfig.js"
export default {
  name: "ProjectSpecific",
  components: {
  },
  data: function () {
    return {
      project_idLocal: this.$route.params.project_id,
      project_object: null,
      todos: []
    };
  },
  firestore: function() {
        return {
            project_object: db.collection("projects").doc(this.project_idLocal),
            todos: db.collection("to-do-items").where('project_id', "==", this.project_idLocal)
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
</style>
