import Firebase from 'firebase/app'
import 'firebase/firestore' 
import firebaseConfig from '../../firebase.conf'

export default ({ Vue }) => {
  // Initialize Firebase from settings
  Firebase.initializeApp(firebaseConfig)
  console.log("Firebase initialized");
  Vue.prototype.$firebase = Firebase
  Vue.prototype.$auth = Firebase.auth();

}