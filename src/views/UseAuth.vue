<template>
<div class="useauth">
  user object: 
  <br/>
  {{ user }}

  <br/>
  Take note of the uid (unique user id -- this is important for getting firebase level security) displayName, photoURL, and email.
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig";

export default {
  components: {},
  name: "UseAuth",
  data: function() {
    return {
      user: null
    }
  },
  
  // as the component is created
  beforeCreate: function() {
    // ask the auth layer to let us know when the user changes.
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    })
  }
};
</script>