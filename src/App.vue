<template>
  <div id="app">
    <div class="container">
      <nav class="navbar">
        <div class="navbar-brand">
          <a class="navbar-item" href="index.html">
            <img src="img/logo.jpg" alt="" />
            TV shows store
          </a>
        </div>
        <div class="navbar-menu is-active">
          <div class="navbar-start">
            <a class="navbar-item is-active" href="index.html">Search</a>
            <router-link class="navbar-item is-active" to="/favorites">Favorites</router-link>
          </div>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>
