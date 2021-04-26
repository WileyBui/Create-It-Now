<template>
    <div>
        <div class="entry-heading">
            <h3 class="journal-title">{{entry.title}}</h3>
            <h4 class="entry-timestamp">Written on: {{entry.timestamp}}</h4>
        </div>

        <div class="entry-photo">

        </div>

        <div class="entry-body light-orange-background">
            <p class="journal-body">{{entry.description}}</p>
        </div>

        <div class="to-do-item green-background">
            <h4>{{task}}</h4>
        </div>

        <button @click="backToProject(entry)" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">Back to Project</button>
    </div>
</template>

<script>
import { db } from "../firebaseConfig.js";

export default {
    name: "SingleJournalEntry",
    props: [],

    data: function () {
        return {
            entry_idLocal: this.$route.params.id,
            entry: null,
            task: null
        }
    },

    beforeUpdate() {
        this.task = db.collection("to-do-items").doc(this.entry.todo_id)
        console.log(this.entry.todo_id)
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

        getModal: function (id) {
            this.clickedSpecificJournalEntryId = id;
            window.$("#addAJournal").modal("toggle");
        }
    }
}
</script>

<style>
div.entry-heading{
   text-align: left;   
   color: white;
   margin-left: 5%;
   margin-right: 5%;
   background-color: orange;
}

div.entry-body{
   text-align: left;
   margin-left: 5%;
   margin-right: 5%;
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

h4.entry-timestamp{

}

p.journal-body{

}
</style>