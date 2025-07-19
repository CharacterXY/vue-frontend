<script setup>
import router from '../router';
import { watch } from 'vue';
import EditUserModal from '../components/EditUserModal.vue';
import { fetchUserData, fetchUsersByNumber, deleteUserById, updateUser } from '../../api';
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue';

const users = ref([])
const mobileForm = ref(false)
const rowsPerPage = ref('All')
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('info')



const loggedUser = JSON.parse(localStorage.getItem("user"));

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Ime', key: 'name' },
  { title: 'Prezime', key: 'lastname' },
  { title: 'Korisničko ime', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'Adresa', key: 'address' },
  { title: 'Telefon', key: 'phone' },
  { title: 'Uloga', key: 'role' },
  { title: 'Aktivan', key: 'is_active' },
  { title: 'Kreiran', key: 'created_at' },
  { title: 'Zadnja izmjena', key: 'updated_at' },
  { title: 'Akcije', key: 'actions', sortable: false, }

]

watch(rowsPerPage, async (rowsPerPage) => {
  if(rowsPerPage === 'All') {
    const repsonse = await fetchUserData();
    users.value = response.data;

  } else {
    const repsonse = await fetchUsersByNumber(rowsPerPage);
    users.value = repsonse.data;
  }

});

const getRowClass = (item, index) => {
  return index % 2 === 0 ? 'even-row' : 'odd-row'
}


const fetchAllUsers = async () => {
  try {
    const response = await fetchUserData();
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const fetchSomeUsers = async (number) => {
  try {
    const response = await fetchUsersByNumber(number);
    if (response.success) {
      users.value = response.data;
    } else {
      console.error("Failed to fetch user data:", response.message);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const deleteUser = async (id) => {
  try {
    const response = await deleteUserById(id);
    if (response.success) {
      users.value = users.value.filter(user => user.id !== id);
   
      console.log("User deleted successfully");

    } else {
      console.error("Failed to delete user:", response.message);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const convertTimestampToAgoFormat = (timestamp) =>{
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  console.log("timestamp", diff);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  
  if (years > 0) return `${years} godina/a`;
  if (months > 0) return `${months} mjeseci`;
  if (days > 0) return `${days} dana`;
  if (hours > 0) return `${hours} sati`;
  if (minutes > 0) return `${minutes} minuta`;
  return `${seconds} sekundi`;  
}

const checkMobileScreen = () => {
  mobileForm.value = window.innerWidth > 768;
};

const editDialog = ref(false);
const selectedUser = ref(null);
const editUser = (user) => {
  selectedUser.value = { ...user }
  editDialog.value = true
}

onMounted(() => {
  fetchAllUsers();
  checkMobileScreen();

});

window.addEventListener('resize', checkMobileScreen);
</script>

<template>
<v-container fluid class="px-7  mt-10" style="max-width:100%; width:100vw; overflow:hidden;">


  <!-- EDIT USER MODAL -->
  <EditUserModal
  v-model="editDialog"
  :user="selectedUser"
  @userUpdated="fetchAllUsers"
/>




  <!-- DESKTOP PRIKAZ -->
  <template v-if="mobileForm" contains="desktop-view"> >
    <Navbar class="px-6 mb-4" />

  <v-data-table
  :items="users"
  :headers="headers"
  class="elevation-3"
  dense
  item-value="id"
  :items-per-page-options="[10, 25, 50, 100, -1]"
>
  <template v-slot:item="{ item, index, columns }">
    <tr :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
      <td v-for="column in columns" :key="column.key">
        <template v-if="column.key === 'is_active'">
          <v-chip :color="item.isActive ? 'green' : 'red'" text-color="white" size="small">
            {{ item.isActive ? 'Aktivan' : 'Neaktivan' }}
          </v-chip>
        </template>
        <template v-else-if="column.key === 'created_at'">
          Prije {{ convertTimestampToAgoFormat(item.created_at) }}
        </template>
        <template v-else-if="column.key === 'updated_at'">
          Prije {{ convertTimestampToAgoFormat(item.updated_at) }}
        </template>
        <template v-else-if="column.key === 'actions'">
          <v-btn icon size="small" density="compact" @click="editUser(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon size="small" density="compact" @click="deleteUser(item.id)">
            <v-icon color="red" class="pa-2">mdi-delete</v-icon>
          </v-btn>
        </template>
        <template v-else>
          
          {{ item[column.key] }}
          {{  console.log("item[column.key]:", item[column.key]) }}
        </template>
      </td>
  </tr>
    
  </template> 
</v-data-table>



<v-snackbar
  v-model="snackbar"
  :color="snackbarColor"
  timeout="3000"
  location="top center"
  elevation="4"
>
  {{ snackbarText }}
</v-snackbar>


  </template>

  <!-- MOBILE PRIKAZ -->
  <template v-else>
    <Navbar p-5 />
    <v-row dense>
      <v-col cols="12" v-for="user in users" :key="user.id">
        <v-card class="pa-3 mb-3" elevation="2">
          <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ user.name }} {{ user.lastname }}
          </v-card-title>

          <v-card-text class="text-body-2">
            <div><strong>Username:</strong> {{ user.username }}</div>
            <div><strong>Email:</strong> {{ user.email }}</div>
            <div><strong>Telefon:</strong> {{ user.phone }}</div>
            <div><strong>Adresa:</strong> {{ user.address }}</div>
            <div><strong>Uloga:</strong> {{ user.role }}</div>
            <div><strong>Status: </strong>
              <v-chip
                :color="user.isActive ? 'green' : 'red'"
                text-color="white"
                size="x-small"
              >
                {{ user.isActive  ? 'Aktivan' : 'Neaktivan' }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
</v-container>

</template>

<style scoped>
.v-data-table {
  font-size: .8rem;
  background: linear-gradient(to right, #a9c4b8, #939d97);
  ;
}
.v-data-table th, .v-data-table td {
  white-space: nowrap;
}

.even-row {
  background-color: #ffffff;
}
.odd-row {
  background-color: #f7f7f7;
}

.v-container {

  width: 100vw !important;
}

.desktop-view {
  width: 100vw !important;
}

</style>
