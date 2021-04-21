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
// import { db } from "../firebaseConfig.js";
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