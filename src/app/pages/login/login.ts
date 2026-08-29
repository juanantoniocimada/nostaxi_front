import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';
import { NestJSService } from '../../services/nestjs.service';
import { User } from '../../services/user';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  router = inject(Router);
  nestjsService = inject(NestJSService);
  userService = inject(User);

  phoneNumber: number | null = null;
  password: string = '';

  login() {
    // this.router.navigate(['/home']);

    /*
      phoneNumber
      password
    */

    this.nestjsService.login({ phoneNumber: this.phoneNumber, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Handle successful login, e.g., navigate to home page

        /*

      {"data":{"ok":false,"message":"Contraseña incorrecta"}}
      {"data":{"ok":false,"message":"Usuario no encontrado"}}
      {"data":{"ok":true,"user":{"id":1,"phoneNumber":"615973369","name":"JOHAN"}}}
        */

        if(response && response.data && response.data.ok && response.data.user) {
          
          this.userService.setUserData(response.data.user);
         
          this.router.navigate(['/home']);
        } else {
          alert('Login failed: ' + (response.data && response.data.message ? response.data.message : 'Unknown error'));
        }

      },
      error: (error) => {
        console.error('Login failed:', error);
        // Handle login error, e.g., show an error message
      }
    });
  }

  register() {
    this.router.navigate(['/register']);
  }

}
