<template>
    <v-toolbar class="header" color='primary'>

      <v-toolbar-title color='secondary'>{{ skill_name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="refresh()" color='secondary'>
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn icon color='secondary'>
        <v-icon>settings</v-icon>
      </v-btn>

    </v-toolbar>
</template>

<script>
export default {
    name: "ChatToolbar",
    props: ['skill_name'],
    methods: {
        refresh () {
            this.$emit("refresh")
        }
    }
}
</script>

<style scoped>

.header {
  width: 100%;
  height: 60px;
  background: rgba(250, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  top: auto;
}

</style>