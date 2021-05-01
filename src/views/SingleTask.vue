<template>
  <div class="accordion accordion-flush mb-3" id="accordionFlushExample">
    <div class="accordion-item green-background">
      <h2 class="accordion-header" id="flush-headingOne">
        <button
          class="accordion-button show green-background"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseOne"
          aria-expanded="true"
          aria-controls="flush-collapseOne"
        >
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        class="accordion-collapse show"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      >
          <div class="accordion-body">
              <div v-if="!editable">
                  <strong id="thisTaskName">{{task.name}}</strong>
              </div>
              <div v-else>
                  <input v-model="inputTitle" />
              </div>
              <table class="todos-table">
                  <tr>
                      <th><u><b>Task Details</b></u></th>
                      <th><u><b>Deadline</b></u></th>
                      <th><u><b>Status</b></u></th>
                  </tr>
                  <template v-if="!editable">
                      <tr>
                          <td>{{task.description}}</td>
                          <td>{{task.deadline ? task.deadline.toDate() : "" | formatDate }}</td>
                          <template v-if="task.isComplete">
                              <td>
                                  <button @click="markUndone(task)"
                                          type="button"
                                          class="btn blue-background color-white p-1 pt-0 pb-0"
                                          data-bs-toggle="modal"
                                          data-bs-target="#journalEntryModal">
                                      Complete
                                  </button>
                              </td>
                          </template>
                          <template v-else>
                              <td>
                                  <button @click="markDone(task)"
                                          type="button"
                                          class="btn blue-background color-white p-1 pt-0 pb-0"
                                          data-bs-toggle="modal"
                                          data-bs-target="#journalEntryModal">
                                      Incomplete
                                  </button>
                              </td>
                          </template>
                      </tr>
                  </template>
                  <template v-else>
                      <tr>
                          <td><input v-model="inputDescription" /></td>
                          <td><datepicker :bootstrap-styling="true" v-model="newDeadline"></datepicker></td>
                          <template v-if="task.isComplete">
                              <td>
                                  <strong>
                                      Complete
                                  </strong>
                              </td>
                          </template>
                          <template v-else>
                              <td>
                                  <strong>
                                      Incomplete
                                  </strong>
                              </td>
                          </template>
                      </tr>
                  </template>
              </table>
              <br>
              <div v-if="!editable">
                  <button @click="editTodo(task)" type="button" class="btn blue-background color-white p-1 pt-0 pb-0" id="editSingleTask">Edit ToDo Item</button>
                  
                  <button @click="backToProject(task)" type="button" class="btn blue-background color-white p-1 pt-0 pb-0" id="editSingleTask2">Back to Project</button>
              </div>
              <div v-else>
                  <button @click="updateTodo(task)" type="button" class="btn blue-background color-white p-1 pt-0 pb-0" id="editSingleTask3">Finish</button>
                  
                  <button @click="cancelEdit()" type="button" class="btn blue-background color-white p-1 pt-0 pb-0" id="editSingleTask4">Cancel</button>
              </div>
              <div class="col-3 fw-bold small-text text-end">
                <JournalCreateModal 
                :entry="task"/>
              </div>
              <!-- this is the starting point for file attachment modal information /> -->

              <div v-if="editable">
                <webCamera :context="context" :user="this.user" :docId="this.id"/>
                <br>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#fileModal" id="fileAttach">
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
                        <li v-for="file in task.filelist" :key="file.id"> <a v-bind:href="file.url">{{file.name}}</a></li>
                      </ul>
                    </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="submit" id="attachFile2">Attach File</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- this is the ending point of file attachment modal -->
            </div>
      </div>
    </div>
  </div>
</template>
<script>
    import { db, storage, auth } from "../firebaseConfig.js"; 
    import Datepicker from "vuejs-datepicker";
    import JournalCreateModal from "../components/JournalCreateModal.vue";
    import webCamera from '@/components/WebCamera.vue'

    export default {
        components: {
            Datepicker,
            JournalCreateModal,
            webCamera
            
        },
        data() {
            return {
                id: this.$route.params.id,
                task: null,
                context: "to-do-items",

                editable: false,
                inputTitle: '',
                inputDescription: '',
                newDeadline: null,
                
                //file modal data
                filelist: [],
                file: null, 
                fileURL: ""
            }
        },

        firestore: function() {
            return {
                task: db.collection("to-do-items").doc(this.id),
                filelist: db.collection("to-do-items").doc(this.id).filelist
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
            addNewTaskToProject: function() {
                console.log("still gotta implement") //still have to implement this
            },

            backToProject: function (task) {
                this.$router.push({ name: 'ProjectSpecific', params: { project_id: task.project_id } })
            },

            cancelEdit: function () {
                this.editable = false;
            },

            editTodo: function (task) {
                this.editable = true;
                this.inputTitle = task.name;
                this.inputDescription = task.description;
                this.newDeadline = task.deadline.toDate();
            },

            markDone: function (task) {
                db.collection('to-do-items').doc(task.id).update({ ['isComplete']: true })
            },

            markUndone: function (task) {
                db.collection('to-do-items').doc(task.id).update({ ['isComplete']: false })
            },

            updateTodo: function (task) {
                (db.collection('to-do-items').doc(task.id)).set({ name: this.inputTitle, description: this.inputDescription, deadline: this.newDeadline }, { merge: true });
                this.editable = false;
            },
            //begin file modal functions
            submit: function() {
              var filename = "";

              if (typeof this.task.filelist == 'undefined') {
                this.task.filelist = [];
                console.log("this.task.filelist = " + this.task.filelist);
              } 
               
              filename = this.file.name
              console.log("filename = " + filename);              
          
              var url = "/taskfiles/"+ filename;
                console.log("url = " + url);
                const ref = storage.ref().child(url);
                ref.put(this.file).then(()=>{
                  // This happens only when the file is done uploading.
                  // now that the file is uploaded, we can get a URL for it:
                  // You can save the generated download url if you want to be able to access the file later.
                  // the saved url is public as far as I understand it.
                  ref.getDownloadURL().then((realurl)=>{
                    console.log("realurl = " + realurl);

                    this.task.filelist.push({name:filename, url:realurl, uploadDate:Date.now(), user:auth.currentUser.uid})
                   
                    console.log(this.task.filelist);
                    db.collection('to-do-items').doc(this.task.id).update({
                      filelist: this.task.filelist
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
<style scoped>
    #addNewTaskToProject {
        color: black;
    }

    table {
    margin-left: auto;
    margin-right: auto;
    border-block-style: double;
    border-color: lightseagreen;
    font-size: 1.4em;
  }

  tr {
    padding: 0.5em;
    color: black;
  }

  th {
    padding: 0.5em;
  }

  td {
    padding: 1em;
    color: black;
  }

  #thisTaskName {
      color: black;
      font-size: 2em;
  }

  #editSingleTask, #editSingleTask2, #attachFile {
    margin: 1em;
  }

  #editSingleTask3, #editSingleTask4, #attachFile2 {
    margin: 1em;
  }
</style>