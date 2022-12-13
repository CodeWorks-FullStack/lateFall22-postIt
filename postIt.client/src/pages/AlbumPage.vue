<template>
  <h1>IT'S THE ALBUM PAGE, BABY!</h1>
</template>


<script>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { albumsService } from '../services/AlbumsService.js';
import { picturesService } from '../services/PicturesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const route = useRoute()
    async function getAlbumById() {
      try {
        await albumsService.getAlbumById(route.params.albumId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    async function getPicturesByAlbumId() {
      try {
        await picturesService.getPicturesByAlbumId(route.params.albumId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getAlbumById()
      getPicturesByAlbumId()
    })
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>