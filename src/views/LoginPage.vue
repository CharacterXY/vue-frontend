<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "../../api";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");
const emailError = ref("");
const passwordError = ref("");

const validEmail = ref(false);
const validPassword = ref(false);



const validateEmail = () => {
  if (!email.value.includes("@")) {
    emailError.value = "Email mora sadrzavati @ znak";
  } else {
    emailError.value = "";
  }
};


const logMeIn = async () => {
  console.log("uslo");
  console.log("Email:", email.value);
  console.log("Password:", password.value);

  try {
    const response = await loginUser(email.value, password.value);
    console.log("Response:", response);
    if (response.success) {
      localStorage.setItem("username", JSON.stringify(response.data.user.username));
      const isAdmin = response.data.user.role === "admin";
      if(isAdmin) {
        console.log("User is admin, redirecting to admin dashboard");
        await router.push("/admin");
      } else {
        console.log("User is not admin, redirecting to user dashboard");
        await router.push("/dashboard");
      }
    } else {
      error.value = response.message;
 
    }
  } catch (err) {
    console.error("Login error:", err);     
  }
  validateEmail() ;

};

</script>

<template>
  <v-app>
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
            <v-btn color="info" @click="logMeIn">Login</v-btn>
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
