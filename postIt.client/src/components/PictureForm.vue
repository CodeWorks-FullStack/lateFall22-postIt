<template>
  <div class="modal-header">
    <h1 class="modal-title text-dark fs-5" id="exampleModalLabel">Create Picture</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <form @submit.prevent="createPicture()">
    <div class="modal-body">
      <div class="form-floating mb-3 elevation-5 text-dark">
        <input v-model="editable.imgUrl" type="url" required class="form-control" id="imgUrl" placeholder="Image">
        <label for="imgUrl">Image</label>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary">Create Picture</button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { picturesService } from '../services/PicturesService.js';
import { logger } from '../utils/Logger.js';
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      async createPicture() {
        try {
          editable.value.albumId = route.params.albumId
          await picturesService.createPicture(editable.value)
          editable.value = {}
          Modal.getOrCreateInstance('#pictureModal').hide()
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>