import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = ""
  password: string = ""
  email: string = ""
  profileImage: string | undefined;
  profileFile: File | null = null;

  constructor(private authService: AuthService, private toastController: ToastController) { }

  ngOnInit() {
  }


  async register() {
    if (this.name != "" && this.email != "" && this.password != "" && this.profileImage != "") {
      try {
        await this.authService.register(this.email, this.password, this.name, this.profileFile!!)
        console.log("Registration successful")
        const toast = await this.toastController.create({
          message: 'Registration successful',
          duration: 5000,
          position: 'top',
          color: 'success',
        });
        toast.present();
      }
      catch (error) {
        console.error('Registration error:', error);
      }
    }
  }

  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri, // Get the image as a file URI
      source: CameraSource.Camera, // Select the camera as the source
    });

    this.profileImage = image.webPath;
    this.profileFile = await this.uriToFile(this.profileImage!!, `profile_${new Date()}.jpeg`)


  }

  async uriToFile(uri: string, filename: string): Promise<File> {
    // Fetch the image data
    const response = await fetch(uri);
    const blob = await response.blob();
    // Convert the Blob to a File
    const file = new File([blob], filename, { type: blob.type });
    return file;
  }



}
