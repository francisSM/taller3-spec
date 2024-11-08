<!-- src/components/MenuPrincipal.vue -->
<template>
    <div id="menuPrincipal">
      <h1>¡Bienvenido al Juego de Lucha!</h1>
      <button @click="startGame">Iniciar Juego</button>
      <button @click="exitGame">Salir</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      startGame() {
        this.$emit('start-game');
      },
      exitGame() {
        window.close(); // Sale del juego
      },
    },
  };
  </script>
  
  <style scoped>
  @import "../assets/styles.css";
  </style>
  