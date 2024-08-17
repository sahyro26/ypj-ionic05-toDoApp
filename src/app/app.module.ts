import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Default import
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
//To use Firestore
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
//To use Firebase Authentication
import { provideAuth, getAuth } from '@angular/fire/auth';
//To use Firebase cloud storage
import { getStorage } from 'firebase/storage';
import { provideStorage } from '@angular/fire/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz7OS542VTK16Svj3iECe-JQ63x9LyqAA",
  authDomain: "todo-app-51055.firebaseapp.com",
  projectId: "todo-app-51055",
  storageBucket: "todo-app-51055.appspot.com",
  messagingSenderId: "683111334335",
  appId: "1:683111334335:web:4d1646f4544ae8e898610a"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  provideFirebaseApp(() => initializeApp(firebaseConfig)), //To initalize firebase
  provideFirestore(() => getFirestore()), //To use FireStore
  provideAuth(() => getAuth()), //To use Firebase Authentication
  provideStorage(() => getStorage()), //To use Firebase cloud storage
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
