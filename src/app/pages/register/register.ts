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
  phoneNumber: number | null = null;
  password: string = '';
  password2: string = '';

  register() {
    // this.router.navigate(['/home']);

    /*
      phoneNumber
      password
    */

    this.nestjsService.register({ 
      name: this.name,
      phoneNumber: this.phoneNumber, 
      password: this.password 
    }).subscribe({
      next: (response) => {
        console.log('Register successful:', response);
        // Handle successful registration, e.g., navigate to login page
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Register failed:', error);
        // Handle registration error, e.g., show an error message
      }
    });
  }

}
