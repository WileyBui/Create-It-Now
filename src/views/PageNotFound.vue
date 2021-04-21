<template>
  <div class="container text-center">
    <div class="container-fluid container-bg-color">
      <h4>
        <strong>#404</strong>: the page that you're requesting does not exist
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",

  beforeCreate: function () {
    // ask the auth layer to let us know when the user changes.
    document.title = "Error #404: Page Not Found";
  },
};
</script>
