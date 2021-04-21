<template>
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
            <template v-if="journalEntry.length > 0"> Update Journal</template>
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
          <label class="control-label w-100">Journal Title</label>
          <input type="text" class="form-control" v-model="journal_title" />

          <label class="control-label w-100 margin-top-10">Description</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="journal_description"
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
          <button type="button" class="btn btn-primary" @click="addANewJournal">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseConfig.js";

export default {
  name: "ModalAddOrUpdateJournal",
  props: ["todo_id"],

  data: function () {
    return {
      journal_title: null,
      journal_description: null,
      journalEntry: [],
    };
  },

  firestore: function () {
    return {
      journalEntry: db
        .collection("journal-entries")
        .where("todo_id", "==", this.todo_id),
    };
  },

  mounted() {
    this.setJournalForm();
  },

  methods: {
    setJournalForm: function () {
      if (this.journalEntry.length > 0) {
        // already in database, just need to bind it
        this.journal_title = this.journalEntry[0].title;
        this.journal_description = this.journalEntry[0].description;
      }
    },

    addANewJournal: function () {
      let journalFields = {
        title: this.journal_title,
        description: this.journal_description,
      };

      if (this.journalEntry.length > 0) {
        // already in database, just need to update it
        db.collection("journalEntries")
          .doc(this.journalEntry[0].id)
          .update(journalFields);
      } else {
        // add to the database
        journalFields.todo_id = this.todo_id;
        db.collection("journalEntries").add(journalFields);
      }

      this.journal_title = null;
      this.journal_description = null;

      window.$("#addAJournal").modal("toggle");
    },
  },
};
</script>
