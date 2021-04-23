<template>
  <div v-if="tasks.length > 0" class="accordion" id="to-do-accordion">
    <div class="accordion-item green-background">
      <h2 class="accordion-header" id="headingAccordion">
        <button
          class="accordion-button green-background color-black fw-bold showw"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseToDoAccordion"
          aria-expanded="true"
          aria-controls="collapseToDoAccordion"
        >
          To-do Items
        </button>
      </h2>
      <div
        id="collapseToDoAccordion"
        class="accordion-collapse collapse show"
        aria-labelledby="headingAccordion"
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
  name: "DashboardToDoItemsAccordion",
  props: ["tasks"],
  components: {
    DashboardTask,
  },
};
</script>