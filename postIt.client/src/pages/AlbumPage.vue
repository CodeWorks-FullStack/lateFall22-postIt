<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="album" class="col-4">
        <div class="row">
          <div class="col-12 mb-4">
            <div class="d-flex justify-content-around">
              <img :src="album.coverImg" alt="" class="img-fluid cover-img rounded elevation-6">
              <div>
                <div class="elevation-6 rounded bg-warning fw-bold p-2 mb-3">
                  <div class="mb-2">
                    {{ album.title }}
                  </div>
                  <div>
                    by: {{ album.creator.name }}
                  </div>
                </div>
                <div>
                  <button v-if="account.id" data-bs-toggle="modal" data-bs-target="#pictureModal"
                    :disabled="album.archived && !foundMe"
                    :class="`btn btn-${album.archived && !foundMe ? 'danger' : 'info'} elevation-6 fw-bold`">Add
                    picture</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 d-flex justify-content-around align-items-center px-5">
            <div>
              <div>{{ album.memberCount }} </div>
              <div>Collaborators</div>
            </div>
            <div>
              <!-- TODO write out the code to become a collab -->
              <button v-if="album.archived" class="btn btn-outline-danger" disabled>Album is archived</button>
              <button v-else-if="account.id && !foundMe" @click="createCollab()" class="btn btn-outline-light">
                <div><i class="mdi mdi-heart"></i></div>
                <div>Collab</div>
              </button>
              <!-- NOTE jerms is back baby -->
              <button v-else-if="account.id" @click="removeCollab(foundMe.id)" class="btn btn-outline-danger">
                <div><i class="mdi mdi-heart-broken"></i></div>
                <div>UnCollab</div>
              </button>
            </div>
          </div>
          <div v-for="c in collabs" class="col-6 col-md-3">
            <img :src="c.profile.picture" alt="" class="img-fluid elevation-6 rounded" :title="c.profile.name">
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="row">
          <div v-for="p in pictures" class="col-3">
            <a :href="p.imgUrl" target="_blank">
              <img :src="p.imgUrl" alt="" class="img-fluid rounded">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalComponent id="pictureModal" class="text-danger bg-info">
    <PictureForm />
  </ModalComponent>
</template>


<script>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import ModalComponent from '../components/ModalComponent.vue';
import PictureForm from '../components/PictureForm.vue';
import { albumsService } from '../services/AlbumsService.js';
import { collabsService } from '../services/CollabsService.js';
import { picturesService } from '../services/PicturesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const route = useRoute();
    async function getAlbumById() {
      try {
        await albumsService.getAlbumById(route.params.albumId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    async function getPicturesByAlbumId() {
      try {
        await picturesService.getPicturesByAlbumId(route.params.albumId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    async function getCollabsByAlbumId() {
      try {
        await collabsService.getCollabsByAlbumId(route.params.albumId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getAlbumById();
      getPicturesByAlbumId();
      getCollabsByAlbumId();
    });
    return {
      album: computed(() => AppState.activeAlbum),
      pictures: computed(() => AppState.pictures),
      collabs: computed(() => AppState.collabs),
      account: computed(() => AppState.account),
      // NOTE jerms is bad at code. Try and find an object in the collabs that contains my account id
      // NOTE !! is double bang, returns true or false if it finds an object
      // foundMe: computed(() => !!AppState.collabs.find(c => c.accountId == AppState.account.id)),
      foundMe: computed(() => AppState.collabs.find(c => c.accountId == AppState.account.id)),
      async createCollab() {
        try {
          await collabsService.createCollab({ albumId: route.params.albumId });
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },
      async removeCollab(collabId) {
        try {
          if (await Pop.confirm()) {
            await collabsService.removeCollab(collabId);
          }
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      }
    };
  },
  components: { ModalComponent, PictureForm }
}
</script>


<style lang="scss" scoped>
.elevation-6 {
  box-shadow: 3pt 3pt whitesmoke;
}

.cover-img {
  width: 20vw;
}
</style>