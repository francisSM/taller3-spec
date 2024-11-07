<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- Mostrar el menú principal si `showMenu` es verdadero -->
    <MenuPrincipal v-if="showMenu" @start-game="goToCharacterSelection" />

    <!-- Mostrar la selección de personajes si `showCharacterSelection` es verdadero -->
    <div v-if="showCharacterSelection" class="character-selection">
      <CharacterCarousel title="Seleccionar Personaje para Player 1" @character-selected="selectPlayer1Character"/>
      <CharacterCarousel title="Seleccionar Personaje para Player 2" @character-selected="selectPlayer2Character"/>
      <button @click="startGame" :disabled="!player1Character || !player2Character">Comenzar Juego</button>
    </div>

    <!-- Mostrar el canvas del juego cuando los personajes están seleccionados -->
    <GameCanvas v-if="!showMenu && !showCharacterSelection && !gameOver" 
                :player1Character="player1Character" 
                :player2Character="player2Character" 
                @game-over="handleGameOver"/>

    <!-- Mostrar el menú de fin de juego con el mensaje de victoria -->
    <EndGameMenu v-if="gameOver" :show="gameOver" :winnerMessage="winnerMessage" @play-again="restartGame" @back-to-menu="backToMenu"/>
  </div>
</template>

<script>
import MenuPrincipal from './components/MenuPrincipal.vue';
import GameCanvas from './components/GameCanvas.vue';
import EndGameMenu from './components/EndGameMenu.vue';
import CharacterCarousel from './components/CharacterCarousel.vue';

export default {
  components: { MenuPrincipal, GameCanvas, EndGameMenu, CharacterCarousel },
  data() {
    return {
      showMenu: true,
      showCharacterSelection: false,
      gameOver: false,
      player1Character: null,
      player2Character: null,
      winnerMessage: '' // Mensaje para mostrar el ganador
    };
  },
  methods: {
    goToCharacterSelection() {
      this.showMenu = false;
      this.showCharacterSelection = true;
    },
    selectPlayer1Character(character) {
      this.player1Character = character;
    },
    selectPlayer2Character(character) {
      this.player2Character = character;
    },
    startGame() {
      this.showCharacterSelection = false;
      this.gameOver = false;
    },
    handleGameOver(winner) {
      this.gameOver = true;
      this.winnerMessage = winner === 'player1' ? '¡Ganó el Player 1!' : '¡Ganó el Player 2!';
    },
    restartGame() {
      this.player1Character = null;
      this.player2Character = null;
      this.showCharacterSelection = true;
      this.gameOver = false;
    },
    backToMenu() {
      this.showMenu = true;
      this.showCharacterSelection = false;
      this.gameOver = false;
    }
  }
};
</script>

<style>
.character-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
