<template>
  <div>
    <div
      class="modal fade"
      id="journalEntryModal"
      tabindex="-1"
      aria-labelledby="journalEntryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addAJournalLabel">
              <i class="bi bi-list-task"></i>
              Add a Journal
            </h5>
          </div>
          <div class="modal-body container text-start">
            <label class="control-label w-100"> Journal Title </label>

            <textarea
              class="form-control"
              v-model="editableTitle"
              rows="1"
            ></textarea>
          </div>
          <div class="modal-body container text-start">
            <label class="control-label w-100">
              Description
            </label>
            <textarea
              class="form-control"
              v-model="editableDescription"
              rows="4"
            ></textarea>
            <div class="d-flex justify-content-around">
              <!-- <div class="d-grid gap-2 col-5 mx-auto">
                <button
                  type="button"
                  class="btn-warning"
                  aria-label="take a picture"
                >
                  Take a picture
                </button>
              </div> -->
              <!-- <div class="d-grid gap-2 col-5 mx-auto">
                <button
                  type="button"
                  class="btn-warning"
                  aria-label="camera roll"
                >
                  Camera roll
                </button>
              </div> -->
            </div>
            <!-- <div class="d-grid gap-2 col-11 mx-auto">
              <button
                type="button"
                class="btn-warning"
                aria-label="upload image"
              >
                Upload image
              </button>
              <span id="error" class="small-error-font" hidden>
                <strong>Error</strong>: You must enter in all form fields.
                <br />
                <br />
              </span>
            </div> -->
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
              @click="updateJournal"
              data-bs-dismiss="modal"
              type="button"
              class="btn btn-primary"
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
import firebase from "firebase/app";

export default {
  name: "JournalEntry",
  props: ["entry"],
  data: function () {
    return {
      editableTitle: "",
      editableDescription: "",
    };
  },
  methods: {
    updateJournal: function () {
      db.collection("journalEntries")
        .doc(this.entry.id)
        .set(
          {
            project_id: this.entry.project_id,
            todo_id: this.entry.id,
            title: this.editableTitle,
            description: this.editableDescription,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            last_modified: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
    },
  },
};
</script>