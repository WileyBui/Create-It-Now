<template>
  <div>
    <!-- <i
      class="bi bi-plus-circle plus-icon hoverable align-top"
      data-bs-toggle="modal"
      data-bs-target="#addAJournal"
    ></i> -->

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
              Add a Journal
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body container text-start">
            {{ id }}
            <!-- YOUR BODY CONTENTS WILL BE HERE -->
            <!-- YOUR BODY CONTENTS WILL BE HERE -->
            <!-- YOUR BODY CONTENTS WILL BE HERE -->
            <!-- YOUR BODY CONTENTS WILL BE HERE -->
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
              @click="addANewJournal"
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
// import { db } from "../firebaseConfig.js";

export default {
  name: "ModalAddOrUpdateJournal",
  props: ["id"],

  data: function () {
    return {
      // form fields & variables here
    };
  },

  methods: {
    addANewJournal: function () {
      // add or update journal to database
    },
  },
};
</script>
