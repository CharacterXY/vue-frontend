<script setup>
import { ref, watch, computed } from 'vue'
import { updateUser } from '../../api' 

const props = defineProps({
  modelValue: Boolean,
  user: Object,
})

const editedUser = ref({})

const snackbarText = ref('')
const snackbarColor = ref('success')
const snackbar = ref({
  show:false,
  message: '',
  color: 'success',
})

const emit = defineEmits(['update:modelValue', 'userUpdated'])

const isDialogOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const handleUserUpdate = () => {
snackbar.value = {
  show: true,
  message: 'Korisnik uspješno ažuriran',
  color: 'success',
}

}



watch(() => props.user, (newUser) => {
  if (newUser) {
    editedUser.value = {
      ...newUser,
      is_active: newUser.isActive === 1, 
    };
  }
}, { immediate: true });


const close = () => {
  emit('update:modelValue', false)
}


const saveUser = async () => {
  try {
    const userToSave = {
      id: editedUser.value.id,
      username: editedUser.value.username,
      email: editedUser.value.email,
      name: editedUser.value.name,
      lastname: editedUser.value.lastname,
      phone: editedUser.value.phone,
      address: editedUser.value.address,
      password: editedUser.value.password,
      role: editedUser.value.role,
      isActive: editedUser.value.is_active ? 1 : 0, 
    };

    console.log("Šaljem backendu:", userToSave);  
    const response = await updateUser(userToSave.id, userToSave);
    console.log('Ažurirani korisnik:', response);

 
    if (response.success) {
      emit('userUpdated');
      close();
    } else {
      console.error('Greška prilikom ažuriranja:', response.message);
    }
  } catch (err) {
    console.error('Greška:', err);
  }
};
</script>

<template>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      timeout="3000"
      location="top center"
      elevation="4"
      >
      {{ snackbarText }}
    </v-snackbar>

  <v-dialog v-model="isDialogOpen" max-width="600px">
    <v-card class="edit-form">
      <v-card-title>Uredi korisnika</v-card-title>
      <v-card-text>
        <v-text-field class="user-firstname" v-model="editedUser.name" label="Ime" />
        <v-text-field class="user-lastname" v-model="editedUser.lastname" label="Prezime" />
        <v-text-field  class="user-email" v-model="editedUser.email"  label="Email" />
        <v-text-field class="user-username" v-model="editedUser.username" label="Korisničko ime" />
        <v-text-field class="user-phone" v-model="editedUser.phone" label="Telefon" />
        <v-text-field class="user-address" v-model="editedUser.address" label="Adresa" />
        <v-text-field class="user-password" v-model="editedUser.password"  type="password"label="Password" />
        <v-select
          v-model="editedUser.role"
          :items="['user', 'admin']"
          label="Uloga"
          class="user-role"
        />
        <v-switch
    v-model="editedUser.is_active"
    :label="editedUser.is_active ? 'Aktivan' : 'Neaktivan'"
    :class="editedUser.is_active ? 'user-active' : 'user-inactive'"
    color="success"
/>

      </v-card-text>
      <v-card-actions>
        <v-btn color="green" @click="saveUser">Spremi</v-btn>
        <v-spacer />
        <v-btn color="grey" @click="close">Odustani</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>




<style scoped>
.v-card-text > * {
  margin-bottom: 2px;
}
.user-email,
.user-firstname,
.user-lastname,
.user-username,
.user-phone,
.user-address,
.user-password,
.user-role {
  width: 100%;
  color: #42b883;

}
.user-active {
  width: 100%;
  color: #42b883;
}

.user-inactive {
  width: 100%;
  color: #ff5252;
}

.edit-form {
  width: 30rem;
  height: auto;
  padding: 1rem;
  background-color: #333;
  opacity: 0.9;
}

</style>
