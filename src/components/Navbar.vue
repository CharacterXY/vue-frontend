<template>
    <v-app-bar color="success" class="px-5 mb-3" dense flat  dark app>
      <v-app-bar-title>Welcome to my APP</v-app-bar-title>
  
      <v-spacer></v-spacer>
  
      <v-btn text @click="$router.push('/dashboard')" v-if="isUser" color="black">Dashboard</v-btn>
      <v-btn text @click="$router.push('/admin')" v-if="isAdmin" color="black">Admin</v-btn>
      <v-btn text @click="logout" color="black">Logout</v-btn>
    </v-app-bar>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const isAdmin = user?.role === "admin"
  const isUser = user?.role === "user" || !isAdmin

  const logout = () => {
  localStorage.removeItem("user");
  router.push("/");

}

  

</script>
  