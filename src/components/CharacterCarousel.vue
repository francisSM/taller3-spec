<template>
  <div class="carousel">
    <h2>{{ title }}</h2>
    <div class="carousel-container">
      <button @click="prevCharacter">‹</button>
      <img :src="characters[currentCharacter]" alt="Character" class="character-image" />
      <button @click="nextCharacter">›</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      characters: [
        require('@/assets/fox.png'),
        require('@/assets/logo.png'),
        require('@/assets/test.png')
      ],
      currentCharacter: 0,
    };
  },
  methods: {
    prevCharacter() {
      this.currentCharacter = (this.currentCharacter - 1 + this.characters.length) % this.characters.length;
      this.selectCharacter(); // Emitir el personaje seleccionado automáticamente
    },
    nextCharacter() {
      this.currentCharacter = (this.currentCharacter + 1) % this.characters.length;
      this.selectCharacter(); // Emitir el personaje seleccionado automáticamente
    },
    selectCharacter() {
      this.$emit('character-selected', this.characters[this.currentCharacter]);
    }
  },
  mounted() {
    // Emitir automáticamente el primer personaje al cargar el componente
    this.selectCharacter();
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
button {
  background-color: #111;
  color: #00ffcc;
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0px 0px 15px rgba(0, 255, 204, 0.6), 
              inset 0px 0px 10px rgba(0, 255, 204, 0.8);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}
</style>
