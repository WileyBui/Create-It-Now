<template>
  <div
    class="container p-3 margin-top-10"
    :class="[isToDo ? 'green-background' : 'orange-background']"
  >
    <div class="row">
      <div class="col-9">
        <strong>
          {{ toDo.name }}<span class="text-danger"> {{ deadline }}</span>
        </strong>
        <div class="text-truncate">{{ toDo.description }}</div>
      </div>
      <div class="col-3 align-self-center text-end">
        <button
          type="button"
          class="btn small-text"
          @click="dismiss"
          :class="[
            isToDo ? 'light-green-background' : 'light-orange-background',
          ]"
        >
          DISMISS
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "SpecificNotification",
  props: ["isToDo", "toDo"],

  data: function () {
    return {
      deadline: null,
    };
  },

  mounted() {
    let date = new Date(this.toDo.deadline.seconds * 1000);
    this.deadline = moment(date).format("MM/DD/YY hh:mm A");
  },

  methods: {
    dismiss: function () {
      this.$emit("isToBeDismissed", this.toDo);
    },
  },
};
</script>

<style scoped>
.small-text:hover {
  color: white;
}
</style>