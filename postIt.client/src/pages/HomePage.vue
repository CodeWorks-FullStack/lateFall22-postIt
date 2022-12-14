<template>
  <div class="container-fluid">
    <div v-if="account.id && myCollabs.length > 0" class="row">
      <div class="col-12 p-3">
        <div class="fw-bold fs-2">My Collabs</div>
      </div>
      <!-- TODO get my albums that I'm a collaborator on -->
      <div v-for="c in myCollabs" class="col-12 col-md-3 mb-3 p-4">
        <AlbumCard :album="c.album" />
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 bg-primary elevation-5 p-2 rounded d-flex justify-content-between">
        <button @click="filterBy = 'animals'" class="btn btn-warning fw-bold">ANIMALS</button>
        <button @click="filterBy = 'crocs'" class="btn btn-warning fw-bold">CROCS 🐊</button>
        <button @click="filterBy = 'pugs'" class="btn btn-warning fw-bold">PUGS</button>
        <button @click="filterBy = 'games'" class="btn btn-warning fw-bold">GAMES</button>
        <button @click="filterBy = 'misc'" class="btn btn-warning fw-bold">MISC</button>
        <button @click="filterBy = ''" class="btn btn-warning fw-bold">ALL</button>
      </div>
    </div>
    <div class="row">
      <div v-for="a in albums" class="col-12 col-md-3 mb-3 p-4">
        <AlbumCard :album="a" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import AlbumCard from '../components/AlbumCard.vue';
import { albumsService } from '../services/AlbumsService.js';
import { collabsService } from '../services/CollabsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const filterBy = ref("");
    async function getAlbums() {
      try {
        await albumsService.getAll();
      }
      catch (error) {
        Pop.toast(`<p class="text-primary">
          <img src="https://media.tenor.com/r3K7ttpGKUgAAAAM/lick-cat-lick.gif" class="img-fluid" alt="">
          <div class="d-flex fs-1">
            <i class="mdi mdi-cat mdi-spin"></i>
            <i class="mdi mdi-cat mdi-spin"></i>
            <i class="mdi mdi-cat mdi-spin"></i>
            <i class="mdi mdi-cat mdi-spin"></i>
          </div>
          ${error.message}
          </p>
          `, "error", "center");
        logger.error(error);
      }
    }
    onMounted(() => {
      getAlbums();
    });
    return {
      filterBy,
      myCollabs: computed(() => AppState.myCollabs),
      account: computed(() => AppState.account),
      albums: computed(() => {
        if (filterBy.value == "") {
          return AppState.albums;
        }
        else {
          return AppState.albums.filter(a => a.category == filterBy.value);
        }
      })
    };
  },
  components: { AlbumCard }
}
</script>

<style scoped lang="scss">
button {
  width: 12vw;
}
</style>
