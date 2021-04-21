<template>
  <div class="home">
    <img alt="Create It Now logo" src="../assets/Icon.png">
    <Welcome msg="Welcome to Create it Now!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'
import Dashboard from './Dashboard.vue'
import { auth } from "../firebaseConfig.js";
import router from "../router";

export default {
  name: 'Home',
  components: {
    Welcome
  },

  beforeCreate: function () {
    // ask the auth layer to let us know when the user changes.
    auth.onAuthStateChanged((user) => {
      // if the user is logged in already, automatically redirect to Dashboard
      if (user) {
        router.push(Dashboard);
      }
    });
  },
}
</script>

<style>
    img {
        width: 700px;
        height: 500px;
    }
</style>
