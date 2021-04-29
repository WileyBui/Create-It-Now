<template>
    <div>
        <div v-if="!editable" class="journal-entry light-orange-background">
            <div class="entry-heading">
                <h3 class="journal-title">{{entry.title}}</h3>
                <h4 class="entry-timestamp">Written on: {{entry.created_at ? entry.created_at.toDate() : "" | formatDate }}</h4>
                <h4 class="entry-timestamp">Last modified: {{entry.last_modified ? entry.last_modified.toDate() : "" | formatDate }}</h4>
            </div>

            <div class="entry-photo">

            </div>

            <div class="entry-body light-orange-background">
                <p class="journal-body">{{entry.description}}</p>
            </div>
        </div>

        <div v-else class="journal-entry light-orange-background">
            <div class="entry-heading">
                <label class="journal-title">Title:</label>
                <input v-model="inputTitle" />
            </div>

            <div class="entry-body light-orange-background">
                <label class="journal-body">Body:</label>
                <input v-model="inputBody" />
            </div>
        </div>

        <div v-if="!editable">
            <button @click="editEntry()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">Edit Entry</button>
            <span> -- </span>
            <button type="button" class="btn blue-background color-white p-1 pt-0 pb-0" data-bs-toggle="modal" data-bs-target="#deleteEntry">Delete Entry</button>
            <span> -- </span>
            <button @click="toJournalEntries(entry)" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">View Entry Listing</button>
            <span> -- </span>
            <button @click="toJournal(entry)" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">View Journal</button>
            <span> -- </span>
            <button @click="backToProject(entry)" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">View Project</button>

            <div class="modal fade" id="deleteEntry" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteEntryLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-start" id="deleteEntryLabel">Are you sure you want to delete this entry?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-start">
                        <strong class="text-danger">Warning:</strong>
                        You can't undo this action!
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="deleteEntry(entry)">Understood</button>
                    </div>
                    </div>
                </div>
            </div>
        </div> 

        <div v-else class="margin-top-10">
            <button @click="updateEntry(entry)" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">Finish</button>
            <span> -- </span>
            <button @click="cancelUpdate()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">Cancel</button>
        </div>
    </div>
</template>

<script>
import { db } from "../firebaseConfig.js";
import firebase from 'firebase/app';

export default {
    name: "SingleJournalEntry",
    props: [],

    data: function () {
        return {
            entry_idLocal: this.$route.params.id,
            entry: null,
            task: null,

            editable: false,
            inputTitle: '',
            inputBody: ''
        }
    },

    beforeUpdate() {
        this.task = db.collection("to-do-items").doc(this.entry.todo_id);
        console.log(this.entry.todo_id);
    },

    firestore: function () {
        return {
            entry: db.collection("journalEntries").doc(this.entry_idLocal),
        }
    },

    methods: {
        backToProject: function (entry) {
            this.$router.push({ name: 'ProjectSpecific', params: { project_id: entry.project_id } })
        },

        toJournalEntries: function (entry) {
            this.$router.push({ name: 'AllJournalsFromProject', params: { project_id: entry.project_id } })
        },

        toJournal: function (entry) {
            this.$router.push({ name: 'ProjectJournal', params: { project_id: entry.project_id } })
        },

        cancelUpdate: function () {
            this.editable = false;
            this.inputTitle = this.entry.title;
            this.inputBody = this.entry.description;
        },

        deleteEntry: function (entry) {
            var project_id = entry.project_id;
            db.collection("journalEntries").doc(entry.id).delete().then(() => {
                window.$("#deleteEntry").modal("toggle");
                this.$router.push({ name: 'ProjectSpecific', params: { project_id: project_id } })
            })
        },

        editEntry: function () {
            this.inputTitle = this.entry.title;
            this.inputBody = this.entry.description;
            this.editable = true;
        },

        getModal: function (id) {
            this.clickedSpecificJournalEntryId = id;
            window.$("#addAJournal").modal("toggle");
        },

        updateEntry: function (entry) {
            (db.collection("journalEntries").doc(entry.id)).set({ title: this.inputTitle, description: this.inputBody, last_modified: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
            this.editable = false;
        }
    }
}
</script>

<style>
div.journal-entry{
   margin-left: 5%;
   margin-right: 5%;
}

div.entry-heading{
   text-align: left;   
   color: white;
   margin: auto;
   padding-left: 5%;
   padding-right: 5%;
   background-color: orange;

}

div.entry-body{
   text-align: left;
   margin-left: 5%;
   margin-right: 5%;
   font-size: 120%;
}

div.to-do-item {
  margin-left: 5%;
  margin-right: 5%;
  border-block-style: double;
  border-color: lightseagreen;
}

h3.journal-title{
    font-size: 300%;
    display: inline-block;
}

label.journal-title{
    font-size: 300%;
    display: inline-block;
}

h4.entry-timestamp{
    font-size: 95%;
}

p.journal-body{

}
</style>