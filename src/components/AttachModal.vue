<template>
    <div>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#fileModal">
        Attach File
      </button>
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
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="submit">Attach File</button>
              </div>
            </div>
          </div>
      <td v-for="(file, id) in task.filelist" :key="id"><a v-bind:href="file">{{file.name}} {{file.timeUploade}}</a></td>


      <!-- <FileModal/> -->
    </div>
</template>
<script>
import {db,storage} from "../firebaseConfig.js"
// import FileModal from "./FileModal.vue";

export default {
    name: "AttachModal",
    props: ["context", "user", "dbcontext"],
    // components: {
    // FileModal
    // },
    data() {
        return {
            id: this.$route.params.id,
            task: null,
            tempfilelist: [],
            filelist: [],
            file: null, 
            fileURL: ""
            }
        },
        firestore: function() {
            return {
                // REPLACE "to-do-items" with whatever context prop you are pulling from the previous scope
                task: db.collection(this.dbcontext).doc(this.id),
            }
        },
        submit: function() {
              var i;
              var filename = "";
              var localtempfilelist = this.tempfilelist;
              this.tempfilelist = [];
              for (i = 0; i < localtempfilelist.length; i++) { 
                filename = localtempfilelist[i].name
                console.log("filename = " + filename);
              
              
                var url = "/attachements/" + filename;
                console.log("url = " + url);
                const ref = storage.ref().child(url);
                ref.put(this.file).then(()=>{
                  // This happens only when the file is done uploading.
                  // now that the file is uploaded, we can get a URL for it:
                  // You can save the generated download url if you want to be able to access the file later.
                  // the saved url is public as far as I understand it.
                  ref.getDownloadURL().then((realurl)=>{
                    //console.log("realurl = " + realurl);
                    var timeUploaded = Date.now()
                    this.task.filelist.push([realurl, filename, timeUploaded, this.user])
                    //console.table(this.filelist);
                    db.collection(this.dbcontext).doc(this.task.id).update({
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
              }
              
            },

};
</script>
