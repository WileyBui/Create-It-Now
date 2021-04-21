<template>
  <div class="container text-start">
    <div v-if="user" class="row">
      <h2 class="header-bold">
        <i class="bi bi-journal-check"></i>
        All Journal Entries {{ todo_items }}
      </h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth, db } from "../firebaseConfig.js";
// import DashboardProject from "@/components/DashboardProject.vue";
// import ModalAddAProjectAndOrToDo from "@/components/ModalAddAProjectAndOrToDo.vue";

export default {
  name: "AllJournalsFromProject",
  components: {
    // DashboardProject,
    // ModalAddAProjectAndOrToDo,
  },

  data: function () {
    return {
      project_id: this.$route.params.project_id,
      todo_items: [],
      user: null,
    };
  },

  beforeCreate: function () {
    // ask the auth layer to let us know when the user changes.
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        document.title = "Dashboard";
      }
    });
  },

  firestore: function () {
    if (auth.currentUser) {
      return {
        todo_items: db
          .collection("to-do-items")
          .where("project_id", "==", this.project_id),
        // .orderBy("timestamp", "desc"), WILEY - WILL NEED TO SORT QUERY WHEN PROJECT IS FINISHED
      };
    }
  },
};
//
</script>

<style scope>
.header-bold {
  font-weight: bold;
}
</style>