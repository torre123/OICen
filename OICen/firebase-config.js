// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getDatabase, ref, onValue, set, push, remove, update } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBY6pyZ6YX3EirpM85OGwHLnhC-LWtHWeE",
  authDomain: "oicen-2025.firebaseapp.com",
  databaseURL: "https://TU_PROYECTO.firebaseio.com",
  projectId: "oicen-2025",
  storageBucket: "oicen-2025.firebasestorage.app",
  messagingSenderId: "1058256863131",
  appId: "1:1058256863131:web:038a2946a2f7bf367e2b3e"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, onValue, set, push, remove, update };

