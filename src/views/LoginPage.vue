<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "../../api";
import { isEmpty } from "vuetify/lib/util/helpers.mjs";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");
const emailError = ref("");
const passwordError = ref("");
const snackbar = ref(false);
const snackbarColor = ref("info");
const SnackbarText = ref("Login successful! Redirecting...");
const validEmail = ref(false);
const validPassword = ref(false);



const validateEmail = () => {
  if(isEmpty(email.value)) {
    emailError.value = "Email je obavezan";
  } else if (!email.value.includes("@")) {
    emailError.value = "Email mora sadrzavati @ znak";
  } else  {
    emailError.value = "";
  }
}

const sanitizeEmail = () => {
  email.value = email.value.replace(/[^a-zA-Z0-9@._-]/g, '')
  validateEmail();
}


const logMeIn = async () => {
  //console.log("uslo");
  //console.log("Email:", email.value);
  //console.log("Password:", password.value);

  try {
    // Ako je prijavljeni user ima rolu admin, preusmjeravamo ga u admin dashboard.
    const response = await loginUser(email.value, password.value);
    console.log("Response:", response);
    if (response.success) {
      localStorage.setItem("username", JSON.stringify(response.data.user.username));
      const isAdmin = response.data.user.role === "admin";
      if(isAdmin) {
        snackbar.value = true;
        snackbarColor.value = "success";
        SnackbarText.value = "Prijava uspješna! Preusmjeravanje u admin dio...";
        await router.push("/admin");
        await router.push("/admin");
      } else {
        snackbar.value = true;
        snackbarColor.value = "success";
        SnackbarText.value = "Prijava uspjesna! Preusmjeravanje...";
        console.log("Korisanik nije admin, preusmjeravam na dashboard");
        await router.push("/dashboard");
      }
    } else {
      error.value = response.message;
 
 
    }
  } catch (err) {
    snackbar.value = true;
    snackbarColor.value = "error";
    SnackbarText.value = "Prijava nije uspjela. Provjerite email i lozinku.";
    console.error("Login error:", err);     
  }

};

</script>

<template>
  <v-app>
    <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        timeout="3000"
        location="top center"
        elevation="4"
      >
        {{ SnackbarText }}
      </v-snackbar>
    <v-main>
      <v-container
        class="main-container fill-height d-flex justify-center align-center"
      >
        <v-card class="pa-1 login-form">
          <v-card-title class="login-heading">Login page</v-card-title>
          <v-card-text>
            <v-text-field
              class="user-email"
              label="Email"
              v-model="email"
              @input="sanitizeEmail"
              :error="!!emailError"
              :error-messages="emailError"
              @blur="validateEmail"
            />
            <v-text-field
              hint="Enter your password to access this webpage"
              class="user-password"
              label="Password"
              type="password"
              v-model="password"
              :error="!!passwordError"
              :error-messages="passwordError ? [passwordError] : []"
              @input="passwordError = ''"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="logMeIn">Login</v-btn>
          </v-card-actions>
          <v-card-text>
            <div class="not-member">
              Not a member?<router-link to="/signup"
                ><a class="sign-up-now">Sign up now</a></router-link
              >
            </div>
          </v-card-text>
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

.login-heading {
  display: flex;
  padding: 1rem;
  justify-content: center;
  color: #afafaf;
  text-align: center;
  font-size: 1.4rem;
  background: linear-gradient(#42b883, #080808);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  font-size: 0.8rem;
}

.user-email,
.user-password {
  width: 100%;
  margin-bottom: 1rem;
  color: #42b883;
}
</style>
