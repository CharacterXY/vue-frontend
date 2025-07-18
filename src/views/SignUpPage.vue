<script setup>
import { reactive, ref } from "vue";
import { sendRegisterUserToDatabase } from "../../api"; 
import router from "../router";

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const address = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");




const registerNewUser = async () => {
  const formData = reactive({
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  formData.firstName = firstName.value;
    formData.lastName = lastName.value;
    formData.email = email.value;
    formData.password = password.value;
    formData.confirmPassword = confirmPassword.value;
    formData.address = address.value;
    formData.phone = phone.value;
    formData.username = username.value;

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  if(!formData.firstName || 
  !formData.lastName || 
  !formData.email || 
  !formData.password ||
   !formData.confirmPassword || 
   !formData.address ||
   !formData.phone) { 
    alert("Please fill in all required fields.");
    return;
   }

   const response = await sendRegisterUserToDatabase(formData);

    if (!response.success) {
      alert("Registracija nije uspjela: " + response.message + response.error);
      return;
    } else {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Registrirali ste se uspješno!");
      router.push("/dashboard");
    }
}


</script>

<template>
  <h2>Dobrodošli na stranicu za registraciju</h2>
  <v-app>
    <v-main>
      <v-container class="d-flex justify-center align-center fill-height">
        <v-card class="pa-3 signup-form" width="500" elevation="10">
          <v-sheet></v-sheet>
          <v-card-title class="sign-up-heading">
            <h2>Sign Up</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="firstName"
              label="First Name"
              class="mb-12 user-firstname"
              style="height: 1rem;"
              required
              name="firstName"
  
            />
            <v-text-field
              v-model="lastName"
              label="Last Name"
              class="mb-12 user-lastname"
              style="height: 1rem;"
              required
            />
            <v-text-field
              v-model="username"
              label="Username"
              class="user-username mb-12"
              style="height: 1rem;"
              required
            />
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              class="user-email mb-12"
              style="height: 1rem;"
              required
            />
            <v-text-field
              v-model="address"
              label="Address"
              required
              class="user-address mb-12"
              style="height: 1rem;"
            />
            <v-text-field
              v-model="phone"
              label="Phone"
              required
              class="user-phone mb-12"
              style="height: 1rem;"
            />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
              class="user-password mb-12"
              style="height: 1rem;"
            />
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              type="password"
              class="user-password"
              required
            />
          </v-card-text>

          <v-card-actions>
            <v-btn block @click="registerNewUser()">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
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

.sign-up-heading h2 {
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1.8rem;
  padding-bottom: .5rem;
  background: linear-gradient(#42b883, #080808);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}

.signup-form {
  width: 30rem;
  height: auto;
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
  font-size: 0.8rem;
}

.user-email,
.user-firstname,
.user-lastname,
.user-username,
.user-phone,
.user-address,
.user-password {
  width: 100%;
  color: #42b883;

}
</style>
