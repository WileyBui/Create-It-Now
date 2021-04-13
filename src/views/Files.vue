<template>
<div>
  <h1>This is a image test page</h1>
  <!-- file inputs don't work with v-model as I understand it. the @change gets the job done well enough -->
  <input type="file" id="avatar" name="avatar" accept="image/*" @change="fileChange"/>
  <button @click="submit"> submit </button>
  <img :src="image" v-if="image">
</div>
</template>

<script>
import {storage} from "../firebaseConfig.js"

export default {
    components: {},
    name: "Files",
    data : function() {
    return {
      file: null,
      image: ""
    }
  },
  methods:{
    submit: function() {
        const filename = this.file.name;
        const url = "/test/"+filename;
        const ref = storage.ref().child(url);
        ref.put(this.file).then(()=>{
          // This happens only when the file is done uploading.
          // now that the file is uploaded, we can get a URL for it:
          // You can save the generated download url if you want to be able to access the file later.
          // the saved url is public as far as I understand it.
          ref.getDownloadURL().then((realurl)=>{
            this.image = realurl
          })
        })
    },
    // This function keeps the this.file up to date with the file input
    fileChange: function(event) {
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        this.file = null;
      } else  {
        this.file = files[0]
      }
    }
  }
}
</script>