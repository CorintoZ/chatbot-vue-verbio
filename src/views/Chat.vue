<template>
  <div class="body">
    <h2>Chat Messages</h2>
    <button @click="logout">Logout</button>
    <div ref="chatlist" id="chat-list" class="chat-box">
      <div
        :class="classType(message)"
        v-for="(message, index) in messages"
        :key="index"
      >
        <!-- <div v-if="message.author === 'bot'">
          <div class="currently-typing-wrapper">
            <div>
              <p v-if="message.author === 'bot'">
                {{ message.author }} is typing
              </p>
            </div>

            <div class="container-dot">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div> -->
        <img
          v-if="message.author == 'bot'"
          src="@/assets/robot.png"
          alt="Avatar"
          class="left"
          style="width:100%;"
        />
        <img
          v-if="message.author == 'human'"
          src="@/assets/human.png"
          class="right"
          alt="Avatar"
          style="width:100%;"
        />
        <p>{{ message.text }}</p>
        <p v-if="message.url">
          <a :href="message.url">
            <img class="bot" :src="message.url" />
          </a>
        </p>

        <span :class="time(message)">{{ moment().format('hh:mm') }}</span>
      </div>
    </div>
    <div>
      <input
        type="text"
        v-model="input"
        placeholder="Type here..."
        @keyup.enter="sendMessage"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      input: ''
    }
  },
  methods: {
    sendMessage() {
      if (!this.input) {
        return
      }
      let message = {
        text: this.input,
        author: 'human'
      }
      this.input = ''
      this.$store.dispatch('sendMessage', message)
    },
    logout() {
      this.$store.dispatch('logoutUser')
    },
    moment() {
      return moment()
    },
    classType(message) {
      return message.author == 'human' ? 'container human' : 'container'
    },
    time(message) {
      return message.author == 'human' ? 'time-right' : 'time-left'
    }
  },
  computed: {
    ...mapState(['messages'])
  },
  mounted() {
    this.$store.dispatch('welcomeUser')
  },
  updated() {
    this.$refs.chatlist.scrollTop = this.$refs.chatlist.scrollHeight
  }
}
</script>

<style scoped>
body {
  margin: 0 auto;
  max-width: 800px;
  padding: 0 20px;
}
.chat-box {
  height: 60vh;
  width: 60vw;
  border: 1px solid #999;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  overflow-y: auto;
  overflow-x: hidden;
}

.container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 5px;
}

.human {
  text-align: right;
  border-color: #ccc;
  background-color: #ddd;
}

.container::after {
  content: '';
  clear: both;
  display: table;
}

.container img.left {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

.container img.right {
  float: right;
  max-width: 60px;
  width: 100%;
  border-radius: 50%;
  margin-left: 20px;
  margin-right: 0;
}

.container .bot {
  float: center;
  max-width: 60px;
  width: 100%;
  margin-right: 0;
}

.time-right {
  float: right;
  color: #aaa;
}

.time-left {
  float: left;
  color: #999;
}

.currently-typing-wrapper {
  background: #f8f9fb;
  padding: 12px;
  display: inline-flex;
  width: 100%;
  flex-direction: row;
  align-content: center;
  justify-items: center;
  height: 50px;
}

.container-dot {
  padding-left: 15px;
  display: inline-block;
}
.dot {
  height: 10px;
  width: 10px;
  border-radius: 100%;
  display: inline-block;
  background-color: #b4b5b9;
  animation: 1.2s typing-dot ease-in-out infinite;
}
.dot:nth-of-type(2) {
  animation-delay: 0.15s;
}
.dot:nth-of-type(3) {
  animation-delay: 0.25s;
}
@keyframes typing-dot {
  15% {
    transform: translateY(-35%);
    opacity: 0.5;
  }
  30% {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>
