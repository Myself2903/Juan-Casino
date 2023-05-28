import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD3VOuvmAq0ZiiHz5clhPnV13Miqf6sT38",
  authDomain: "juan-casino.firebaseapp.com",
  projectId: "juan-casino",
  storageBucket: "juan-casino.appspot.com",
  messagingSenderId: "71946667650",
  appId: "1:71946667650:web:3eaf4f10f78957b033d69b",
  measurementId: "G-GJKPWV8E2B"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)

/** 
 * @param {File} img the img to storage
 * @param {int} userid the id for the user who upload it  
 * @returns {Promise<string>} url of upload file
*/

export async function uploadUserImage(img, userid){
    const storageRef = ref(storage, `avatar/user${userid}`)
    await uploadBytes(storageRef, img )
    const url = await getDownloadURL(storageRef)
    return url
}