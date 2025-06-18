
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDh5zr8PUFoAnQVuNtIDPryvsRWexgUuno",
    authDomain: "nimble-radio-416104.firebaseapp.com",
    projectId: "nimble-radio-416104",
    storageBucket: "nimble-radio-416104.firebasestorage.app",
    messagingSenderId: "906637798146",
    appId: "1:906637798146:web:f26169a39144455e68701b",
    measurementId: "G-5TZQNL2CXX"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

const storage = getStorage(app);

window.handleSignIn = handleSignIn;
window.handleSignOut = handleSignOut;
window.updateUIAfterLogin = updateUIAfterLogin;
window.toggleDropdown = toggleDropdown;

window.openAddBookModal = function () {
  const form = document.getElementById("addBookModal");
  form.style.display = form.style.display === "block" ? "none" : "block";
}

window.uploadBook = async function () {
  const title = document.getElementById("bookTitle").value.trim();
  const fileInput = document.getElementById("bookFile");
  const file = fileInput.files[0];

  if (!title || !file) {
    alert("Please enter a title and select a PDF file.");
    return;
  }

  const storageRef = ref(storage, `books/${title}.pdf`);
  await uploadBytes(storageRef, file);

  alert("Book uploaded successfully!");
  document.getElementById("bookTitle").value = "";
  fileInput.value = "";

  loadBooks(); 
};



function toggleDropdown(){
    const dropdown = document.getElementById("profile-dropdown");
    dropdown.style.display= dropdown.style.display === "block" ? "none" : "block";
}
function handleSignIn() {
    const name= prompt("Enter your name:");
    if(name){
        localStorage.setItem("name", name);
        alert(`Welcome, ${name}!`);
        const profileName = document.getElementById("profile-name");
        profileName.textContent = name;
        document.getElementById("signin-btn").style.display = "none";
        document.getElementById("signout-btn").style.display = "block";
        toggleDropdown();
    }
}
function handleSignOut() {
    localStorage.removeItem("name");
    alert("You have signed out.");
    document.getElementById("profile-name").innerText = "Profile";
    document.getElementById("signin-btn").style.display = "block";
    document.getElementById("signout-btn").style.display = "none";
    document.getElementById("addbook-btn").style.display = "none";
    document.getElementById("addBookModal").style.display = "none";
    toggleDropdown();
}

function updateUIAfterLogin(username) {
  document.getElementById("profile-name").innerText = username;
  document.getElementById("signin-btn").style.display = "none";
  document.getElementById("signout-btn").style.display = "block";
  document.getElementById("addbook-btn").style.display = "block";

}

window.onload = () => {
  const user = localStorage.getItem("name");
  if (user) {
    updateUIAfterLogin(user); 
  }
};