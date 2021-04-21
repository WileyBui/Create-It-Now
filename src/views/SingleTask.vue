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
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        class="accordion-collapse show"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      >
        <div class="accordion-body">
          <strong id="thisTaskName">{{taskName.name}}</strong>
          <table class="todos-table">
            <tr>
                <th><u><b>Task Details</b></u></th>
                <th><u><b>Deadline</b></u></th>
                <th><u><b>Status</b></u></th>
            </tr>
            <tr>
                    <td>{{taskName.description}}</td>
                    <td>{{taskName.deadline ? taskName.deadline.toDate() : "" | formatDate }}</td>
                    <template v-if="taskName.isComplete">
                        <td>
                            <button
                                @click="markUndone(taskName)"
                                type="button"
                                class="btn blue-background color-white p-1 pt-0 pb-0"
                            >
                                Complete
                            </button>
                        </td>
                    </template>
                    <template v-else>
                        <td>
                            <button
                                @click="markDone(taskName)"
                                type="button"
                                class="btn blue-background color-white p-1 pt-0 pb-0"
                            >
                                Incomplete
                            </button>
                        </td>
                    </template>
            </tr>
          </table>
          <br>
          <button @click="backToProject(taskName)" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">Back to Project</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    //var taskNum = document.getElementById("taskIdNum").innerHTML
    //console.log(taskNum)
    import {db} from "../firebaseConfig.js"
    //import task from "../components/Word.vue"
    //var taskname = db.collection("tasks")
    //console.log(taskname)
    //console.log(this.$route.params.id)
    export default {
        data() {
            return {
                id: this.$route.params.id,
                taskName: null
            }
        },

        firestore: function() {
            return {
                taskName: db.collection("to-do-items").doc(this.id)
            }
        },

        methods: {
            addNewTaskToProject: function() {
                console.log("still gotta implement") //still have to implement this
            },

            markDone: function (task) {
                db.collection('to-do-items').doc(task.id).update({ ['isComplete']: true })
            },

            markUndone: function (task) {
                db.collection('to-do-items').doc(task.id).update({ ['isComplete']: false })
            },

            backToProject: function (task) {
                this.$router.push({ name: 'ProjectSpecific', params: { project_id: task.project_id } })
            }
        }
    }


</script>
<style scoped>
    #addNewTaskToProject {
        color: black;
    }

    table {
    margin-left: auto;
    margin-right: auto;
    border-block-style: double;
    border-color: lightseagreen;
    font-size: 1.4em;
  }

  tr {
    padding: 0.5em;
    color: black;
  }

  th {
    padding: 0.5em;
  }

  td {
    padding: 1em;
    color: black;
  }

  #thisTaskName {
      color: black;
      font-size: 2em;
  }


</style>