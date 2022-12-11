import { initializeApp } from 'firebase/app';
import { getAuth, NextOrObserver, User, signInAnonymously } from 'firebase/auth';

// Set up Firebase project: https://firebase.google.com/docs/web/setup
// Enable anonymous auth: https://console.firebase.google.com/u/4/project/PROJECT_ID/authentication/providers

const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

class FirebaseProxy {
    init(cb: NextOrObserver<User | null>) {
        auth.onAuthStateChanged(cb);
        signInAnonymously(auth);
    }
}

export default FirebaseProxy;
