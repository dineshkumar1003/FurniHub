import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDF15lPxn7D_Hf88OKn6o1izmGRJuQa1qg",
  authDomain: "furnihub-8611c.firebaseapp.com",
  projectId: "furnihub-8611c",
  storageBucket: "furnihub-8611c.firebasestorage.app",
  messagingSenderId: "817264791177",
  appId: "1:817264791177:web:8fa44cd3dbb57be4d94058",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);