import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import IAuthenticationProxy from './IAuthenticationProxy';

// Set up Firebase project: https://firebase.google.com/docs/web/setup
// Enable anonymous auth: https://console.firebase.google.com/u/4/project/PROJECT_ID/authentication/providers

const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

class FirebaseProxy implements IAuthenticationProxy {
    authenticate(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            auth.onAuthStateChanged((user) => {
                if (!user) return reject('Failed to initialize a connection to site datastore.');

                resolve(user.getIdToken());
            });
            signInAnonymously(auth);
        });
    }
}

export default FirebaseProxy;
