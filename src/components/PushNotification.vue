<template>
  <div class="text-end">
    <i
      class="bi bi-bell plus-icon color-white hoverable align-top"
      data-bs-toggle="modal"
      data-bs-target="#displayNotification"
    >
      <span v-if="toDoDueInTwoDays.length > 0" class="badge badge-notify">
        {{ toDoDueInTwoDays.length }}
      </span>
    </i>

    <div
      class="modal fade"
      id="displayNotification"
      tabindex="-1"
      aria-labelledby="displayNotificationLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
      >
        <div class="modal-content light-blue-background">
          <div class="modal-header">
            <h5 class="modal-title" id="displayNotificationLabel">
              <i class="bi bi-bell"></i>
              Notifications <strong>({{ toDoDueInTwoDays.length }})</strong>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body container text-start">
            <template v-if="toDoDueInTwoDays.length > 0">
              <SpecificNotification
                v-for="toDo in toDoDueInTwoDays"
                :key="toDo.id"
                :toDo="toDo"
                :isToDo="true"
                v-on:isToBeDismissed="dismiss"
              />
            </template>
            <template v-else> You are all caught up! Great job! </template>
          </div>
          <div class="modal-footer">
            <button
              v-if="toDoDueInTwoDays.length > 0"
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
import { db } from "../firebaseConfig.js";
import SpecificNotification from "./SpecificNotification.vue";

export default {
  name: "PushNotification",
  props: ["owner_id"],
  components: {
    SpecificNotification,
  },

  data: function () {
    return {
      projects: null,
      todos: [],
      toDoDueInTwoDays: [],
      isToBeDismissed: false,
    };
  },

  firestore: function () {
    return {
      projects: db
        .collection("projects")
        .where("owner_id", "==", this.owner_id),
    };
  },

  mounted() {
    let todos = this.toDoDueInTwoDays;

    this.todos = db
      .collection("projects")
      .where("owner_id", "==", this.owner_id)
      .get()
      .then((projects) => {
        projects.forEach(function (item) {
          db.collection("to-do-items")
            .where("project_id", "==", item.id)
            .where("isComplete", "==", false)
            .where("twoDaysDismissConfirmation", "==", false)
            .get()
            .then((res) => {
              res.forEach((doc) => {
                let todo = doc.data();
                todo.id = doc.id; // attach doc's id to todo

                let deadline = todo.deadline.seconds;
                let currentTime = (new Date().getTime() / 1000) | 0;

                // add to toDoDueInTwoDays since the to-do is due within 2 days
                if (currentTime + 172800 > deadline) {
                  todos.push(todo);
                }
              });
            });
        });
      });
  },

  methods: {
    dismiss: function (todo) {
      let index = this.toDoDueInTwoDays.indexOf(todo);
      if (index > -1) {
        this.toDoDueInTwoDays.splice(index, 1);
        db.collection("to-do-items")
          .doc(todo.id)
          .update({ twoDaysDismissConfirmation: true });
      }
    },

    dismissAllNotifications: function () {
      this.toDoDueInTwoDays.forEach((todo) =>
        db
          .collection("to-do-items")
          .doc(todo.id)
          .update({ twoDaysDismissConfirmation: true })
      );
      this.toDoDueInTwoDays = [];
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

.badge-notify {
  background: red;
  position: relative;
  top: -20px;
  left: -35px;
  font-size: 0.5em !important;
}
</style>