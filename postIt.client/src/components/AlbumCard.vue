<template>
  <router-link :to="{ name: 'Album', params: { albumId: album.id } }">
    <div class="elevation-6 rounded bg-success">
      <img :src="album.coverImg" alt="" class="img-fluid card-img rounded-top">
      <div class="text-center fw-bold p-1">
        <div>{{ album.title }}</div>
        <div>0 <i class="mdi mdi-heart"></i></div>
      </div>
    </div>
  </router-link>
</template>


<script>
export default {
  props: {
    album: { type: Object, required: true }
  },
  setup() {
    return {
    }
  }
}
</script>


<style lang="scss" scoped>
.card-img {
  height: 30vh;
  width: 100%;
  object-fit: cover;
}

.elevation-6 {
  box-shadow: 4pt 4pt whitesmoke;
}
</style>