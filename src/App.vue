<template>
  <div id="app">
      <nav>
          <router-link to="/login">Login</router-link> |
          <router-link to="/register">Registro</router-link> |
          <router-link to="/wiki">Wiki</router-link> |
          <router-link to="/play">Jugar</router-link> |
          <router-link to="/stats">Estadísticas</router-link>
      </nav>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #42b983;
}
</style>
