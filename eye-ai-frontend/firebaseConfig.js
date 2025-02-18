import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL  } from "firebase/storage";
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHzKiZOqAoHcuh1-dERcAtYKN1YW4F1_U",
  authDomain: "eye-ai-2a78d.firebaseapp.com",
  projectId: "eye-ai-2a78d",
  storageBucket: "eye-ai-2a78d.appspot.com",
  messagingSenderId: "30680022340",
  appId: "1:30680022340:web:157e8a1966ee7af4ee6b11",
  measurementId: "G-CS9P464X13",
  storageBucket: "gs://eye-ai-2a78d.appspot.com"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export let globalState = true;

export function setGlobalStateFalse() {
    globalState = false;
}

export function signInGoogle(){

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithRedirect(auth, provider);
  return true;

}

export function uploadFile(file, name){

  const storageRef = ref(storage, name);

  uploadBytes(storageRef, file).then(snapshot => {
    console.log(snapshot)
  });
}

export async function getLastImages() {
  const listRef = ref(storage); // Replace with your actual path
  const res = await listAll(listRef);
  const items = res.items.slice(-9);
  const urls = await Promise.all(items.map(itemRef => getDownloadURL(itemRef)));
  return urls;

}

