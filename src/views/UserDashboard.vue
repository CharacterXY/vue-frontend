<script setup>
//const LoggedUser = JSON.parse(localStorage.getItem("user"));
const name = JSON.parse(localStorage.getItem("user"))


</script>

<template>
  <h1>User Dashboard</h1>
  <p>Dobrodošao/la!  {{ name?.username || 'Korisnice' }}  </p>
</template>

