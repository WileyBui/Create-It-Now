<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 order-md-1">
          <img alt="Create It Now logo" src="../assets/Icon.png" />
        </div>
        <div
          class="col-md-6 order-md-2 d-flex flex-column justify-content-center text-start color-dark"
        >
          <h1>Welcome to Create it Now!</h1>
          <p>
            <strong>Create It Now</strong> is a website for makers of all kinds!
            Use Create It Now to develop to-do lists for projects you are
            working on. After the completion of each to-do list item, you may
            write a journal entry (complete with a photo) to track your progress
            throughout the project. When the project is complete, you will have
            a complete journal that documents the progress of the work done.
          </p>

          <p>
            Here, makers organize their thoughts relevant to their creations and
            reflect upon the journey they have taken to meet their goals.
          </p>

          <p>Have fun creating!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from "./Dashboard.vue";
import { auth } from "../firebaseConfig.js";
import router from "../router";

export default {
  name: "Home",

  beforeCreate: function () {
    // ask the auth layer to let us know when the user changes.
    auth.onAuthStateChanged((user) => {
      // if the user is logged in already, automatically redirect to Dashboard
      if (user) {
        router.push(Dashboard);
        document.title = "Create It Now - Welcome";
      }
    });
  },
};
</script>

<style>
p {
  font-size: 15px;
}

img {
  width: 75%;
}
</style>