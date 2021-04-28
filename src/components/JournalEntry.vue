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
              <div class="d-grid gap-2 col-5 mx-auto">
                <button
                  type="button"
                  class="btn-warning"
                  aria-label="take a picture"
                >
                  Take a picture
                </button>
              </div>
              <div class="d-grid gap-2 col-5 mx-auto">
                <button
                  type="button"
                  class="btn-warning"
                  aria-label="camera roll"
                >
                  Camera roll
                </button>
              </div>
            </div>
            <br />
            <div class="d-grid gap-2 col-11 mx-auto">
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
//import {db} from "../firebaseConfig.js"

export default {
  name: "JournalEntry",
  props: ["entry"],
  methods: {
        updateJournal: function() {
            this.entry.title = document.getElementById("editableTitle").value
            this.entry.description = document.getElementById("editableDescription").value

            this.$firestoreRefs.entry.set(this.todoitem)
        }
    }
};
</script>