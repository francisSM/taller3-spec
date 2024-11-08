<!-- src/components/EndGameMenu.vue -->
<template>
  <div v-if="show" class="end-game-menu">
    <h1>{{ winner }}</h1>
    <button @click="$emit('play-again')">Jugar de Nuevo</button>
    <button @click="$emit('back-to-menu')">Volver al Menú</button>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    winner: {
      type: String,
      required: true,
    },
  },
};
</script>


<style scoped>
.end-game-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  height: 100vh;
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

button:hover {
  background-color: #2980b9;
}
</style>
