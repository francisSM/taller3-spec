<template>
  <div id="container" v-if="!gameOver">
    <div id="healthContainer">
      <div class="playerContainer">
        <div class="playerName">{{ player1Name }}</div><br>
        <div class="healthBar">
          <div class="health" :style="{ width: playerHealth + '%' }"></div>
        </div>
      </div>
      <div id="separador">VS</div>
      <div class="playerContainer">
        <div class="playerName">Player 2</div><br>
        <div class="healthBar">
          <div class="health" :style="{ width: enemyHealth + '%' }"></div>
        </div>
      </div>
    </div>
    <canvas id="gameCanvas" ref="gameCanvas"></canvas>
    <div id="displayText" v-if="displayText">{{ displayText }}</div>
  </div>
</template>

<script>
export default {
  props: ['player1Character', 'player2Character'],
  data() {
    return {
      player1Name: "",
      player: null,
      enemy: null,
      playerHealth: 100,
      enemyHealth: 100,
      displayText: "",
      gameOver: false,
      keys: {
        a: { pressed: false },
        d: { pressed: false },
        ArrowRight: { pressed: false },
        ArrowLeft: { pressed: false }
      },
      gravity: 1,
      groundLevel: 130,
      animationId: null,
      lastKey: null,
      backgroundMusic: new Audio(require('@/assets/Fight.wav')),
      attackSound: new Audio(require('@/assets/hit.mp3')),
    };
  },

  mounted() {
    this.initializeGame();
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('keyup', this.handleKeyup);
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3;
    this.backgroundMusic.play();
    this.attackSound.volume = 0.5;
  },
  beforeUnmount() {
    window.cancelAnimationFrame(this.animationId);
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('keyup', this.handleKeyup);
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  },
  methods: {
    async getName() {
      const nameTest = await this.getUserName();
      return nameTest;
    },
    initializeGame() {
      this.gameOver = false;
      this.displayText = "";
      this.playerHealth = 100;
      this.enemyHealth = 100;

      // solución al nombre...
      this.getName().then(name => {
        this.player1Name = name;
        console.log("test: " + name);
      }).catch(error => {
        console.error('Error al obtener el nombre del usuario:', error);
        this.player1Name = 'Player 1'; // Valor por defecto si hay un error
      });
      const canvas = this.$refs.gameCanvas;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Crear jugadores con las imágenes seleccionadas
      this.player = this.createPlayer({ x: 150, y: canvas.height - 200 - this.groundLevel, image: this.player1Character });
      this.enemy = this.createPlayer({ x: canvas.width - 250, y: canvas.height - 200 - this.groundLevel, image: this.player2Character });

      this.animate(ctx);

    },
    createPlayer({ x, y, image }) {
      return {
        position: { x, y },
        velocity: { x: 0, y: 0 },
        width: 75,
        height: 180,
        image: image,
        health: 100,
        isAttacking: false,
        facingRight: true,
        isOnGround: false,
        attackBox: { position: { x, y }, width: 100, height: 50 },
      };
    },
    handleKeydown(event) {
      if (this.gameOver) return;
      switch (event.key) {
        case 'd':
          this.keys.d.pressed = true;
          this.lastKey = 'd';
          break;
        case 'a':
          this.keys.a.pressed = true;
          this.lastKey = 'a';
          break;
        case 'w':
          if (this.player.isOnGround) {
            this.player.velocity.y = -20;
            this.player.isOnGround = false;
          }
          break;
        case 'g':
          this.player.isAttacking = true;
          this.attackSound.play();
          break;
        case 'ArrowRight':
          this.keys.ArrowRight.pressed = true;
          this.enemy.lastKey = 'ArrowRight';
          break;
        case 'ArrowLeft':
          this.keys.ArrowLeft.pressed = true;
          this.enemy.lastKey = 'ArrowLeft';
          break;
        case 'ArrowUp':
          if (this.enemy.isOnGround) {
            this.enemy.velocity.y = -20;
            this.enemy.isOnGround = false;
          }
          break;
        case ',':
          this.enemy.isAttacking = true;
          this.attackSound.play();
          break;
      }
    },
    handleKeyup(event) {
      switch (event.key) {
        case 'd':
          this.keys.d.pressed = false;
          break;
        case 'a':
          this.keys.a.pressed = false;
          break;
        case 'ArrowRight':
          this.keys.ArrowRight.pressed = false;
          break;
        case 'ArrowLeft':
          this.keys.ArrowLeft.pressed = false;
          break;
      }
    },
    updateHealth(player, health) {
      if (player === 'player') {
        this.playerHealth = health;
      } else {
        this.enemyHealth = health;
      }

      if (this.playerHealth <= 0 || this.enemyHealth <= 0) {
        this.gameOver = true;
        this.displayText = this.playerHealth <= 0 ? '¡Ganó el Player 2!' : '¡Ganó el Player 1!';
        const winner = this.playerHealth <= 0 ? 'Player 2' : 'Player 1';

        // Emitimos el evento con el nombre del ganador
        this.$emit('game-over', winner);

        // Determinamos el resultado del juego y lo enviamos al backend
        const result = this.playerHealth <= 0 ? 'lose' : 'win';
        this.sendGameResult(result);  // Enviar el resultado (win/lose)
      }
    },
    async getUserName() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar el token
          const userId = decodedToken.id;
          const userName = await this.fetchUserName(userId); // Esperar a que se resuelva la Promise
          return userName; // Devolver el nombre del usuario
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          return 'Player 1';
        }
      }
      return 'Player 1';
    },
    async fetchUserName(userId) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        return data.username; // Esto se devolverá si no hay error
      } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error);
        return 'Player 1'; // Valor por defecto en caso de error
      }
    },
    sendGameResult(result) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar JWT
        const userId = decodedToken.id;

        fetch('http://localhost:5000/api/stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ userId, result })  // Enviar el resultado y el userId
        })
          .then(response => {
            if (response.ok) {
              console.log('Estadísticas guardadas correctamente');
            } else {
              console.error('Error al guardar las estadísticas');
            }
          })
          .catch(error => {
            console.error('Error al enviar el resultado:', error);
          });
      }
    },
    animate(ctx) {
      if (this.gameOver) return;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.updatePlayer(this.player, this.enemy, ctx);
      this.updatePlayer(this.enemy, this.player, ctx);
      this.animationId = requestAnimationFrame(() => this.animate(ctx));
    },
    updatePlayer(player, opponent, ctx) {
      const floorHeight = ctx.canvas.height - player.height - this.groundLevel;

      player.position.x += player.velocity.x;
      player.position.y += player.velocity.y;

      const leftLimit = 20;
      const rightLimit = ctx.canvas.width - player.width - 20;

      if (player.position.x < leftLimit) player.position.x = leftLimit;
      if (player.position.x > rightLimit) player.position.x = rightLimit;

      if (player.position.y < floorHeight) {
        player.velocity.y += this.gravity;
        player.isOnGround = false;
      } else {
        player.velocity.y = 0;
        player.position.y = floorHeight;
        player.isOnGround = true;
      }

      // Dibujar la imagen del personaje
      const img = new Image();
      img.src = player.image;
      ctx.drawImage(img, player.position.x, player.position.y, player.width, player.height);

      const attackDirection = player.position.x < opponent.position.x ? 'right' : 'left';

      player.attackBox.position.x = attackDirection === 'right'
        ? player.position.x + player.width
        : player.position.x - player.attackBox.width;
      player.attackBox.position.y = player.position.y;

      if (player.isAttacking) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(player.attackBox.position.x, player.attackBox.position.y, player.attackBox.width, player.attackBox.height);

        if (this.detectCollision(player.attackBox, opponent)) {
          opponent.health -= 20;
          this.updateHealth(opponent === this.player ? 'player' : 'enemy', opponent.health);
        }
        player.isAttacking = false;
      }

      if (player === this.player) {
        player.velocity.x = this.keys.a.pressed && !this.keys.d.pressed ? -5 : this.keys.d.pressed && !this.keys.a.pressed ? 5 : 0;
      } else {
        player.velocity.x = this.keys.ArrowLeft.pressed && !this.keys.ArrowRight.pressed ? -5 : this.keys.ArrowRight.pressed && !this.keys.ArrowLeft.pressed ? 5 : 0;
      }
    },
    detectCollision(rect1, rect2) {
      return (
        rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y + rect1.height >= rect2.position.y &&
        rect1.position.y <= rect2.position.y + rect2.height
      );
    },
  }
};
</script>

<style scoped>
@import "@/assets/styles.css";
</style>
