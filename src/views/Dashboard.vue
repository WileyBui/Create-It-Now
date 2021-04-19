<template>
  <div class="container text-start">
    <div v-if="user" class="row">
      <div class="col-8">
        <h2 class="header-bold">Dashboard</h2>
      </div>
      <div class="col-4 text-end">
        <ModalAddAProjectAndOrToDo
          :owner_id="user.uid"
          :isAddNewProject="true"
        />
      </div>
    </div>

    <DashboardProject
      v-for="project in projects"
      :key="project.id"
      :project="project"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import { auth, db } from "../firebaseConfig.js";
import DashboardProject from "@/components/DashboardProject.vue";
import ModalAddAProjectAndOrToDo from "@/components/ModalAddAProjectAndOrToDo.vue";

export default {
  name: "Dashboard",
  components: {
    DashboardProject,
    ModalAddAProjectAndOrToDo,
  },

  data: function () {
    return {
      projects: [],
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
    return {
      projects: db
        .collection("projects")
        .where("owner_id", "==", auth.currentUser.uid),
      // .orderBy("timestamp", "desc"), WILEY - WILL NEED TO SORT QUERY WHEN PROJECT IS FINISHED
    };
  },
};
//
</script>

<style scope>
.header-bold {
  font-weight: bold;
}
</style>