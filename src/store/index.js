import Vue from 'vue'
import Vuex from 'vuex'
import LoginService from '@/services/LoginService.js'
import Router from '@/router/index.js'
import ChatService from '@/services/ChatService.js'

Vue.use(Vuex)
function emptyUser() {
  return {
    user: undefined,
    password: undefined
  }
}

export default new Vuex.Store({
  state: {
    user: {
      user: '',
      password: ''
    },
    messages: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    ADD_MESSAGE(state, message) {
      state.messages = state.messages.concat(message)
    }
  },
  actions: {
    loginUser({ commit }, user) {
      LoginService.login(user)
        .then(res => {
          sessionStorage.setItem('session_id', `Bearer ${res.data.session_id}`)
          commit('SET_USER', user)
          Router.push({ name: 'chat' })
          return
        })
        .catch(err => {
          console.log(err)
        })
    },
    logoutUser({ commit }) {
      commit('SET_USER', emptyUser())
      sessionStorage.removeItem('session_id')
      Router.push({ name: 'login' })
    },
    sendMessage({ commit }, data) {
      commit('ADD_MESSAGE', data)
      ChatService.sendMessage(data)
        .then(res => {
          res.data.response.forEach(msg => {
            msg.author = 'bot'
          })
          commit('ADD_MESSAGE', res.data.response)
        })
        .catch(err => {
          console.log(err)
          sessionStorage.removeItem('session_id')
          Router.push({ name: 'login' })
        })
    },
    welcomeUser({ commit }) {
      ChatService.getWelcomeMessage()
        .then(res => {
          res.data.response.forEach(msg => {
            msg.author = 'bot'
          })
          commit('ADD_MESSAGE', res.data.response)
        })
        .catch(err => {
          console.log(err)
          sessionStorage.removeItem('session_id')
          Router.push({ name: 'login' })
        })
    }
  },
  getters: {
    getUserSession: () => {
      return sessionStorage.getItem('session_id')
    },
    getUserName: state => {
      return state.user.user
    },
    getMessages: state => {
      return state.messages
    }
  }
})
