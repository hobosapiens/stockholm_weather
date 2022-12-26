<template>
  <div class="photo-block">
    <div class="photo-block__wrapper">
      <img
          :src="currentPhotoUrl"
          :alt="city"
          class="photo-block__img"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'PhotosBlock',
  props: {
    photos: {
      type: Array,
      require: true
    },
    city: {
      type: String,
      default: 'City'
    }
  },
  data() {
    return {
      currentPhoto: 0
    }
  },
  mounted() {
    this.showPhoto()
  },
  computed: {
    currentPhotoUrl() {
      return this.photos[this.currentPhoto]
    }
  },
  methods: {
    showPhoto() {
      this.currentPhoto = (this.currentPhoto + 1) % this.photos.length

      if((this.currentPhoto + 1) > this.photos.length) this.currentPhoto = 0

      setTimeout(this.showPhoto, 3000)
    }
  }
}
</script>

<style scoped lang="sass">
.photo-block
  &__wrapper
    display: flex
    align-items: center
    justify-content: center
    width: 600px
    height: 434px
  &__img
    width: 100%
    height: 100%
    object-fit: cover
</style>
