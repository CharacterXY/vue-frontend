
<script setup>
//const LoggedUser = JSON.parse(localStorage.getItem("user"));
import Navbar from "../components/Navbar.vue";
import { useRouter } from 'vue-router'
const name = JSON.parse(localStorage.getItem("user"))

</script>


<template>
  <Navbar />
    <v-main>
    <h1>User Dashboard</h1>
    <p>Dobrodošao/la!  {{ name?.username || 'Korisnice' }}  </p>

   </v-main>
</template>

