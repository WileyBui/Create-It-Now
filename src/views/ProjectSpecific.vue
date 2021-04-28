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
                                          class="margin-top-10" />

                <button @click="editProject()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">Edit Project</button>
                <span> -- </span>
                <button @click="deleteProject()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">Delete Project</button>
                <span> -- </span>
                <button @click="backToDash()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">Back to Dashboard</button>
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
                                          class="margin-top-10" />

                <button @click="updateProject()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">Finish</button>
                <span> -- </span>
                <button @click="cancelEdit()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">Cancel</button>
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
        .where("project_id", "==", this.project_idLocal),
    };
  },
  methods: {
    backToDash: function() {
        this.$router.push('/dashboard')
    },

    cancelEdit: function() {
        this.editable = false;
    },

    deleteProject: function() {
        
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
    background-color: gray;
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
</style>
