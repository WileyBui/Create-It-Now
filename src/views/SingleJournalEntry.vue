<template>
    <div>
        <div v-if="!editable" class="journal-entry light-orange-background">
            <div class="entry-heading">
                <h3 class="journal-title">{{entry.title}}</h3>
                <h4 class="entry-timestamp" id="written">Written on: {{entry.created_at ? entry.created_at.toDate() : "" | formatDate }}</h4>
                <h4 class="entry-timestamp" id="modif">Last modified: {{entry.last_modified ? entry.last_modified.toDate() : "" | formatDate }}</h4>
            </div>

            <div class="light-orange-background margin-top-20 padding-bottom-20" style="overflow:auto;">
                <div class="float-end entry-photo light" style="width: 50%">
                    <div>
                        <img src="https://images-na.ssl-images-amazon.com/images/I/61j4acmknmL._AC_SL1500_.jpg" class="" />
                        <div class="overlay">
                            <div class="text"><a href="">FILE NAME</a></div>
                        </div>
                    </div>
                </div>

                <div class="entry-body" style="word-wrap: break-word">
                    <p class="journal-body" id="description">{{entry.description}}</p>
                </div>
            </div>
            <!-- <div class="entry-photo light">
                <div>
                    <img src="https://images-na.ssl-images-amazon.com/images/I/61j4acmknmL._AC_SL1500_.jpg" class="" />
                    <div class="overlay">
                        <div class="text"><a href="">FILE NAME</a></div>
                    </div>
                </div>
            </div> -->
            <!-- <div v-if="entry.filelist" class="entry-photo light">
                <div v-for="file in entry.filelist.slice()" :key="file.id">
                    <img v-bind:src="file.url" alt="Issues loading image" class="entry-image" />
                    <div class="overlay">
                        <div class="text"><a v-bind:href="file.url">{{file.name}}</a></div>
                    </div>
                </div>
            </div> -->

        </div>

        <div v-else class="journal-entry light-orange-background">
            <div class="entry-heading">
                <label class="journal-title">Title:</label>
                <input v-model="inputTitle" id="editTitleBox"/>
            </div>

            <div class="entry-body light-orange-background">
                <label class="journal-body" id="bodyLabel">Body:</label>
                <input v-model="inputBody" id="editBodyBox"/>
            </div>
        </div>

        <div v-if="!editable">
            <button @click="editEntry()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0" id="specificJournal">Edit Entry</button>

            <button type="button" class="btn blue-background color-white p-1 pt-0 pb-0" data-bs-toggle="modal" data-bs-target="#deleteEntry" id="specificJournal2">Delete Entry</button>
            <br />

            <button @click="toJournal(entry)" type="button" class="btn btn-primary" id="specificJournal4">View Journal</button>

            <button @click="toJournalEntries(entry)" type="button" class="btn btn-primary" id="specificJournal3">View Entry Listings</button>

            <button @click="backToProject(entry)" type="button" class="btn btn-primary" id="specificJournal5">View Project</button>

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
        <!-- this is the starting point for file attachment modal information /> -->

              <div v-if="editable">
                <webCamera :context="context" :user="this.user" :docId="entry_idLocal"/>
                <br>
                <button type="button" class="btn blue-background color-white p-1 pt-0 pb-0" data-bs-toggle="modal" data-bs-target="#fileModal" id="fileAttach">
                  File Attachments
                </button>
                <div class="modal fade" id="fileModal" tabindex="-1" aria-labelledby="fileModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="fileModalLabel">Attach a file to this item</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                    <div class="modal-body">
                      <input type="file" id="avatar" name="avatar" accept="audio/*, video/*, image/*" @change="fileChange"/>
                      <hr>
                      <ul>
                        <li v-for="file in entry.filelist" :key="file.id"> <a v-bind:href="file.url">{{file.name}}</a></li>
                      </ul>
                    </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="submit" id="attachFile2">Attach File</button>
                      </div>
                    </div>
                  </div>
                </div>
                <br /><br />
              <!-- this is the ending point of file attachment modal --> 
            <button @click="updateEntry(entry)" type="button" id="updateFinish" class="btn btn-primary">Finish</button>
            
            <button @click="cancelUpdate()" type="button" id="updateCancel" class="btn btn-primary">Cancel</button>
        </div>
    </div>
</template>

<script>
import { db, storage, auth } from "../firebaseConfig.js";
import firebase from 'firebase/app';
import webCamera from '@/components/WebCamera.vue'

export default {
    name: "SingleJournalEntry",
    props: [],
    components: {
            webCamera
            
    },

    data: function () {
        return {
            entry_idLocal: this.$route.params.id,
            entry: null,
            task: null,

            editable: false,
            inputTitle: '',
            inputBody: '',

            //file modal stuff
            filelist: [],
            file: null, 
            fileURL: "",
            context: "journalEntries",
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
    beforeCreate: function () {
          // ask the auth layer to let us know when the user changes.
          auth.onAuthStateChanged((user) => {
          if (user) {
            this.user = user;
          }
          });
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
        },
        //begin file modal functions
        submit: function() {
            var filename = "";

            if (typeof this.entry.filelist == 'undefined') {
                this.entry.filelist = [];
                console.log("this.entry.filelist = " + this.entry.filelist);
            } 
               
            filename = this.file.name
            console.log("filename = " + filename);              
          
            var url = "/" + this.context + "/"+ filename;
            console.log("url = " + url);
            const ref = storage.ref().child(url);
            ref.put(this.file).then(()=>{
                // This happens only when the file is done uploading.
                // now that the file is uploaded, we can get a URL for it:
                // You can save the generated download url if you want to be able to access the file later.
                // the saved url is public as far as I understand it.
                ref.getDownloadURL().then((realurl)=>{
                    console.log("realurl = " + realurl);

                    this.entry.filelist.push({name:filename, url:realurl, uploadDate:Date.now(), user:auth.currentUser.uid})
                   
                    console.log(this.entry.filelist);
                    db.collection(this.context).doc(this.entry_idLocal).update({
                        filelist: this.entry.filelist
                    })
                    .then(() => {
                        console.log("Document successfully updated!");
                    })
                    .catch((error) => {
                    // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    })
                })
            })
              },
              
          

            // This function keeps the this.file up to date with the file input
            fileChange: function(event) {
              //When the user finishes selecting a file or files, 
              //the element's change event is fired. You can access
              // the list of files from event.target.files, which is a FileList object. 
              // Each item in the FileList is a File object.
              const files = event.target.files || event.dataTransfer.files;
              //console.log("inside fileChange")

              if (!files.length) {
                this.file = null;
              } else  {
                this.file = files[0]
              }
              console.log(this.file)

            },
            //end file modal functions
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
   /* margin-right: 5%; */
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
    color: black;
}

#specificJournal, #specificJournal2, #specificJournal3, #specificJournal4, #specificJournal5 {
    margin: 1em;
}

#description, #modif, #written {
    font-size: 1em;
    /*font-weight: bold; */
}

#updateCancel, #updateFinish {
    margin: 1em;
}

#editBodyBox {
    margin: 0.5em;
    width: 20em;
    background-color: rgb(255, 237, 204);
}

#editTitleBox {
    background-color: rgb(255, 237, 204);
    margin: 1em;
    height: 3em;
}

#bodyLabel {
    color: white;
    font-size: 2em;
}

#descriptionJournalBody {
    min-height: 5em;
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