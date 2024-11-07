<!-- src/components/CharacterCarousel.vue -->
<template>
  <div class="carousel">
    <h2>{{ title }}</h2>
    <div class="carousel-container">
      <button @click="prevCharacter">‹</button>
      <img :src="characters[currentCharacter]" alt="Character" class="character-image"/>
      <button @click="nextCharacter">›</button>
    </div>
    <button @click="selectCharacter">Seleccionar</button>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      characters: [
        require('@/assets/noBKG_KnightIdle_strip.png'),
        require('@/assets/logo.png'),
        require('@/assets/test.png')
      ],
      currentCharacter: 0,
    };
  },
  methods: {
    prevCharacter() {
      this.currentCharacter = (this.currentCharacter - 1 + this.characters.length) % this.characters.length;
    },
    nextCharacter() {
      this.currentCharacter = (this.currentCharacter + 1) % this.characters.length;
    },
    selectCharacter() {
      this.$emit('character-selected', this.characters[this.currentCharacter]);
    }
  }
};
</script>

<style scoped>

.carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
}
.carousel-container {
  display: flex;
  align-items: center;
}
.character-image {
  width: 100px;
  height: 150px;
}

</style>
