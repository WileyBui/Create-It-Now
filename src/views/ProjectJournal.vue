<template>
    <div>
        <h1>{{project.project_name}} Journal</h1>
        <div class="journal-entries">
            <div class="journal-module hoverable light-orange-background" v-for="entry in entries" :key="entry.id" :id="entry.id" @click="toEntry(entry)">
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
        </div>
        <button @click="backToProject()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">Back to Project</button>
    </div>
</template>

<script>
import { db } from "../firebaseConfig.js";

export default {
    name: "ProjectJournal",
    props: [ "project_id" ],

    data: function () {
        return {
            project_idLocal: this.$route.params.project_id,
            project: null,
            entries: [],

            editable: false,
            inputTitle: '',
            inputBody: ''
        }
    },

    firestore: function () {
        return {
            project: db.collection("projects").doc(this.project_idLocal),
            entries: db.collection("journalEntries").where("project_id", "==", this.project_idLocal),
        }
    },

    methods: {
        backToProject: function () {
            this.$router.push({ name: 'ProjectSpecific', params: { project_id: this.project_idLocal } })
        },

        toEntry: function (entry) {
            this.$router.push({ name: 'SingleJournalEntry', params: { id: entry.id } })
        }
    }
}
</script>

<style>
    div.journal-entries {
        margin-left: 5%;
        margin-right: 5%;
    }

    div.journal-module {
        margin-top: 5%;
        margin-bottom: 5%;
    }

    div.entry-heading {
        text-align: left;
        color: white;
        margin: auto;
        padding-left: 5%;
        padding-right: 5%;
        background-color: orange;
    }

    div.entry-body {
        text-align: left;
        margin: auto;
        padding-left: 5%;
        padding-right: 5%;
        font-size: 120%;
    }

    div.to-do-item {
        margin-left: 5%;
        margin-right: 5%;
        border-block-style: double;
        border-color: lightseagreen;
    }

    h3.journal-title {
        font-size: 300%;
        display: inline-block;
    }
</style>