<template>
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Create Album</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <form @submit.prevent="createAlbum()">
    <div class="modal-body">
      <div class="form-floating mb-3 elevation-5">
        <input v-model="editable.title" type="text" required class="form-control" id="title" placeholder="Album Title">
        <label for="title">Album Title</label>
      </div>
      <div class="form-floating mb-3 elevation-5">
        <input v-model="editable.coverImg" type="url" required class="form-control" id="coverImg"
          placeholder="Cover Image">
        <label for="coverImg">Cover Image</label>
      </div>
      <div class="form-floating mb-3 elevation-5">
        <select v-model="editable.category" class="form-select" id="floatingSelect"
          aria-label="Floating label select example">
          <option selected value="MISC">Misc</option>
          <option value="ANIMALS">Animals</option>
          <option value="CROCS">Crocs 🐊</option>
          <option value="PUGS">Pugs</option>
          <option value="GAMES">Games</option>
        </select>
        <label for="floatingSelect">Category</label>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary">Create Album</button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import { albumsService } from '../services/AlbumsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      async createAlbum() {
        try {
          // logger.log(editable.value)
          // NOTE create album returns the res.data with our ID on it
          const album = await albumsService.createAlbum(editable.value)
          // NOTE clear the form by sitting the value of editable to an empyt object
          editable.value = {}
          // NOTE hide the modal after the form submits
          Modal.getOrCreateInstance('#exampleModal').hide()
          // NOTE use the id from the returned album to automatically push the user to that album's page, using the name form our supllied to object to load a page from router.js
          router.push({ name: 'Album', params: { albumId: album.id } })
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