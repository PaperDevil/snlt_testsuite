<template>
  <v-app>

    <v-container class="main">
      <ChatPage />
    </v-container>

  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ChatPage from './components/ChatPage.vue'

export default {
  name: 'App',
  components: {
    ChatPage
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100vh;
  font-family: 'Dosis', sans-serif;
}

.main {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
