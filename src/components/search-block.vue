<template>
  <div :class="{'shown': isShownInput}" class="search-block">
    <input
        ref="search"
        v-model="input"
        class="search-block__input"
        type="text"
        placeholder="Type country or city"
    />
    <img
        src="../assets/search.svg"
        alt="search"
        class="search-block__icon"
        @click="toggleSearch"
    >
  </div>
</template>

<script>
import {getPlaceData} from "../api.js";

export default {
  name: 'SearchBlock',
  props: {
    service: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      input: '',
      isShownInput: false
    }
  },
  mounted() {
    const autocomplete = new google.maps.places.Autocomplete(
        this.$refs.search,
        {
          fields: ['name', 'place_id']
        }
    )

    autocomplete.addListener('place_changed', () => {
          const {name, place_id} = autocomplete.getPlace()
          this.input = ''

          if (!place_id) {
            this.$emit('error')
            return
          }

          getPlaceData(this.service, place_id, name, this.updatePlaceData)
          this.toggleSearch()
        }
    )
  },
  methods: {
    updatePlaceData(placeData) {
      this.$emit('update', placeData)
    },
    toggleSearch() {
      this.isShownInput = !this.isShownInput
      if(this.isShownInput) {
        this.$refs.search.focus()
      }
    }
  }
}
</script>

<style scoped lang="sass">
.search-block
  display: flex
  align-items: center
  border: 2px solid transparent
  border-radius: 16px
  box-sizing: border-box
  padding: 0 7px

  &__icon
    cursor: pointer

    &:hover
      opacity: .7

  &__input
    width: 0
    border: none
    outline: none
    padding: 6px 7px
    margin-left: 4px
    background: none
    font-size: 16px
    font-family: 'Oxygen', sans-serif
    color: white
    transition: width .5s ease

    &::placeholder
      color: transparent

    &:focus
      border: none !important

.shown
  &.search-block
    border-color: white

  .search-block
    &__input
      width: 240px

      &::placeholder
        color: rgba(255, 255, 255, .6)
</style>
