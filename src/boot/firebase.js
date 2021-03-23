import Firebase from 'firebase/app'

export default ({ Vue }) => {

    const FirebaseConfig = {
        apiKey: "AIzaSyCYsY6bdPLNl-0UjCJ-RxJ_m5mpia46Nt8",
        authDomain: "laberu-77a42.firebaseapp.com",
        projectId: "laberu-77a42",
        storageBucket: "laberu-77a42.appspot.com",
        messagingSenderId: "993128334521",
        appId: "1:993128334521:web:47b472ca44d8e6581dc768",
        measurementId: "G-055DEPHQ9W"
    }
    Firebase.initializeApp(FirebaseConfig);

    console.log("Firebase initialized");

    Vue.prototype.$firebase = Firebase;
    Vue.prototype.$auth = Firebase.auth();
}