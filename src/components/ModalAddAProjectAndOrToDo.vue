<template>
  <div :class="[isAddNewProject ? 'text-end' : '']">
    <i
      class="bi bi-plus-circle plus-icon hoverable align-top"
      data-bs-toggle="modal"
      data-bs-target="#addAProject"
    ></i>

    <div
      class="modal fade"
      id="addAProject"
      tabindex="-1"
      aria-labelledby="addAProjectLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addAProjectLabel">
              <i class="bi bi-list-task"></i>
              <span v-if="isAddNewProject">
                Add a new project & its to-do item
              </span>
              <span v-else> Add a new to-do item </span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body container text-start">
            <span id="error" class="small-error-font" hidden>
              <strong>Error</strong>: You must enter in all form fields.
              <br />
              <br />
            </span>

            <div v-if="isAddNewProject">
              <label class="control-label w-100">
                Project name<span class="small-error-font">*</span>
              </label>
              <input type="text" class="form-control" v-model="project_name" />
              <br />
              <br />
            </div>

            <label class="control-label w-100">
              New to-do deadline<span class="small-error-font">*</span>
            </label>
            <datepicker
              :bootstrap-styling="true"
              v-model="todo_deadline"
            ></datepicker>

            <label class="control-label w-100 margin-top-10">
              To-do title<span class="small-error-font">*</span>
            </label>
            <input type="text" class="form-control" v-model="todo_name" />

            <label class="control-label w-100 margin-top-10">
              To-do description<span class="small-error-font">*</span>
            </label>
            <textarea
              class="form-control"
              rows="3"
              v-model="todo_description"
            ></textarea>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="addNewDocument"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseConfig.js";
import Datepicker from "vuejs-datepicker";
//import moment from 'vue-moment';

export default {
  name: "ModalAddAProject",
  props: ["owner_id", "isAddNewProject", "project_id"],
  components: {
    Datepicker,
  },
  data: function () {
    return {
      project_name: null,
      todo_name: null,
      todo_description: null,
      todo_deadline: null,
    };
  },

  methods: {
    addNewDocument: function () {
      let error = document.getElementById("error");

      if (
        this.todo_deadline &&
        this.todo_name &&
        this.todo_description &&
        ((this.isAddNewProject && this.project_name) || !this.isAddNewProject)
      ) {
        // adds a new project to projects db and then add a new to-do to to-do-items db
        let newProject = {
          owner_id: this.owner_id,
          project_name: this.project_name,
        };

        let newToDo = {
          name: this.todo_name,
          description: this.todo_description,
          deadline: this.todo_deadline,
          isComplete: false,
          project_id: "",
          twoDaysDismissConfirmation: false,
        };

        // If add a new project, then add it to the projects db first, then add the new to do to the to-do-items db
        // Else if add a new to do, then add it to the to-do-items db
        if (this.isAddNewProject) {
          db.collection("projects")
            .add(newProject)
            .then(function (docRef) {
              newToDo.project_id = docRef.id;
              db.collection("to-do-items").add(newToDo);
            });
        } else {
          newToDo.project_id = this.project_id;
          db.collection("to-do-items").add(newToDo);
        }

        // resets all the fields from modal form
        this.project_name = null;
        this.todo_name = null;
        this.todo_description = null;
        this.todo_deadline = null;

        // removes error indicator && closes the modal
        error.setAttribute("hidden", true);
        window.$("#addAProject").modal("toggle");
      } else {
        error.removeAttribute("hidden");
      }
    },
  },
};
</script>

<style scope>
.small-error-font {
  font-size: 1rem;
  color: red;
}

.plus-icon {
  font-size: 1.7rem;
  font-weight: bold;
}

.hoverable {
  cursor: pointer;
}
</style>