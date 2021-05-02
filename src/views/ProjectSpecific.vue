<template>
  <div>
    <template v-if="project_object">
        <div v-if="!editable">
            <div class="project-header">
                <h3 class="project-title">{{ project_object.project_name }}</h3>
                <template v-if="isComplete">
                    <strong class="Complete"><strong>COMPLETED</strong></strong>
                </template>
                <template v-else>
                    <strong class="Incomplete"><strong>IN PROGRESS</strong></strong>
                </template>
            </div>

            <div class="accordion accordion-flush mb-3 margin-tile"
                 id="accordionFlushExample">
                <div class="accordion-item green-background">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button show green-background"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="true"
                                aria-controls="flush-collapseOne">
                            <strong class="todo-header">To-do Items</strong>
                        </button>
                    </h2>
                    <div id="flush-collapseOne"
                         class="accordion-collapse show"
                         aria-labelledby="flush-headingOne"
                         data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body horizontal-scroll">
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
                                <task v-for="task in allToDosFromProject"
                                      :key="task.id"
                                      :id="task.id"
                                      :task="task"
                                      v-on:toDoStatusEvent="getModal" />
                            </table>
                        </div>
                        <ModalAddAProjectAndOrToDo :project_id="project_idLocal"
                                                   :isAddNewProject="false" />

                        <ModalAddOrUpdateJournal :todo_id="clickedSpecificJournalEntryId"
                                                 :project_id="project_idLocal" />
                    </div>
                </div>
                <DisplayAllJournalEntries v-if="journalEntries.length > 0"
                                          :entries="journalEntries"
                                          :proj_id="project_idLocal"
                                          class="margin-top-10" />

                <div class="margin-top-10">
                    <button @click="editProject()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0" id="bottomButton">Edit Project</button>
                    
                    <button type="button" class="btn blue-background color-white p-1 pt-0 pb-0" data-bs-toggle="modal" data-bs-target="#deleteProject" id="bottomButton2">Delete Project</button>
                    
                    <button @click="backToDash()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0" id="bottomButton3">Back to Dashboard</button>
                </div>

                <div class="modal fade" id="deleteProject" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteProjectLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteProjectLabel">Are you sure you want to delete this project?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-start">
                            <strong class="text-danger">Warning:</strong>
                            You can't undo this action!
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" @click="deleteProject()">Understood</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="project-header">
                <input v-model="inputTitle" />
                <br />
                <template v-if="isComplete">
                    <strong class="Complete"><strong>COMPLETED</strong></strong>
                </template>
                <template v-else>
                    <strong class="Incomplete"><strong>IN PROGRESS</strong></strong>
                </template>
            </div>

            <div class="accordion accordion-flush mb-3 margin-tile"
                 id="accordionFlushExample">
                <div class="accordion-item green-background">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button show green-background"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="true"
                                aria-controls="flush-collapseOne">
                            <strong class="todo-header">To-do Items</strong>
                        </button>
                    </h2>
                    <div id="flush-collapseOne"
                         class="accordion-collapse show"
                         aria-labelledby="flush-headingOne"
                         data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body" id="todosTable">
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
                                <task v-for="task in allToDosFromProject"
                                      :key="task.id"
                                      :id="task.id"
                                      :task="task"
                                      v-on:toDoStatusEvent="getModal" />
                            </table>
                        </div>
                        <ModalAddAProjectAndOrToDo :project_id="project_idLocal"
                                                   :isAddNewProject="false" />

                        <ModalAddOrUpdateJournal :todo_id="clickedSpecificJournalEntryId"
                                                 :project_id="project_idLocal" />
                    </div>
                </div>
                <DisplayAllJournalEntries v-if="journalEntries.length > 0"
                                          :entries="journalEntries"
                                          :proj_id="project_idLocal"
                                          class="margin-top-10" />

                <div class="margin-top-10">
                    <button @click="updateProject()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0" id="finishButton">Finish</button>
                    
                    <button @click="cancelEdit()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0" id="cancelButton">Cancel</button>
                </div>
            </div>
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
      doneTaskNum: 0,

      editable: false,
      inputTitle: ''
    };
  },

  beforeUpdate() {
    var doneTasks = db
      .collection("to-do-items")
      .where("project_id", "==", this.project_idLocal)
      .where("isComplete", "==", false);

    doneTasks.get().then((res) => {
      this.doneTaskNum = res.size;

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
        .where("project_id", "==", this.project_idLocal)
        .orderBy("created_at", "desc")
        .limit(3),
    };
  },
  methods: {
    backToDash: function() {
        this.$router.push('/dashboard')
    },

    cancelEdit: function() {
        this.editable = false;
    },

    deleteProject: function () {
        // delete all to-do items
        this.allToDosFromProject.forEach(function(item) {
          db.collection("to-do-items").doc(item.id).delete();
        });

        // delete all journal entries
        this.journalEntries.forEach(function(item) {
          db.collection("journalEntries").doc(item.id).delete();
        });

        // delete project itself
        db.collection("projects").doc(this.project_idLocal).delete();

        window.$("#deleteProject").modal("toggle");
        this.$router.push('/')
    },

    editProject: function() {
        this.editable = true;
        this.inputTitle = this.project_object.project_name;
    },

    getModal: function (id) {
        this.clickedSpecificJournalEntryId = id;
        window.$("#addAJournal").modal("toggle");
    },

    updateProject: function () {
        (db.collection("projects").doc(this.project_idLocal)).set({ project_name: this.inputTitle }, { merge: true });
        this.editable = false;
    }
  },
};
</script>
<style scoped>
div.project-header {
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 1%;
    background-color: rgb(152, 231, 145);
}

table.todos-table {
  margin-left: auto;
  margin-right: auto;
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
    color: white;
}

div.margin-tile {
  margin-left: 5%;
  margin-right: 5%;
}

strong.todo-header {
  color: white;
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

#bottomButton, #bottomButton2, #bottomButton3 {
  margin: 1em;
}

#cancelButton, #finishButton {
  margin: 1em;
}

#todosTable {
  margin-left: auto;
  margin-right: auto;
}
</style>
