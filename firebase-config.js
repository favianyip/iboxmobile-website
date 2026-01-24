// Firebase Configuration for ibox-mobile
// This file initializes Firebase and exports the database instance

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC77vhlLOps-LgEN9bZZb8WEcacaIRsx-A",
    authDomain: "ibox-mobile.firebaseapp.com",
    projectId: "ibox-mobile",
    storageBucket: "ibox-mobile.firebasestorage.app",
    messagingSenderId: "469559896863",
    appId: "1:469559896863:web:f26f7cc6fbff3087d4de2a",
    measurementId: "G-7Y24RRK75K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
const db = getFirestore(app);

// Export database instance for use in other files
export { db, app };

console.log('✅ Firebase initialized successfully');
