<template>
    <tr>
        <td class="taskname"><router-link :to="{name:'SingleTask', params:{id:this.id}}" id="todosSingle"><strong>{{task.name}}</strong></router-link></td>
        <td><strong>{{task.deadline ? task.deadline.toDate() : "" | formatDate }}</strong></td>

        <!-- <td>{{task.deadline}}</td> -->

        <td><strong>{{task.description}}</strong></td>
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
import { db } from "../firebaseConfig.js";

export default {
  name: "task",
  props: ["id", "task", "project_id"],
  methods: {
    markDone: function (task) {
      db.collection("to-do-items")
        .doc(task.id)
        .update({ ["isComplete"]: true });
        
      this.$emit("toDoStatusEvent", this.id);
    },

    markUndone: function (task) {
      db.collection("to-do-items")
        .doc(task.id)
        .update({ ["isComplete"]: false });

      this.$emit("toDoStatusEvent", this.id);
    },
  },
};
</script>
<style scoped>
td {
  padding: 0.5em;
  color: black;
}

a {
    color: black;
    text-decoration: none;
}

a:hover {
    color: gray;
    font-size: 125%
}

tr {
  padding-left: auto;
  padding-right: auto;
}
</style>
