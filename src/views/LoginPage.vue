
<template>
    <v-app>
      <v-main>
        <v-container class="main-container fill-height d-flex justify-center align-center" >
          <v-card class="pa-1 login-form">
            <v-card-title class="login-heading">Login page</v-card-title>
            <v-card-text>
              <v-text-field class="user-email" label="Email" v-model="email" />
              <v-text-field class="user-password" label="Password" type="password" v-model="password" />
            </v-card-text>
            <v-card-actions>
              <v-btn color="info" @click="login">Login</v-btn>
            </v-card-actions>
            <v-card-text>
                <div class="not-member">Not a member?<a class="sign-up-now">Sign up now</a></div>
            </v-card-text>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </template>