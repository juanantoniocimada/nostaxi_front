import { Component, inject } from '@angular/core';
import { NestJSService } from '../../services/nestjs.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    HeaderComponent,
  ],
  standalone: true,
  providers: [NestJSService],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  router = inject(Router);
  nestjsService = inject(NestJSService);

  name: string = '';
  phoneNumber: string | null = '';
  password: string = '';
  password2: string = '';
  img: string = '';
  email: string = '';
  passwordVisible: boolean = false;
  

  cameraFile: File | null = null;
  galleryFile: File | null = null;
  onCameraChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.cameraFile = input.files[0];
    }
    console.log(this.cameraFile);
    
  }

  onGalleryChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.galleryFile = input.files[0];
    }
    console.log(this.galleryFile);
  }

  checkForm() {
    return !this.name || !this.phoneNumber || !this.email || !this.password || !this.password2 || !this.comparePasswords();
  }

  comparePasswords() {
      if (this.password !== this.password2) {
        // alert('Passwords do not match!');
        return false;
      }
      return true;
    }

  changePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  register() {
    this.nestjsService.register({ 
      name: this.name,
      phoneNumber: this.phoneNumber, 
      password: this.password 
    }).pipe(take(1)).subscribe({
      next: (response) => {
        console.log('Register successful:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Register failed:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
