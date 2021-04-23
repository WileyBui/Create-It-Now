<template>
  <div>
    <div
      class="modal fade"
      id="addAJournal"
      tabindex="-1"
      aria-labelledby="addAJournalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addAJournalLabel">
              <i class="bi bi-list-task"></i>
              <!-- make a conditional statement if you're adding or updating a journal -->
              <template v-if="journalEntry"> Update Journal</template>
              <template v-else> Add a Journal</template>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body container text-start">
            <label class="control-label w-100">
              Journal Title {{ journalEntry }} ok {{ journal_id }}
            </label>
            <input type="text" class="form-control" v-model="journal_title" />

            <label class="control-label w-100 margin-top-10">
              Description {{ todo_id }}
            </label>
            <textarea
              class="form-control"
              rows="3"
              v-model="journal_description"
            ></textarea>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-target="#modal2"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Take a picture
            </button>
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
              @click="addANewJournal"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="modal2"
      aria-hidden="true"
      aria-labelledby="..."
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <WebCamera />
          <div class="modal-footer">
            <!-- Toogle to first dialog, `data-bs-dismiss` attribute can be omitted - clicking on link will close dialog anyway -->
            <a
              class="btn btn-primary"
              href="#modal"
              data-bs-toggle="modal"
              role="button"
            >
              Open #modal
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseConfig.js";
import WebCamera from "./WebCamera.vue";

export default {
  name: "ModalAddOrUpdateJournal",
  props: ["todo_id", "project_id"],
  components: {
    WebCamera,
  },

  data: function () {
    return {
      journal_title: null,
      journal_description: null,
      journalEntry: null,
      journal_id: null,
    };
  },

  // updated() {
  //   // watch for the todo_id changes
  //   this.journal_title = null;
  //   this.journal_description = null;
  //   this.journalEntry = null;

  //   db.collection("journalEntries")
  //     .where("todo_id", "==", this.todo_id)
  //     .get()
  //     .then((snapshot) => {
  //       if (snapshot.size > 0) {
  //         // already in database, just need to bind it to our form
  //         this.journalEntry = snapshot.docs[0].data();
  //         this.journal_id = snapshot.docs[0];
  //         this.journal_title = this.journalEntry.title;
  //         this.journal_description = this.journalEntry.description;
  //       }
  //     });
  // },
  // watch: {
  //   // watch for the todo_id changes
  //   todo_id: function () {
  //     this.journal_title = null;
  //     this.journal_description = null;
  //     this.journalEntry = null;

  //     db.collection("journalEntries")
  //       .where("todo_id", "==", this.todo_id)
  //       .get()
  //       .then((snapshot) => {
  //         if (snapshot.size > 0) {
  //           // already in database, just need to bind it to our form
  //           this.journalEntry = snapshot.docs[0].data();
  //           this.journal_id = snapshot.docs[0];
  //           this.journal_title = this.journalEntry.title;
  //           this.journal_description = this.journalEntry.description;
  //         }
  //       });
  //   },
  // },

  methods: {
    addANewJournal: function () {
      let journalFields = {
        project_id: this.project_id,
        todo_id: this.todo_id,
        title: this.journal_title,
        description: this.journal_description,
      };

      if (this.journalEntry) {
        // already in database, just need to update it
        console.log("update: ", this.journalEntry.id);
        db.collection("journalEntries")
          .doc(this.journalEntry.id)
          .update(journalFields);
      } else {
        // add to the database
        journalFields.todo_id = this.todo_id;
        db.collection("journalEntries").add(journalFields);
      }

      window.$("#addAJournal").modal("toggle");
    },
  },
};
</script>
