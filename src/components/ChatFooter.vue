<template>
    <v-footer padless class="input-block" height=80 color='primary'>
        <v-text-field
            v-model="inText"
            clearable
            outlined
            label="Message"
            type="text"
            :append-outer-icon="'mdi-send'"
            @click:append-outer="sendMessage()"
            @keydown.enter="sendMessage()"
            color='secondary'
        >
        </v-text-field>
    </v-footer>
</template>

<script>
export default {
    name: 'ChatFooter',
    data () {
        return {
            inText: ''
        }
    },
    methods: {
        sendMessage () {
            if (this.inText) {
                this.$emit('sendMessage', this.inText)
                this.inText = ''
            }
        }
    }
}
</script>

<style scoped>
.input-block {
  width: 100%;
  bottom: auto;
  padding: 2%;

  display: flex;
  flex-direction: row;
}
</style>