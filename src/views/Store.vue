<template>
<div>
    
        <!-- in theory it would be way more effective to just pass "word" here... 
        Writing it this way has 1 and only 1 purpose: examples!-->
        <word v-for="word in words" :key="word.id" :id = "word.id"/>
    
    <input v-model="newWord" />
    <button @click="addWord" > add word </button>
</div>
</template>
<script>
import {db} from "../firebaseConfig.js"
import word from "../components/Word.vue"
export default {
    components: {word},
    name: "Store",
    data: function() {
        return {
            words: [],
            newWord: "",
        }
    },
    
    firestore: {
        // read a lot
        words: db.collection("words").orderBy("likes")
    },

    methods: {
        addWord: function() {
            const newWordRecord = {word: this.newWord, likes: 0};
            // add a new word.
            db.collection("words").add(newWordRecord);
        },
    },
}
</script>