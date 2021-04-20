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
      project_object: null
    };
  },
  firestore: function() {
        return {
            project_object: db.collection("projects").doc(this.project_idLocal)
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
</style>
