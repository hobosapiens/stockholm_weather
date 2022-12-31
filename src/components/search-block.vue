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
import {getPlaceData} from "@/api";

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
    const autocomplete = new window.google.maps.places.Autocomplete(
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
  position: absolute
  right: 40px
  top: 40px
  z-index: 100
  border: 2px solid transparent
  border-radius: 16px
  box-sizing: border-box
  padding: 0 7px

  @media screen and (max-width: 960px)
    right: 20px
    top: 20px

  @media screen and (max-width: 720px)
    font-size: 14px

  @media screen and (max-width: 540px)
    right: 0
    left: 0
    top: -51px
    padding: 0 12px
    border: none
    background: -webkit-linear-gradient(180deg, #BDD6ED 0, #768FC1 100%)
    box-shadow: -4px 4px 4px 0px rgb(0 0 0 / 50%)

  &__icon
    cursor: pointer

    @media screen and (max-width: 540px)
      width: 16px

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

    @media screen and (max-width: 720px)
      font-size: 14px

    @media screen and (max-width: 540px)
      padding: 7px 0
      width: 100%

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

      @media screen and (max-width: 720px)
        width: 180px

      @media screen and (max-width: 540px)
        width: 100%

      &::placeholder
        color: rgba(255, 255, 255, .6)
</style>
