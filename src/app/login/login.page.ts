import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private authService: AuthService, private toastController: ToastController, private router:Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.signIn(this.email, this.password).then((userCredential) => {
      this.router.navigate(['/todo']);
      console.log('User logged in:', userCredential);
      this.onToastSuccess()
    }).catch((error) => {
      console.error('Login error:', error);
    });
  }

  async onToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Log in successful',
      duration: 5000,
      position: 'top',
      // color: 'success',
    });
    toast.present();
  }

}
