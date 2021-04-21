<template>
  <div>
      <h1> Click this to test the journal specific modal</h1>
    <i
      class="bi bi-plus-circle plus-icon hoverable align-top"
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
              <i class="bi bi-list-task"></i>
              <span>
                Sample Journal Entry
              </span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body container text-start">
            Hi! This is sample text until journals are configured in the DB.
            <ul>
                <li>Woke up</li>
                <li>Tried to fix the code for server</li>
                <li>Made it a lot worse</li>
                <li>Went to bed</li>
            </ul>
            <div class="d-flex justify-content-around">
                <div class="d-grid gap-2 col-5 mx-auto">
                    <button
                    type="button"
                    class="btn-warning"
                    aria-label="take a picture"
                    >Take a picture</button>
                </div>
                <div class="d-grid gap-2 col-5  mx-auto">
                    <button
                    type="button"
                    class="btn-warning"
                    aria-label="camera roll"
                    >Camera roll</button>
                </div>
            </div>
            <br />
            <div class="d-grid gap-2 col-11 mx-auto">
                <button
                type="button"
                class="btn-warning"
                aria-label="upload image"
                >Upload image</button>
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
            <button
              type="button"
              class="btn btn-primary"
              @click="addNewDocument"
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
        name: "task",
        props: ["id", "entry", "project_id"],
        methods: {

        }
    }
</script>