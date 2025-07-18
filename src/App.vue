import LoginPage from './components/LoginPage.vue'
<script setup>


</script>

<template>
  <router-view />
</template>



<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.login-heading {
  display: flex;
  padding: 1rem;
  justify-content: center;
  color: #afafaf;
  text-align: center;
  font-size: 1.4rem;

}

.login-form {
  width: 30rem;
  height: 25rem;
  padding: 1rem;
  background-color: #333;
  opacity: 0.8;
}

.sign-up-now {
  cursor: pointer;
  color: #42b883;
  text-decoration: none;
}

.not-member {
  display: flex;
  color: rgb(197, 197, 196);
  justify-content: flex-start;
  font-size: .8rem;
}

.user-email, .user-password {
  width: 100%;
  margin-bottom: 1rem;
  color: #42b883;
}
</style>
