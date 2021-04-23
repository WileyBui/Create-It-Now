<template>
  <div v-if="tasks.length > 0" class="accordion" id="to-do-accordion">
    <div class="accordion-item green-background">
      <h2 class="accordion-header" id="headingAccordian">
        <button
          class="accordion-button green-background color-black fw-bold"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseToDoAccordian"
          aria-expanded="true"
          aria-controls="collapseToDoAccordian"
        >
          To-do Items
        </button>
      </h2>
      <div
        id="collapseToDoAccordian"
        class="accordion-collapse collapse"
        aria-labelledby="headingAccordian"
        data-bs-parent="#to-do-accordion"
      >
        <div class="accordion-body">
          <DashboardTask v-for="task in tasks" :key="task.id" :task="task" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardTask from "./DashboardTask.vue";

export default {
  name: "DashboardToDoItemsAccordian",
  props: ["tasks"],
  components: {
    DashboardTask,
  },
};
</script>