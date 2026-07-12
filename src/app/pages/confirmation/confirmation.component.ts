import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  standalone: true,
  providers: [],
  imports: [CommonModule, HeaderComponent],
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmationComponent implements OnInit {

  ngOnInit() {
  }
}
