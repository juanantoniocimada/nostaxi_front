import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NestJSService } from './services/nestjs.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule
  ],
  providers: [NestJSService],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('NOSTAXI.com');

  public vehicles: any = [];

  public nestjsService = inject(NestJSService);

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles() {
    this.nestjsService.getVehicles().subscribe({
      next: (data) => {
        console.log('Vehicles:', data);
        this.vehicles = data['data'];
        console.log(this.vehicles);
        
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
      }
    });
  }
}
