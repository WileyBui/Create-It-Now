<template>
    <tr>
        <td><router-link :to="{name:'SingleTask', params:{id:this.id}}" id="todosSingle">{{task.name}}</router-link></td>
        <td>{{task.deadline ? task.deadline.toDate() : "" | formatDate }}</td>
        <!-- <td>{{task.deadline}}</td> -->
        <td>{{task.description}}</td>
        <template v-if="task.isComplete">
            <td>
                <button 
                   @click="markUndone(task)"
                   type="button"
                   class="btn blue-background color-white p-1 pt-0 pb-0"
                   >
                   Complete
                </button>
            </td>
        </template>
        <template v-else>
            <td>
                <button
                    @click="markDone(task)"
                    type="button"
                    class="btn blue-background color-white p-1 pt-0 pb-0"
                    >
                    Incomplete
                </button>
            </td>
        </template>
    </tr>
</template>

<script> 
import { db } from "../firebaseConfig.js"

export default {
    name: "task",
    props: ["id","task","project_id"],
    methods: {
        markDone: function (task) {
            db.collection('to-do-items').doc(task.id).update({ ['isComplete']: true })
        },

        markUndone: function (task) {
            db.collection('to-do-items').doc(task.id).update({ ['isComplete']: false })
        }
    }
}
</script>
<style scoped>
    td {
        padding: 1em;
        color: black;
    }
</style>