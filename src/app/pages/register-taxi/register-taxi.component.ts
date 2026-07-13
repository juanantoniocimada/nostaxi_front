import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-register-taxi',
  templateUrl: './register-taxi.component.html',
  styleUrls: ['./register-taxi.component.scss'],
  standalone: true,
  providers: [],
  imports: [CommonModule, HeaderComponent],
  encapsulation: ViewEncapsulation.None,
})

// register-taxi
export class RegisterTaxiComponent implements OnInit {

  ngOnInit() {
  }


  goBack() {
    // Implement go back logic here
  }

  registerTaxi() {
    // Implement register taxi logic here
  }



}
