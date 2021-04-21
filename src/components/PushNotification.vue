<template>
  <div class="text-end">
    <i
      class="bi bi-bell plus-icon color-white hoverable align-top"
      data-bs-toggle="modal"
      data-bs-target="#displayNotification"
    ></i>

    <div
      class="modal fade"
      id="displayNotification"
      tabindex="-1"
      aria-labelledby="displayNotificationLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content light-blue-background">
          <!-- if we want a modal color, use light-blue-background class -->
          <div class="modal-header">
            <h5 class="modal-title" id="displayNotificationLabel">
              <i class="bi bi-bell"></i>
              Notifications <strong>(5)</strong>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body container text-start">
            <SpecificNotification :isToDo="true" />
            <SpecificNotification :isToDo="true" />
            <SpecificNotification :isToDo="true" />
            <SpecificNotification :isToDo="true" />
            <SpecificNotification :isToDo="false" />
            <SpecificNotification :isToDo="false" />
            <SpecificNotification :isToDo="false" />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="dismissAllNotifications"
            >
              Dismiss all
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { db } from "../firebaseConfig.js";
import SpecificNotification from "./SpecificNotification.vue";

export default {
  name: "ModaldisplayNotification",
  props: ["owner_id", "isAddNewProject"],
  components: {
    SpecificNotification,
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
    dismissAllNotifications: function () {
      // let error = document.getElementById("error");

      // if (
      //   // if isAddNewProject, checks everything
      //   (this.isAddNewProject &&
      //     this.project_name &&
      //     this.todo_description &&
      //     this.todo_deadline) ||
      //   (!this.isAddNewProject && this.todo_description && this.todo_deadline)
      // ) {
      //   // adds a new project to projects db and then add a new to-do to to-do-items db
      //   let newProject = {
      //     owner_id: this.owner_id,
      //     project_name: this.project_name,
      //   };

      //   let newToDo = {
      //     name: this.todo_name,
      //     description: this.todo_description,
      //     deadline: this.todo_deadline,
      //     isComplete: false,
      //   };

      //   // If add a new project, then add it to the projects db first, then add the new to do to the to-do-items db
      //   // Else if add a new to do, then add it to the to-do-items db
      //   if (this.isAddNewProject) {
      //     db.collection("projects")
      //       .add(newProject)
      //       .then(function (docRef) {
      //         newToDo.project_id = docRef.id;
      //         db.collection("to-do-items").add(newToDo);
      //       });
      //   } else {
      //     newToDo.project_id = "new-to-do"; // WILL NEED TO IMPLEMENT THIS LATER
      //     db.collection("to-do-items").add(newToDo);
      //   }

      //   // resets all the fields from modal form
      //   this.project_name = null;
      //   this.todo_name = null;
      //   this.todo_description = null;
      //   this.todo_deadline = null;

      //   // removes error indicator && closes the modal
      //   error.setAttribute("hidden", true);
      //   window.$("#displayNotification").modal("toggle");
      // } else {
      //   error.removeAttribute("hidden");
      // }
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
  font-size: 1.5rem;
  font-weight: bold;
}

.hoverable {
  cursor: pointer;
}
</style>