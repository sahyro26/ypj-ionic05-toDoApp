import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email: string = "";

  constructor(private authService: AuthService, private toastController: ToastController) { }


  ngOnInit() {
  }

  resetPassword() {
    if (this.email != "") {
      this.authService.resetPassword(this.email).then((userCredential) => {
        console.log('User reset pasword:', userCredential);
        this.onToastSuccess()
      }).catch((error) => {
        console.error('Reset password error:', error);
      });
    }
  }

  async onToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Email send successful',
      duration: 5000,
      position: 'top',
      // color: 'success',
    });
    toast.present();
  }

}
