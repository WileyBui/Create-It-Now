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

                <div v-if="entry.filelist" class="entry-photo light">
                    <div v-for="file in entry.filelist.slice()" :key="file.id">
                        <img v-bind:src="file.url" alt="Issues loading image" class="entry-image"/>
                        <div class="overlay">
                            <div class="text"><a v-bind:href="file.url">{{file.name}}</a></div>
                        </div>
                    </div>
                </div>

                <div class="entry-body light-orange-background" id="allJournalsBody">
                    <p class="journal-body">{{entry.description}}</p>
                </div>
            </div>
        </div>
        <div> 
            
            <!-- <button
                    type="button"
                    class="btn blue-background color-white p-1 pt-0 pb-0"
                    data-bs-toggle="modal"
                    data-bs-target="#journalEntryModal">
                Add New Journal Entry
            </button>
            <ModalAddOrUpdateJournal
                :project_id="project_idLocal"
            /> 
                           -->
            <ModalAddIndependentJournal :project_id="project_idLocal" />
            <button @click="getJournalModal()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0" id="addingJournal">Add New Entry</button>
        </div>
        <button @click="backToProject()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">Back to Project</button>
    </div>
</template>

<script>
import { db } from "../firebaseConfig.js";
import ModalAddIndependentJournal from "@/components/ModalAddIndependentJournal.vue";

export default {
    name: "ProjectJournal",
    components: {
        ModalAddIndependentJournal
    },
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
            entries: db.collection("journalEntries").where("project_id", "==", this.project_idLocal).orderBy("created_at", "asc"),
        }
    },

    methods: {
        backToProject: function () {
            this.$router.push({ name: 'ProjectSpecific', params: { project_id: this.project_idLocal } })
        },

        toEntry: function (entry) {
            this.$router.push({ name: 'SingleJournalEntry', params: { id: entry.id } })
        },
        getJournalModal: function () {
            window.$("#addAJournalIndependent").modal("toggle");
        },
    }
}
</script>

<style>
    div.journal-entries {
        margin-left: 5%;
        margin-right: 5%;
    }

    div.journal-module {
        background-size: cover;
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

    img.entry-image {
        object-fit: cover;
        display: block;
        border-radius: 1em;
        border: 1px solid #ddd;
        max-width: 100%;
        height: auto;
    }

    img:hover {
        box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
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

    #allJournalsBody {
        height: 2em;
    }

    #addingJournal {
        margin: 1em;
    }

    div.entry-photo {
        float: right;
        clear: right;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        position: relative;
        width: 50%;
    }

    .overlay {
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        background-color: #008CBA;
        overflow: hidden;
        width: 100%;
        height: 0;
        transition: .5s ease;
    }

    .entry-photo:hover .overlay {
        bottom: 0;
        height: 100%;
    }

    .text {
        white-space: nowrap;
        color: white;
        font-size: 20px;
        position: absolute;
        overflow: hidden;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
    }
</style>