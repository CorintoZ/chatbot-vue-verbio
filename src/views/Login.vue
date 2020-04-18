<template>
  <div id="login">
    <form @submit.prevent="submit">
      <h1>Login</h1>
      <div>
        <input
          type="text"
          name="user"
          v-model="input.user"
          placeholder="Username"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          v-model="input.password"
          placeholder="Password"
        />
      </div>
      <div>
        <input id="sumbit" type="submit" value="Login" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    submit() {
      if (!this.input.user || !this.input.password) {
        console.log('Provide an user and password')
        return
      }
      this.$store.dispatch('loginUser', this.input)
      this.input = {
        user: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped></style>
