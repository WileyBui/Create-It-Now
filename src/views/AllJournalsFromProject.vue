<template>
    <div v-if="user && project" class="container text-start">
        <div class="row">
            <h2 class="header-bold">
                <i class="bi bi-journal-check"></i>
                All Journal Entries: {{ project.project_name }}
            </h2>

            <div class="margin-top-20"></div>

            <div v-if="journalEntries.length > 0"
                 class="container orange-background padding-bottom-10">
                <DisplayASingleJournalEntry v-for="entry in journalEntries"
                                            :key="entry.id"
                                            :entry="entry" />
            </div>
            <div v-else>There are no journal entries from this project yet.</div>
        </div>

        <button @click="backToProject()" type="button" class="btn btn-primary" id="viewProject">Back to Project</button>
    </div>
  <div v-else>
    <UnableToFindId error_type="project journal" />
  </div>
</template>

<script>
import DisplayASingleJournalEntry from "../components/DisplayASingleJournalEntry.vue";
import UnableToFindId from "../components/UnableToFindId.vue";
import { auth, db } from "../firebaseConfig.js";

export default {
  name: "AllJournalsFromProject",
  components: {
    DisplayASingleJournalEntry,
    UnableToFindId,
  },

  data: function () {
    return {
      project_id: this.$route.params.project_id,
      project: null,
      todo_items: [],
      user: null,
      journalEntries: [],
    };
  },

  beforeCreate: function () {
    // ask the auth layer to let us know when the user changes.
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        document.title = "Journals";
      }
    });
  },

  firestore: function () {
    if (auth.currentUser) {
      return {
        project: db.collection("projects").doc(this.project_id),
        journalEntries: db
          .collection("journalEntries")
          .where("project_id", "==", this.project_id)
          .orderBy("created_at", "asc"),
      };
    }
  },

  methods: {
        backToProject: function () {
            this.$router.push({ name: 'ProjectSpecific', params: { project_id: this.project_id } })
        },

        toEntry: function (entry) {
            this.$router.push({ name: 'SingleJournalEntry', params: { id: entry.id } })
        }
  }
};
//
</script>

<style scope>
.header-bold {
  font-weight: bold;
}

#viewProject {
   margin-top: 1em;
   margin-left: auto;
   margin-right: auto;
   text-align: center;
   display: block;
}
</style>