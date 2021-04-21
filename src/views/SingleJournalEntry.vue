<template>
    <div>
        <h2>{{entry.title}}</h2>
        <p>{{entry.description}}</p>
    </div>
</template>

<script>
import { db } from "../firebaseConfig.js"

export default {
    name: "SingleJournalEntry",
    props: [],
    data: function () {
        return {
            entry_idLocal: this.$route.params.id,
            entry: null
        }
    },

    firestore: function () {
        return {
            entry: db.collection("journalEntries").doc(this.entry_idLocal)
        }
    }
}
</script>