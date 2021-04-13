
<template>
    <div v-if="word">{{word.word}} (<span class="clickable" @click="like">{{word.likes}}</span>) &nbsp; (<span class="clickable" @click="doDelete">delete</span>) </div>
</template>
<script>
// for more information about what's possible with firestore's API: https://firebase.google.com/docs/firestore/quickstart
// and https://vuefire.vuejs.org/vuefire/#why

import {db} from "../firebaseConfig.js"

export default {
    name: "word",

    props: ["id"],

    data: function() {
        return {
            word: null,
        };
    },

    // when using a prop as part of the binding firestore has to be a function
    // this is because the "firestore" code itself is run before the component exists
    // making it a function, like data, allows it to be run only once the component is setup.
    // This won't work if "id" changes without re-rendering the component. see https://vuefire.vuejs.org/vuefire/binding-subscriptions.html#programmatic-binding
    // for ways to work if id is dynamic
    firestore: function() {
        return {
            word: db.collection("words").doc(this.id)
        }
    },
    
    methods: {
        like: function() {
            this.word.likes += 1;
            // the raw firestore reference.
            this.$firestoreRefs.word.set(this.word)
        },

        doDelete: function() {
            this.$firestoreRefs.word.delete()
        },
    }

}
</script>

<style scoped>
.clickable {
    cursor: pointer;
    color:red;
}
</style>