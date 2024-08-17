import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from '@angular/fire/auth';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private storage: Storage) { }

  async register(email: string, password: string, name: string, profileImage: File) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    // Upload profile image
    const filePath = `profile_images/${user.uid}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, profileImage);
    // Get the image URL
    const photoURL = await getDownloadURL(fileRef);


    // Update user profile
    await updateProfile(user, {
      displayName: name,
      photoURL
    });

    return userCredential;
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email)
  }


}
