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
          <strong id="thistask">{{task.name}}</strong>
          <table class="todos-table">
            <tr>
                <th><u><b>Task Details</b></u></th>
                <th><u><b>Deadline</b></u></th>
                <th><u><b>Status</b></u></th>
            </tr>
            <tr>
                    <td>{{task.description}}</td>
                    <td>{{task.deadline ? task.deadline.toDate() : "" | formatDate }}</td>
                    <template v-if="task.isComplete">
                        <td>
                            <button
                                @click="markUndone(task)"
                                type="button"
                                class="btn blue-background color-white p-1 pt-0 pb-0"
                            >
                                Complete
                            </button>
                        </td>
                    </template>
                    <template v-else>
                        <td>
                            <button
                                @click="markDone(task)"
                                type="button"
                                class="btn blue-background color-white p-1 pt-0 pb-0"
                            >
                                Incomplete
                            </button>
                        </td>
                    </template>
                    <td>
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#fileModal">
                        Attach File
                      </button>
                    </td>
            </tr>
          </table>
          <div class="modal fade" id="fileModal" tabindex="-1" aria-labelledby="fileModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="fileModalLabel">Attach a file to this task</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <input type="file" id="avatar" name="avatar" accept="image/*" @change="fileChange"/>
                </div>
              <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="submit">Attach File</button>
              </div>
            </div>
          </div>
          </div>
          <br>  
          <button @click="backToProject(task)" type="button" class="btn blue-background color-white p-1 pt-0 pb-0">Back to Project</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    //var taskNum = document.getElementById("taskIdNum").innerHTML
    //console.log(taskNum)
    import {db,storage} from "../firebaseConfig.js"
    //import task from "../components/Word.vue"
    //var task = db.collection("tasks")
    //console.log(task)
    //console.log(this.$route.params.id)
    export default {
        data() {
            return {
                id: this.$route.params.id,
                task: null,
                filelist: [], //array of URLs for files attached to this task
                tempfilelist: [],
                file: null, //no longer used, might need to delete
                fileURL: ""
            }
        },

        firestore: function() {
            return {
                task: db.collection("to-do-items").doc(this.id),
                //filelist: db.collection("to-do-items").doc(this.id).filelist
            }
        },

        methods: {
            addNewTaskToProject: function() {
                console.log("still gotta implement") //still have to implement this
            },

            markDone: function (task) {
                db.collection('to-do-items').doc(task.id).update({ ['isComplete']: true })
            },

            markUndone: function (task) {
                db.collection('to-do-items').doc(task.id).update({ ['isComplete']: false })
            },

            backToProject: function (task) {
                this.$router.push({ name: 'ProjectSpecific', params: { project_id: task.project_id } })
            },
            submit: function() {
              var i;
              var filename = "";
              for (i = 0; i < this.tempfilelist.length; i++) { 
                filename = this.tempfilelist[i].name
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
                    this.filelist.push(realurl)
                    console.table(this.filelist);
                    db.collection('to-do-items').doc(this.task.id).update({
                      filelist: this.filelist
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
              }
              
            },


          
            // This function keeps the this.file up to date with the file input
            fileChange: function(event) {
              //When the user finishes selecting a file or files, 
              //the element's change event is fired. You can access
              // the list of files from event.target.files, which is a FileList object. 
              // Each item in the FileList is a File object.
              const files = event.target.files || event.dataTransfer.files;
              console.log("inside fileChange")
              var i;
              if (files.length > 0) {
                this.tempfilelist = []
                console.log("files.length > 0")
              }
              for (i = 0; i < files.length; i++) { 
                this.tempfilelist.push(files[i])
                console.log("this.tempfilelist.push(files[i]) " + files[i].name)
              }
            }
            
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

  #thistask {
      color: black;
      font-size: 2em;
  }


</style>