<template>
  <div
    class="modal fade"
    id="modal2"
    aria-hidden="true"
    aria-labelledby="..."
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        ...
        <div class="modal-footer">
          <!-- Toogle to first dialog, `data-bs-dismiss` attribute can be omitted - clicking on link will close dialog anyway -->
          <a
            class="btn btn-primary"
            href="#modal"
            data-bs-toggle="modal"
            role="button"
            >Open #modal</a
          >
        </div>
      </div>
    </div>
  </div>
</template>