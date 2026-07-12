import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NestJSService } from './services/nestjs.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MapComponent } from './components/map/map.component';
import { busDivIcon, destinationDivIcon, stopDisabledDivIcon, stopDivIcon, tileLayerUrl, userDivIcon } from './utils/map.utils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MapComponent,
    FormsModule
  ],
  providers: [NestJSService],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
 
}
