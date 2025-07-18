const API_URL = import.meta.env.VITE_APP_API_URL;

const token = localStorage.getItem("token");


export async function sendRegisterUserToDatabase(formData) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.firstName,
          lastname: formData.lastName,
          username: formData.username,
          phone: formData.phone,
          address: formData.address,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Greška pri registraciji:", data);
        const errorMsg = data.message || Object.values(data.errors || {})[0]?.[0] || "Nepoznata greška.";
        return { success: false, message: errorMsg };
      }
  
      return { success: true, message: "Registracija uspješna", data };
  
    } catch (error) {
      console.error("Greška pri fetchu:", error);
      return { success: false, message: "Greška na serveru. Pokušajte kasnije." };
    }
  }

  export async function updateUser(id, userData) {



    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Ako je potrebno, dodajte token za autorizaciju
        },
        body: JSON.stringify(userData),
      });
  
          const result = await response.json(); 
          console.log("Rezultat ažuriranja korisnika:", result);
        if (!response.ok) {
        console.error("Greška pri ažuriranju korisnika:", result);
        throw new Error(result.message || "Greška pri ažuriranju korisnika");
      }
  
      console.log("Ažurirani korisnik:", result);
      return { success: true, message: "Korisnik uspješno ažuriran" };
    } catch (error) {
      console.error("Greška pri ažuriranju korisnika:", error);
      return {
        success: false,
        message: error.message || "Greška na serveru. Pokušajte kasnije.",
      };
    }
  }
  



  
export async function loginUser(email, password) {
  const formData = { email, password };
  console.log("Slanje podataka za login:", formData);
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });     
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    return { success: true, message: "Login uspješan", data };
  } catch (error) {
    console.error("Greška pri loginu:", error);
    return { success: false, message: "Greška na serveru. Pokušajte kasnije." };
  }
}

export async function fetchUserData() {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //"Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    if (!response.ok) {
      throw new Error("Greška pri dohvaćanju korisničkih podataka");
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Greška pri dohvaćanju korisničkih podataka:", error);
    return { success: false, message: "Greška na serveru. Pokušajte kasnije." };
  }
}


export async function fetchUsersByNumber(number) {
  try {
    const response = await fetch(`${API_URL}/users/${number}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Greška pri dohvaćanju korisnika");
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Greška pri dohvaćanju korisnika:", error);
    return { success: false, message: "Greška na serveru. Pokušajte kasnije." };
  }
}

export async function deleteUserById(id)  {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Greška pri brisanju korisnika:", error);
      throw new Error("Greška pri brisanju korisnika");
  
    }
    return { success: true, message: "Korisnik uspješno obrisan" };
  } catch (error) {
    console.error("Greška pri brisanju korisnika:", error);
    return { success: false, message: "Greška na serveru. Pokušajte kasnije." };
  }
}