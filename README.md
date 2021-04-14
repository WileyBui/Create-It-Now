# firebase_setup_starting_point

This repo is intended to be a "starting point" for projects that use firebase and vue, so you can get the "boring" setup work out of the way before lecture.

How I generated this project:

1. `vue create firebase_setup_stating_point` (create basic project template)
2. `vue add router` (update template with vue router)
3. `npm install firebase` (add the firebase web API to this project)
4. added the `firebaseConfig.js` file and also the .env files
5. `npm install vuefire` (add the vue + firestore bindings to make firestore data easy to work with.)
6. updated the `main.js` file to use the vuefire plugin
7. when setting up the auth test I further updated main.js to make sure the authenticaiton info is loaded before rendering starts, and I updated the router configuration to check if a route wants authentication before routing.

I've included these instructions with the specific intent of helping you know what you need to do to get setup with firebase on your own project.

## References:

* <https://savvyapps.com/blog/definitive-guide-building-web-app-vuejs-firebase>
* <https://firebase.google.com/docs/firestore/quickstart>
* <https://vuefire.vuejs.org/vuefire/#why>
* <https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c>
* 

## Project setup (do once after downloading)
1. locally install dependencies with `npm install`
2. On [google firebase console](https://console.firebase.google.com/), create a firebase project for this project
3. configure the firebase API.
    * click the gear on the side-bar and go to project settings
    * at the bottom of this page is a "Your apps" page -- click the `</>` icon to setup the web-api
    * No need to setup firebase hosting right now, we saw that we can do this from the terminal easily enough already. Just register a nickname.
    * It's going to tell you to copy the configuration script into your code. Don't actually do that. Instead we will be using .env and .env.local files to configure this, just copy this data into a temporary file so you don't lose it immediately.
        * .env files are automatically loaded when serving or compiling your project and added to an environment variable.
        * .env.local is also loaded, but it is marked by .gitignore as a file to ignore -- its safe to put api keys and such in this file. (You api key should never go online)
    * update the .env file based on the provided keys
    * copy .env.local.example to .env.local and fill in the api key and appId.
4. (For testing the firestore) in the firebase console go to firestore database, and create a database.
    * use test mode. This will work for 30 days. You can update it later whenever you want.
    * create a "words" collection, with an initial document based on: `{word: "cat", likes: 0}` (use an autogen ID)
5. (For testing authentication): go to the firebase console and click "authentication. then click on google in the list of sign-in methods and enable it. You will need to list a support email for the log in (just yourself). 

### Further notes:
File storage requires being logged in. You can check out how that's setup in the code if you want.

### Running locally:
```
npm run server
```
