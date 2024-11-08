<template>
    <div id="game-page">
        <!-- Menú principal -->
        <MenuPrincipal v-show="showMenu" @start-game="goToCharacterSelection" />

        <!-- Selección de personajes -->
        <div v-if="showCharacterSelection" class="character-selection">
            <CharacterCarousel title="Player 1" @character-selected="selectPlayer1Character" />
            <CharacterCarousel title="Player 2" @character-selected="selectPlayer2Character" />
            <button @click="startGame" :disabled="!player1Character || !player2Character">
                Comenzar Juego
            </button>
        </div>

        <!-- Canvas del juego -->
        <GameCanvas v-if="!showMenu && !showCharacterSelection && !gameOver" :player1Character="player1Character"
            :player2Character="player2Character" @game-over="handleGameOver" />

        <!-- Menú de fin de juego -->
        <EndGameMenu v-if="gameOver" :show="gameOver" :winner="winner" @play-again="restartGame"
            @back-to-menu="backToMenu" />
    </div>
</template>

<script>
import MenuPrincipal from '@/components/import/MenuPrincipal.vue';
import GameCanvas from '@/components/import/GameCanvas.vue';
import EndGameMenu from '@/components/import/EndGameMenu.vue';
import CharacterCarousel from '@/components/import/CharacterCarousel.vue';

export default {
    components: { MenuPrincipal, GameCanvas, EndGameMenu, CharacterCarousel },
    data() {
        return {
            showMenu: true,
            showCharacterSelection: false,
            gameOver: false,
            player1Character: null,
            player2Character: null,
            winner: '',
        };
    },
    methods: {
        goToCharacterSelection() {
            this.resetCharacters();
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
            if (this.player1Character && this.player2Character) {
                this.showCharacterSelection = false;
                this.gameOver = false;
            }
        },
        handleGameOver(winner) {
            this.winner = winner === 'Player 1' ? '¡Ganó el Player 1!' : '¡Ganó el Player 2!';
            this.gameOver = true;
        },
        restartGame() {
            this.resetCharacters();
            this.showCharacterSelection = true;
            this.gameOver = false;
        },
        backToMenu() {
            this.resetCharacters();
            this.showMenu = true;
            this.showCharacterSelection = false;
            this.gameOver = false;
        },
        resetCharacters() {
            this.player1Character = null;
            this.player2Character = null;
        },
    },
};
</script>

<style scoped>
.character-selection {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
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
