<template>
  <div>
    <i
      class="bi bi-pencil hoverable align-top"
      data-bs-toggle="modal"
      data-bs-target="#journalEntryModal"
    ></i>

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
            <h5 class="modal-title" id="journalEntryModal">
              <textarea v-model= "entry.title" id = "editableTitle" rows="1"> </textarea>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body container text-start">
            <textarea v-model= "entry.description" id = "editableDescription" rows="4" cols = "44"> </textarea>
            <br>
            <br>
            <div class="d-flex justify-content-around">
              
              <span id="error" class="small-error-font" hidden>
                <strong>Error</strong>: You must enter in all form fields.
                <br />
                <br />
              </span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button @click="updateJournal"
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
import {db} from "../firebaseConfig.js"
import firebase from 'firebase/app';

export default {
  name: "JournalEntry",
  props: ["entry"],
  methods: {
        updateJournal: function() {
            this.entry.title = document.getElementById("editableTitle").value
            this.entry.description = document.getElementById("editableDescription").value
            db.collection("journalEntries").doc(this.entry.id).set({ title: this.entry.title, description: this.entry.description, last_modified: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
        }
    }
};
</script>