<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark green-background">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="/">Free Labor</a>
        <div
          v-if="user"
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-start">
            <li class="nav-item">
              <router-link
                :to="{ name: 'Dashboard' }"
                class="nav-link color-white"
                aria-current="page"
              >
                <i class="bi bi-tv"></i>
                Dashboard
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'Dashboard' }"
                class="nav-link color-white"
                aria-current="page"
              >
                <i class="bi bi-folder-plus"></i>
                Create a new project (disabled)
              </router-link>
            </li>
            <li class="nav-item">
              <button @click.prevent="signOut" class="btn nav-link color-white">
                <i class="bi bi-box-arrow-left"></i>
                Logout
              </button>
            </li>
          </ul>
          <div class="d-flex">
            <div class="dropdown">
              <button
                class="btn green-background dropdown-toggle btn-sm color-white"
                type="button"
                id="profileDropDown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img :src="user.photoURL" class="profile-image" />
                <span>&nbsp; {{ user.displayName }}</span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="profileDropDown">
                <li>
                  <a class="dropdown-item" @click.prevent="signOut">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="d-flex">
            <button
              class="btn green-background color-white"
              type="button"
              aria-expanded="false"
              @click.prevent="signInWithGoogle"
            >
              Login / Signup
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div id="spacing"></div>
    <router-view />
  </div>
</template>


<script>
require("@/css/bootstrap.css");
require("@/css/icons.css");

import { auth, provider } from "./firebaseConfig.js";
import router from "./router";

export default {
  data: function () {
    return {
      user: null,
    };
  },
  beforeCreate: function () {
    // ask the auth layer to let us know when the user changes.
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });

    let jqueryJS = document.createElement("script");
    jqueryJS.setAttribute(
      "src",
      "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
    );
    document.head.appendChild(jqueryJS);

    let bootstrapJS = document.createElement("script");
    bootstrapJS.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
    );
    document.head.appendChild(bootstrapJS);
  },

  methods: {
    signInWithGoogle: function () {
      auth
        .signInWithRedirect(provider)
        .then((result) => {
          this.user = result.user;
        })
        .catch((err) => console.log(err));
    },
    signOut: function () {
      auth
        .signOut()
        .then(() => {
          this.user = null;
          router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#spacing {
  padding: 30px;
}

.profile-image {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-left: 5px;
}

body {
  background: #dff4ff;
}

.color-white {
  color: white !important;
}

.blue-background {
  background: #4299ff !important;
}

.light-blue-background {
  background: #a0d1fe !important;
}

.green-background {
  background: #2ed7b6 !important;
}

.light-green-background {
  background: #48e9c9 !important;
}

.small-text {
  font-size: 0.9rem;
}

.small-error-font {
  font-size: 1rem;
  color: red;
}

.margin-top-10 {
  margin-top: 10px;
}
</style>
