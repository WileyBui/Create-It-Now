<template>
    <body>
        <div id="singleTask">
            <table>
                <tr>
                    <th>Task Name</th>
                    <th>Completion Status</th>
                    <th>Details about the task</th>
                    <th>Time Allocated for Task</th>
                    <th>Project ID </th>
                </tr>
                <tr>
                    <td>{{taskName.name}}</td>
                    <template v-if="taskName.isComplete">
                        <td>
                            <input type="checkbox" @click="markUndone(taskName)" checked />
                            <br />
                            Complete
                        </td>
                    </template>
                    <template v-else>
                        <td>
                            <input type="checkbox" @click="markDone(taskName)" />
                            <br />
                            Incomplete
                        </td>
                    </template>
                    <td>{{taskName.description}}</td>
                    <td>{{ taskName.deadline }}</td>
                    <td>{{taskName.project_id}}</td>
                </tr>
            </table>
            
        </div>
        <div>
            <button @click="addNewTaskToProject" id="addNewTaskToProject">Add a Task To This Project</button>
        </div>
    </body>
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


</style>