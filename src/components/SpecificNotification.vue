<template>
  <div
    class="container p-3 margin-top-10"
    :class="[isToDo ? 'green-background' : 'orange-background']"
  >
    <div class="row">
      <div class="col-9">
        <strong>Task Title <font color="red">04/20/2021</font></strong>
        <div>Task description</div>
      </div>
      <div class="col-3 align-self-center text-end">
        <button
          type="button"
          class="btn small-text"
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
export default {
  name: "SpecificNotification",
  props: ["isToDo"],
};
</script>

<style scoped>
.small-text:hover {
  color: white;
}
</style>