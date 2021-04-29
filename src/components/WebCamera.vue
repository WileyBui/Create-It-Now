<template>
<div id="webCamera" class="web-camera-container">
  <div class="camera-button">
      <button type="button" class="button is-rounded" :class="{ 'is-primary' : !isCameraOpen, 'is-danger' : isCameraOpen}" @click="toggleCamera">
        <span v-if="!isCameraOpen">Open Camera</span>
        <span v-else>Close Camera</span>
    </button>
  </div>
  
  <div v-show="isCameraOpen && isLoading" class="camera-loading">
    <ul class="loader-circle">
    </ul>
  </div>
  
  <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box" :class="{ 'flash' : isShotPhoto }">
    
    <div class="camera-shutter" :class="{'flash' : isShotPhoto}"></div>
      
    <video v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5" autoplay></video>
    
    <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450" :height="337.5"></canvas>
  </div>
  
  <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
    <button type="button" class="button" @click="takePhoto">
      <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
    </button>
  </div>
  
  <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
    <input v-model="photoName" placeholder="Name photo here">
    <a id="savePhoto" :download="photoName" class="button" role="button" @click="savePhoto">
      Save Image
    </a>
    <a id="downloadPhoto" :download="photoName" class="button" role="button" @click="downloadImage">
      Download
    </a>
  </div>
</div>
</template>
<script>

// code taken from:
// https://dev.to/ditarahma08/make-a-camera-app-in-web-part-2-capturing-the-image-289i
import { db, storage } from "../firebaseConfig.js";
import firebase from 'firebase/app'
export default {
    name: "webCamera",
    props: ["user", "context", "docId"],

    data() {
        return {
        isCameraOpen: false,
        isPhotoTaken: false,
        isShotPhoto: false,
        isLoading: false,
        link: '#',
        photoName: "image.jpg",
        //ourCollection: "",
        filelist: []
        }
    },

    firestore: function() {
            return {
                //ourCollection: db.collection(this.context).doc(this.docId),
                //filelist: db.collection("to-do-items").doc(this.id).filelist
            }
        },
  
    methods: {
        toggleCamera() {
        if(this.isCameraOpen) {
            this.isCameraOpen = false;
            this.isPhotoTaken = false;
            this.isShotPhoto = false;
            this.stopCameraStream();
          } else {
            this.isCameraOpen = true;
            this.createCameraElement();
        }
    },
    
    createCameraElement() {
      this.isLoading = true;
      
      const constraints = (window.constraints = {
				audio: false,
				video: true
			});


			navigator.mediaDevices
				.getUserMedia(constraints)
				.then(stream => {
          this.isLoading = false;
					this.$refs.camera.srcObject = stream;
				})
				// eslint-disable-next-line no-unused-vars
				.catch(error => {
                    this.isLoading = false;
                    alert(error)
					alert("Maybe the browser doesn't support or there are some errors.");
				});
    },
    
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

			tracks.forEach(track => {
				track.stop();
			});
    },
    
    takePhoto() {
      if(!this.isPhotoTaken) {
        this.isShotPhoto = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }
      
      this.isPhotoTaken = !this.isPhotoTaken;
      
      const context = this.$refs.canvas.getContext('2d');
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
    },
    
    downloadImage() {
      var download = document.getElementById("downloadPhoto");
      var canvas = document.getElementById("photoTaken").toDataURL("image/jpeg")
    .replace("image/jpeg", "image/octet-stream");
      download.setAttribute("href", canvas);
    },
    savePhoto() {
      var url = "/photos/" + this.photoName;
      var tempContext = this.context;
      var tempDocId = this.docId;
      var tempPhotoName = this.photoName;
      var tempUID = this.user.uid;


      console.log("url = " + url);
      console.log("this = " + this);
      console.log("this.context = " + this.context);
      console.log("this.docId = " + this.docId);
      console.log("this.user = " + this.user.uid);

      //db.collection(this.context).doc(this.docId).update({testupdate: url})
      //var download = document.getElementById("savePhoto");
      var canvas = document.getElementById("photoTaken").toDataURL("image/jpeg")
      .replace("image/jpeg", "image/octet-stream");
      console.log("canvas type= " + canvas);
      
      const ref = storage.ref().child(url);
      
      
      document.getElementById("photoTaken").toBlob(function(blob){
        ref.put(blob).then(()=>{
          ref.getDownloadURL().then((realurl)=>{
            console.log("realurl = " + realurl);
            //var blob = "";
            console.log("canvas blob= " + blob);
          
            //var tempFileList = db.collection(this.context).doc(this.docId).filelist;
            //console.log("tempFileList= " + this.filelist);
            //change url to realurl in the line below for it to work and not just test  
            //this.filelist.push({name:this.photoName, url:realurl, uploadDate:Date.now(), user:this.user.uid})
            db.collection(tempContext).doc(tempDocId).update({
              filelist: firebase.firestore.FieldValue.arrayUnion({name:tempPhotoName, url:realurl, uploadDate:Date.now(), user:tempUID})
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
      });
    }
  }
}
</script>