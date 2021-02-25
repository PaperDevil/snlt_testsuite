<template>
  <div class="chat">
    <ChatToolbar :skill_name="skill_name" @refresh='refresh()' />
    <div class="chat-main">
      <div class="" v-for="message in messages" :key="message">
        <ChatMessage :who='message.who' :out_text='message.out_text' :choices='message.choices' @choiced='send_choice'/>
      </div>
    </div>
    <ChatFooter @sendMessage='send_message'/>
  </div>
</template>

<script>
import ChatMessage from '@/components/ChatMessage'
import ChatToolbar from '@/components/ChatToolbar'
import ChatFooter from '@/components/ChatFooter'

const axios = require('axios');

export default {
  name: "ChatPage",
  data () {
    return {
      skill_working_url: 'http://localhost:8080',
      skill_name: 'skill-name',
      global_id: 0,
      client_type: 'text',
      test_context: {},
      chat_log: [],
      messages: [],
      theme: 'light'
    }
  },
  methods: {
    send_message (message) {
      console.log(`Send data ${message}`)
      this.messages.unshift({'who': 'me', 'out_text': message})
      axios.post(this.skill_working_url + '/skill', {
          'User': {
            'user_id': 0,
            'client_app': 'testsuite'
          },
          'Update': {
            'in_text': message
          },
          'Context': this.test_context
          })
      .then((response) => {
        if (response.data.status === 'exit') {
          this.refresh()
          return
        }
        console.log(response.data)
        this.messages.unshift({
          'who': 'bot',
          'out_text': response.data.out_text,
          'choices': response.data.choices
        })
        this.test_context = response.data.context
      })
      this.input_text = ''
    },
    send_choice (choice) {
      console.log(`Send data ${choice}`)
      axios.post(this.skill_working_url + '/skill', {
          'User': {
            'user_id': 0,
            'client_app': 'testsuite'
          },
          'Update': {
            'in_choice': choice
          },
          'Context': this.test_context
          })
      .then((response) => {
        if (response.data.status === 'exit') {
          this.refresh()
          return
        }
        console.log(response.data)
        this.messages.unshift({
          'who': 'bot',
          'out_text': response.data.out_text,
          'choices': response.data.choices
        })
        this.test_context = response.data.context
      })
    },
    update_settings () {
      console.log("UPD")
      axios.get(this.skill_working_url + '/snlt')
      .then((response) => {
        if (response.status == 200) {

          this.skill_name = response.data.skill_name
          this.skill_working_url = response.data.skill_working_url
          this.client_type = response.data.testsuite.client_type
          this.global_id = response.data.testsuite.global_id
          this.client_app = response.data.testsuite.client_app
          
          if (response.data.testsuite.theme === 'dark') {
            this.$vuetify.theme.dark = true
          } else {
            this.$vuetify.theme.dark = false
          }
        
        } else {
          console.error("Server answer status is not correct")
        }
      })
    },
    refresh () {
      this.input_text = ''
      this.input_choice = null
      this.test_context = {}
      this.chat_log = []
      this.messages = []
    }
  },
  components: { ChatMessage, ChatToolbar, ChatFooter },
  created () {
    setInterval(this.update_settings, 1000)
  }
};
</script>

<style scoped>
.chat {
  width: 30%;
  height: 80vh;

  -webkit-box-shadow: 0px 2px 16px 3px rgba(0, 0, 0, 0.74);
  box-shadow: 0px 2px 16px 3px rgba(0, 0, 0, 0.74);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chat-main {
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column-reverse;
  padding: 2%;
  overflow: auto;
  overflow-x: hidden
}

@media all and (max-width: 720px) {
  .chat {
    width: 100%;
    height: 100vh;
  }
}
</style>